import { Router } from 'express';
import { userController } from '../../controllers/v1/index';

const router = Router();

router.post('/register', userController.create);
router.get('/:id', userController.read);
router.put('/', userController.update);
router.delete('/', userController.delete);

export default router;