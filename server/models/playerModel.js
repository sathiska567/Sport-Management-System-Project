const mongoose = require("mongoose")

const palyerSchema = new mongoose.Schema({

      PlayerNo: { type: String, unique: true },
      FirstName: {
            type: String,
            require: [true, "First name is required"]

      },

      LastName: {
            type: String,
            require: [true, "Last name is required"]

      },

      Email: {
            type: String,
            require: [true, "Email is required"]
      },

      Age: {
            type: Number,
            require: [true, "Age is required"]
      },

      Experience: {
            type: String,
            require: [true, "Experience is required"]
      },

      Distric: {
            type: String,
            require: [true, "Distric is required"]
      },

      UserRole: {
            type: String,
            require: [true, "UserRole is required"]
      },

      UserRole: {
            type: String,
            require: [true, "UserRole is required"]
      },

      Status: {
            type: String,
            default: 'pending'

      },

      teams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
      }],

      matches: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match'
      }]

})


const PlayerModel = mongoose.model("Player", palyerSchema)

module.exports = PlayerModel;