const mongoose = require("mongoose")
const ornithologySchema = mongoose.Schema({
location : String,
species_spotted: String,
duration_days: Number,
})
module.exports = mongoose.model("ornithology", 
ornithologySchema)