var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var SoldierSchema = new Schema({
    avatar: String,
    name: String,
    sex: String,
    rank: String,
    startDate: String,
    phone: String,
    email: String,
    superiorID: String,
    superiorName: String,
    directSubordinates: [String]
});

module.exports = mongoose.model("Soldier", SoldierSchema);
