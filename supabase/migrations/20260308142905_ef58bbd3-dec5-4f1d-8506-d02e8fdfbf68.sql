CREATE TABLE public.ttt_usage_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL CHECK (service IN ('stt', 'translate', 'tts')),
  characters integer NOT NULL DEFAULT 0,
  language text,
  source_language text,
  target_language text,
  success boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- No RLS needed - only edge functions write to this (service role)
-- Allow public read for admin dashboard via edge function
ALTER TABLE public.ttt_usage_log ENABLE ROW LEVEL SECURITY;

-- Admin read policy
CREATE POLICY "Admins can view TTT usage"
ON public.ttt_usage_log FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));
