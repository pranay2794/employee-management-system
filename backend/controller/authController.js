const authModel = require('../model/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
dotenv.config();

const registerManager = asyncHandler(async (req, res) => {
    const { name, email, password, department } = req.body;

    // Validate request
    if (!name || !email || !password || !department) {
        res.status(400);
        throw new Error('Please include all fields');
    }

    // Check if manager exists
    const managerExists = await authModel.findOne({ email });
    if (managerExists) {
        res.status(400);
        throw new Error('Manager already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create manager
    const manager = await authModel.create({
        name,
        email,
        password: hashedPassword,
        department
    });

    if (manager) {
        res.status(201).json({_id: manager.id, name: manager.name, email: manager.email, department: manager.department});
    } else {
        res.status(400);
        throw new Error('Invalid manager data');
    }
});

const loginManager = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
        res.status(400);
        throw new Error('Please include all fields');
    }

    // Check if manager exists
    const manager = await authModel.findOne({ email });
    if (!manager) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and manager data
    res.header('Authorization', `Bearer ${token}`);


    res.status(200).json({
        _id: manager.id,
        name: manager.name,
        email: manager.email,
        department: manager.department,
        token
    });
});

const currentManager = asyncHandler(async (req, res) => {
    res.status(200).json(req.manager);
});

module.exports = {
    registerManager,
    loginManager,
    currentManager
};
