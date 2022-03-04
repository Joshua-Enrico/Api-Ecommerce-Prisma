const express = require('express');//import express
const cors = require('cors');// import cors
require('dotenv').config();// Set up dotenv

// Importamos los endpoints
const adminRoutes = require('./routes/routesAdmin/admin');
const userSellerRoutes = require('./routes/routesUserSeller/userSeller');
const sellerRoutes = require('./routes/routesSeller/seller');
// Create a new express application instance
const api = express();

// Configure middleware
api.use(express.json());
api.use(cors());

// Test api
api.get('/', (req, res) => {
    res.send('API is running');
})


// Configure routes
api.use('/ecommerce/admin', adminRoutes);
api.use('/ecommerce/userSeller', userSellerRoutes);
api.use('/ecommerce/seller', sellerRoutes);


// Start the server
api.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
})
