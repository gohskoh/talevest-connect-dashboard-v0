-- Fix security issue: Set search_path for the function
CREATE OR REPLACE FUNCTION public.process_airdrop_claim(
  p_code text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code_id uuid;
  v_user_id uuid;
  v_existing_claim uuid;
  v_balance_exists boolean;
  v_tvst_amount decimal(18,8) := 0.001;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();
  
  -- Check if user is authenticated
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;
  
  -- Find active code for today
  SELECT id INTO v_code_id
  FROM public.airdrop_codes
  WHERE code = p_code 
    AND date = CURRENT_DATE
    AND is_active = true;
  
  -- Check if code exists and is valid
  IF v_code_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid or expired code');
  END IF;
  
  -- Check if user already claimed this code
  SELECT id INTO v_existing_claim
  FROM public.user_airdrop_claims
  WHERE user_id = v_user_id AND code_id = v_code_id;
  
  IF v_existing_claim IS NOT NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Code already claimed today');
  END IF;
  
  -- Create claim record
  INSERT INTO public.user_airdrop_claims (user_id, code_id, tvst_earned)
  VALUES (v_user_id, v_code_id, v_tvst_amount);
  
  -- Check if user balance record exists
  SELECT EXISTS(
    SELECT 1 FROM public.user_tvst_balance WHERE user_id = v_user_id
  ) INTO v_balance_exists;
  
  -- Update or create balance record
  IF v_balance_exists THEN
    UPDATE public.user_tvst_balance
    SET total_mined = total_mined + v_tvst_amount,
        updated_at = now()
    WHERE user_id = v_user_id;
  ELSE
    INSERT INTO public.user_tvst_balance (user_id, total_mined)
    VALUES (v_user_id, v_tvst_amount);
  END IF;
  
  RETURN jsonb_build_object(
    'success', true, 
    'tvst_earned', v_tvst_amount,
    'message', 'Successfully claimed 0.001 TVST!'
  );
END;
$$;