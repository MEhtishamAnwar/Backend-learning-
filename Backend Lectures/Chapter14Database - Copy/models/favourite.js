const { getDb } = require("../utils/databaseUtils");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
     const db=getDb();
         return getDb().collection("favourites").findOne({houseId:this.houseId}).then(existingFav=>{
          if(!existingFav){
                return db.collection("favourites").insertOne(this);

          }
         })
   return new Promise.resolve();
  }

  static getFavourites() {
    return getDb()
      .collection("favourites")
      .find()
      .toArray();
  }

  static deleteById(homeId) {
    return getDb().collection("favourites").deleteOne({ houseId: homeId });
  }
};
