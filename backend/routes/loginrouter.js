import express from 'express';
import pkg from 'crypto-js';
import jwt from 'jsonwebtoken';
import mongoFunctions from '../db/db.js';
import secret from '../utils/constants.js';

const { SHA256 } = pkg;

const router = express.Router();

const pwValid = (pwfromuser, pwfromdb) => {
  const hashedPw = SHA256(pwfromuser);
  if (hashedPw.words.length !== pwfromdb.length) {
    return false;
  }
  for (let i = 0; i < hashedPw.words.length; i += 1) {
    if (hashedPw.words[i] !== pwfromdb[i]) {
      return false;
    }
  }
  return true;
};

router.get('/', (req, res) => {
  const respobj = {
    token: '',
    error: '',
  };
  mongoFunctions.asyncFindUser(req.query.name)
    .then((user) => {
      if (user.length === 0) {
        respobj.error = 'user';
        res.send(respobj);
      } else if (pwValid(req.query.pw, user.password)) {
        // const token = jwt.sign(`${req.query.name};${user.myownid}`, secret);
        const tmpUserObj = {
          name: req.query.name,
          id: user.myownid,
          type: user.type,
        };
        const token = jwt.sign(tmpUserObj, secret);
        respobj.token = token;
        res.send(respobj);
      } else {
        respobj.error = 'password';
        res.send(respobj);
      }
    })
    .catch(() => {
      respobj.token = '';
      respobj.error = 'other';
      res.send(respobj);
    });
});

export default router;
