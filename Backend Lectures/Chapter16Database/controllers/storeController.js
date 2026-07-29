const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes)=>{
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
 }   );
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes)=>{

    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
 } );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Promise.all([Favourite.getFavourites(), Home.find()])
    .then(([favourites, registeredHomes]) => {
      const favouriteIds = favourites.map(favourite => favourite.houseId);
      const favouriteHomes = registeredHomes.filter(home =>
        favouriteIds.includes(String(home._id))
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    })
    .catch(next);
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOneAndUpdate(
    { houseId: String(homeId) },
    {},
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .then(() => res.redirect("/favourites"))
    .catch(next);
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then(() => res.redirect("/favourites"))
    .catch(next);
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId)
    .then((home) => {

      if (!home) {
        console.log("Home not found");
        return res.redirect("/homes");
      }

      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};
