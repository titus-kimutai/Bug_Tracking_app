import { checkSchema } from "express-validator";

export const validateAttachmentCreation = checkSchema({
  issue_id: {
    in: ["body"],
    isInt: true,
    notEmpty: true,
    errorMessage: "Issue ID is required and should be an integer",
  },
});
