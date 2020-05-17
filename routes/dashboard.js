const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const { validateRole } = require("../config/roles");
const router = express.Router();
const msg = require("../config/localization/messages.en");
//router.get("/", (req, res) => res.render("welcome"));

router.get("/", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    name: req.user.name,
    pgTitle: msg.FN_TITLE("Dashboard"),
  })
);
// router.get("/dashboard/manage/roles", ensureAuthenticated, (req, res) =>
//   res.render("dashboard", { name: req.user.name })
// );

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
    pgTitle: msg.FN_TITLE("My Profile"),
  })
);

router.post("/profile/update", ensureAuthenticated, (req, res) => {
  req.flash('success_msg', msg.MSG_UPDATE_SUCCESSFUL);
  res.redirect("/dashboard/profile");
});

module.exports = router;
