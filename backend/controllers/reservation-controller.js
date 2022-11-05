import reservationService from '../services/reservation-service.js';

const { asyncGetReservations, asyncDeleteRes, asyncMakeReservation } = reservationService;

const checkReservation = (req, res) => {
  const respObj = {
    error: false,
    resuser: '',
  };
  asyncGetReservations(req.query.trainId)
    .then((foundres) => {
      respObj.resuser = foundres;
      res.send(respObj);
    })
    .catch(() => {
      respObj.error = true;
      res.send(respObj);
    });
};

const deleteReservation =  (req, res) => {
  const resobj = {
    message: '',
  };
  asyncDeleteRes(req.body.userId, req.body.trainId)
    .then(() => {
      resobj.message = 'Succ';
      res.send(resobj);
    })
    .catch(() => {
      resobj.message = 'Unsuccesfull';
      res.send(resobj);
    });
};

const insertReservation = (req, res) => {
  const idsObj = {
    idUser: req.body.userid,
    id: req.body.trainId,
  };
  const resobj = {
    message: '',
  };
  asyncMakeReservation(idsObj)
    .then(() => {
      resobj.message = 'Succ';
      res.send(resobj);
    })
    .catch(() => {
      resobj.message = 'Unsuccesfull';
      res.send(resobj);
    });
};

export default {
  checkReservation,
  deleteReservation,
  insertReservation,
};
