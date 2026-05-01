import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Mongo connection error:", error));

function getUsers(name, job) {
  const query = {};

  if (name !== undefined) {
    query.name = name;
  }

  if (job !== undefined) {
    query.job = job;
  }

  return userModel.find(query);
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name });
}

function findUserByJob(job) {
  return userModel.find({ job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};