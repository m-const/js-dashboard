const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  rolename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  system: {
    type: Boolean,
    required: true,
    default: false;
  }
});

const Role = mongoose.model('Role',RoleSchema);

module.exports = Role;