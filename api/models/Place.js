const mongoose = require("mongoose");
const { Schema } = mongoose;

const placeSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  addedPhotos: [String],
  discription: String,
  parks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuest: Number,
  price: Number
});

const PlaceModel = mongoose.model("Place", placeSchema);
module.exports = PlaceModel;
