-- user is a reserved keyword
CREATE TABLE users (
                      user_id SERIAL PRIMARY KEY,
                      email VARCHAR(100) UNIQUE NOT NULL,
                      name VARCHAR(100) NOT NULL,
                      role VARCHAR(30) NOT NULL,
                      send_email_reminders BOOLEAN NOT NULL,
                      create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE abo (
                     id BIGSERIAL PRIMARY KEY,
                     user_email VARCHAR(100) NOT NULL,
                     title VARCHAR(100) NOT NULL,
                     price DOUBLE PRECISION NOT NULL,
                     period VARCHAR(30) NOT NULL,
                     description TEXT,
                     is_active BOOLEAN NOT NULL,
                     start_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                     CONSTRAINT fk_users
                         FOREIGN KEY(user_email)
                             REFERENCES users(email)
);

