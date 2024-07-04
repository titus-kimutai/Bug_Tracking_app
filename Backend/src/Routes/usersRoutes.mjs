import express from "express";
import {
  createUserValidation,
  updateUserValidation,
  loginUserValidation,
} from "../Utils/validations/loginUserValidation.mjs";
import { resolveUserByIndex } from "../utils/helperfunctions/index.mjs";
import {
  // getAllUsers,
  // getUserById,
  createUser,
  // updateUser,
  // partialUpdateUser,
  // deleteUser,
  loginUser,
  logoutUser,
} from "../controllers/usersController.mjs";
import { authenticateJWT } from "../controllers/authController.mjs";

const router = express.Router();

// Declare your routes
router.route("/").get(authenticateJWT, getAllUsers);
router.route("/:id").get(authenticateJWT, resolveUserByIndex, getUserById);
router.route("/").post(createUserValidation, createUser);
router
  .route("/:id")
  .put(updateUserValidation, authenticateJWT, resolveUserByIndex, updateUser);
router
  .route("/:id")
  .patch(
    updateUserValidation,
    authenticateJWT,
    resolveUserByIndex,
    partialUpdateUser
  );
router.route("/:id").delete(authenticateJWT, resolveUserByIndex, deleteUser);

// New routes for login and logout
router.route("/").post(loginUserValidation, loginUser);
router.route("/").post(logoutUser);

export default router;
