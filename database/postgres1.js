const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const generateCSV = () => {
  console.log('Starting CSV generation file');
  writer.pipe(fs.createWriteStream('postgres.csv'));
  for (var i = 0; i < 10000000; i++) {
    writer.write({
      book_id: i,
      book_title: faker.lorem.words(),
      price: faker.finance.amount()
    })
  }
  writer.end();
  console.log(`CSV generated file complete at index: ${i}`);
}

generateCSV();