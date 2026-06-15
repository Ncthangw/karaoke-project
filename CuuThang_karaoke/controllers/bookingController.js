const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

//GET ALL BOOKINGS
exports.getBookings = async (req, res) => {
    try{
        const bookings = await Booking.find();

        res.render("booking", {bookings});
    }catch (error){
        res.send(error.message);
    }
}

//SHOWADDFORM
exports.showAddForm = async(req, res) => {
    try{
        const rooms = await Room.find();
        res.render("bookRoom", {
            rooms
        });
    }catch (error){
        res.send(error.message);
    }
};

//CREATE
exports.addBooking = async (req, res) => {
    try{
        console.log(req.body);
        const {customerName, roomNumber, startTime, endTime} = req.body;

        const room = await Room.findOne({roomNumber});
        
        if (!room){
            return res.send("Room doesn't exist !!!");
        }

        const hours = (new Date(endTime) - new Date(startTime))/ (1000 * 60 * 60);
        const totalAmount = hours * room.pricePerHour;

        const booking = new Booking({
            customerName,
            roomNumber,
            startTime,
            endTime,
            totalAmount
        });

        await booking.save();
        res.redirect("/bookings");
    }catch (error){
        res.send(error.message);
    };
}

//DELETE
exports.deleteBooking = async (req, res) => {
    try{
        const bookingId = req.params.id;

        await Booking.findByIdAndDelete(bookingId);
        res.redirect("/bookings");
    }catch (error){
        res.send(error.message);
    }
};

//ShowUpdateForm
exports.showUpdateForm = async (req, res) => {
    try{
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId)
        const rooms = await Room.find();

        res.render("updateRoom", {
            booking,
            rooms
        });
    }catch (error){
        res.send(error.message);
    }
}

//UPDATE BOOKING
exports.updateBooking = async (req, res) => {
    try{
        const bookingId = req.params.id;
        const {
            customerName,
            roomNumber,
            startTime,
            endTime
        } = req.body;

        //Find room
        const room = await Room.findOne({
            roomNumber
        });

        if (!room){
            return res.send("Room doesn't exist !!!");
        }

        //Tinh so gio thue
        const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);

        //Tinh tong so tien
        const totalAmount = hours * room.pricePerHour

        //Update
        await Booking.findByIdAndUpdate(bookingId, {
            customerName,
            roomNumber,
            startTime,
            endTime,
            totalAmount
        });

        res.redirect("/bookings");
    }catch (error){
        res.send(error.message);
    }
};