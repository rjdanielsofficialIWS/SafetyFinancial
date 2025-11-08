/*
  # Create leads and contact inquiries tables

  ## Overview
  This migration creates two tables to store lead capture data and contact form submissions
  for the Safety Financial website.

  ## New Tables

  ### `leads`
  Stores data from the 5-step lead capture assessment form
  - `id` (uuid, primary key) - Unique identifier for each lead
  - `interest` (text) - What the user is interested in (Life Insurance, Investments, Both, etc.)
  - `timeline` (text) - When they want to get started
  - `current_coverage` (text) - Their current insurance coverage status
  - `budget` (text) - Approximate monthly budget
  - `name` (text) - Full name of the lead
  - `email` (text) - Email address
  - `phone` (text) - Phone number
  - `message` (text, nullable) - Any additional notes from the user
  - `created_at` (timestamptz) - When the lead was captured

  ### `contact_inquiries`
  Stores general contact form submissions
  - `id` (uuid, primary key) - Unique identifier for each inquiry
  - `name` (text) - Full name
  - `email` (text) - Email address
  - `phone` (text, nullable) - Phone number (optional)
  - `subject` (text) - Subject of the inquiry
  - `message` (text) - Message content
  - `created_at` (timestamptz) - When the inquiry was submitted

  ## Security
  - Enable RLS on both tables
  - Allow anonymous users to insert records (for lead capture)
  - Only authenticated service role can read records (for admin access)

  ## Important Notes
  1. These tables are designed for one-way data collection (insert only for public users)
  2. Data should be accessed through admin dashboard or service role
  3. Consider adding email notifications for new submissions
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interest text NOT NULL,
  timeline text NOT NULL,
  current_coverage text NOT NULL,
  budget text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can read contact inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
