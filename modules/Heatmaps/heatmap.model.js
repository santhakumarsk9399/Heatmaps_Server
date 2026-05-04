// models/Zone.js
const mongoose = require("mongoose");

const HeatmapSchema = new mongoose.Schema({
    mall: String,
    floor: String,
    zoneName: String,

    fullImage: String,   
    cropUrl: String,    

    imageW: Number,
    imageH: Number,

    zoneData: Object,
}, { timestamps: true });

module.exports = mongoose.model("Heatmap", HeatmapSchema);