import { Router } from 'express';
import { getAdminPage, approveSkater } from '../controllers/adminController.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, getAdminPage);
router.post('/approve', authenticate, approveSkater);

export default router;
