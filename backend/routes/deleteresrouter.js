import express from 'express';
import mongoFunctions from '../db/db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const resobj = {
    message: '',
  };
  mongoFunctions.asyncDeleteRes(req.body.userId, req.body.trainId)
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
