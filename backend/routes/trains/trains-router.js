import express from 'express';
import mongoFunctions from '../db/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const respObj = {
    lines: '',
  };
  mongoFunctions.asyncGetAll()
    .then((trains) => {
      respObj.lines = trains;
      respObj.error = false;
      res.send(respObj);
    })
    .catch(() => {
      respObj.error = true;
      res.send(respObj);
    });
});

export default router;
