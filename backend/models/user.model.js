import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    score: {
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
