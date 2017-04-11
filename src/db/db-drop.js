import r from 'rethinkdb';
import { getConnection } from './index';
import { TEMPLATES, QUESTIONNAIRES } from '../domain';

const dropTable = conn => tableName => new Promise((resolve, reject) => {
    r.db('test').tableDrop(tableName).run(conn, (err, res) => {
        if (err) return reject(err);

        console.log(`successfully dropped table ${tableName}`);
        resolve(res);
    });
});

getConnection().then((conn) => {
    const dropTableConnected = dropTable(conn);

    Promise.all([
        dropTableConnected(TEMPLATES),
        dropTableConnected(QUESTIONNAIRES),
    ]).then(() => {
        process.exit();
    });
});
