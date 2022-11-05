import express from 'express';
import authController from '../../controllers/auth-controller.js';

const { register } = authController;

const router = express.Router();

router.post('/', (req, res) => register(req, res));

export default router;
