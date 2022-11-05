import express from 'express';
import trainController from '../../controllers/train-controller.js';

const { searchTrain } = trainController;

const router = express.Router();

router.get('/', (req, res) => searchTrain(req, res));

export default router;
