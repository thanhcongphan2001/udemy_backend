const task = require("../models/task");
const aqp = require("api-query-params");
const CreateTask = async (data) => {
  if (data.type == "EMPTY-TASK") {
    let result = await task.create(data);
    return result;
  }
  // if (data.type == "ADD-USERS") {
  //   let projects = await project.findById(data.projectId).exec();
  //   for (let index = 0; index < data.usersArr.length; index++) {
  //     projects.usersInfor.push(data.usersArr[index]);
  //   }
  //   let result = await projects.save();

  //   return result;
  // }
  // if (data.type == "REMOVE-USERS") {
  //   let projects = await project.findById(data.projectId).exec();
  //   for (let index = 0; index < data.usersArr.length; index++) {
  //     projects.usersInfor.pull(data.usersArr[index]);
  //   }
  //   let result = await projects.save();
  //   return result;
  // }
  return null;
};
const GetAllTask = async (data) => {
  console.log("data", data);
  const page = data.page;
  const { filter, limit, populate } = aqp(data);
  delete filter.page;
  console.log("filter", filter);
  let offset = (page - 1) * limit;
  let result = await task
    .find(filter)
    .populate(populate)
    .limit(limit)
    .skip(offset)
    .exec();
  return result;
};
const DeleteTask = async (id) => {
  let result = await task.deleteById(id);
  return result;
};
const PutTask = async (data) => {
  console.log(data);
  const id = data.id;
  let result = await task.updateOne({ _id: id }, { ...data });
  return result;
};
module.exports = {
  CreateTask,
  GetAllTask,
  DeleteTask,
  PutTask,
};
