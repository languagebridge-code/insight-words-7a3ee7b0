
-- Add classroom_id validation to upsert_analytics_daily function
CREATE OR REPLACE FUNCTION public.upsert_analytics_daily(
  p_classroom_id uuid,
  p_session_date date,
  p_translation_count integer DEFAULT 1,
  p_characters integer DEFAULT 0,
  p_tier integer DEFAULT 2,
  p_lang_pair text DEFAULT 'en-es'::text,
  p_hour integer DEFAULT 12
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_id UUID;
  v_language_pairs JSONB;
  v_hourly_usage JSONB;
BEGIN
  -- Validate classroom exists
  IF NOT EXISTS(SELECT 1 FROM public.classrooms WHERE id = p_classroom_id) THEN
    RAISE EXCEPTION 'Invalid classroom_id';
  END IF;

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
$function$;
