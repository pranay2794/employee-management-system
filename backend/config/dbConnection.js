const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection=()=>{
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });
    } catch (error) {
        console.error('Error in DB connection', error);
    }
}
module.exports = dbConnection;