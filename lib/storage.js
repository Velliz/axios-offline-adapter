import localforage from 'localforage'

const module = ({name = 'axios-stack', driver = localforage.LOCALSTORAGE}) => {
  let instance = localforage.createInstance({
    name: name
  })

  instance.setDriver(driver)

  return instance
}

export default module
