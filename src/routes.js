// @flow
import { Router } from 'express';
import r from 'rethinkdb';
import { getConnection } from './db';
import { TEMPLATES, QUESTIONNAIRES } from './domain';
import { toRestError } from './errors';

const routes: express$Router = Router();

routes.get('/health', (req: express$Request, res: express$Response, next: express$NextFunction): void => res.end('OK'));

routes.get('/templates', (req: express$Request, res: express$Response, next: express$NextFunction): void => {
    getConnection().then((conn) => {
        r.db('test').table(TEMPLATES).run(conn, (err, cursor) => {
            if (err) return next(toRestError(err));

            cursor.toArray((err, result) => {
                if (err) return next(toRestError(err));

                res.end(JSON.stringify(result, null, 2));
            });
        });
    });
});

routes.get('/templates/:id', (req: express$Request, res: express$Response, next: express$NextFunction): void => {
    getConnection().then((conn) => {
        r.db('test').table(TEMPLATES).filter(r.row('id').eq(req.params.id))
            .run(conn, (err, cursor) => {
                if (err) return next(toRestError(err));

                cursor.next((err, result) => {
                    if (err) return next(toRestError(err));

                    res.end(JSON.stringify(result, null, 2));
                });
            });
    });
});

const updateQuestionnaire = (conn, id, body) => new Promise((resolve, reject) => {
    r.db('test').table(QUESTIONNAIRES).filter(r.row('id').eq(id))
        .update(body)
        .run(conn, (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
});

const createQuestionnaire = (conn, body) => new Promise((resolve, reject) => {
    r.db('test').table(QUESTIONNAIRES)
        .insert(body)
        .run(conn, (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
});

routes.get('/templates/:id/q', (req: express$Request, res: express$Response, next: express$NextFunction): void => {
    getConnection().then((conn) => {
        r.db('test').table(QUESTIONNAIRES).run(conn, (err, cursor) => {
            if (err) return next(toRestError(err));

            cursor.toArray((err, result) => {
                if (err) return next(toRestError(err));

                res.end(JSON.stringify(result, null, 2));
            });
        });
    });
});

routes.get('/templates/:id/q/:qid', (req: express$Request, res: express$Response, next: express$NextFunction): void => {
    getConnection().then((conn) => {
        r.db('test').table(QUESTIONNAIRES).filter(r.row('id').eq(req.params.qid))
            .run(conn, (err, cursor) => {
                if (err) return next(toRestError(err));

                cursor.next((err, result) => {
                    if (err) return next(toRestError(err));

                    res.end(JSON.stringify(result, null, 2));
                });
            });
    });
});

routes.put('/templates/:id/q/:qid', (req: express$Request, res: express$Response, next: express$NextFunction): void => {
    getConnection()
        .then((conn) => {
            r.db('test').table(QUESTIONNAIRES).filter(r.row('id').eq(req.params.qid))
                .run(conn, (err, cursor) => {
                    if (err) return next(toRestError(err));

                    cursor.toArray((err, result) => {
                        if (err) return next(toRestError(err));
                        if (result.length > 0) {

                            updateQuestionnaire(conn, req.params.qid, req.body)
                                .then((result) => {
                                    res.send(JSON.stringify(result, null, 2));
                                })
                                .catch((err) => {
                                    return next(toRestError(err));
                                });
                        } else {
                            createQuestionnaire(conn, req.body)
                                .then((result) => {
                                    res.send(JSON.stringify(result, null, 2));
                                })
                                .catch((err) => {
                                    return next(toRestError(err));
                                });
                        }
                    });
                });
        })
        .catch((err) => {
            return next(toRestError(err));
        });
});

export default routes;
