/*
  # Create prayer_times table

  1. New Tables
    - `prayer_times`
      - `id` (uuid, primary key)
      - `date` (date, not null)
      - `fajr` (time, not null)
      - `dhuhr` (time, not null)
      - `asr` (time, not null)
      - `maghrib` (time, not null)
      - `isha` (time, not null)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `prayer_times` table
    - Add policy for authenticated users to read all data
*/

CREATE TABLE IF NOT EXISTS prayer_times (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  fajr time NOT NULL,
  dhuhr time NOT NULL,
  asr time NOT NULL,
  maghrib time NOT NULL,
  isha time NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prayer_times ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read prayer times"
  ON prayer_times
  FOR SELECT
  TO authenticated
  USING (TRUE);
  create table qibla (
  id uuid default uuid_generate_v4() primary key,
  direction float not null,
  lat float,
  lng float,
  created_at timestamptz default now()
);
