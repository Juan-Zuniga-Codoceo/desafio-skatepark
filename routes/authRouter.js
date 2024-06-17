import { Router } from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = Router();

router.get('/register', (req, res) => res.render('registro'));
router.post('/register', register);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', login);

router.get('/logout', logout);

export default router;
