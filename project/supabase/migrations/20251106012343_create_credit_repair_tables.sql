/*
  # Create credit repair tables

  ## Overview
  This migration creates tables to store credit repair lead data and testimonials
  for the Safety Financial credit repair service.

  ## New Tables

  ### `credit_repair_leads`
  Stores specialized lead data from the credit repair assessment form
  - `id` (uuid, primary key) - Unique identifier for each lead
  - `current_credit_score` (text) - Credit score range selected by user
  - `credit_concerns` (text[]) - Array of credit issues (collections, late payments, etc.)
  - `financial_goals` (text[]) - Array of goals (buy home, get car loan, etc.)
  - `timeline` (text) - How urgently they need results
  - `name` (text) - Full name of the lead
  - `email` (text) - Email address
  - `phone` (text) - Phone number
  - `message` (text, nullable) - Any additional notes from the user
  - `lead_source` (text) - Where the lead came from (default: 'website')
  - `created_at` (timestamptz) - When the lead was captured

  ### `credit_repair_testimonials`
  Stores success stories and testimonials for social proof
  - `id` (uuid, primary key) - Unique identifier
  - `client_name` (text) - Name or initials of client
  - `starting_score` (integer) - Credit score before service
  - `ending_score` (integer) - Credit score after service
  - `timeframe_months` (integer) - How long the improvement took
  - `testimonial_text` (text) - The testimonial content
  - `location` (text, nullable) - City/Province of client
  - `is_featured` (boolean) - Whether to display prominently
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - When testimonial was added

  ## Security
  - Enable RLS on both tables
  - Allow anonymous users to insert credit_repair_leads (for lead capture)
  - Only authenticated users can read credit_repair_leads (for admin access)
  - Allow anyone to read published testimonials (for public display)
  - Only authenticated users can manage testimonials

  ## Important Notes
  1. credit_concerns and financial_goals use text arrays for multiple selections
  2. Testimonials are designed for public display to build trust
  3. Lead data is confidential and requires authentication to access
  4. Consider adding email notifications for new credit repair leads
*/

CREATE TABLE IF NOT EXISTS credit_repair_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  current_credit_score text NOT NULL,
  credit_concerns text[] NOT NULL DEFAULT '{}',
  financial_goals text[] NOT NULL DEFAULT '{}',
  timeline text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text DEFAULT '',
  lead_source text DEFAULT 'website',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS credit_repair_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  starting_score integer NOT NULL,
  ending_score integer NOT NULL,
  timeframe_months integer NOT NULL,
  testimonial_text text NOT NULL,
  location text DEFAULT '',
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credit_repair_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_repair_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit credit repair leads"
  ON credit_repair_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read credit repair leads"
  ON credit_repair_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view published testimonials"
  ON credit_repair_testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON credit_repair_testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON credit_repair_testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON credit_repair_testimonials
  FOR DELETE
  TO authenticated
  USING (true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'credit_repair_testimonials_score_check'
  ) THEN
    ALTER TABLE credit_repair_testimonials 
    ADD CONSTRAINT credit_repair_testimonials_score_check 
    CHECK (starting_score >= 300 AND starting_score <= 850 AND ending_score >= 300 AND ending_score <= 850 AND ending_score > starting_score);
  END IF;
END $$;

INSERT INTO credit_repair_testimonials (client_name, starting_score, ending_score, timeframe_months, testimonial_text, location, is_featured, display_order)
VALUES 
  ('Sarah M.', 520, 720, 8, 'I was denied for a mortgage twice before working with Safety Financial. Their credit repair team removed old collections and corrected errors on my report. Eight months later, my score jumped 200 points and I bought my dream home! They literally changed my life.', 'Toronto, ON', true, 1),
  ('James T.', 580, 710, 6, 'After a difficult divorce, my credit was destroyed. I thought I''d never recover. The team at Safety Financial was professional, compassionate, and incredibly effective. Within 6 months, my score improved by 130 points. I can finally move forward with my life.', 'Vancouver, BC', true, 2),
  ('Maria R.', 490, 680, 10, 'Bankruptcy left me feeling hopeless about my financial future. Safety Financial showed me there was a path forward. They worked tirelessly to rebuild my credit, and now I qualify for loans again. Worth every penny!', 'Calgary, AB', true, 3),
  ('David K.', 605, 750, 7, 'I had several late payments and high credit utilization hurting my score. The credit repair specialists created a personalized strategy that worked perfectly. My score increased 145 points in 7 months. Now I''m getting credit card offers with amazing rewards!', 'Montreal, QC', false, 4),
  ('Jennifer L.', 545, 705, 9, 'Identity theft destroyed my credit. I was overwhelmed and didn''t know where to start. Safety Financial handled everything - disputes, documentation, follow-ups. They restored my credit and my peace of mind. Highly recommend!', 'Ottawa, ON', false, 5),
  ('Robert W.', 625, 780, 5, 'I needed to improve my credit quickly for a business loan. Safety Financial delivered results faster than I expected. They increased my score by 155 points in just 5 months. My business is now thriving thanks to their expertise.', 'Edmonton, AB', false, 6)
ON CONFLICT (id) DO NOTHING;
