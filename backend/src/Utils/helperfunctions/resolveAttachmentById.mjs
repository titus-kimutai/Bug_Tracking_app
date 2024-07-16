import prisma from "../../../prisma/client.mjs";

export const resolveAttachmentById = async (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  try {
    const attachment = await prisma.attachment.findUnique({
      where: { attachment_id: parsedId },
    });

    if (!attachment) return res.sendStatus(404);

    req.attachment = attachment;
    next();
  } catch (error) {
    console.error("Error resolving attachment by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to resolve attachment",
    });
  }
};
