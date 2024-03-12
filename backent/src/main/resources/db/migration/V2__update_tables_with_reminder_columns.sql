ALTER TABLE mabos.abo ADD COLUMN is_exp_reminder_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE mabos.abo ADD COLUMN exp_reminder_period VARCHAR(30) NOT NULL DEFAULT 'WEEK';
ALTER TABLE mabos.abo ADD COLUMN exp_reminder_period_amounts SMALLINT NOT NULL DEFAULT 1;

