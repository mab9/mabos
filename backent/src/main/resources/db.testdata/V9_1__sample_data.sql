
INSERT INTO users (email, name, role, send_email_reminders, create_date)
VALUES ('najra@mab.rocks', 'najra', 'ADMIN_ROLE', true, NOW());

INSERT INTO abo (user_email, title, price, period, description, is_active, start_date)
VALUES ('najra@mab.rocks', 'Spotify Family', 15.00, 'MONTH', 'family account for 5 people', true, NOW());


