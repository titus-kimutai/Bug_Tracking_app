import { checkSchema } from "express-validator";

export const validateIssueCreation = checkSchema({
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Title is required and should be a string",
  },
  description: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Description should be a string",
  },
  status: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Status is required and should be a string",
  },
  priority: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Priority is required and should be a string",
  },
  severity: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Severity is required and should be a string",
  },
  project_id: {
    in: ["body"],
    isInt: true,
    notEmpty: true,
    errorMessage: "Project ID is required and should be an integer",
  },
  reporter_id: {
    in: ["body"],
    isInt: true,
    notEmpty: true,
    errorMessage: "Reporter ID is required and should be an integer",
  },
  assignee_id: {
    in: ["body"],
    optional: true,
    isInt: true,
    errorMessage: "Assignee ID should be an integer if provided",
  },
});

export const validateIssueUpdate = checkSchema({
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Title is required and should be a string",
  },
  description: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Description should be a string",
  },
  status: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Status is required and should be a string",
  },
  priority: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Priority is required and should be a string",
  },
  severity: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Severity is required and should be a string",
  },
  project_id: {
    in: ["body"],
    isInt: true,
    notEmpty: true,
    errorMessage: "Project ID is required and should be an integer",
  },
  reporter_id: {
    in: ["body"],
    isInt: true,
    notEmpty: true,
    errorMessage: "Reporter ID is required and should be an integer",
  },
  assignee_id: {
    in: ["body"],
    optional: true,
    isInt: true,
    errorMessage: "Assignee ID should be an integer if provided",
  },
});

export const validateIssuePartialUpdate = checkSchema({
  title: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Title should be a string",
  },
  description: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Description should be a string",
  },
  status: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Status should be a string",
  },
  priority: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Priority should be a string",
  },
  severity: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Severity should be a string",
  },
  project_id: {
    in: ["body"],
    optional: true,
    isInt: true,
    errorMessage: "Project ID should be an integer",
  },
  reporter_id: {
    in: ["body"],
    optional: true,
    isInt: true,
    errorMessage: "Reporter ID should be an integer",
  },
  assignee_id: {
    in: ["body"],
    optional: true,
    isInt: true,
    errorMessage: "Assignee ID should be an integer if provided",
  },
});
