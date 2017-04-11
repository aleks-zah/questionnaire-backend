import r from 'rethinkdb';
import { getConnection } from './index';
import fs from 'fs';
import { TEMPLATES, QUESTIONNAIRES } from '../domain';

const insertDocumentFromFile = conn => filePath => new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../../${filePath}`, 'utf8', (err, data) => {
        if (err) return reject(err);
        console.log(`File ${filePath} read successfully`);

        r.table(TEMPLATES).insert(JSON.parse(data)).run(conn, (err, res) => {
            if (err) return reject(err);

            console.log(`Inserted template from ${filePath}: `);
            console.log(res);
            resolve(res);
        });
    });
});

getConnection().then((conn) => {
    const createTemplatesTable = new Promise((resolve, reject) => {
        r.db('test').tableCreate(TEMPLATES).run(conn, (err, res) => {
            if (err) return reject(err);
            console.log(`Creating db ${TEMPLATES}: `);
            console.log(res);

            const insertDocument = insertDocumentFromFile(conn);

            Promise.all([
                insertDocument('mock/templates/initial.json'),
                insertDocument('mock/templates/multi-page.json'),
                insertDocument('mock/templates/multi-section.json'),
                insertDocument('mock/templates/multi-components.json'),
            ]).then(resolve).catch(reject);
        });
    });

    const createQuestionnairesTable = new Promise((resolve, reject) => {
        r.db('test').tableCreate(QUESTIONNAIRES).run(conn, (err, res) => {
            if (err) return reject(err);
            console.log(`Creating db ${QUESTIONNAIRES}: `);
            console.log(res);
            resolve(res);
        });
    });

    Promise.all([
        createTemplatesTable,
        createQuestionnairesTable,
    ]).then(() => {
        process.exit();
    });
});

