import express from "express";
import upload from "../middleware/uploadMiddleware.mjs";
import {
  getAllAttachments,
  getAttachmentById,
  createAttachment,
  deleteAttachment,
} from "../controllers/attachmentController.mjs";
import { resolveAttachmentById } from "../Utils/helperfunctions/resolveAttachmentById.mjs";

const router = express.Router();

router.get("/", getAllAttachments);
router.get("/:id", resolveAttachmentById, getAttachmentById);
router.post("/", upload.single("file"), createAttachment);
router.delete("/:id", deleteAttachment);

export default router;
