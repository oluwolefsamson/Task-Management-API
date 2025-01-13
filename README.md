# Task-Management-API

Task Management API
This is a RESTful API for managing tasks. It allows you to create, read, update, and delete tasks. The API is built with Node.js and MongoDB, and it uses MongoDB Atlas for database management. It is designed for efficient task management, with support for task creation, editing, and tracking.

Features
Create Tasks: Add new tasks with titles, descriptions, due dates, and status.
Read Tasks: View all tasks or a specific task by its ID.
Update Tasks: Modify the title, description, due date, and status of a task.
Delete Tasks: Remove tasks from the database.
Mark Tasks as Complete: Mark tasks as completed.
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 14.x or above)
MongoDB Atlas account (for hosting the database)

Getting Started
Follow the steps below to set up and run the project locally.

Step 1: Clone the Repository
Clone the project repository to your local machine:

Step 2: Install Dependencies
Install the necessary dependencies using pnpm:

Step 3: Configure Environment Variables
Create a .env file in the root directory of the project (next to src).

Step 4: Start the Server

## Terminal

Server is running on http://localhost:8000
Connected to MongoDB: taskDB

Step 5: Testing the API
You can now interact with the API by using tools such as Postman or cURL. Below are the available endpoints:

### API Endpoints

1. **Create a Task**

   - **URL**: `POST /api/tasks`
   - **Body**: JSON object with task details (title, description, dueDate, status)

2. **Get All Tasks**

   - **URL**: `GET /api/tasks`
   - **Response**: List of all tasks

3. **Get Task by ID**

   - **URL**: `GET /api/tasks/{id}`
   - **URL Params**: `id` (required) - Task ID
   - **Response**: Task details for the specified ID

4. **Update a Task**

   - **URL**: `PUT /api/tasks/{id}`
   - **URL Params**: `id` (required) - Task ID
   - **Body**: JSON object with updated task details (title, description, dueDate, status)
   - **Response**: Updated task details

5. **Delete a Task**

   - **URL**: `DELETE /api/tasks/{id}`
   - **URL Params**: `id` (required) - Task ID
   - **Response**: Success or error message for task deletion

6. **Mark Task as Complete**
   - **URL**: `PATCH /api/tasks/{id}/complete`
   - **URL Params**: `id` (required) - Task ID
   - **Response**: Success message indicating task is completed

Response:
200 OK if the task was successfully updated
404 Not Found if the task does not exist
400 Bad Request if the body is invalid

5. Delete a Task
   URL: DELETE /api/tasks/{id}
   URL Params:
   id (required): The ID of the task to delete.
   Response:
   200 OK on successful deletion
   404 Not Found if the task does not exist

6. Mark Task as Complete
   URL: PATCH /api/tasks/{id}/complete
   URL Params:
   id (required): The ID of the task to mark as complete.
   Response:
   200 OK if the task is marked as complete
   404 Not Found if the task does not exist

Step 6: Stop the Server
To stop the server, press Ctrl + C in the terminal.

Troubleshooting
"MongoDB URI is missing" error: Make sure that you correctly set the MONGODB_URI in your .env file.
"Route not found" error: Ensure you are making requests to the correct URL and method.
