import express from "express";
import {
  assignUserToProject,
  getProjectMembers,
  getProjectMemberById,
  removeUserFromProject,
} from "../controllers/projectMemberController.mjs";
import { validateProjectMember } from "../Utils/validations/index.mjs";

const router = express.Router();

router.post("/", validateProjectMember, assignUserToProject);
router.get("/:project_id",getProjectMembers);
router.delete("/:project_id/:id", removeUserFromProject);

export default router;
