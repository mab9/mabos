


# Some notes for deployment

##


## Server deployment

Keycloak is using the Postgres DB in an own schema named keycloak.
Make sure, that the initial DB scripts are executed to be able to start keycloak.
The init scripts are located in the folder db at project root.


1. start postgres, keycloak, backent and frontend with docker compose
2. provide env file with parametrized secrets: .secrets.server.env
3. ensure, that DB was setup correctly.

   docker compose --env-file ./deployment/.secrets.local.env -f compose-server.yml up -d # if you want to test server compose on local env
   docker compose --env-file ./deployment/.secrets.server.env -f compose-server.yml up -d
   docker compose --env-file ./deployment/.secrets.server.env -f compose.yml up -d

Side notes

    To connect from a container to another container inside the same network:
    - use the service name -> spa, backent, postgres or keycloak
    - use the containers port, not the exposed port on the host system (8080 for keycloak)


