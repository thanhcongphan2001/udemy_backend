const project = require("../models/project");
const aqp = require("api-query-params");
const CreateProjects = async (data) => {
  if (data.type == "EMPTY-PROJECT") {
    let result = await project.create(data);
    return result;
  }
  if (data.type == "ADD-USERS") {
    let projects = await project.findById(data.projectId).exec();
    for (let index = 0; index < data.usersArr.length; index++) {
      projects.usersInfor.push(data.usersArr[index]);
    }
    let result = await projects.save();

    return result;
  }
  if (data.type == "REMOVE-USERS") {
    let projects = await project.findById(data.projectId).exec();
    for (let index = 0; index < data.usersArr.length; index++) {
      projects.usersInfor.pull(data.usersArr[index]);
    }
    let result = await projects.save();
    return result;
  }
  if (data.type == "ADD-TASKS") {
    let projects = await project.findById(data.projectId).exec();
    for (let index = 0; index < data.taskArr.length; index++) {
      projects.tasks.push(data.taskArr[index]);
    }
    let result = await projects.save();

    return result;
  }
  return null;
};
const getAllProject = async (data) => {
  console.log("data", data);
  const page = data.page;
  const { filter, limit, population } = aqp(data);
  delete filter.page;
  console.log("filter", filter);

  let offset = (page - 1) * limit;
  let result = await project
    .find(filter)
    .populate(population)
    .limit(limit)
    .skip(offset)
    .exec();
  return result;
};
const deleteProject = async (id) => {
  let result = await project.deleteById(id);
  return result;
};
const putProject = async (data) => {
  const id = data.id;
  let result = await project.updateOne({ _id: id }, { ...data });
  return result;
};
module.exports = {
  CreateProjects,
  getAllProject,
  deleteProject,
  putProject,
};
