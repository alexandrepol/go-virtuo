const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');

const config = require('./config');

const app = new koa();
app.use(bodyParser())
require('./routes')(app)

http.createServer(app.callback()).listen(config.port)