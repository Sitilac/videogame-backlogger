var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var developerSchema = new mongoose.Schema(
  {
    studio: String,
    director: String,
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Developer", developerSchema);
