import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import constants from './utils/constants.js';
import router from './routes/index.js';
import connectToDb from './services/db-service.js';

const app = express();

const { frontendOrigin } = constants;

app.use(cookieParser());// cookie parser middleware
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', frontendOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

connectToDb();

// app.use(cors());

// app.use(checkToken);

app.use('/', router);

app.listen(8080, () => { console.log('Server listening...'); });
