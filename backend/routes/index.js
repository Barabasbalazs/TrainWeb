import { Router } from 'express';
import loginRouter from './auth/login-router.js';
import registrationRouter from './auth/registration-router.js';
import trainsRouter from './trains/trains-router.js';
import searchTrainRouter from './trains/search-train-router.js';
import insertTrainRouter from './trains/insert-train-router.js';
import deleteTrainRouter from './trains/delete-train-router.js';
import makeReservationRouter from './reservations/make-reservation-router.js';
import checkReservationRouter from './reservations/check-reservation-router.js';
import deleteReservationRouter from './reservations/delete-reservation-router.js';

const router = Router();

// auth endpoints
router.use('/login', loginRouter);
router.use('/register', registrationRouter);

// train endpoints
router.use('/trains', trainsRouter);
router.use('/searchtrain', searchTrainRouter);
router.use('/inserttrain', insertTrainRouter);
router.use('/deletetrain', deleteTrainRouter);

// reservation endpoints
router.use('/makereservation', makeReservationRouter);
router.use('/checkreservation', checkReservationRouter);
router.use('/deletereservation', deleteReservationRouter);

export default router;
