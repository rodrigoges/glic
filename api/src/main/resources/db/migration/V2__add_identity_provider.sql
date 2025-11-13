ALTER TABLE users
  ADD COLUMN IF NOT EXISTS provider VARCHAR(50) NOT NULL DEFAULT 'LOCAL',
  ADD COLUMN IF NOT EXISTS provider_id VARCHAR(190);

UPDATE users
SET provider = 'LOCAL'
WHERE provider IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE indexname = 'ux_users_email'
  ) THEN
    CREATE UNIQUE INDEX ux_users_email ON users (email);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE indexname = 'ux_users_provider_providerid_social'
  ) THEN
    CREATE UNIQUE INDEX ux_users_provider_providerid_social
      ON users (provider, provider_id)
      WHERE provider <> 'LOCAL' AND provider_id IS NOT NULL;
  END IF;
END $$;
