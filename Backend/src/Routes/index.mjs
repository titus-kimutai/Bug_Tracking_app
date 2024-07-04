import { Router } from "express";
import usersRoutes from "./usersRoutes.mjs";
import projectsRoutes from "./projectRoutes.mjs";
import projectMemberRoutes from "./projectMemberRoutes.mjs";
import issueRoutes from "./issueRoutes.mjs";
import commentRoutes from "./commentRoutes.mjs";
import attachmentRoutes from "./attachmentRoutes.mjs";

const router = Router();

router.use("/users", usersRoutes);
router.use("/login", usersRoutes )
router.use("/logout", usersRoutes )
router.use("/projects", projectsRoutes);
router.use("/projectMembers", projectMemberRoutes);
router.use("/issues", issueRoutes);
router.use("/comments", commentRoutes);
router.use("/attachments", attachmentRoutes);

export default router;
