-- Extension analytics table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  extension_version TEXT,
  classroom_id UUID REFERENCES public.classrooms(id),
  teacher_email TEXT
);

-- Indexes for performance
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_events_timestamp ON public.analytics_events(timestamp DESC);
CREATE INDEX idx_analytics_events_event_name ON public.analytics_events(event_name);
CREATE INDEX idx_analytics_events_classroom ON public.analytics_events(classroom_id);

-- Row Level Security
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous event inserts from extension
CREATE POLICY "Allow anonymous event inserts" ON public.analytics_events
FOR INSERT WITH CHECK (true);

-- Teachers see their classroom events
CREATE POLICY "Teachers see their classroom events" ON public.analytics_events
FOR SELECT USING (
  classroom_id IN (
    SELECT c.id FROM public.classrooms c
    JOIN public.teachers t ON c.teacher_id = t.id
    WHERE t.user_id = auth.uid()
  )
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Add extension linking capability to classrooms
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS extension_code TEXT UNIQUE;

-- Function to generate unique classroom codes (ABC-1234 format)
CREATE OR REPLACE FUNCTION public.generate_classroom_code() 
RETURNS TEXT 
LANGUAGE plpgsql
AS $$
DECLARE
  code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    code := UPPER(
      CHR(65 + floor(random() * 26)::int) ||
      CHR(65 + floor(random() * 26)::int) ||
      CHR(65 + floor(random() * 26)::int) ||
      '-' ||
      LPAD(floor(random() * 10000)::text, 4, '0')
    );
    SELECT EXISTS(SELECT 1 FROM public.classrooms WHERE extension_code = code) INTO code_exists;
    IF NOT code_exists THEN RETURN code; END IF;
  END LOOP;
END;
$$;

-- Generate codes for existing classrooms
UPDATE public.classrooms
SET extension_code = public.generate_classroom_code()
WHERE extension_code IS NULL;

-- Auto-generate codes for new classrooms
CREATE OR REPLACE FUNCTION public.auto_generate_extension_code()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.extension_code IS NULL THEN
    NEW.extension_code := public.generate_classroom_code();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_extension_code_on_insert
BEFORE INSERT ON public.classrooms
FOR EACH ROW
EXECUTE FUNCTION public.auto_generate_extension_code();

-- Enable realtime for analytics_events
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics_events;