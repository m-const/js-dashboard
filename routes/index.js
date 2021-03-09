/*
Landing Page
*/

const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

const msg = require("../config/localization/messages.en");
router.get("/", (req, res) =>
  res.render("welcome", { 
      layout: "layout_simple", 
      pgTitle: msg.FN_TITLE() 
    })
);

module.exports = router;
