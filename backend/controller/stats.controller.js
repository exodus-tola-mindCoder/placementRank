import Student from "../models/student.js";

export const getStats = async (req, res) => {
    try {
        const { department, averageScore } = req.student;

        // First, we get the total number of students in the same department:
        const totalInDepartment = await Student.countDocuments({ department });

        // Next, we count how many students have higher scores than the current student in their department:
        const higherScores = await Student.countDocuments({
            department, averageScore: { $gt: averageScore }
        });

        // Finally, we calculate the rank by adding 1 to the number of students with higher scores:
        const rank = higherScores + 1;

        res.status(200).json({ totalInDepartment, higherScores, rank });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });

    };
};

export const getDepartmentStats = async (req, res) => {
    try {
        const student = req.student;
        const { department } = req.params;

        // First, we get the total number of students in the same department:

        const totalInDepartment = await Student.countDocuments({ department });

        // Next, we count how many students have higher scores than the current student in their department:

        const higherScores = await Student.countDocuments({
            department, averageScore: { $gt: student.averageScore }
        });

        // Finally, we calculate the rank by adding 1 to the number of students with higher scores:
        const rank = higherScores + 1;

        // Get department capacity

        const departmentCapacities = {
            'Software Engineering': 100,
            'Computer Science': 100,
            'Information Technology': 100,
            'Information Systems': 100,
            'Electrical Engineering': 100,
            'Mechanical Engineering': 60,
            'Civil Engineering': 120,
            'Chemical Engineering': 80,
            'Medicine': 150,
            'pharmacy': 100,
            'Nursing': 100,
            'Information Science': 100,
            'Doctor of Veternary Medicine': 50,
            'Medical Laboratory Science': 100,
            'Public Health': 100,
            'midwifery': 100,
            'law': 100,
        };

        // Get the number of students in the department
        const departmentCapacity = departmentCapacities[department];
        // probablity of admission

        const probablity = rank <= departmentCapacity ? "High" : rank <= departmentCapacity * 2 ? "Medium" : "Low";

        res.send({
            department,
            totalInDepartment,
            higherScores,
            rank,
            departmentCapacity,
            probablity
        });
    
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}