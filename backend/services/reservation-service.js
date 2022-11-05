import ReservationModel from '../models/reservation-model.js';

const asyncGetReservations = async (tId) => {
  const all = await ReservationModel.find({ trainid: parseInt(tId, 10) });
  return all;
};

const asyncDeleteRes = async (uid, tid) => {
  await ReservationModel.deleteOne({ userid: uid, trainid: tid });
};

const asyncMakeReservation = async (idsObj) => {
  const newRes = await new ReservationModel({
    userid: idsObj.idUser,
    trainid: idsObj.id,
  });
  await newRes.save((err) => {
    if (err) {
      throw err;
    }
  });
};

export default {
  asyncGetReservations,
  asyncDeleteRes,
  asyncMakeReservation,
};
