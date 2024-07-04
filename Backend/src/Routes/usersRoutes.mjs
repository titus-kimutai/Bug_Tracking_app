import express from "express";
import {
  createUserValidation,
  updateUserValidation,
} from "../Utils/validations/index.mjs";
import { resolveUserByIndex } from "../Utils/helperfunctions/index.mjs";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  partialUpdateUser,
  deleteUser,
} from "../controllers/usersController.mjs";

const router = express.Router();

// Declare your routes
router.route("/").get(getAllUsers);
router.route("/:id").get(resolveUserByIndex, getUserById);
router.route("/").post(createUserValidation, createUser);
router.route("/:id").put(updateUserValidation, resolveUserByIndex, updateUser);
router
  .route("/:id")
  .patch(updateUserValidation, resolveUserByIndex, partialUpdateUser);
router.route("/:id").delete(resolveUserByIndex, deleteUser);

export default router;
