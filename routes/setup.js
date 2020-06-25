const express = require("express");
const router = express.Router();
const msg = require("../config/localization/messages.en");
const setup = require("../config/setup");
const Role = require("../models/Roles");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/:setupCode", (req, res) => {
  //make sure the code is right
  const fs = require("fs");
  const setupFilePath = "./config/setupcode.txt";
  const setupCode = fs.existsSync(setupFilePath)
    ? fs.readFileSync(setupFilePath, "utf-8").trim()
    : false;

 
  if (req.params.setupCode === setupCode && setupCode !== false) {
    //define everything
    let addAdminGroup = new Role({
      rolename: setup.adminGroup[0],
      description: setup.adminGroup[1],
      system: true,
    });
    let addUserGroup = new Role({
      rolename: setup.userGroup[0],
      description: setup.userGroup[1],
      system: true,
    });
    const adminUser = new User({
      name: "Admin User",
      email: setup.adminUserEmail,
      password: "admin",
      role: [setup.adminGroup[0]],
      password_reset_flag: true,
    });

    //add the admin group

    addAdminGroup.save().catch((err) => console.log(err));

    addUserGroup.save().catch((err) => console.log(err));

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
    fs.unlink("./config/setupcode.txt", (err) => {
      if (err) {
        console.log(err);
      } 
    });
    req.flash("success_msg", msg.MSG_SUCCESSFUL_SETUP);
    res.redirect("/users/login");
  } else {
    console.log("Setup was attempted with an invalid code");
    res.redirect("/");
  }
});
router.get("/", (req, res) => {
  res.redirect("/");
});
module.exports = router;
