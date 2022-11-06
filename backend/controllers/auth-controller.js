import jwt from 'jsonwebtoken';
import pkg from 'crypto-js';
import constants from '../utils/constants.js';
import authService from '../services/auth-service.js';

const { asyncFindUser, asyncFindUsersWithNames, asyncInsertUser } = authService;

const { SHA256 } = pkg;

const { secret } = constants;

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

const transformPw = (pw) => {
  const hashedPw = SHA256(pw);
  return hashedPw.words;
};

const login = (req, res) => {
  const respobj = {
    token: '',
    error: '',
    name: '',
    id: '',
    type: '',
  };
  asyncFindUser(req.query.name)
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
        respobj.name = req.query.name;
        respobj.id = user.myownid;
        respobj.type = user.type;
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
};

const register = async (req, res) => {
  const respObj = {
    error: false,
    isvalid: '',
  };
  await asyncFindUsersWithNames(req.body.name)
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
    asyncInsertUser(userObj)
      .then(() => {
        res.send(respObj);
      });
  } else if (respObj.isvalid === false) {
    res.send(respObj);
  }
};

export default {
  login,
  register,
};
