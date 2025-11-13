CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS measures (
    measure_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    value           INTEGER NOT NULL,
    date_creation   TIMESTAMP NOT NULL,
    status          VARCHAR(16) NOT NULL,
    user_id         UUID NOT NULL,

    CONSTRAINT fk_measures_users
        FOREIGN KEY (user_id) REFERENCES users (user_id)
        ON DELETE CASCADE
);
