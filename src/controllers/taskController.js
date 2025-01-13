const { ObjectId } = require("mongodb");
const { connectDB } = require("../config");
const { sendResponse } = require("../utils/response");
const { validateTaskData } = require("../utils/validation");

const createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  if (!title || !dueDate || !status) {
    return sendResponse(res, 400, {
      error: "Title, Due Date, and Status are required.",
    });
  }

  try {
    const db = await connectDB();
    const collection = db.collection("tasks");

    const task = {
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Log the task object for debugging
    console.log("Task to be inserted:", task);

    const result = await collection.insertOne(task);

    // Log the result to ensure insertion
    console.log("Insert result:", result);

    sendResponse(res, 201, {
      message: "Task created successfully",
      taskId: result.insertedId,
    });
  } catch (err) {
    console.error("Error inserting task:", err); // Log the error
    sendResponse(res, 500, { error: "Failed to create task" });
  }
};

const listTasks = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("tasks");
    const tasks = await collection.find().toArray();
    sendResponse(res, 200, tasks);
  } catch (err) {
    sendResponse(res, 500, { error: "Failed to fetch tasks" });
  }
};

const getTaskById = async (req, res, id) => {
  // Validate if the provided ID is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    return sendResponse(res, 400, { error: "Invalid task ID" });
  }

  try {
    const db = await connectDB();
    const collection = db.collection("tasks");

    // Convert the string ID to a MongoDB ObjectId
    const task = await collection.findOne({ _id: new ObjectId(id) });

    if (!task) {
      return sendResponse(res, 404, { error: "Task not found" });
    }

    sendResponse(res, 200, { task });
  } catch (err) {
    console.error("Error fetching task by ID:", err);
    sendResponse(res, 500, { error: "Internal Server Error" });
  }
};

const updateTask = async (req, res, id) => {
  if (!ObjectId.isValid(id)) {
    return sendResponse(res, 400, { error: "Invalid task ID" });
  }

  const { title, description, dueDate, status } = req.body;

  // Validate the input data
  const validationErrors = validateTaskData({ title, dueDate, status });
  if (validationErrors.length > 0) {
    return sendResponse(res, 400, { errors: validationErrors });
  }

  try {
    const db = await connectDB();
    const collection = db.collection("tasks");
    const updatedTask = {
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      updatedAt: new Date(),
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedTask }
    );

    if (result.matchedCount === 0) {
      return sendResponse(res, 404, { error: "Task not found" });
    }

    sendResponse(res, 200, { ...updatedTask, _id: id });
  } catch (err) {
    sendResponse(res, 500, { error: "Failed to update task" });
  }
};

const deleteTask = async (req, res, id) => {
  if (!ObjectId.isValid(id)) {
    return sendResponse(res, 400, { error: "Invalid task ID" });
  }

  try {
    const db = await connectDB();
    const collection = db.collection("tasks");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return sendResponse(res, 404, { error: "Task not found" });
    }

    sendResponse(res, 200, { message: "Task deleted successfully" });
  } catch (err) {
    sendResponse(res, 500, { error: "Failed to delete task" });
  }
};

const markTaskComplete = async (req, res, id) => {
  if (!ObjectId.isValid(id)) {
    return sendResponse(res, 400, { error: "Invalid task ID" });
  }

  try {
    const db = await connectDB();
    const collection = db.collection("tasks");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "completed", updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return sendResponse(res, 404, { error: "Task not found" });
    }

    sendResponse(res, 200, { message: "Task marked as complete" });
  } catch (err) {
    sendResponse(res, 500, { error: "Failed to mark task complete" });
  }
};

module.exports = {
  createTask,
  listTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskComplete,
};
