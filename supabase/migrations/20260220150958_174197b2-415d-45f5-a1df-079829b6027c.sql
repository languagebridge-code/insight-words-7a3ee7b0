-- Remove the overly permissive public INSERT policy on pilot_applications
DROP POLICY IF EXISTS "Anyone can submit pilot applications" ON public.pilot_applications;