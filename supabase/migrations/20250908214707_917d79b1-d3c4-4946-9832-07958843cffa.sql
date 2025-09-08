-- Create airdrop_codes table for daily secret codes
CREATE TABLE public.airdrop_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  date date NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user_airdrop_claims table to track user claims
CREATE TABLE public.user_airdrop_claims (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  code_id uuid NOT NULL REFERENCES public.airdrop_codes(id),
  tvst_earned decimal(18,8) NOT NULL DEFAULT 0.001,
  claimed_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, code_id)
);

-- Create user_tvst_balance table to track mined TVST
CREATE TABLE public.user_tvst_balance (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  total_mined decimal(18,8) NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.airdrop_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_airdrop_claims ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.user_tvst_balance ENABLE ROW LEVEL SECURITY;

-- Create policies for airdrop_codes (everyone can read active codes)
CREATE POLICY "Anyone can view active codes"
ON public.airdrop_codes
FOR SELECT
USING (is_active = true);

-- Create policies for user_airdrop_claims
CREATE POLICY "Users can view their own claims"
ON public.user_airdrop_claims
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own claims"
ON public.user_airdrop_claims  
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policies for user_tvst_balance
CREATE POLICY "Users can view their own balance"
ON public.user_tvst_balance
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own balance"
ON public.user_tvst_balance
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own balance"
ON public.user_tvst_balance
FOR UPDATE
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_airdrop_codes_updated_at
BEFORE UPDATE ON public.airdrop_codes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_tvst_balance_updated_at  
BEFORE UPDATE ON public.user_tvst_balance
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to process airdrop claim
CREATE OR REPLACE FUNCTION public.process_airdrop_claim(
  p_code text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
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