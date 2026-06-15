const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');

router.get("/", bookingController.getBookings);
router.get("/add", bookingController.showAddForm);
router.post("/add", bookingController.addBooking);
router.get("/delete/:id", bookingController.deleteBooking);
router.get("/edit/:id", bookingController.showUpdateForm);
router.post("/edit/:id", bookingController.updateBooking);

module.exports = router;