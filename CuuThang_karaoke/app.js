const express = require('express');
const bodyParser = require('body-parser')
const connectDB = require('./config/db');

const bookingRoute = require('./routes/bookingRoutes');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Config EJS
app.set("view engine", "ejs");


// Kết nối MongoDB
connectDB();

// Routes
app.use("/bookings", bookingRoute);

//Home Page
app.get("/", (req, res) => {
    res.redirect("/bookings");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});