
CREATE TABLE IF NOT EXISTS feature_flags (
                     id BIGSERIAL PRIMARY KEY,
                     user_email VARCHAR(100) NOT NULL,
                     feature VARCHAR(100) NOT NULL,
                     flag BOOLEAN NOT NULL DEFAULT false,
                     CONSTRAINT fk_users
                         FOREIGN KEY(user_email)
                             REFERENCES users(email)
);

INSERT INTO feature_flags (id, user_email, feature, flag) VALUES (1, 'mab9@mab.rocks', 'NAV', false);