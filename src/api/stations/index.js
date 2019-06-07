const Router = require('koa-router');
const Station = require('./station.model');

let router = new Router({
    prefix: '/api/stations'
});

router
  // Get all stations
  .get('/', async (ctx) => {
    try {
      const stations = await Station.find({});
      ctx.status = 200;
      ctx.body = {data:stations, code: 200};
    } catch(err) {
      throw err
    }
  })
  // Get single station
  .get('/:id', async (ctx) => {
    try {
      const id = ctx.params.id
      const station = await Station.findById(id);
      ctx.status = 200;
      ctx.body = {data:station, code: 200};
    } catch(err) {
      throw err
    }
  })
  // Create new station
  .post('/', async (ctx) => {
    try {
      const name = ctx.request.body.name;

      if(!name){
        ctx.throw(404, 'Name is missing!'); 
      };

      if(name.length < 3){
        ctx.throw(400, 'Name should be at least 3 characters!'); 
      };

      const newStation = await Station.create({name});
      ctx.status = 200;
      ctx.body = {data:newStation, code: 200};
    } catch(err) {
      throw err
    }
  })
  // Update Station by ID
  .put('/:id', async (ctx) => {
    try {
      const id = ctx.params.id
      const name = ctx.request.body.name;

      if(!name){
        ctx.throw(404, 'Name is missing!'); 
      };
      
      const selectedStation = await Station
        .findById(id);
      
      if (!selectedStation) { ctx.throw(404, 'Station not found') };
      
      const modifiedStation = Station.where({ _id: id }).update({ $set: { name:  ctx.request.body.name }});

      ctx.status = 200;
      ctx.body = {station: selectedStation._id, code: 200};
    } catch(err) {
      throw err
    }
  })
  // Delete station by ID
  .delete('/:id', async (ctx) => {
    try {
      const selectedStation = await Station.findById({_id: ctx.params.id});

      if (!selectedStation) { ctx.throw(404, 'Station not found') };

      const deletedStation = await selectedStation.remove();
      ctx.status = 200;
      ctx.body = {station: deletedStation._id, code: 200};
    } catch(err) {
      throw err
    }
  })

module.exports = router;