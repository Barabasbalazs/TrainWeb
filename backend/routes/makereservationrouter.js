import express from 'express';
import mongoFunctions from '../db/db.js';

const router = express.Router();

router.post('/', (req, res) => {
  // console.log(req.body);
  // this here is hella fishy
  const idsObj = {
    idUser: req.body.userid,
    id: req.body.trainId,
  };
  const resobj = {
    message: '',
  };
  mongoFunctions.asyncMakeReservation(idsObj)
    .then(() => {
      resobj.message = 'Succ';
      res.send(resobj);
    })
    .catch(() => {
      resobj.message = 'Unsuccesfull';
      res.send(resobj);
    });
});

export default router;
