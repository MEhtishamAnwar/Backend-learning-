const { randomUUID } = require("crypto");
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/databaseUtils");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (id) {
      this._id = id;
    }
   
  }

  save() {
    const db = getDb();
    const homes = db.collection("homes");

    if (this._id) {
      const { _id, ...homeData } = this;
      return homes.updateOne({ _id: this._id }, { $set: homeData });
    }

    this._id = randomUUID();
    this.isFavourite = false;
    return homes.insertOne(this);
  }

  static fetchAll() {
    return getDb().collection("homes").find().toArray();
  }

  static fetchFavourites() {
    return getDb().collection("homes").find({ isFavourite: true }).toArray();
  }

  static getIdFilter(homeId) {
    const id = String(homeId);
    if (ObjectId.isValid(id)) {
      return { $or: [{ _id: id }, { _id: new ObjectId(id) }] };
    }
    return { _id: id };
  }

  static findById(homeId) {
    return getDb().collection("homes").findOne(Home.getIdFilter(homeId));
  }

  static deleteById(homeId) {
    return getDb().collection("homes").deleteOne(Home.getIdFilter(homeId));
  }

  static setFavourite(homeId, isFavourite) {
    return getDb()
      .collection("homes")
      .updateOne(Home.getIdFilter(homeId), { $set: { isFavourite } });
  }

};
