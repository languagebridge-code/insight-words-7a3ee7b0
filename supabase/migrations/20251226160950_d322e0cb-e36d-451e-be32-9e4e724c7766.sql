-- Remove simplification_count column from usage_analytics table since the feature is removed
ALTER TABLE public.usage_analytics DROP COLUMN IF EXISTS simplification_count;