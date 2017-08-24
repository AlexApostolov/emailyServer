// keys.js--Figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // We're in production--return the prod set of keys
  module.exports = require('./prod');
} else {
  // We're in development--return the dev keys.
  module.exports = require('./dev');
}