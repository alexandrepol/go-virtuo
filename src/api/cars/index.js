const Router = require('koa-router');

let router = new Router({
    prefix: '/api/cars'
});

router
  .get('/', async (ctx) => {
    try {
      ctx.body = {data:'', code: 200};
    } catch(err) {
      throw err
    }
  })

module.exports = router;