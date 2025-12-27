-- Fix security warnings: set search_path on functions
CREATE OR REPLACE FUNCTION public.generate_classroom_code() 
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.auto_generate_extension_code()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.extension_code IS NULL THEN
    NEW.extension_code := public.generate_classroom_code();
  END IF;
  RETURN NEW;
END;
$$;