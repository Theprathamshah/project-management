import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';

const router = Router();

router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:projectId', getProjectById);
router.put('/:projectId', updateProject);
router.delete('/:projectId', deleteProject);

export default router;
