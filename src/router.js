const taskController = require("./controllers/taskController");
const { sendResponse } = require("./utils/response");

module.exports = async (req, res) => {
  const urlParts = req.url.split("/");
  const id = urlParts[3]; // Assuming the ID is in the 4th part of the URL

  try {
    if (req.method === "POST" && req.url === "/api/tasks") {
      return taskController.createTask(req, res);
    } else if (req.method === "GET" && req.url.startsWith("/api/tasks")) {
      if (id) {
        return taskController.getTaskById(req, res, id); // Get task by ID
      }
      return taskController.listTasks(req, res); // List all tasks if no ID
    } else if (req.method === "PUT" && id) {
      return taskController.updateTask(req, res, id); // Update task by ID
    } else if (req.method === "DELETE" && id) {
      return taskController.deleteTask(req, res, id); // Delete task by ID
    } else if (req.method === "PATCH" && req.url.endsWith("/complete")) {
      return taskController.markTaskComplete(req, res, id); // Mark task as complete
    } else {
      sendResponse(res, 404, { message: "Route not found" });
    }
  } catch (err) {
    sendResponse(res, 500, { error: "Internal Server Error" });
  }
};
