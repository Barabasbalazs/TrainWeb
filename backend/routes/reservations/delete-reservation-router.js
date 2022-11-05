import express from 'express';
import reservationController from '../../controllers/reservation-controller.js';

const { deleteReservation } = reservationController;

const router = express.Router();

router.post('/', (req, res) => deleteReservation(req, res));

export default router;
