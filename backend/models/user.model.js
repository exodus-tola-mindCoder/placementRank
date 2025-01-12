import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true
    },
    average: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
