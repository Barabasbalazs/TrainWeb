import express from 'express';
import mongoFunctions from '../db/db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const respObj = {
    error: false,
  };
  mongoFunctions.asyncInsertTrain(req.body)
    .then(() => {
      res.send(respObj);
    })
    .catch(() => {
      respObj.error = true;
      res.send(respObj);
    });
});

export default router;
