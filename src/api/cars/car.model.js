const mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    name: {
      type: String,
      unique: true,
      min: 3,
      required: [true, 'Name is required']
    },
    available: {
      type: Boolean,
      default: true
    },
    station: { 
      type: Schema.Types.ObjectId,
      required: [true, 'Station is required'],
      ref: 'Station'
    },
  })

module.exports = mongoose.model('Car', carSchema)
