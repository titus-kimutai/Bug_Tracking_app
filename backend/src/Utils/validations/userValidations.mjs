import { body } from "express-validator";

export const createUserValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("role").notEmpty().withMessage("Role is required"),
];

export const updateUserValidation = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("Username is required if provided"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required if provided"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long if provided"),
  body("role")
    .optional()
    .notEmpty()
    .withMessage("Role is required if provided"),
];
