import { Router } from "express";
import projectsRoutes from "./projectRoutes.mjs";
import projectMemberRoutes from "./projectMemberRoutes.mjs";
import issueRoutes from "./issueRoutes.mjs";
import commentRoutes from "./commentRoutes.mjs";
import attachmentRoutes from "./attachmentRoutes.mjs";
import authRoute from "./authRoutes.mjs";

const router = Router();

router.use("/api", authRoute);
router.use("/projects", projectsRoutes);
router.use("/projectMembers", projectMemberRoutes);
router.use("/issues", issueRoutes);
router.use("/comments", commentRoutes);
router.use("/attachments", attachmentRoutes);

export default router;
