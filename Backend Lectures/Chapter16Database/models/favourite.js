const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  houseId: {
    type: String,
    ref:'Home',
    required: true,
    unique: true,
  },
});
favouriteSchema.statics.getFavourites = function () {
  return this.find();
};

favouriteSchema.statics.deleteById = function (homeId) {
  return this.deleteOne({ houseId: String(homeId) });
};

module.exports = mongoose.model("Favourite", favouriteSchema);
