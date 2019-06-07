# go-virtuo

Hi guys, i'm building this basic REST API with Koa.JS / Mongoose / Mocha

## Installation

```bash
1. npm install #yarn install
```

```bash
2. edit .env.dist with your mongo URI and rename to .env
```


## Usage

```bash
2. npm run start
```

## More informations

You can test the REST API with the software Postman, create, delete, read and update stations & cars.

Example:

[POST] /api/stations/ with body {name:"Station A"}
[GET] /api/stations/ to get all stations (i did not populate :))
[GET] /api/stations/some_id to get station by ID


[POST] /api/cars/ with body {name:"Car A", stationId:your_station_id}
[GET] /api/cars/ to get all cars
[GET] /api/cars/some_id to get car by ID