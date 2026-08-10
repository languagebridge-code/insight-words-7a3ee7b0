-- 1. Remove permissive anonymous insert policies
DROP POLICY IF EXISTS "Allow anonymous event inserts" ON public.analytics_events;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;
REVOKE INSERT ON public.analytics_events FROM anon, authenticated;
REVOKE INSERT ON public.newsletter_subscriptions FROM anon, authenticated;
GRANT ALL ON public.analytics_events TO service_role;
GRANT ALL ON public.newsletter_subscriptions TO service_role;

-- 2. Remove permissive analytics_daily write policies (service role bypasses RLS)
DROP POLICY IF EXISTS "Service can insert analytics" ON public.analytics_daily;
DROP POLICY IF EXISTS "Service can update analytics" ON public.analytics_daily;
REVOKE INSERT, UPDATE ON public.analytics_daily FROM anon, authenticated;
GRANT ALL ON public.analytics_daily TO service_role;

-- 3. Prevent privilege escalation through profiles
CREATE OR REPLACE FUNCTION public.protect_profile_privileged_columns()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Admins and server-side (service role) calls may do anything
  IF auth.uid() IS NULL OR public.has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    -- role can never be changed by the user themselves
    NEW.role := OLD.role;
  ELSE
    -- on insert, role is not user-selectable as a privilege source
    NEW.role := COALESCE(NEW.role, 'teacher');
  END IF;

  -- pilot_id may only reference an active, contracted pilot organization
  IF NEW.pilot_id IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM public.pilot_organizations p
       WHERE p.pilot_id = NEW.pilot_id AND p.is_active
     ) THEN
    RAISE EXCEPTION 'Invalid or inactive pilot organization';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_profile_privileged_columns_trg ON public.profiles;
CREATE TRIGGER protect_profile_privileged_columns_trg
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_privileged_columns();

-- 4. Lock down SECURITY DEFINER / internal functions from direct API execution
REVOKE ALL ON FUNCTION public.upsert_analytics_daily(uuid, date, integer, integer, integer, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_analytics_daily(uuid, date, integer, integer, integer, text, integer) TO service_role;

REVOKE ALL ON FUNCTION public.generate_classroom_code() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.auto_generate_extension_code() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.protect_profile_privileged_columns() FROM PUBLIC, anon, authenticated;

-- helper predicates used inside RLS policies stay callable by signed-in users only
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.get_teacher_district(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_teacher_district(uuid) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.is_district_admin(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_district_admin(uuid, uuid) TO authenticated, service_role;