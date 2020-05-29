module.exports = {
  APP_NAME: require("../setup").AppName,
  FN_TITLE: function (part) {
    if (!part) {
      return this.APP_NAME;
    } else {
      return part + " | " + this.APP_NAME;
    }
  },
  MSG_BAD_LOGIN: "Invalid Username or Password",
  MSG_NOT_LOGGED_IN: "Please Sign in",
  MSG_FORM_NOT_FILLED: "All fields are required",
  MSG_PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
  MSG_PASSWORD_POLICY_NOT_MET:
    "Password must be atleast 8 characters in length",
  MSG_EMAIL_IN_USE: "Email is already registered",
  MSG_SUCCESSFUL_REGISTRATION: "You are now registered. Please Login.",
  MSG_UPDATE_SUCCESSFUL: "Update Successful",
  //
  MSG_SUCCESSFUL_SETUP: "Set up Sucessfully"
};
