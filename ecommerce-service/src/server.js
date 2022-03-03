const express = require('express');//import express
const cors = require('cors');// import cors
require('dotenv').config();// Set up dotenv

// Create a new express application instance
const api = express();

// Configure middleware
api.use(express.json());
api.use(cors());


// Configure routes



// Start the server
api.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
})
