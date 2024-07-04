import prisma from '../../prisma/client.mjs';
import { validationResult, matchedData } from 'express-validator';

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json({
      status: 'success',
      data: { projects },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve projects',
    });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description } = matchedData(req);
    const newProject = await prisma.project.create({
      data: { name, description },
    });

    res.status(201).json({
      status: 'success',
      data: { newProject },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create project',
    });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { project } = req;
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve project',
    });
  }
};

// Update a project completely (PUT)
export const updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { project_id } = req.params;
    const { name, description } = matchedData(req);
    const updatedProject = await prisma.project.update({
      where: { project_id: parseInt(project_id) },
      data: { name, description },
    });

    res.status(200).json({
      status: 'success',
      data: { updatedProject },
    });
  } catch (error) {
    console.error('Failed to update project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update project',
    });
  }
};

// Partially update a project (PATCH)
export const partialUpdateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { project_id } = req.params;
    const { ...updateData } = matchedData(req);
    const updatedProject = await prisma.project.update({
      where: { project_id: parseInt(project_id) },
      data: updateData,
    });

    res.status(200).json({
      status: 'success',
      data: { updatedProject },
    });
  } catch (error) {
    console.error('Failed to partially update project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to partially update project',
    });
  }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
  try {
    const { project_id } = req.params;
    await prisma.project.delete({
      where: { project_id: parseInt(project_id) },
    });

    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Failed to delete project:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete project',
    });
  }
};
