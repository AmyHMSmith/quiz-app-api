const express = require("express");

const {
  createUsers,
  getUsers,
  getUsersById,
  putUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users");

const userRouter = express.Router();

userRouter.route("/").post(createUsers).get(getUsers);

userRouter
  .route("/:id")
  .get(getUsersById)
  .put(putUsers)
  .patch(updateUsers)
  .delete(deleteUsers);

module.exports = userRouter;
