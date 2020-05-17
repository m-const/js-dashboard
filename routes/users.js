const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require('passport');
const msg = require('../config/localization/messages.en');

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //simple validation
  if (!name || !email || !password || !password2) {
    errors.push({ msg: msg.MSG_FORM_NOT_FILLED});
  }

  if (password !== password2) {
    errors.push({ msg: msg.MSG_PASSWORDS_DO_NOT_MATCH });
  }

  if (password.length < 7) {
    errors.push({ msg: msg.MSG_PASSWORD_POLICY_NOT_MET });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {

    //validation passed
    User.findOne({ email: email.toUpperCase() }).then((user) => {
      if (user) {
        //user exists
        errors.push({ msg: msg.MSG_EMAIL_IN_USE });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.email = email.toUpperCase();
            newUser
              .save()
              .then((user) => {
                req.flash('success_msg', msg.MSG_SUCCESSFUL_REGISTRATION);
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});



router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


router.get('/logout', (req, res, next) => {
 req.logOut();
 req.flash('success_msg','Successfully logged out');
 res.redirect('/users/login');
});


router.get("/login", (req, res) => res.render("login",{layout: 'layout_simple',pgTitle: msg.FN_TITLE("Login")}));
router.get("/register", (req, res) => res.render("register",{layout: 'layout_simple',pgTitle: msg.FN_TITLE("Register")}));

module.exports = router;
