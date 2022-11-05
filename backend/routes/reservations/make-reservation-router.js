import express from 'express';
import reservationController from '../../controllers/reservation-controller.js';

const { insertReservation } = reservationController;

const router = express.Router();

router.post('/', (req, res) => insertReservation(req, res));

export default router;
