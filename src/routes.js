module.exports = function(app) {
    app.use(require('./api/stations').routes());
    app.use(require('./api/cars').routes());
}