import localstorage from './storage.js'
import { Base64 } from 'js-base64'

export default options => {
  const { adapter } = options
  const storage = localstorage(options)

  const storeRequest = (key, data) => {
    storage.setItem(key, data)
  }

  const removeRequest = (key) => {
    storage.removeItem(key)
  }

  const sendAllRequest = () => {
    storage.iterate((data, key) => {
      adapter(data).then(() => removeRequest(key))
    })
  }

  return config => {
    const { url } = config
    const key = Base64.encodeURI(url)
    return adapter(config)
      .then(ret => {
        storeRequest(key, ret)
        return ret
      })
      .catch(err => {
        let { code, message, response } = err
        if (
          response === undefined &&
          (code === 'ECONNABORTED' || message === 'Network Error')
        ) {
          return storage.getItem(key)
        } else {
          sendAllRequest()
          return Promise.reject(err)
        }
      })
      .then(resolve => {
        sendAllRequest()
        return Promise.resolve(resolve)
      })
  }
}
