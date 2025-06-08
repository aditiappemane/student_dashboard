const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');
require('dotenv').config();

const initializeDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student_dashboard', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });

        // Create sample students
        const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
        const sports = ['Cricket', 'Football', 'Volleyball', 'Hockey', 'Kabaddi'];
        
        const students = [];
        
        for (let i = 1; i <= 50; i++) {
            const student = {
                name: `Student ${i}`,
                class: classes[Math.floor(Math.random() * classes.length)],
                status: Math.random() > 0.2 ? 'active' : 'inactive',
                feeStatus: Math.random() > 0.3 ? 'paid' : 'unpaid',
                sports: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
                    sports[Math.floor(Math.random() * sports.length)]
                )
            };
            students.push(student);
        }

        await Student.insertMany(students);

        console.log('Database initialized successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

initializeDb(); 