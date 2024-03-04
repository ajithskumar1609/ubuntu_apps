const fs = require('fs');
const superAgent = require('superagent');
const promise = require('promise');
const { resolve } = require('path');

const readFilePro = (file) => {
  return new promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not found the file');
      resolve(data);
    });
  });
};
const writeFilePro = (fileName, data) => {
  return new promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject(err);
      resolve('I could write the file');
    });
  });
};

const getDogImage = async () => {
  // read file
  try {
    const data = await readFilePro(`${__dirname}/dog-breed.txt`);
    console.log(`Dog Breed:${data}`);

    const res1 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await promise.all([res1, res2, res3]);
    console.log(all);
    const img = all.map((el) => el.body.message);
    //console.log(res.body.message);
    await writeFilePro('dog-image', img.join('\n'));
    console.log('image uploaded');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2:Ready';
};

(async () => {
  try {
    console.log('1 : get the dog image');
    const image = await getDogImage();
    console.log(image);
    console.log('3: find the image');
  } catch (err) {
    console.log('Error');
  }
})();

// console.log('1 : get the dog image');
// getDogImage()
//   .then((x) => {
//     console.log(x);
//     console.log('3: find the image');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// .catch((err) => {
//   //console.log(err);
// });
// readFilePro(`${__dirname}/dog-breed.txt`)
//   .then((data) => {
//     console.log(`Dog Breed:${data}`);
//     return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
// .then((res) => {
//   console.log(res.body.message);
//   return writeFilePro('dog-image', res.body.message);
// })
// .then((res) => {
//   console.log(res);
// })
// // fs.writeFile('dog-image', res.body.message, (err) => {
// //   if (err) return console.log(err);
// //   console.log('file uploaded');
// // });
// .catch((err) => {
//   console.log(err);
// });
