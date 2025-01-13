const validateTaskData = (data) => {
  const { title, dueDate, status } = data;

  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push("Title is required and must be a valid string.");
  }

  if (!dueDate || isNaN(new Date(dueDate))) {
    errors.push("Due Date must be a valid date.");
  }

  if (!status || !["pending", "completed"].includes(status)) {
    errors.push("Status must be either 'pending' or 'completed'.");
  }

  return errors;
};

module.exports = { validateTaskData };
