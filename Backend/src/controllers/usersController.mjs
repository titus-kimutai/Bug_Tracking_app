import prisma from "../../prisma/client.mjs";
import { validationResult, matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // For hashing passwords

const secretKey = "supersecretkey"; // Use a secure key for signing JWTs

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.user_id, username: user.username, role: user.role },
    secretKey,
    { expiresIn: "1h" }
  );
};

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Helper function to compare passwords
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

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

// Create a new user (Register)
export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, role } = matchedData(req);

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
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

// Login User
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = matchedData(req);
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to login user",
    });
  }
};

// User logout
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
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
    const hashedPassword = await hashPassword(password);
    const updatedUser = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: {
        username,
        email,
        password: hashedPassword,
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

    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

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
