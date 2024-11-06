import { Router } from "express";
import { openDb } from "../database";

const router = Router();

// Get all courses
router.get("/", async (req, res) => {
  const db = await openDb();
  const courses = await db.all("SELECT * FROM courses");
  res.json(courses);
});

// Get a single course by ID
router.get("/:id", async (req, res) => {
  const db = await openDb();
  const course = await db.get("SELECT * FROM courses WHERE id = ?", [req.params.id]);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ error: "Course not found" });
  }
});

// Create a new course
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const db = await openDb();
  const result = await db.run("INSERT INTO courses (name, description) VALUES (?, ?)", [
    name,
    description,
  ]);
  res.status(201).json({ id: result.lastID, name, description });
});

// Update a course by ID
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  const db = await openDb();
  const result = await db.run("UPDATE courses SET name = ?, description = ? WHERE id = ?", [
    name,
    description,
    req.params.id,
  ]);
  if (result.changes) {
    res.json({ id: req.params.id, name, description });
  } else {
    res.status(404).json({ error: "Course not found" });
  }
});

// Delete a course by ID
router.delete("/:id", async (req, res) => {
  const db = await openDb();
  const result = await db.run("DELETE FROM courses WHERE id = ?", [req.params.id]);
  if (result.changes) {
    res.json({ message: "Course deleted" });
  } else {
    res.status(404).json({ error: "Course not found" });
  }
});

export default router;
