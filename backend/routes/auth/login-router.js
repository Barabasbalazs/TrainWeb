import express from 'express';
import authController from '../../controllers/auth-controller.js';

const { login } = authController;

const router = express.Router();

router.get('/', (req, res) => login(req, res));

export default router;
