import express from 'express';
import trainController from '../../controllers/train-controller.js';

const { insertTrain } = trainController;

const router = express.Router();

router.post('/', (req, res) => insertTrain(req, res));

export default router;
