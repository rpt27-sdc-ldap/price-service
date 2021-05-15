const request = require('supertest');
const { Sequelize } = require('sequelize');
const app = require('../server/index.js');
const db = require('../database/index.js');

describe('server and database', () => {
  let sequelize;
  beforeAll(() => {
    sequelize = new Sequelize('audible_price', 'root', null, {
      dialect: 'mysql',
      logging: false
    });
    sequelize.sync({ force: true });
  });
  afterAll(() => {
    sequelize.close();
  })

  it('GET /api/price/:bookId', async () => {
    const res = await request('http://localhost:3000').get('/api/price/12');
    expect(res.statusCode).toEqual(200);
    const text = JSON.parse(res.text);
    expect(text).toHaveProperty('book_id');
    expect(text).toHaveProperty('book_title');
    expect(text).toHaveProperty('price');
  });
  it('GET /api/price/:bookTitle', async () => {
    const res = await request('http://localhost:3000').get('/api/price/If%20How%20Lose');
    expect(res.statusCode).toEqual(200);
    const text = JSON.parse(res.text);
    expect(text).toHaveProperty('book_id');
    expect(text).toHaveProperty('book_title');
    expect(text).toHaveProperty('price');
  });
});