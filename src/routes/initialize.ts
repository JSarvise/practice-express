import { Router } from "express";
import { openDb } from "../database";

const router = Router();

router.get("/initialize", async (req, res) => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      student_id INTEGER,
      course_id INTEGER,
      PRIMARY KEY (student_id, course_id),
      FOREIGN KEY (student_id) REFERENCES students(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );
  `);
  res.send("Database and tables initialized");
});

// Endpoint to delete the database (reset for development purposes)
router.get("/delete", async (req, res) => {
  const db = await openDb();
  await db.exec("DROP TABLE IF EXISTS enrollments, students, courses");
  res.send("Database deleted");
});

export default router;
