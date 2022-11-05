import express from 'express';
import trainController from '../../controllers/train-controller.js';

const { getEveryTrain } = trainController;

const router = express.Router();

router.get('/', (req, res) => getEveryTrain(req, res));

export default router;
