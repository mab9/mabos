CREATE TABLE IF NOT EXISTS mabos.feature_flags
(
    id      SERIAL PRIMARY KEY,
    feature VARCHAR(100) NOT NULL,
    UNIQUE (feature)
);

CREATE TABLE IF NOT EXISTS mabos.users_feature_flags
(
    id              SERIAL PRIMARY KEY,
    user_id         INT     NOT NULL,
    feature_flag_id INT     NOT NULL,
    is_active       BOOLEAN NOT NULL DEFAULT false,
    UNIQUE (user_id, feature_flag_id),
    FOREIGN KEY (user_id) REFERENCES mabos.users (user_id),
    FOREIGN KEY (feature_flag_id) REFERENCES mabos.feature_flags (id)
);


----------------------------------------------
-- INSERT FEATURE FLAG FOR NEW CREATED FEATURE FLAG
----------------------------------------------
CREATE OR REPLACE FUNCTION mabos.add_feature_flag_to_all_users() RETURNS TRIGGER AS
$$
BEGIN

    -- Insert a new row in users_feature_flags for each user
    -- RAISE NOTICE 'Processing new feature flag with data: %', NEW;

    INSERT INTO mabos.users_feature_flags(user_id, feature_flag_id)
    SELECT user_id, NEW.id
    FROM mabos.users;
    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

-- Trigger that fires after a new row is inserted into feature_flags
CREATE OR REPLACE TRIGGER trg_add_feature_flag_to_all_users
    AFTER INSERT
    ON mabos.feature_flags
    FOR EACH ROW
EXECUTE FUNCTION mabos.add_feature_flag_to_all_users();




----------------------------------------------
-- INSERT FEATURE FLAG FOR NEW CREATED USERS
----------------------------------------------
CREATE OR REPLACE FUNCTION mabos.add_feature_flag_to_new_user() RETURNS TRIGGER AS
$$
BEGIN

    RAISE NOTICE 'Processing new feature flag with data: %', NEW;
    INSERT INTO mabos.users_feature_flags(user_id, feature_flag_id)
    SELECT NEW.user_id, id
    FROM mabos.feature_flags;
    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

-- Trigger that fires after a new row is inserted into users
CREATE OR REPLACE TRIGGER trg_add_feature_flag_to_new_user
    AFTER INSERT
    ON mabos.users
    FOR EACH ROW
EXECUTE FUNCTION mabos.add_feature_flag_to_new_user();