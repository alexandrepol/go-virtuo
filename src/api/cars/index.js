const Router = require('koa-router');
const Car = require('./car.model');
const Station = require('../stations/station.model');

let router = new Router({
    prefix: '/api/cars'
});

router
  // Get all cars
  .get('/', async (ctx) => {
    try {
      const cars = await Car.find({});
      ctx.status = 200;
      ctx.body = {data:cars, code: 200};
    } catch(err) {
      throw err
    }
  })
  // Get single car
  .get('/:id', async (ctx) => {
    try {
      const id = ctx.params.id
      const car = await Car.findById(id);
      ctx.status = 200;
      ctx.body = {data:car, code: 200};
    } catch(err) {
      throw err
    }
  })
  // Create new car
  .post('/', async (ctx) => {
    try {
      const name = ctx.request.body.name;
      const stationId = ctx.request.body.stationId;

      if(!name || !stationId){
        ctx.throw(404, 'Missing arguments!'); 
      };

      if(name.length < 3){
        ctx.throw(400, 'Name should be at least 3 characters!'); 
      };

      const station = await Station.findById(stationId);

      if(!station){
        ctx.throw(404, 'Station not found!'); 
      };

      const newCar = await Car.create({name, station: station});
      await Station.update(
        { _id: stationId }, 
        { $push: { cars: newCar._id} },
      );
      ctx.status = 200;
      ctx.body = {data:newCar, code: 200};
    } catch(err) {
      throw err
    }
  })
  // Update car by ID
  .put('/:id', async (ctx) => {
    try {
      const id = ctx.params.id
      const name = ctx.request.body.name;

      if(!name){
        ctx.throw(404, 'Name is missing!'); 
      };
      
      const selectedCar = await Car.findById(id);
      
      if (!selectedCar) { ctx.throw(404, 'Car not found') };
      
      const modifiedCar = Station.where({ _id: id }).update({ $set: { name:  ctx.request.body }});

      ctx.status = 200;
      ctx.body = {success: true, code: 200};
    } catch(err) {
      throw err
    }
  })
  // Delete car by ID
  .delete('/:id', async (ctx) => {
    try {
      const selectedCar = await Car.findById(ctx.params.id);
      if (!selectedCar) { ctx.throw(404, 'Car not found') };

      const deletedCar = await selectedCar.remove();
      ctx.status = 200;
      ctx.body = {station: selectedCar, code: 200};
    } catch(err) {
      throw err
    }
  })

module.exports = router;