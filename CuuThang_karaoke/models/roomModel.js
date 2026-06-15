const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber:{
        type:String,
        required:true,
        unique:true
    },

    capacity:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:["available","occupied","maintenance"],
        default:"available"
    },

    pricePerHour:{
        type:Number,
        required:true
    },

    features:[String]
});

module.exports = mongoose.model("Room", roomSchema);