const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

//router.get("/", (req, res) => res.render("welcome"));

router.get("/", ensureAuthenticated, (req, res) =>
  res.render("dashboard", { name: req.user.name })
);
// router.get("/dashboard/manage/roles", ensureAuthenticated, (req, res) =>
//   res.render("dashboard", { name: req.user.name })
// );

router.get("/roles", ensureAuthenticated, (req, res) =>
  res.render("roles", 
  {role: [['User','Group Level Access',true],
    ['Admin','Full access',true],
    ['Team Red','Access to team red resources',false],
    ['Team Blue','Access to team blue resources',false]]
  }
  
  
  )
);

router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("profile", {
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  })
);

module.exports = router;