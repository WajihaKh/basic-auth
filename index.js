
const { db } = require('./src/auth/models/index.js');
const server = require('./src/auth/server.js')

db.sync()
  .then(() => {
    server.listen(3000, () => console.log('server up'));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });