import prisma from "../../prisma/client.mjs";

export const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        issue: true,
        user: true,
      },
    });
    res.status(200).json({
      status: "success",
      data: { comments },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve comments",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { issue_id, user_id, content } = req.body;
    const newComment = await prisma.comment.create({
      data: {
        issue_id,
        user_id,
        content,
      },
    });
    res.status(201).json({
      status: "success",
      data: { newComment },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create comment",
    });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({
      where: { comment_id: parseInt(id) },
      include: {
        issue: true,
        user: true,
      },
    });
    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { comment },
    });
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve comment",
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await prisma.comment.update({
      where: { comment_id: parseInt(id) },
      data: { content },
    });
    res.status(200).json({
      status: "success",
      data: { updatedComment },
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update comment",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { comment_id: parseInt(id) },
    });
    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete comment",
    });
  }
};
