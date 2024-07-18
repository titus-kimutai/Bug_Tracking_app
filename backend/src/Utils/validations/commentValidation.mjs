import { body, param } from 'express-validator';

export const validateCommentCreation = [
  body('issue_id').isInt().withMessage('Issue ID must be an integer'),
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('content').isString().withMessage('Content must be a string'),
];

export const validateCommentUpdate = [
  param('id').isInt().withMessage('Comment ID must be an integer'),
  body('content').isString().withMessage('Content must be a string'),
];
