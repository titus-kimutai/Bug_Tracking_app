import prisma from "../../../prisma/client.mjs";

export const resolveCommentById = async (req, res, next, id) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { comment_id: parseInt(id) },
    });
    if (!comment) return res.sendStatus(404);
    req.comment = comment;
    next();
  } catch (error) {
    console.error("Error resolving comment by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to resolve comment",
    });
  }
};
