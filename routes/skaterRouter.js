import { Router } from 'express';
import { getProfile, updateProfile, deleteProfile, getAllSkaters } from '../controllers/skaterController.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.post('/update', authenticate, updateProfile);
router.post('/delete', authenticate, deleteProfile); // Ruta para eliminar cuenta
router.get('/', getAllSkaters);

export default router;
