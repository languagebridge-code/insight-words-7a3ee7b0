-- Add district_admin role to existing enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'district_admin';

-- Create districts table
CREATE TABLE public.districts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;

-- Create schools table
CREATE TABLE public.schools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  district_id UUID NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  building_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Create teachers table (links to auth.users)
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  grade_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- Create usage_analytics table
CREATE TABLE public.usage_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  translation_count INTEGER DEFAULT 0,
  simplification_count INTEGER DEFAULT 0,
  vocabulary_lookups INTEGER DEFAULT 0,
  talk_to_teacher_uses INTEGER DEFAULT 0,
  languages_used JSONB DEFAULT '[]'::jsonb,
  total_session_minutes INTEGER DEFAULT 0,
  student_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.usage_analytics ENABLE ROW LEVEL SECURITY;

-- Create district_admins junction table
CREATE TABLE public.district_admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  district_id UUID NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, district_id)
);

ALTER TABLE public.district_admins ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is district admin
CREATE OR REPLACE FUNCTION public.is_district_admin(_user_id uuid, _district_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.district_admins
    WHERE user_id = _user_id
      AND district_id = _district_id
  )
$$;

-- Helper function to get teacher's district
CREATE OR REPLACE FUNCTION public.get_teacher_district(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT d.id
  FROM public.teachers t
  JOIN public.schools s ON t.school_id = s.id
  JOIN public.districts d ON s.district_id = d.id
  WHERE t.user_id = _user_id
  LIMIT 1
$$;

-- RLS Policies for districts
CREATE POLICY "Teachers can view their district"
ON public.districts FOR SELECT
USING (
  id = public.get_teacher_district(auth.uid())
  OR public.is_district_admin(auth.uid(), id)
  OR public.has_role(auth.uid(), 'admin')
);

-- RLS Policies for schools
CREATE POLICY "Teachers can view schools in their district"
ON public.schools FOR SELECT
USING (
  district_id = public.get_teacher_district(auth.uid())
  OR public.is_district_admin(auth.uid(), district_id)
  OR public.has_role(auth.uid(), 'admin')
);

-- RLS Policies for teachers
CREATE POLICY "Teachers can view themselves"
ON public.teachers FOR SELECT
USING (
  user_id = auth.uid()
  OR public.is_district_admin(auth.uid(), (SELECT district_id FROM public.schools WHERE id = school_id))
  OR public.has_role(auth.uid(), 'admin')
);

-- RLS Policies for usage_analytics
CREATE POLICY "Teachers can view their own analytics"
ON public.usage_analytics FOR SELECT
USING (
  teacher_id IN (SELECT id FROM public.teachers WHERE user_id = auth.uid())
  OR public.is_district_admin(auth.uid(), (
    SELECT s.district_id FROM public.teachers t 
    JOIN public.schools s ON t.school_id = s.id 
    WHERE t.id = teacher_id
  ))
  OR public.has_role(auth.uid(), 'admin')
);

-- RLS Policies for district_admins
CREATE POLICY "District admins can view their assignments"
ON public.district_admins FOR SELECT
USING (
  user_id = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
);

-- Indexes for performance
CREATE INDEX idx_schools_district ON public.schools(district_id);
CREATE INDEX idx_teachers_school ON public.teachers(school_id);
CREATE INDEX idx_teachers_user ON public.teachers(user_id);
CREATE INDEX idx_usage_analytics_teacher ON public.usage_analytics(teacher_id);
CREATE INDEX idx_usage_analytics_date ON public.usage_analytics(session_date);
CREATE INDEX idx_district_admins_user ON public.district_admins(user_id);
CREATE INDEX idx_district_admins_district ON public.district_admins(district_id);