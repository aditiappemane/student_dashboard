const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get Dashboard Statistics
router.get('/stats', async (req, res) => {
    try {
        // Get total counts
        const totalStudents = await Student.countDocuments();
        const activeStudents = await Student.countDocuments({ status: 'active' });
        const inactiveStudents = await Student.countDocuments({ status: 'inactive' });
        const feePaidStudents = await Student.countDocuments({ feeStatus: 'paid' });
        const feeUnpaidStudents = await Student.countDocuments({ feeStatus: 'unpaid' });

        // Get class-wise data
        const classWiseData = await Student.aggregate([
            {
                $group: {
                    _id: '$class',
                    totalStudents: { $sum: 1 },
                    feePaidStudents: {
                        $sum: { $cond: [{ $eq: ['$feeStatus', 'paid'] }, 1, 0] }
                    }
                }
            },
            {
                $sort: {
                    _id: 1 
                }
            }
        ]);

        // Get sports participation data
        const sportsData = await Student.aggregate([
            { $unwind: '$sports' },
            {
                $group: {
                    _id: '$sports',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    _id: 1 
                }
            }
        ]);

        res.json({
            counts: {
                total: totalStudents,
                active: activeStudents,
                inactive: inactiveStudents,
                feePaid: feePaidStudents,
                feeUnpaid: feeUnpaidStudents
            },
            classWiseData,
            sportsData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 