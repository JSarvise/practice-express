import express, { Request, Response, NextFunction } from "express";
import initializeRoute from "./routes/initialize";
import studentsRoute from "./routes/students";
import coursesRoute from "./routes/courses";
import enrollmentsRoute from "./routes/enrollments";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Routes
app.use("/api", initializeRoute); // Initialize or delete database
app.use("/api/students", studentsRoute); // Student CRUD operations
app.use("/api/courses", coursesRoute); // Course CRUD operations
app.use("/api/enrollments", enrollmentsRoute); // Enrollment operations

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the School Management API");
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
