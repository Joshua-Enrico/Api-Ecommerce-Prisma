const express = require('express');//import express
const cors = require('cors');// import cors
require('dotenv').config();// Set up dotenv

// Importamos los endpoints
const adminRoutes = require('./routes/routesAdmin/admin');
const userSellerRoutes = require('./routes/routesUserSeller/userSeller');
const sellerRoutes = require('./routes/routesSeller/seller');
const warehouseRoutes = require('./routes/routesWarehouse/warehouse');
const userRoutes = require('./routes/routesUser/user');
const cartRoutes = require('./routes/routesCart/cart');
const productRoutes = require('./routes/routesProduct/product');
const authRoutes = require('./routes/routesAuth/auth');
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
api.use('/ecommerce/warehouse', warehouseRoutes);
api.use('/ecommerce/user', userRoutes);
api.use('/ecommerce/cart', cartRoutes);
api.use('/ecommerce/product', productRoutes);
api.use('/ecommerce/auth', authRoutes);


// Start the server
api.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
})
