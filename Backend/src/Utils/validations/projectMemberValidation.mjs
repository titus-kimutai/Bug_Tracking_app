import { check } from 'express-validator';

export const validateProjectMember = [
  check('project_id')
    .isInt()
    .withMessage('Project ID must be an integer'),
  check('user_id')
    .isInt()
    .withMessage('User ID must be an integer'),
  check('role')
    .isString()
    .withMessage('Role must be a string')
    .isLength({ min: 1 })
    .withMessage('Role cannot be empty'),
];
