import express from 'express';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

import './database';

import Router from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/',
//   })
// );

//routes
app.use(Router);

app.listen(3000);
console.log('Server on port', 3000);
