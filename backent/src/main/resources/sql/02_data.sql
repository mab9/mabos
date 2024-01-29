
INSERT INTO users (email, name, role, send_email_reminders, create_date)
VALUES ('najra@mab.rocks', 'najra', 'ADMIN', true, NOW());

INSERT INTO abo (email, title, price, period, description, is_active, create_date)
VALUES ('najra@mab.rocks', 'Spotify Family', 15.00, 'MONTH', 'family account for 5 people', true, NOW());

