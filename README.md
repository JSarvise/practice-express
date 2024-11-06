🚀 Practice Express API

This repository contains a basic Express.js API created to practice handling API requests and responses. The project utilizes Bruno as the API testing tool, allowing you to simulate and test the API endpoints effectively.

✨ Features

    🛠️ CRUD Operations for Students and Courses — Add, view, update, and delete students and courses.
    📝 Enrollments Management — Manage enrollments by linking students to courses, with endpoints to enroll and unenroll students.
    📋 Database Initialization — Quickly set up or reset the database structure for easy testing and development.
    🔍 Testing with Bruno — All endpoints can be tested using the Bruno API client, providing a clean and user-friendly interface for API testing.
    🚀 Express Fundamentals — A practical introduction to Express.js, perfect for beginners.

🚀 Getting Started
Prerequisites

    Node.js: Ensure that Node.js is installed on your machine.
    Bruno: Install Bruno to test the API endpoints.

Installation

    Clone the Repository:

git clone https://github.com/JSarvise/practice-express.git
cd practice-express

Install Dependencies:

npm install

Run the Server:

    npm start

    This will start the server at http://localhost:3000, and you should see a confirmation message in the terminal.

🧩 API Endpoints
Database Initialization

    GET /api/initialize — Initializes the database and creates the necessary tables.
    GET /api/delete — Deletes all tables, effectively resetting the database (useful for development and testing).

Students

    GET /api/students — Get a list of all students.
    GET /api/students/:id — Retrieve a specific student by ID.
    POST /api/students — Create a new student by providing name and age.
    PUT /api/students/:id — Update a student by ID with new name and age.
    DELETE /api/students/:id — Delete a student by ID.

Courses

    GET /api/courses — Get a list of all courses.
    GET /api/courses/:id — Retrieve a specific course by ID.
    POST /api/courses — Create a new course by providing name and description.
    PUT /api/courses/:id — Update a course by ID with new name and description.
    DELETE /api/courses/:id — Delete a course by ID.

Enrollments

    GET /api/enrollments — Get all enrollments with details of students and courses.
    POST /api/enrollments — Enroll a student in a course by providing student_id and course_id.
    GET /api/enrollments/student/:student_id — Get all courses a specific student is enrolled in.
    GET /api/enrollments/course/:course_id — Get all students enrolled in a specific course.
    DELETE /api/enrollments — Unenroll a student from a course by providing student_id and course_id in the request body.

🧪 Testing with Bruno

You can use Bruno to test the API by creating requests for each endpoint. Set the base URL to http://localhost:3000 and explore the available endpoints to simulate various API operations.
