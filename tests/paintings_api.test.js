/*
  This file contains the tests for the paintings API.
  The tests are used to test the get requests for the paintings API.
  The tests are used to test the following:
    - getting all paintings
    - searching for paintings
    - filtering paintings
    - sorting paintings
    - pagination
*/
const {
  test,
  describe,
  beforeEach,
  afterEach,
  after,
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const importCsvData = require('../utils/importCsv');
const Painting = require('../models/painting'); // Adjust the path as needed

describe('paintings -- get request tests', () => {
  // Ensure fresh test data before each test
  beforeEach(async () => {
    await importCsvData();
  });

  // Clear the data after each test
  afterEach(async () => {
    await Painting.deleteMany({});
  });

  test('paintings are returned as json', async () => {
    const response = await api
      .get('/api/paintings')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all paintings are returned', async () => {
    const response = await api
      .get('/api/paintings')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.total === 16);
  });

  test('pagination works', async () => {
    const response = await api
      .get('/api/paintings?page=1&limit=5')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.paintings.length === 5);
    assert(response.body.total === 16);
  });

  test('search via name is working', async () => {
    const response = await api
      .get('/api/paintings/search?query=gIRL')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.length === 3);

    const contents = response.body.map((painting) => painting.name);

    assert(
      contents.includes(
        'A Girl In The Street, Two Coaches In The Background'
      )
    );
    assert(contents.includes('Girl In The Woods'));
    assert(contents.includes('Girl In White In The Woods'));
  });

  test('search via catalog number is working', async () => {
    const response = await api
      .get('/api/paintings/search?query=173')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.length === 1);

    const contents = response.body.map((painting) => painting.name);

    assert(
      contents.includes('Beach At Scheveningen In Calm Weather')
    );
  });

  test('filter by location is working', async () => {
    const response = await api
      .get('/api/paintings/filter?location=Auvers-Sur-Oise')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.length === 7);
  });

  test('filter by year is working', async () => {
    const response = await api
      .get('/api/paintings/filter?year=1882')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.length === 8);
  });

  test('filter by location and year both is working', async () => {
    const response = await api
      .get('/api/paintings/filter?location=The Hague&year=1881')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.length === 1);
  });

  test('sorting works', async () => {
    const response = await api
      .get('/api/paintings/sort?sort_by=name&order=asc')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const names = response.body.map((painting) => painting.name);
    assert.deepStrictEqual(names, names.sort());
  });
});

// Close the mongoose connection after all tests are done
after(async () => {
  await mongoose.connection.close();
});
