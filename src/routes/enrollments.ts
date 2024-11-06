import { Router, Request, Response } from "express";
import { openDb } from "../database";

const router = Router();

// Get all enrollments with student and course details
router.get("/", async (req: Request, res: Response) => {
  const db = await openDb();
  const enrollments = await db.all(`
    SELECT students.id AS student_id, students.name AS student_name, 
           courses.id AS course_id, courses.name AS course_name
    FROM enrollments
    JOIN students ON enrollments.student_id = students.id
    JOIN courses ON enrollments.course_id = courses.id
  `);
  res.json(enrollments);
});

// Enroll a student in a course
router.post("/", async (req: Request, res: Response) => {
  const { student_id, course_id } = req.body;
  const db = await openDb();
  try {
    await db.run("INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)", [
      student_id,
      course_id,
    ]);
    res.status(201).json({ student_id, course_id });
  } catch (error) {
    res.status(400).json({
      error: "Enrollment failed. Student or Course might not exist, or enrollment already exists.",
    });
  }
});

// Get all courses a student is enrolled in
router.get("/student/:student_id", async (req: Request<{ student_id: string }>, res: Response) => {
  const { student_id } = req.params;
  const db = await openDb();
  const courses = await db.all(
    `
    SELECT courses.id, courses.name, courses.description
    FROM enrollments
    JOIN courses ON enrollments.course_id = courses.id
    WHERE enrollments.student_id = ?
  `,
    [student_id]
  );
  res.json(courses);
});

// Get all students enrolled in a course
router.get("/course/:course_id", async (req: Request<{ course_id: string }>, res: Response) => {
  const { course_id } = req.params;
  const db = await openDb();
  const students = await db.all(
    `
    SELECT students.id, students.name, students.age
    FROM enrollments
    JOIN students ON enrollments.student_id = students.id
    WHERE enrollments.course_id = ?
  `,
    [course_id]
  );
  res.json(students);
});

// Unenroll a student from a course
router.delete("/", async (req: Request, res: Response) => {
  const { student_id, course_id } = req.body;
  const db = await openDb();
  const result = await db.run("DELETE FROM enrollments WHERE student_id = ? AND course_id = ?", [
    student_id,
    course_id,
  ]);
  if (result && result.changes && result.changes > 0) {
    res.json({ message: "Enrollment deleted" });
  } else {
    res.status(404).json({ error: "Enrollment not found" });
  }
});

export default router;
