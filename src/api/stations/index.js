const Router = require('koa-router');
const Station = require('./station.model');

let router = new Router({
    prefix: '/api/stations'
});

router
  .get('/', async (ctx) => {
    try {
      const stations = await Station.find({});
      ctx.body = {data:stations, code: 200};
    } catch(err) {
      throw err
    }
  })

module.exports = router;