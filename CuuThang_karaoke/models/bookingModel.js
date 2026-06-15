const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true
    },

    roomNumber:{
        type:String,
        required:true
    },

    startTime:{
        type:Date,
        required:true
    },

    endTime:{
        type:Date,
        required:true
    },

    totalAmount:{
        type:Number
    }
});

module.exports = mongoose.model("Booking", bookingSchema);