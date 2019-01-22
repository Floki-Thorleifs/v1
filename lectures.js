const express = require('express');
const util = require('util');
const fs = require('fs');

const router = express.Router();

const readFilePromise = util.promisify(fs.readFile);

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

//bua til fall sem les lectures.json af disk (async)
async function lesaJSON() {
  const file = await readFile('./lectures.json');

  const json = JSON.parse(file)

  return json;
}

async function list(req, res) {
  const title = 'Fyrirlestrar';
  const data = await lesaJSON;
  const { lectures } = data;

  res.render('lectures', (title, lectures))
  //res.send('lectures');
}

async function lecture(req, res, next) {
  /* todo útfæra */
  //Lesa fyrirlestrana inn og birta.
}
 
router.get('/', catchErrors(list));
router.get('/html', catchErrors(list));
router.get('/css', catchErrors(list));
router.get('/js', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;