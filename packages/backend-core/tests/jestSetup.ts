import env from "../src/environment"

const globalSafe = global as any

env._set("COUCH_DB_PORT", globalSafe.__TESTCONTAINERS_DEVENV_PORT_5984__)
env._set(
  "COUCH_DB_URL",
  `http://${globalSafe.__TESTCONTAINERS_DEVENV_IP__}:${globalSafe.__TESTCONTAINERS_DEVENV_PORT_5984__}`
)

env._set(
  "MINIO_URL",
  `http://${globalSafe.__TESTCONTAINERS_DEVENV_IP__}:${globalSafe.__TESTCONTAINERS_DEVENV_PORT_9000__}`
)
