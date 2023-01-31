const User = require("../models/user");
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../services/fileService");
const {
  create_customers,
  create_customers_many,
  get_customers,
  put_customers,
  delete_customers,
} = require("../services/Customers");
const {
  CreateProjects,
  getAllProject,
  deleteProject,
  putProject,
} = require("../services/productServices");
const {
  CreateTask,
  GetAllTask,
  DeleteTask,
  PutTask,
} = require("../services/taskServices");
const getUsersAPI = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    EC: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;

  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  const id = req.body.userId;

  let result = await User.deleteOne({
    _id: id,
  });

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const postUploadSingleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let result = await uploadSingleFile(req.files.image);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const postUploadMultipleFilesAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // console.log(req.files);
  //upload single => files is an object
  //upload multiple => files is an array
  if (Array.isArray(req.files.image)) {
    //upload multiple
    let result = await uploadMultipleFiles(req.files.image);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } else {
    //upload single
    return await postUploadSingleFileApi(req, res);
  }
};
const createCumtomers = async (req, res) => {
  const { Name, Addres, Phone, Email, Desscription } = req.body;

  let Imageurl = await uploadSingleFile(req.files.Image);
  console.log(Imageurl);
  let result = {
    Name,
    Addres,
    Phone,
    Email,
    Desscription,
    Image: Imageurl.path,
  };
  // {
  //   Name: {
  //     type: String,
  //     require: true,
  //   },
  //   Address: String,
  //   Phone: String,
  //   Email: String,
  //   Image: String,
  //   Desscription: String,
  // },
  const final = await create_customers(result);
  res.status(200).json({
    EC: 0,
    data: final,
  });
};
const createCumtomersMany = async (req, res) => {
  console.log(req.body.customers);
  const final = await create_customers_many(req.body.customers);
  res.status(200).json({
    EC: 0,
    data: final,
  });
};
const getCumtomers = async (req, res) => {
  let final = "null";
  const limit = req.query.limit;
  const page = req.query.page;
  if (limit && page) {
    final = await get_customers(limit, page, req.query);
  } else {
    final = await get_customers();
  }

  res.status(200).json({
    EC: 0,
    data: final,
  });
};

const putCumtomers = async (req, res) => {
  const { Id, Name, Addres, Phone, Email, Desscription } = req.body;
  const final = await put_customers({
    Id,
    Name,
    Addres,
    Phone,
    Email,
    Desscription,
  });
  res.status(200).json({
    EC: 0,
    data: final,
  });
};
const deleteCumtomers = async (req, res) => {
  const final = await delete_customers(req.body.customersId);
  res.status(200).json({
    EC: 0,
    data: final,
  });
};
const postCreateProjects = async (req, res) => {
  const result = await CreateProjects(req.body);
  res.status(200).json({
    EC: 0,
    data: result,
  });
};
const getAllProjects = async (req, res) => {
  console.log(req.query);
  const result = await getAllProject(req.query);
  res.status(200).json({
    EC: 0,
    data: result,
  });
};
const putProjects = async (req, res) => {
  const result = await putProject(req.body);
  res.status(200).json({
    EC: 0,
    data: result,
  });
};
const deleteProjects = async (req, res) => {
  const result = await deleteProject(req.body.id);
  res.status(200).json({
    EC: 0,
    data: result,
  });
};
const postCreateTask = async (req, res) => {
  const result = await CreateTask(req.body);
  res.status(200).json({
    EC: 0,
    data: result,
  });
};
const getAllTask = async (req, res) => {
  const result = await GetAllTask(req.query);
  res.status(200).json({
    EC: 0,
    data: result,
  });
};
const putTask = async (req, res) => {
  const result = await PutTask(req.body);
  res.status(200).json({
    EC: 0,
    data: result,
  });
};
const deleteTask = async (req, res) => {
  const result = await DeleteTask(req.body.id);
  res.status(200).json({
    EC: 0,
    data: result,
  });
};
module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileApi,
  postUploadMultipleFilesAPI,
  createCumtomers,
  createCumtomersMany,
  getCumtomers,
  putCumtomers,
  deleteCumtomers,
  postCreateProjects,
  getAllProjects,
  putProjects,
  deleteProjects,
  postCreateTask,
  getAllTask,
  putTask,
  deleteTask,
};
