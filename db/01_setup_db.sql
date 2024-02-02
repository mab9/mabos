
drop schema if exists keycloak;
CREATE SCHEMA keycloak;
GRANT ALL ON SCHEMA keycloak TO "myuser";

drop SCHEMA if exists mabos;
CREATE SCHEMA if not exists mabos;
GRANT ALL ON SCHEMA mabos TO "myuser";

CREATE EXTENSION IF NOT EXISTS  "uuid-ossp";
