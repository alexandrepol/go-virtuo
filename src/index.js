const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const config = require('./config');


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    console.log('Database connected')
  });

const app = new koa();
app.use(bodyParser())
require('./routes')(app)

http.createServer(app.callback()).listen(config.port)