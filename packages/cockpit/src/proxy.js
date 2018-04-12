import {
  has,
  is,
} from 'ramda'

const isFunction = is(Function)

const getProxyHandler = fallback => ({
  get (target, key) {
    const hasKey = has(key)

    if (hasKey(target)) {
      const propInTarget = target[key]

      if (isFunction(propInTarget)) {
        return propInTarget
      } else if (hasKey(fallback)) {
        return new Proxy(propInTarget, getProxyHandler(fallback[key]))
      }
    }
    if (hasKey(fallback)) {
      const propInFallback = fallback[key]
      if (isFunction(propInFallback)) {
        return propInFallback
      }
      return new Proxy(propInFallback, getProxyHandler(propInFallback))
    }
    return undefined
  },
})

const proxy = cockpit => (client) => {
  const cockpitWithClient = cockpit(client)

  return new Proxy(cockpitWithClient, getProxyHandler(client))
}

export default proxy
