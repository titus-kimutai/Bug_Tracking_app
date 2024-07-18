import { body } from 'express-validator';

export const createProjectValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required')
];

export const updateProjectValidation = [
  body('name').optional().notEmpty().withMessage('Name is required if provided'),
  body('description').optional().notEmpty().withMessage('Description is required if provided')
];
