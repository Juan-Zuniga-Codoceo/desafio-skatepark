import { Router } from 'express';
import { getProfile, updateProfile, getAllSkaters } from '../controllers/skaterController.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.post('/update', authenticate, updateProfile);
router.get('/', getAllSkaters);

export default router;
