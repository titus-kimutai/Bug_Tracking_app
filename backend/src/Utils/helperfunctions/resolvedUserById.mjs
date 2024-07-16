import prisma from "../../../prisma/client.mjs";

export const resolveUserByIndex = async (req, res, next) => {
  const { user_id } = req.params;
  const parsedId = parseInt(user_id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: parsedId },
    });

    if (!user) return res.sendStatus(404);

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to resolve user",
    });
  }
};
