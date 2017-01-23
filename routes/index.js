// Dependencies
var express = require("express");
var router = express.Router();
var passport= require("passport");
var bodyParser = require("body-parser");
var request = require("request");
var flash = require("connect-flash");
var Eggplants = require("../middleware");
var Listing = require("../middleware/listing.js");

// Use Dependencies
router.use(bodyParser.urlencoded({extended: true})); 
router.use(flash()); 
router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
})


// Root
router.get("/", function(req, res){
    res.render("index");
});

// Direct
router.post("/", Eggplants.Direct, function(req, res){
});

// Beatmap Set Download Link
router.get("/s/:id", Eggplants.SetIdDownload, function(req, res){
});

// Beatmap Id Download Link
router.get("/b/:id", Eggplants.BeatmapIdDownload, function(req, res){
});

// Beatmap Listing
router.get("/osu", function(req, res){
    res.render("osu");
});

// Beatmap Listing POST
router.post("/osu", Listing.Beatmaps, function(req, res){
});

// 404
router.get("*", function(req, res){
   res.redirect("back"); 
});

// Export
module.exports = router;