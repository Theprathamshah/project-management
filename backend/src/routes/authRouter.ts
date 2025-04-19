import express from 'express';
import { authApiCheck, login, logout, refresh, register } from '../controllers/auth.controller';
import { getAllUsers } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', register);
router.get('/register', authApiCheck);
router.post('/login', login);
router.get('/login', authApiCheck);
router.post('/refresh', refresh);
router.post('/logout', logout);
export default router;
