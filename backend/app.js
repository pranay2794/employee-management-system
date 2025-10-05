const express = require('express');
const cors = require('cors');
const app=express();
require('dotenv').config();
const dbConnection=require('./config/dbConnection');
dbConnection();
app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/manager',require('./routes/employeeRoutes'));


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

