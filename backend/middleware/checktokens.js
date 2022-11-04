/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';

const secret = '4234hdh9ghf38rdnfocnw4';

const checkToken = (req, res, next) => {
  // console.log(req);
  // console.log(req.cookie);
  // next();

  /*
  jwt.verify(req.query.auth, secret, (err, payload) => {
    if (payload) {
      req.signedinuser = payload;
    } else {
      req.signedinuser = '';
    }
  });
  next();
  */
};

export default checkToken;
