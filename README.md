



# SPA
run ng server for dev: npm run server
run spa: npm run start.

see package.json scripts.
icons 4 angular material: https://fonts.google.com/icons


# Deployment

Keycloak is using the Postgres DB in an own schema named keycloak.
Make sure, that the initial DB scripts are executed to be able to start keycloak.
The init scripts are located in the folder db at project root.

## For local development

1. start postgres and keycloak with docker compose
2. start backent and frontend locally

    docker compose -f compose-local.yml up -d


## For server development

1. start postgres, keycloak, backent and frontend with docker compose
2. provide env file with parametrized secrets: .secrets.prod.env
3. ensure, that DB was setup correctly.

    docker compose --env-file ./deployment/.secrets.local.env -f compose-prod.yml up -d # if you want to test prod compose on local env
    docker compose --env-file ./deployment/.secrets.prod.env -f compose-prod.yml up -d

Side note

    To connect from a container to another container inside the same network:
    - use the service name -> spa, backent, postgres or keycloak
    - use the containers port, not the exposed port on the host system (8080 for keycloak)


# Some docker commands

build images
    
    cd deployment
    docker build -t mabru/mabos-backent .
    cd deployment
    docker build -t mabru/mabos-spa .

# Some keycloak commands

Export keycloak realm - one command
    docker exec -i mabos-keycloak-1 /bin/sh -c '/opt/keycloak/bin/kc.sh export --realm mabos-realm --file /tmp/mabos-realm.json --users realm_file'
    docker cp mabos-keycloak-1:/tmp/mabos-realm.json ./deployment/mabos-realm.json
