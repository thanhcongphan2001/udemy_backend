const express = require("express");
const router = express.Router();
const {
  getcong,
  create_user,
  get_update,
  edituser,
  delete_user,
} = require("../controllers/homeController");
router.get("/", getcong);
router.get("/create", (req, res) => {
  res.render("cong.ejs");
});
router.get("/update/:id", get_update);
router.post("/create_user", create_user);
router.post("/edit_user", edituser);

router.post("/delete/:id", delete_user);
module.exports = router;
