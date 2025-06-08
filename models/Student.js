const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    feeStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
    sports: [{
        type: String,
        enum: ['Cricket', 'Football', 'Volleyball', 'Hockey', 'Kabaddi']
    }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema); 