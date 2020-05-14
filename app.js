const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');
require('./config/passport')(passport);



const app = express();
const db = require("./config/keys").MongoURI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
app.use(express.static(__dirname + '/assets'));
//ROUTES
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/dashboard", require("./routes/dashboard"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
