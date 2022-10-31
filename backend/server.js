import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import constants from './utils/constants.js';
import checkToken from './middleware/checktokens.js';
import checkResRouter from './routes/checkresrouter.js';
import regRouter from './routes/registrationrouter.js';
import insertTrainRouter from './routes/inserttrainrouter.js';
import deleteTrainRouter from './routes/deletetrainrouter.js';
import makeReservationRouter from './routes/makereservationrouter.js';
import loginRouter from './routes/loginrouter.js';
import linesRouter from './routes/linesrouter.js';
import searchRouter from './routes/searchrouter.js';
import checSeshRouter from './routes/checkseshrouter.js';
import deleteResRouter from './routes/deleteresrouter.js';

const app = express();

const { frontendOrigin } = constants;

app.use(cookieParser());// cookie parser middleware
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', frontendOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(cors());

app.use(checkToken);

app.use('/', checSeshRouter);
app.use('/lines', linesRouter);
app.use('/searchlines', searchRouter);
app.use('/userdata', loginRouter);
app.use('/mr', makeReservationRouter);
app.use('/checkres', checkResRouter);
app.use('/deleteres', deleteResRouter);
app.use('/register', regRouter);
app.use('/insert', insertTrainRouter);
app.use('/deletetrain', deleteTrainRouter);

app.listen(8080, () => { console.log('Server listening...'); });
