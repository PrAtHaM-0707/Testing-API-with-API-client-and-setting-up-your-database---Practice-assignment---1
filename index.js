const express = require("express");
const app = express();
const port = 3010;

app.use(express.json());

const students = [
  {
    student_id: "1",
    name: "Alice Johnson",
    marks: { math: 85, science: 90, english: 78, history: 88, geography: 92 },
    total: 433,
  },
  {
    student_id: "2",
    name: "Bob Smith",
    marks: { math: 80, science: 85, english: 75, history: 82, geography: 88 },
    total: 410,
  },
  {
    student_id: "3",
    name: "Charlie Davis",
    marks: { math: 70, science: 75, english: 65, history: 72, geography: 78 },
    total: 360,
  },
];

app.post("/students/above-threshold", (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== "number" || threshold < 0) {
    return res
      .status(400)
      .json({
        error: "Invalid threshold value. It must be a positive number.",
      });
  }

  const filteredStudents = students.filter(
    (student) => student.total > threshold
  );

  res.json({
    count: filteredStudents.length,
    students: filteredStudents.map((student) => ({
      name: student.name,
      total: student.total,
    })),
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
