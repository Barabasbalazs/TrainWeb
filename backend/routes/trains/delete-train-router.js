import express from 'express';
import trainController from '../../controllers/train-controller.js';

const { deleteTrain } = trainController;

const router = express.Router();

router.post('/', (req, res) => deleteTrain(req, res));

export default router;
