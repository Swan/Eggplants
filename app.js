// Dependencies
var express               = require("express"),
    app                   = express(),
    methodOverride        = require("method-override"), 
    bodyParser            = require("body-parser"), 
    expressSanitizer      = require("express-sanitizer"), 
    passport              = require("passport"), 
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"), 
    mongoose              = require("mongoose"), 
    flash                 = require("connect-flash"),
    indexRoutes           = require("./routes/index");

// Use Dependencies
app.use(require("express-session")({
    secret: "", 
    resave: false,
    saveUninitialized: false
}));   
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash()); 
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
})
app.use(passport.initialize()); 
app.use(passport.session());

// Use routes inside routes folder
app.use(indexRoutes);

// MongoDB
//mongoose.connect("mongodb://localhost/eggplants");


// Start Server
app.listen(8080, function(){
    console.log("Server Started");
});