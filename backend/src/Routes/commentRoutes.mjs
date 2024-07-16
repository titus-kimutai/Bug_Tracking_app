import express from "express";
import {
  getAllComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
} from "../controllers/commentController.mjs";
import {
  validateCommentCreation,
  validateCommentUpdate,
} from "../Utils/validations/commentValidation.mjs";
import { resolveCommentById } from "../Utils/helperfunctions/resolveCommentById.mjs";

const router = express.Router();

router.param("id", resolveCommentById);

router.get("/", getAllComments);
router.post("/", validateCommentCreation, createComment);
router.get("/:id", resolveCommentById, getCommentById);
router.put("/:id", validateCommentUpdate, updateComment);
router.delete("/:id", deleteComment);

export default router;
