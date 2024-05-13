# Todo App

## Introduction

This document outlines the Todo App project, a collaborative effort designed to create a user-friendly and efficient task management application.

### Timeline

This project is designed to be completed within a one-week timeframe.

### Team Structure

Each team will consist of 3 interns working collaboratively to achieve the project goals.

### Task Prioritization

All tasks have been pre-assigned priorities to ensure the most critical aspects of the application are completed first.

### Github

Each team will utilize a Git branching model with two develop branches (develop1, develop2) to facilitate development and integration.

## Backend API Specifications (FastAPI)

| Priority | Endpoint                                   | Description                                     |
| -------- | ------------------------------------------ | ----------------------------------------------- |
| P1       | POST /api/register                         | Register a new user with username and password. |
| P1       | POST /api/login                            | Authenticate user and generate JWT token.       |
| P3       | POST /api/reset-password                   | Reset user password by sending a reset link.    |
| P1       | GET /api/tasks                             | Retrieve all tasks for the authenticated user.  |
| P1       | POST /api/tasks                            | Create a new task.                              |
| P1       | GET /api/tasks/{task_id}                   | Retrieve details of a specific task.            |
| P1       | PUT /api/tasks/{task_id}                   | Update an existing task.                        |
| P1       | DELETE /api/tasks/{task_id}                | Delete a task.                                  |
| P2       | GET /api/users/{user_id}/tasks             | Retrieve tasks for a specific user.             |
| P2       | POST /api/tasks/{task_id}/assign/{user_id} | Assign a task to a specific user.               |
| P2       | POST /api/tasks/{task_id}/complete         | Mark a task as completed.                       |

## Frontend Screens (React.js)

| Priority | Screen                    | Description                                                                                                                                                       |
| -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | Login Screen              | Username input field, Password input field, Login button, Link to password reset screen.                                                                          |
| P1       | Registration Screen       | Username input field, Email input field, Password input field, Confirm password input field, Register button.                                                     |
| P1       | Password Reset Screen     | Email input field, Reset password button.                                                                                                                         |
| P1       | Home Screen               | List of tasks displayed with title, description, due date, and completion status, Button to add a new task, Button to edit each task, Button to delete each task. |
| P1       | Task Creation/Edit Screen | Title input field, Description input field, Due date input field, Assignee input field (if applicable), Completion status toggle, Save button, Cancel button.     |
| P2       | User Tasks Screen         | List of tasks assigned to the logged-in user, Ability to filter tasks by status (e.g., completed, pending).                                                       |
| P2       | User Profile Screen       | Display user profile information, Option to update profile details.                                                                                               |
| P3       | Task Assignment Screen    | List of team members with checkboxes to assign tasks, Button to confirm task assignment.                                                                          |
| P3       | Task Completion Screen    | List of tasks with checkboxes to mark as completed, Button to confirm task completion.                                                                            |

## Technical Requirements

### Backend (FastAPI)

- FastAPI for RESTful APIs.
- JWT authentication.
- SQLAlchemy ORM.
- Alembic for migrations.
- Secure endpoints with middleware.

### Frontend (React.js)

- React.js for UI.
- Redux Toolkit for state.
- React Router for navigation.
- Form validation with Formik or React Hook Form.
- Axios or Fetch for HTTP requests.
- Implement UI components with Flowbite for styling and layout: https://flowbite-react.com

### Database:

- Postgres.
- Simple schema for users and tasks.

### Version Control (Git):

- Utilize Git for version control and collaborative development.
- Follow Git best practices for branching, committing, and merging code changes.
