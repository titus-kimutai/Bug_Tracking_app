import prisma from '../../prisma/client.mjs';
import { validationResult, matchedData } from 'express-validator';

export const getAllIssues = async (req, res) => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        project: true,
        reporter: false,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.status(200).json({
      status: 'success',
      data: { issues },
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve issues',
    });
  }
};

export const createIssue = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, status, priority, severity, project_id, reporter_id, assignee_id } = matchedData(req);
    console.log('Creating issue with data:', { title, description, status, priority, severity, project_id, reporter_id, assignee_id });

    const newIssue = await prisma.issue.create({
      data: {
        title,
        description,
        status,
        priority,
        severity,
        project_id: parseInt(project_id, 10),
        reporter_id: parseInt(reporter_id, 10),
        assignee_id: assignee_id ? parseInt(assignee_id, 10) : null,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { newIssue },
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create issue',
    });
  }
};

export const getIssueById = async (req, res) => {
  const { issue } = req;
  res.status(200).json({
    status: 'success',
    data: { issue },
  });
};

export const updateIssue = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { title, description, status, priority, severity, project_id, reporter_id, assignee_id } = matchedData(req);
    const updatedIssue = await prisma.issue.update({
      where: { issue_id: parseInt(id) },
      data: {
        title,
        description,
        status,
        priority,
        severity,
        project_id,
        reporter_id,
        assignee_id,
      },
    });
    res.status(200).json({
      status: 'success',
      data: { updatedIssue },
    });
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update issue',
    });
  }
};

export const getIssuesByProjectId = async (req, res) => {
  const { projectId } = req.params;

  // Log the projectId to verify its value
  console.log(`Received projectId: ${projectId}`);

  const parsedProjectId = parseInt(projectId, 10);

  // Log the parsedProjectId to verify its value after parsing
  console.log(`Parsed projectId: ${parsedProjectId}`);

  if (isNaN(parsedProjectId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid project ID',
    });
  }

  try {
    const issues = await prisma.issue.findMany({
      where: { project_id: parsedProjectId },
      include: {
        project: true,
        reporter: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });

    if (!issues || issues.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No issues found for the provided project ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: { issues },
    });
  } catch (error) {
    console.error('Error fetching issues by project ID:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve issues by project ID',
    });
  }
};



export const partialUpdateIssue = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = matchedData(req);
    const updatedIssue = await prisma.issue.update({
      where: { issue_id: parseInt(id) },
      data: updateData,
    });
    res.status(200).json({
      status: 'success',
      data: { updatedIssue },
    });
  } catch (error) {
    console.error('Error partially updating issue:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to partially update issue',
    });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.issue.delete({
      where: { issue_id: parseInt(id) },
    });
    res.status(200).json({
      status: 'success',
      message: 'Issue deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting issue:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete issue',
    });
  }
};

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
    console.error('Error resolving issue by ID:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to resolve issue',
    });
  }
};
