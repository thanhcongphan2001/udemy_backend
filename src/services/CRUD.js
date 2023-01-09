const connection = require("../config/database");
const allUsers = async () => {
  const [results] = await connection.query("SELECT * FROM Users u ");
  return results;
};
const Userid = async (id) => {
  const [results] = await connection.query(
    `SELECT * FROM Users u where id = ?`,
    [id]
  );
  const user_id = results && results.length > 0 ? results[0] : {};
  return user_id;
};
const UpdateUserById = async (Email, Name, City, Id) => {
  await connection.query(
    `  UPDATE Users 
    SET email = ?,name = ? , city=?
    WHERE id = ?;`,
    [Email, Name, City, Id]
  );
};
module.exports = {
  allUsers,
  Userid,
  UpdateUserById,
};
