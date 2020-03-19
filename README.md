# Simple cache
## built for funzies
- typescript
- webpack
- jest

## todo
- change to promise based cache values

## usage
### generic
```
// ttl options in minutes
const simpleCache = new SimpleCache({ ttl: 30 })

simpleCache.set('key', 'value')
const value = simpleCache.get('key') // 'value'
```

### fetch
```
const axios = require('axios')
const fetch = () => { return axios.get('/users/john') }
const simpleCache = new SimpleCache({ ttl: 60 })

const value = await simpleCache.fetch('/users/john', fetch)
```