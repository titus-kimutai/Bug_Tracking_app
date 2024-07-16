import prisma from "../../../prisma/client.mjs";

export const resolveProjectById = async (req, res, next) => {
  const { project_id } = req.params;
  const parsedId = parseInt(project_id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  try {
    const project = await prisma.project.findUnique({
      where: { project_id: parsedId },
    });

    if (!project) return res.sendStatus(404);

    req.project = project;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to resolve project",
    });
  }
};
