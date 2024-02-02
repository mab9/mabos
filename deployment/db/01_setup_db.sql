
drop schema if exists keycloak;
CREATE SCHEMA keycloak;
GRANT ALL ON SCHEMA keycloak TO "mabos-db-admin";

drop SCHEMA if exists mabos;
CREATE SCHEMA if not exists mabos;
GRANT ALL ON SCHEMA mabos TO "mabos-db-admin";

CREATE EXTENSION IF NOT EXISTS  "uuid-ossp";
