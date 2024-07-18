import prisma from "../../../prisma/client.mjs";

export const resolveIssueById = async (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  try {
    const issue = await prisma.issue.findUnique({
      where: { issue_id: parsedId },
      include: {
        project: true,
        reporter: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });

    if (!issue) return res.sendStatus(404);

    req.issue = issue;
    next();
  } catch (error) {
    console.error("Error resolving issue by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to resolve issue",
    });
  }
};
