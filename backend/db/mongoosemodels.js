import mongoose from 'mongoose';

const { Schema } = mongoose;

const lineSchema = new Schema({
  from: String,
  to: String,
  weekday: String,
  hour: String,
  ticketprice: Number,
  traintype: String,
  myownid: Number,
});

const LineModel = mongoose.model('trainModel', lineSchema, 'line');

const UserModel = mongoose.model('userModel', new Schema({
  myownid: Number,
  name: String,
  type: String,
  password: [],
}), 'user');

const ReservationModel = mongoose.model('reservationModel', new Schema({
  userid: Number,
  trainid: Number,
}), 'reservation');

export default { LineModel, UserModel, ReservationModel };
