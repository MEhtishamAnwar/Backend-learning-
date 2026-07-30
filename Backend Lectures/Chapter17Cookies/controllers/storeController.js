const Favourite = require("../models/favourite");
const Home = require("../models/home");

// Home Page
exports.getIndex = (req, res, next) => {

  console.log("session value:", req.session);

  Home.find()
    .then((registeredHomes) => {
      res.render("store/index", {
        registeredHomes,
        pageTitle: "Airbnb Home",
        currentPage: "index",
          isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Homes List
exports.getHomes = (req, res, next) => {
  Home.find()
    .then((registeredHomes) => {
      res.render("store/home-list", {
        registeredHomes,
        pageTitle: "Homes List",
        currentPage: "Home",
          isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Bookings
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
      isLoggedIn: req.isLoggedIn,
  });
};

// Favourite List
exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {

      // Remove null records
      const favouriteHomes = favourites
        .filter((fav) => fav.houseId)
        .map((fav) => fav.houseId);

      res.render("store/favourite-list", {
        favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
          isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add Favourite
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;

  Favourite.findOne({ houseId: homeId })
    .then((existingFavourite) => {
      if (existingFavourite) {
        return res.redirect("/favourites");
      }

      const favourite = new Favourite({
        houseId: homeId,
      });

      return favourite.save().then(() => {
        res.redirect("/favourites");
      });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.redirect("/favourites");
    });
};

// Remove Favourite
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favourite.findOneAndDelete({ houseId: homeId })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/favourites");
    });
};

// Home Details
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        return res.redirect("/homes");
      }

      res.render("store/home-detail", {
        home,
        pageTitle: "Home Detail",
        currentPage: "Home",
          isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/homes");
    });
};