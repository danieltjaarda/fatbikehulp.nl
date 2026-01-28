-- Supabase Migration: Voeg 'archived' veld toe aan reparaties tabel
-- Dit script voegt een boolean kolom toe om reparaties te kunnen archiveren

-- Voeg de archived kolom toe aan de reparaties tabel
ALTER TABLE reparaties 
ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE NOT NULL;

-- Update bestaande records om archived op false te zetten (voor de zekerheid)
UPDATE reparaties 
SET archived = FALSE 
WHERE archived IS NULL;

-- Optioneel: Maak een index voor snellere queries op gearchiveerde items
CREATE INDEX IF NOT EXISTS idx_reparaties_archived ON reparaties(archived);

-- Optioneel: Maak een index voor combinatie van archived en status voor geoptimaliseerde queries
CREATE INDEX IF NOT EXISTS idx_reparaties_archived_status ON reparaties(archived, status);

-- Voeg een comment toe aan de kolom voor documentatie
COMMENT ON COLUMN reparaties.archived IS 'Geeft aan of de reparatie gearchiveerd is (true) of actief (false)';

-- Succesbericht
SELECT 'Migratie voltooid: archived kolom toegevoegd aan reparaties tabel' AS status;


