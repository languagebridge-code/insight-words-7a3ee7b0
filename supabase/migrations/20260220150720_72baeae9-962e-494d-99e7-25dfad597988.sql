-- Remove the overly permissive public INSERT policy on contact_submissions
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;