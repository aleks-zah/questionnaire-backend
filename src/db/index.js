// @flow
import r from 'rethinkdb';
import cfg from '../config';

let connectionInstance;

export const getConnection = () => new Promise((resolve, reject) => {
    if (typeof connectionInstance === 'undefined') {
        r.connect({ host: cfg('dbHost'), port: cfg('dbPort') }, (err, conn) => {
            if (err) return reject(err);

            connectionInstance = conn;
            resolve(conn);
        });
    } else {
        resolve(connectionInstance);
    }
});
