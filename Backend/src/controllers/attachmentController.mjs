// src/controllers/attachmentController.mjs

import prisma from "../../prisma/client.mjs";
import { validationResult, matchedData } from "express-validator";

// Get all attachments
export const getAllAttachments = async (req, res) => {
  try {
    const attachments = await prisma.attachment.findMany();
    res.status(200).json({
      status: "success",
      data: { attachments },
    });
  } catch (error) {
    console.error("Error fetching attachments:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve attachments",
    });
  }
};

// Get attachment by ID
export const getAttachmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const attachment = await prisma.attachment.findUnique({
      where: { attachment_id: parseInt(id) },
    });
    if (!attachment) {
      return res.status(404).json({
        status: "error",
        message: "Attachment not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { attachment },
    });
  } catch (error) {
    console.error("Error fetching attachment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve attachment",
    });
  }
};

// Create a new attachment
export const createAttachment = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No file uploaded",
    });
  }

  try {
    const { issue_id } = req.body;
    const newAttachment = await prisma.attachment.create({
      data: {
        issue_id: parseInt(issue_id),
        file_path: req.file.path,
      },
    });
    res.status(201).json({
      status: "success",
      data: { newAttachment },
    });
  } catch (error) {
    console.error("Error creating attachment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create attachment",
    });
  }
};

// Delete an attachment
export const deleteAttachment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.attachment.delete({
      where: { attachment_id: parseInt(id) },
    });
    res.status(200).json({
      status: "success",
      message: "Attachment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting attachment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete attachment",
    });
  }
};

