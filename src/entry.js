if (process.env.NODE_ENV !== 'production') {
    const config = require('dotenv').config()
    if (config.error) {
      throw config.error
    }
}

console.log('Running in localhost:'+ process.env.PORT || 3000)

require('./index')

