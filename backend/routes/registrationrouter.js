import express from 'express';
import pkg from 'crypto-js';
import mongoFunctions from '../db/db.js';

const { SHA256 } = pkg;

const router = express.Router();

const transformPw = (pw) => {
  const hashedPw = SHA256(pw);
  return hashedPw.words;
};

router.post('/', async (req, res) => {
  const respObj = {
    error: false,
    isvalid: '',
  };
  await mongoFunctions.asyncFindUsersWithNames(req.body.name)
    .then((found) => {
      if (found.length === 0) {
        respObj.isvalid = true;
      } else {
        respObj.isvalid = false;
      }
    })
    .catch(() => {
      respObj.error = true;
      res.send(respObj);
    });
  if (respObj.isvalid === true) {
    const hashedPw = transformPw(req.body.pw);
    const userObj = {
      name: req.body.name,
      type: req.body.type,
      pw: hashedPw,
    };
    mongoFunctions.asyncInsertUser(userObj)
      .then(() => {
        res.send(respObj);
      });
  } else if (respObj.isvalid === false) {
    res.send(respObj);
  }
});

export default router;
