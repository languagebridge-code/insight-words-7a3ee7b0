-- Create table for pilot applications
CREATE TABLE IF NOT EXISTS public.pilot_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  school_name TEXT NOT NULL,
  role TEXT NOT NULL,
  num_students INTEGER NOT NULL,
  languages TEXT,
  timeline TEXT,
  heard_from TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending'
);

-- Create table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  school TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new'
);

-- Create table for newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL UNIQUE,
  subscribed BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE public.pilot_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for pilot_applications (public can insert, admins can view)
CREATE POLICY "Anyone can submit pilot applications"
  ON public.pilot_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view pilot applications"
  ON public.pilot_applications
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for contact_submissions (public can insert, admins can view)
CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for newsletter_subscriptions (public can insert, admins can view)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscriptions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view newsletter subscriptions"
  ON public.newsletter_subscriptions
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));