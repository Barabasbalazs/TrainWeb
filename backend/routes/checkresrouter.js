import express from 'express';
import mongoFunctions from '../db/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const respObj = {
    error: false,
    resuser: '',
  };
  mongoFunctions.asyncGetReservations(req.query.trainId)
    .then((foundres) => {
      respObj.resuser = foundres;
      res.send(respObj);
    })
    .catch(() => {
      respObj.error = true;
      res.send(respObj);
    });
});

export default router;
