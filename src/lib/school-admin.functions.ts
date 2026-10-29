import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { forwardSchoolAdmin } from "./school-admin.server";

export const schoolAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => input)
  .handler(async ({ data, context }) => {
    const { data: identity, error } = await context.supabase.auth.getUser();
    const result = await forwardSchoolAdmin(data, error ? undefined : identity.user?.email, {
      admins: process.env['ADMIN_EMAILS'],
      base: process.env['AZURE_ADMIN_BASE_URL'],
      key: process.env['AZURE_ADMIN_KEY'],
    });
    return { status: result.status, body: JSON.stringify(result.body) };
  });