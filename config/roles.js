module.exports = {
  validateRole: function (role) {
    return function (req, res, next) {
      if (!req.user.role.includes(role)) {
        res.redirect(403,'/dashboard');
     } else {
        next();
      }
    };
  },
};
