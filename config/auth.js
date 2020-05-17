const msg = require('./localization/messages.en');
module.exports = {
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', msg.MSG_NOT_LOGGED_IN);
        res.redirect('/users/login');
    }
}