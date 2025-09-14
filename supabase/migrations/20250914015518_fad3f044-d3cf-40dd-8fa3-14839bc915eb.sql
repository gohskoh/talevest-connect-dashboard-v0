-- Fix security vulnerability: Restrict airdrop code access to authenticated users only
-- This prevents unauthorized users from viewing active airdrop codes

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can view active codes" ON public.airdrop_codes;

-- Create a new secure policy that requires authentication
CREATE POLICY "Authenticated users can view active codes" 
ON public.airdrop_codes 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_active = true);