const supertest = require('supertest');
const app = require('../server/index.js');
const request = supertest(app);


describe('Price Server', () => {
  it('serves the public folder', async (done) => {
    const res = await request.get('/')

    expect(res.status).toBe(200);
    expect(res.type).toEqual('text/html');

    done();
  });
});
