import Student from "../models/student.js";

export const getStatsController = async (req, res) => {
    try {
        const student = req.student

        // First, we get the total number of students in the same department:
        const totalInDepartment = await Student.countDocuments({ department: student.department });

        // Next, we count how many students have higher scores than the current student in their department:
        const higherScores = await Student.countDocuments({
            department: student.department, score: { $gt: student.averageScore }
        });

        // Finally, we calculate the rank by adding 1 to the number of students with higher scores:
        const rank = higherScores + 1;

        res.status(200).json({ rank, totalInDepartment });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    };
};