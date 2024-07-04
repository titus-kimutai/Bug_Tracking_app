// controllers/userController.mjs
import prisma from "../../prisma/client.mjs";
import { validationResult, matchedData } from "express-validator";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve users",
    });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, role } = matchedData(req);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        role,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create user",
    });
  }
};

// Get a single user by id
export const getUserById = async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve user",
    });
  }
};

// Update a user completely (PUT)
export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { username, email, password, role } = matchedData(req);
    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: {
        username,
        email,
        password,
        role,
      },
    });

    res.status(200).json({
      status: "success",
      data: { updatedUser },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};

// Partially update a user (PATCH)
export const partialUpdateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = matchedData(req);

    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json({
      status: "success",
      data: { updatedUser },
    });
  } catch (error) {
    console.error("Error partially updating user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to partially update user",
    });
  }
};

// Delete a user by id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { user_id: parseInt(id) },
    });

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete user",
    });
  }
};
