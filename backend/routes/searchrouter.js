import express from 'express';
import mongoFunctions from '../db/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const trainObj = {
    from: req.query.from,
    to: req.query.to,
    minprice: req.query.min,
    maxprice: req.query.max,
  };
  const respObj = {
    found: '',
    error: false,
  };
  if (req.query.from === '' && req.query.to !== '') {
    mongoFunctions.asyncSearchPartialTo(trainObj)
      .then((found) => {
        respObj.found = found;
        // res.send(found);
        res.send(respObj);
      })
      .catch(() => {
        respObj.error = true;
        res.send(respObj);
      });
  } else if (req.query.from !== '' && req.query.to === '') {
    mongoFunctions.asyncSearchPartialFrom(trainObj)
      .then((found) => {
        respObj.found = found;
        // res.send(found);
        res.send(respObj);
      })
      .catch(() => {
        respObj.error = true;
        res.send(respObj);
      });
  } else {
    mongoFunctions.asyncSearchTrain(trainObj)
      .then((found) => {
        respObj.found = found;
        // res.send(found);
        res.send(respObj);
      })
      .catch(() => {
        respObj.error = true;
        res.send(respObj);
      });
  }
});

export default router;
