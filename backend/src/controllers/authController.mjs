import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client.mjs";
import { jwtSecret, jwtExpiresIn } from "../config/config.mjs";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, role },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.user_id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
    res.status(200).json({ message: "User logged in successfully", token, userId: user.user_id,role: user.role, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await prisma.user.findUnique({ where: { user_id: userId } });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
