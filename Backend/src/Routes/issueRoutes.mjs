import express from 'express';
import {
  getAllIssues,
  createIssue,
  getIssueById,
  updateIssue,
  partialUpdateIssue,
  deleteIssue,
  resolveIssueById,
} from '../controllers/issueController.mjs';
import {
  validateIssueCreation,
  validateIssueUpdate,
  validateIssuePartialUpdate,
} from '../Utils/validations/issueValidation.mjs';

const router = express.Router();

router.get('/', getAllIssues);
router.post('/', validateIssueCreation, createIssue);
router.get('/:id', resolveIssueById, getIssueById);
router.put('/:id', validateIssueUpdate, updateIssue);
router.patch('/:id', validateIssuePartialUpdate, partialUpdateIssue);
router.delete('/:id', deleteIssue);

export default router;
