import prisma from '../../prisma/client.mjs';
import { validationResult, matchedData } from 'express-validator';

// Get all issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        project: true,
        reporter: true,
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

// Create new issue
export const createIssue = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, status, priority, severity, project_id, reporter_id, assignee_id } = matchedData(req);
    const newIssue = await prisma.issue.create({
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

// Get issue by ID
export const getIssueById = async (req, res) => {
  const { issue } = req;
  res.status(200).json({
    status: 'success',
    data: { issue },
  });
};

// Update issue
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

// Partially update issue
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

// Delete issue
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

// Resolve issue by ID middleware
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
