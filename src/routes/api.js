const express = require("express");
const router = express.Router();
const {
  postUploadSingleFileApi,
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
} = require("../controllers/apiController");

router.post("/singlefile", postUploadSingleFileApi);
router.post("/customers", createCumtomers);
router.get("/customers", getCumtomers);
router.put("/customers", putCumtomers);
router.delete("/customers", deleteCumtomers);
router.post("/customersMany", createCumtomersMany);
router.post("/projects", postCreateProjects);
router.get("/projects", getAllProjects);
router.put("/projects", putProjects);
router.delete("/projects", deleteProjects);

router.post("/task", postCreateTask);
router.get("/task", getAllTask);
router.put("/task", putTask);
router.delete("/task", deleteTask);
module.exports = router;
