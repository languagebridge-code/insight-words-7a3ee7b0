-- Allow users to link themselves to an unlinked teacher by email
CREATE POLICY "Users can link themselves to teacher by email"
ON public.teachers
FOR UPDATE
USING (
  user_id IS NULL 
  AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
)
WITH CHECK (
  user_id = auth.uid()
);