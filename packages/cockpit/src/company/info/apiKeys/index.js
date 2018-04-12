import {
  applySpec,
  pathOr,
  juxt,
} from 'ramda'

const getApiKey = env => pathOr('', ['api_key', env])

const encryptionKey = env => pathOr('', ['encryption_key', env])

const getApiKeys = env => applySpec({
  apiKey: getApiKey(env),
  encryptionKey: encryptionKey(env),
})

const createApiKey = (title, env) => company => ({
  title,
  keys: getApiKeys(env)(company),
})

const apiKeysArray = [
  createApiKey('live', 'live'),
  createApiKey('test', 'test'),
]

export default juxt(apiKeysArray)

