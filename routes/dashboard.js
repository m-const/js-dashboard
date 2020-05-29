const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const { validateRole } = require("../config/roles");
const router = express.Router();
const msg = require("../config/localization/messages.en");
const User = require("../models/User");
const Role = require("../models/Roles");


router.get("/", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    name: req.user.name,
    pgTitle: msg.FN_TITLE("Dashboard"),
  })
);


router.get("/roles", ensureAuthenticated, validateRole("Admin"), (req, res) =>
  res.render("roles", {
    role: [
      ["User", "Group Level Access", true],
      ["Admin", "Full access", true],
      ["Team Red", "Access to team red resources", false],
      ["Team Blue", "Access to team blue resources", false],
    ],
    pgTitle: msg.FN_TITLE("Manage Roles"), name: req.user.name,
  })
);

router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("profile", {
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    phone_primary_type:       (typeof req.user.phone[0] !== 'undefined') ? req.user.phone[0].type : '',
    phone_primary_number:     (typeof req.user.phone[0] !== 'undefined') ? req.user.phone[0].number : '',
    phone_secondary_type:     (typeof req.user.phone[1] !== 'undefined') ? req.user.phone[1].type : '',
    phone_secondary_number:   (typeof req.user.phone[1] !== 'undefined') ? req.user.phone[1].number : '',

    address_primary_type:     (typeof req.user.address[0] !== 'undefined') ?  req.user.address[0].type : '',
    address_primary_street:   (typeof req.user.address[0] !== 'undefined') ?  req.user.address[0].street : '',
    address_primary_city:     (typeof req.user.address[0] !== 'undefined') ?  req.user.address[0].city : '',
    address_primary_state:    (typeof req.user.address[0] !== 'undefined') ?  req.user.address[0].state : '',
    address_primary_zip:      (typeof req.user.address[0] !== 'undefined') ?  req.user.address[0].zip : '',

    address_secondary_type:   (typeof req.user.address[1] !== 'undefined') ?  req.user.address[1].type : '',
    address_secondary_street: (typeof req.user.address[1] !== 'undefined') ?  req.user.address[1].street : '',
    address_secondary_city:   (typeof req.user.address[1] !== 'undefined') ?  req.user.address[1].city : '',
    address_secondary_state:  (typeof req.user.address[1] !== 'undefined') ?  req.user.address[1].state : '',
    address_secondary_zip:    (typeof req.user.address[1] !== 'undefined') ?  req.user.address[1].zip : '',
    pgTitle: msg.FN_TITLE("My Profile"),
  })
);

router.post("/profile/update", ensureAuthenticated, (req, res) => {
  
  const { name } = req.body;

  User
  .updateOne({email:req.user.email},{name: name})
  .then((user) => {
    req.flash('success_msg', msg.MSG_UPDATE_SUCCESSFUL);
    res.redirect("/dashboard/profile");
  })
  .catch((err) => console.log(err));

  
 
});

module.exports = router;
