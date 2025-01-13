const { ObjectId } = require("mongodb");
const { connectDB } = require("../config");

async function create(task) {
  const db = await connectDB();
  task.createdAt = new Date();
  task.updatedAt = new Date();
  const result = await db.collection("tasks").insertOne(task);
  return result.ops[0];
}

async function getAll(query) {
  const db = await connectDB();
  const filter = {};
  if (query.status) filter.status = query.status;

  const sort = {};
  if (query.sortBy) sort[query.sortBy] = query.order === "desc" ? -1 : 1;

  const limit = parseInt(query.limit, 10) || 10;
  const skip = parseInt(query.skip, 10) || 0;

  return db
    .collection("tasks")
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
}

async function getById(id) {
  const db = await connectDB();
  return db.collection("tasks").findOne({ _id: new ObjectId(id) });
}

async function update(id, updates) {
  const db = await connectDB();
  updates.updatedAt = new Date();
  const result = await db
    .collection("tasks")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnOriginal: false }
    );
  return result.value;
}

async function remove(id) {
  const db = await connectDB();
  const result = await db
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

async function markComplete(id) {
  return update(id, { status: "completed" });
}

module.exports = { create, getAll, getById, update, remove, markComplete };
