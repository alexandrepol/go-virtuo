const mongoose = require('mongoose');

var stationSchema = mongoose.Schema({
    name: {
      type: String,
      unique: true,
      min: 3,
      required: [true, 'name is required']
    },
    cars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
      }
    ]
  })

module.exports = mongoose.model('Station', stationSchema)
