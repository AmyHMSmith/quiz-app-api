const db = require("../db");

const createUsers = async (req, res) => {
  const { username, password, email, user_score } = req.body;
  console.log(req.body);
  try {
    const {
      rows: [user],
    } = await db.query(
      "INSERT INTO Users (username, password, email, user_score) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, password, email, user_score]
    );
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUsersById = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [user],
    } = await db.query("SELECT * FROM Users WHERE id = $1", [id]);

    if (!user) {
      return res.status(404).json({ message: `user ${id} does not exist` });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUsers = async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Users");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, user_score } = req.body;

  try {
    const {
      rows: [user],
    } = await db.query(
      "UPDATE Users SET username = $1, password = $2 WHERE id = $3 RETURNING *",
      [username, password, id]
    );

    if (!user) {
      return res.status(404).json({ message: `user ${id} does not exist` });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  let query, params;

  if (username && password) {
    query = `UPDATE Users SET username = $1, password = $2 WHERE id = $3 RETURNING *`;
    params = [username, password, id];
  } else if (username) {
    query = `UPDATE Users SET username = $1 WHERE id = $2 RETURNING *`;
    params = [username, id];
  } else if (password) {
    query = `UPDATE Users SET password = $1 WHERE id = $2 RETURNING *`;
    params = [password, id];
  }

  try {
    const {
      rows: [user],
    } = await db.query(query, params);

    if (!user) {
      return res.status(404).json({ message: `user ${id} does not exist` });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [user],
    } = await db.query(`DELETE FROM Users WHERE id = $1 RETURNING *`, [id]);
    if (!user) {
      return res.status(404).json({ message: `user ${id} does not exist` });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

module.exports = {
  createUsers,
  getUsers,
  getUsersById,
  putUsers,
  updateUsers,
  deleteUsers,
};
