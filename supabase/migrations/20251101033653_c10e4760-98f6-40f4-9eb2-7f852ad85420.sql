-- Create a simple configuration table to initialize the database schema
CREATE TABLE IF NOT EXISTS public.app_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Allow public read access to configuration
CREATE POLICY "Allow public read access to app_config"
ON public.app_config
FOR SELECT
TO public
USING (true);