import mongoose from 'mongoose';
import constants from '../utils/constants.js';

const { passwordToCluster } = constants;

const connectToDb = () => {
  mongoose.connect(`mongodb+srv://Vargabeela:${passwordToCluster}@cluster0.osgnhmn.mongodb.net/trains`, { useNewUrlParser: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to db');
  });
};

export default connectToDb;
