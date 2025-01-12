const departments = {
    "Computer Science": [],
    "Electrical Engineering": [],
    "Mechanical Engineering": [],
    // Add more departments as needed
};

const addStudent = (name, average, department) => {
    if (!departments[department]) {
        return `Department ${department} does not exist.`;
    }

    const student = { name, average };
    departments[department].push(student);
    departments[department].sort((a, b) => b.average - a.average);

    return `Student ${name} added to ${department} department.`;
};

const getDepartmentRank = (name, department) => {
    if (!departments[department]) {
        return `Department ${department} does not exist.`;
    }

    const students = departments[department];
    const studentIndex = students.findIndex(student => student.name === name);

    if (studentIndex === -1) {
        return `Student ${name} not found in ${department} department.`;
    }

    const rank = studentIndex + 1;
    const betterStudentsCount = studentIndex;
    const totalStudents = students.length;

    return {
        rank,
        betterStudentsCount,
        totalStudents,
    };
};

const suggestDepartment = (average) => {
    let bestDepartment = null;
    let bestRank = Infinity;

    for (const department in departments) {
        const students = departments[department];
        const rank = students.filter(student => student.average > average).length + 1;

        if (rank < bestRank) {
            bestRank = rank;
            bestDepartment = department;
        }
    }

    return bestDepartment;
};

module.exports = {
    addStudent,
    getDepartmentRank,
    suggestDepartment,
};