// @flow
import HTTPStatus from 'http-status';

const defaultName = 'RestError';

export class RestError extends Error {
    status: number;

    constructor(message: string, restProps: restPropsT) {
        super(message);

        this.status = restProps.status;
        this.message = message;
        this.name = restProps.name || defaultName;
        if (restProps.stack) {
            this.stack = restProps.stack;
        }
    }
}

export const toRestError = (err: Error): RestError =>
    new RestError(err.message, {
        status: HTTPStatus.INTERNAL_SERVER_ERROR,
        name: err.name,
        stack: err.stack,
    });
