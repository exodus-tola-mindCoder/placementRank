import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  intakeCapacity: {
    type: Number,
    required: true
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
  ]
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;