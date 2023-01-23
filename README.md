axios-offline-adapter
===

cache response each time, responed with cached when request in offline environment

## Install

```bash
npm i @velliz/axios-offline-adapter localforage --save
```

```bash
yarn add @velliz/axios-offline-adapter localforage
```

## Usage

add adapter in your request code

```javascript
import axios from 'axios'
import offlineAdapter from '@velliz/axios-offline-adapter'

const offline = offlineAdapter({
  name: 'axios-offline',
  adapter: axios.defaults.adapter
})

const http = axios.create({
  adapter: offline
})

http.get('/path/to/api').then(ret => {
  // bussiness code
})
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
