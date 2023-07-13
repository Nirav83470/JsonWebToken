const mongoose = require('mongoose');

      
const Comment = new mongoose.Schema({
      username: {
            type: String
      },
      email: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      gender: { type: String },
      img: { type: String }

});

const user = mongoose.model('projectapi', Comment);

module.exports = user