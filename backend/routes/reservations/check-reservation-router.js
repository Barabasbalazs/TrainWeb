import express from 'express';
import reservationController from '../../controllers/reservation-controller.js';

const { checkReservation } = reservationController;

const router = express.Router();

router.get('/', (req, res) => checkReservation(req, res));

export default router;
