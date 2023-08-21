import bodyParser from 'body-parser';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './common/errors/not-found-error';
import { errorHandler } from './common/middlewares/error-handler';
import cors from 'cors';
import { indexDashboardRouter } from './routes/v1/dashboard';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);
app.use(express.json());
app.use('/api/v1/dashboard', indexDashboardRouter);
app.all('/', async (req, res) => {
    res.status(200).send('ALL END POINT!');
});

app.all('*', (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };
