const mongoose = require("mongoose");
const { Schema } = mongoose;

const placeSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  photo: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkout: Number,
  maxGuest: Number,
});

const PlaceModel = mongoose.model("Place", placeSchema);
module.exports = PlaceModel;
