const express = require("express");
const router = express.Router();
const msg = require("../config/localization/messages.en");
const setup = require("../config/setup");
const Role = require("../models/Roles");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/:setupCode", (req, res) => {
  //add the admin group
  if (req.params.setupCode === setup.setupCode) {
    let addAdminGroup = new Role({
      rolename: setup.adminGroup[0],
      description: setup.adminGroup[1],
      system: true,
    });
    addAdminGroup.save().catch((err) => console.log(err));

    //add the base user group
    let addUserGroup = new Role({
      rolename: setup.userGroup[0],
      description: setup.userGroup[1],
      system: true,
    });
    addUserGroup.save().catch((err) => console.log(err));

    const adminUser = new User({
      name: "Admin User",
      email: setup.adminUserEmail,
      password : "admin",
      password_reset_flag: true,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(adminUser.password, salt, (err, hash) => {
        if (err) throw err;
        adminUser.password = hash;
        adminUser.email = adminUser.email.toUpperCase();
        adminUser.save().catch((err) => console.log(err));
      });
    });

    //clear the setupCode so we cant run this again
    setup.setupCode = false;

    req.flash("success_msg", msg.MSG_SUCCESSFUL_SETUP);
    res.redirect("/users/login");
  } else {
    res.redirect("/");
  }
});

router.get("/", (req, res) => {
  res.redirect("/");
});
module.exports = router;
