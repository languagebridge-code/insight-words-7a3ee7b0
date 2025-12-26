-- Create classrooms table
CREATE TABLE public.classrooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  classroom_code TEXT NOT NULL UNIQUE,
  deployment_type TEXT NOT NULL DEFAULT 'trial',
  trial_start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  trial_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on classrooms
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;

-- Create analytics_daily table for classroom-level aggregates
CREATE TABLE public.analytics_daily (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  classroom_id UUID NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  translation_count INTEGER DEFAULT 0,
  total_characters INTEGER DEFAULT 0,
  tier1_count INTEGER DEFAULT 0,
  tier2_count INTEGER DEFAULT 0,
  tier3_count INTEGER DEFAULT 0,
  language_pairs JSONB DEFAULT '{}'::jsonb,
  hourly_usage JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(classroom_id, session_date)
);

-- Enable RLS on analytics_daily
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;

-- Add school_code and classroom_code to teachers for easy lookup
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS teacher_code TEXT UNIQUE;

-- Generate unique codes for existing teachers
UPDATE public.teachers 
SET teacher_code = 'teacher_' || substr(md5(random()::text), 1, 8)
WHERE teacher_code IS NULL;

-- RLS Policies for classrooms
CREATE POLICY "Teachers can view their own classrooms"
ON public.classrooms
FOR SELECT
USING (
  teacher_id IN (SELECT id FROM public.teachers WHERE user_id = auth.uid())
  OR has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Teachers can create classrooms"
ON public.classrooms
FOR INSERT
WITH CHECK (
  teacher_id IN (SELECT id FROM public.teachers WHERE user_id = auth.uid())
);

CREATE POLICY "Teachers can update their own classrooms"
ON public.classrooms
FOR UPDATE
USING (
  teacher_id IN (SELECT id FROM public.teachers WHERE user_id = auth.uid())
);

-- RLS Policies for analytics_daily
CREATE POLICY "Teachers can view analytics for their classrooms"
ON public.analytics_daily
FOR SELECT
USING (
  classroom_id IN (
    SELECT c.id FROM public.classrooms c
    JOIN public.teachers t ON c.teacher_id = t.id
    WHERE t.user_id = auth.uid()
  )
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Allow public insert for edge function (we'll use service role key)
CREATE POLICY "Service can insert analytics"
ON public.analytics_daily
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service can update analytics"
ON public.analytics_daily
FOR UPDATE
USING (true);

-- Create function to get or create daily analytics record
CREATE OR REPLACE FUNCTION public.upsert_analytics_daily(
  p_classroom_id UUID,
  p_session_date DATE,
  p_translation_count INTEGER DEFAULT 1,
  p_characters INTEGER DEFAULT 0,
  p_tier INTEGER DEFAULT 2,
  p_lang_pair TEXT DEFAULT 'en-es',
  p_hour INTEGER DEFAULT 12
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
  v_language_pairs JSONB;
  v_hourly_usage JSONB;
BEGIN
  -- Try to get existing record
  SELECT id, language_pairs, hourly_usage INTO v_id, v_language_pairs, v_hourly_usage
  FROM public.analytics_daily
  WHERE classroom_id = p_classroom_id AND session_date = p_session_date;
  
  IF v_id IS NULL THEN
    -- Create new record
    v_language_pairs := jsonb_build_object(p_lang_pair, 1);
    v_hourly_usage := jsonb_build_object(p_hour::text, 1);
    
    INSERT INTO public.analytics_daily (
      classroom_id, session_date, translation_count, total_characters,
      tier1_count, tier2_count, tier3_count, language_pairs, hourly_usage
    ) VALUES (
      p_classroom_id, p_session_date, p_translation_count, p_characters,
      CASE WHEN p_tier = 1 THEN 1 ELSE 0 END,
      CASE WHEN p_tier = 2 THEN 1 ELSE 0 END,
      CASE WHEN p_tier = 3 THEN 1 ELSE 0 END,
      v_language_pairs, v_hourly_usage
    )
    RETURNING id INTO v_id;
  ELSE
    -- Update existing record
    v_language_pairs := COALESCE(v_language_pairs, '{}'::jsonb);
    v_hourly_usage := COALESCE(v_hourly_usage, '{}'::jsonb);
    
    UPDATE public.analytics_daily SET
      translation_count = translation_count + p_translation_count,
      total_characters = total_characters + p_characters,
      tier1_count = tier1_count + CASE WHEN p_tier = 1 THEN 1 ELSE 0 END,
      tier2_count = tier2_count + CASE WHEN p_tier = 2 THEN 1 ELSE 0 END,
      tier3_count = tier3_count + CASE WHEN p_tier = 3 THEN 1 ELSE 0 END,
      language_pairs = jsonb_set(
        v_language_pairs,
        ARRAY[p_lang_pair],
        to_jsonb(COALESCE((v_language_pairs->>p_lang_pair)::integer, 0) + 1)
      ),
      hourly_usage = jsonb_set(
        v_hourly_usage,
        ARRAY[p_hour::text],
        to_jsonb(COALESCE((v_hourly_usage->>(p_hour::text))::integer, 0) + 1)
      ),
      updated_at = now()
    WHERE id = v_id;
  END IF;
  
  RETURN v_id;
END;
$$;