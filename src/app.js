// @flow
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import HTTPStatus from 'http-status';
import cors from 'cors';
import { get } from 'lodash';
import routes from './routes';
import { RestError } from './errors';

const DEFAULT_ERROR_MESSAGE = 'all fucked up';
const app: express$Application = express();

app.disable('x-powered-by');

app.use(logger('dev', {
    skip: (): boolean => app.get('env') === 'test',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req: express$Request, res: express$Response, next: express$NextFunction) => {
    const err: RestError = new RestError('Not Found', { status: HTTPStatus.NOT_FOUND });

    return next(err);
});

// Error handler
app.use((err: ?Error | ?RestError, req: express$Request, res: express$Response, next: express$NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    const message = {
        error: get(err, 'message', DEFAULT_ERROR_MESSAGE),
    };

    res
        .status(get(err, 'status', HTTPStatus.INTERNAL_SERVER_ERROR))
        .send(message);
});

export default app;
