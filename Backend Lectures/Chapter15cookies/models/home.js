const db=require("../utils/databaseUtils")

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl,description,id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description=description;
    this.id=id;
  }

  save() {
return db.execute(`INSERT INTO home(houseName, price, location, rating, photoUrl,description) VALUES (?,?,?,?,?,?)`,[this.houseName,this.price,this.location,this.rating,this.photoUrl,this.description])
}

  static fetchAll() {
   return db.execute('SELECT* FROM home')

  
  }

  static findById(homeId) {
    return db.execute('SELECT* FROM home WHERE id=?',[homeId])
    
  }

  static deleteById(homeId,) {
    return db.execute('DELETE FROM home WHERE id=?',[homeId])

  }

};
