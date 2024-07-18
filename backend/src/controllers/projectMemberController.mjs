import prisma from "../../prisma/client.mjs";
import { validationResult, matchedData } from "express-validator";


export const assignUserToProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { project_id, user_id, role } = matchedData(req);
    const newProjectMember = await prisma.projectMember.create({
      data: {
        project_id,
        user_id,
        role,
      },
    });

    res.status(201).json({
      status: "success",
      data: { newProjectMember },
    });
  } catch (error) {
    console.error("Error assigning user to project:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to assign user to project",
    });
  }
};

export const getProjectMemberById = async (req, res) => {
  try {
    const { projectMember } = req;
    res.status(200).json(projectMember);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve project',
    });
  }
};



export const getProjectMembers = async (req, res) => {
  try {
    const { project_id } = req.params;
    const projectMembers = await prisma.projectMember.findMany({
      where: { project_id: parseInt(project_id) },
      include: {
        user: true,
        project: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: { projectMembers },
    });
  } catch (error) {
    console.error("Error retrieving project members:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve project members",
    });
  }
};

export const removeUserFromProject = async (req, res) => {
  try {
    const { project_id, user_id } = req.params;
    await prisma.projectMember.deleteMany({
      where: {
        project_id: parseInt(project_id),
        user_id: parseInt(user_id),
      },
    });

    res.status(200).json({
      status: "success",
      message: "User removed from project successfully",
    });
  } catch (error) {
    console.error("Error removing user from project:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to remove user from project",
    });
  }
};
