CREATE TABLE public.school_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_code text NOT NULL,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('district_admin','champion')),
  name text,
  invited_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (school_code, email)
);
CREATE INDEX school_contacts_code_idx ON public.school_contacts(school_code);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.school_contacts TO authenticated;
GRANT ALL ON public.school_contacts TO service_role;
ALTER TABLE public.school_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Operations account manages school contacts" ON public.school_contacts
FOR ALL TO authenticated
USING (lower(auth.jwt()->>'email') = 'admin@languagebridge.app' AND public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (lower(auth.jwt()->>'email') = 'admin@languagebridge.app' AND public.has_role(auth.uid(), 'admin'::app_role));