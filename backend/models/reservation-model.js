import mongoose from 'mongoose';

const { Schema } = mongoose;

const reservationSchema = new Schema({
  userid: Number,
  trainid: Number,
});

const ReservationModel = mongoose.model('reservationModel', reservationSchema, 'reservation');

export default ReservationModel;
