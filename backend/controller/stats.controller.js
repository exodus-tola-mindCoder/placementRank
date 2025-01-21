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