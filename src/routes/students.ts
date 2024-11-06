import { Router } from "express";
import { openDb } from "../database";

const router = Router();

// Get all students
router.get("/", async (req, res) => {
  const db = await openDb();
  const students = await db.all("SELECT * FROM students");
  res.json(students);
});

// Get a single student by ID
router.get("/:id", async (req, res) => {
  const db = await openDb();
  const student = await db.get("SELECT * FROM students WHERE id = ?", [req.params.id]);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// Create a new student
router.post("/", async (req, res) => {
  const { name, age } = req.body;
  const db = await openDb();
  const result = await db.run("INSERT INTO students (name, age) VALUES (?, ?)", [name, age]);
  res.status(201).json({ id: result.lastID, name, age });
});

// Update a student by ID
router.put("/:id", async (req, res) => {
  const { name, age } = req.body;
  const db = await openDb();
  const result = await db.run("UPDATE students SET name = ?, age = ? WHERE id = ?", [
    name,
    age,
    req.params.id,
  ]);
  if (result && result.changes && result.changes > 0) {
    res.json({ id: req.params.id, name, age });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// Delete a student by ID
router.delete("/:id", async (req, res) => {
  const db = await openDb();
  const result = await db.run("DELETE FROM students WHERE id = ?", [req.params.id]);
  if (result && result.changes && result.changes > 0) {
    res.json({ message: "Student deleted" });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

export default router;
