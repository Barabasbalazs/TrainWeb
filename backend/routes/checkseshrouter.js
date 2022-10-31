import jwt from 'jsonwebtoken';
import express from 'express';
import secret from '../utils/constants.js';

const router = express.Router();

router.post('/', (req, res) => {
  const respObj = {
    result: '',
  };
  jwt.verify(req.query.auth, secret, (err, payload) => {
    if (payload) {
      respObj.result = payload;
      res.send(payload);
    } else {
      respObj.result = '';
      res.send(respObj);
    }
  });
});

export default router;
