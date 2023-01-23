import localstorage from './storage'
import { Base64 } from 'js-base64'

export default options => {
  const { adapter } = options
  const storage = localstorage(options)
  return config => {
    const { url } = config
    const key = Base64.encodeURI(url)
    return adapter(config)
      .then(ret => {
        storage.setItem(key, ret)
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
          return Promise.reject(err)
        }
      })
  }
}
