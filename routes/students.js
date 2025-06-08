const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add a new student
router.post('/', async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            class: req.body.class,
            status: req.body.status,
            feeStatus: req.body.feeStatus,
            sports: req.body.sports
        });

        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all unique classes
router.get('/classes', async (req, res) => {
    try {
        const classes = await Student.distinct('class');
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 