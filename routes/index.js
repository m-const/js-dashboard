const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

router.get("/", (req, res) => res.render("welcome"));

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", { name: req.user.name })
);
router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("profile", { 
    name: req.user.name, 
    email: req.user.email,
    role: req.user.role
  })
);

module.exports = router;
