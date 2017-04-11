import request from 'supertest';
import HTTPStatus from 'http-status';
import app from '../src/app';

describe('GET /health', () => {
    it('should render properly', async () => {
        await request(app).get('/').expect(HTTPStatus.OK);
    });
});

describe('GET /list', () => {
    it('should render properly with valid parameters', async () => {
        await request(app)
            .get('/list')
            .query({ title: 'List title' })
            .expect(HTTPStatus.OK);
    });

    it('should error without a valid parameter', async () => {
        await request(app).get('/list').expect(HTTPStatus.INTERNAL_SERVER_ERROR);
    });
});

describe('GET /404', () => {
    it('should return 404 for non-existent URLs', async () => {
        await request(app).get('/404').expect(HTTPStatus.NOT_FOUND);
        await request(app).get('/notfound').expect(HTTPStatus.NOT_FOUND);
    });
});
