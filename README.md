# Project Management API

## Description

This API allows you to manage projects and payments with features like user authentication, project management, and bulk data import/export.

## Features

- User authentication with JWT
- CRUD operations for projects
- Import and export projects in CSV format
- Simple payment management

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- json2csv
- multer

## Getting Started

1. **Clone the Repository**

   git clone 

2. **Navigate to the Project Directory**

   cd Freelancer_project_management

3. **Install Dependencies**

   npm install

4. **Set Up Environment Variables**

   Create a `.env` file and add your MongoDB connection string and JWT secret:

5. **Start the Server**

   npm start

## API Endpoints

- **Login**: `POST /api/auth/login`
- **Projects**:
  - `GET /api/projects` - Get all projects
  - `POST /api/projects` - Create a new project
  - `PUT /api/projects/:id` - Update a project
  - `DELETE /api/projects/:id` - Delete a project
  - `GET /api/projects/export/csv` - Export projects to CSV
  - `POST /api/projects/import/csv` - Import projects from CSV

## Notes

- Use Postman to test the API.
- Make sure MongoDB is running.

