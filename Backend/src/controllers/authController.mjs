import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client.mjs";
import { jwtSecret, jwtExpiresIn } from "../config/config.mjs";

// Register Controller
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.user_id }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
