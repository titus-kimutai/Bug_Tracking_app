import { Router } from 'express';
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  partialUpdateProject,
  deleteProject,
} from '../controllers/projectController.mjs';
import { resolveProjectById } from '../Utils/helperfunctions/resolveProjectById.mjs';
import { createProjectValidation, updateProjectValidation } from '../Utils/validations/index.mjs';

const router = Router();

router.get('/', getAllProjects);

router.post('/', createProjectValidation, createProject);

router.get('/:project_id', resolveProjectById, getProjectById);

router.put('/:project_id', resolveProjectById, updateProjectValidation, updateProject);

router.patch('/:project_id', resolveProjectById, updateProjectValidation, partialUpdateProject);

router.delete('/:project_id', resolveProjectById, deleteProject);

export default router;
