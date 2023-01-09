const connection = require("../config/database");
const { allUsers, Userid, UpdateUserById } = require("../services/CRUD");
const getcong = async (req, res) => {
  // let user = [];
  // connection.query("SELECT * FROM Users u ", function (err, results, fields) {
  //   console.log(results); // results contains rows returned by server
  //   user = results;
  //   res.send(JSON.stringify(user));
  // });

  const results = await allUsers();
  console.log(results);
  res.render("nav.ejs", { listusers: results });
};
const create_user = async (req, res) => {
  const { Email, Name, City } = req.body;
  // INSERT INTO Users (email,name,city) VALUES ('test@gmail.com', 'cong', 'hanoi');
  await connection.query(
    `INSERT INTO Users (email,name,city) VALUES (? , ? ,?);`,
    [Email, Name, City]
  );
  console.log(Email, Name, City);

  res.redirect("/");
};
const get_update = async (req, res) => {
  const user_id = await Userid(req.params.id);

  res.render("edit.ejs", { user_id });
};
const edituser = async (req, res) => {
  const { Email, Name, City, Id } = req.body;

  await UpdateUserById(Email, Name, City, Id);
  res.redirect("/");
};

const delete_user = async (req, res) => {
  console.log(req.params.id);
  await connection.query(`  DELETE FROM Users WHERE id=?;`, [req.params.id]);

  res.redirect("/");
};
module.exports = {
  getcong,
  create_user,
  get_update,
  edituser,
  delete_user,
};
