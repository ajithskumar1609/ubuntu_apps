const fs = require('fs');
const Tour = require('../Model/tourModel');

const dataImport = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

const importData = async () => {
  try {
    const tour = await Tour.create(dataImport);
    console.log('data loaded in database');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    const tour = await Tour.deleteMany();
    console.log('data all deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//node data/data-import.js --import
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
