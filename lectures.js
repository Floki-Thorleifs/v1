const express = require('express');
const util = require('util');
const fs = require('fs');
const lectures = require('./lectures.json');
const items = require('./items.js');

const router = express.Router();

const readFileAsync = util.promisify(fs.readFile);

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

//bua til fall sem les lectures.json af disk (async)
//@returns {Promise}
async function lesaJSON() {
  file = await readFileAsync('./lectures.json');
  return JSON.parse(file);
  
}

async function list(req, res) {
  const title = 'Fyrirlestrar';
  const data = await lesaJSON();

  res.render('index', {title, lectures : data.lectures});
}

async function lecture(req, res, next) {
  /* todo útfæra */
  const { slug } = req.params;
  const lectures = await lesaJSON();

  const foundLecture = lectures.lectures.find(a => a.slug === slug);

  if (!foundLecture) {
    // hér væri líka hægt að skila 404 þar sem við erum að meðhöndla allt
    // með `:/slug`
    return next();
  }

  const { title } = foundLecture;
  const { category } = foundLecture;
  const html = items.createContent(foundLecture.content);


  res.render('lecture', { title, html, category, lecture: foundLecture });
  //Lesa fyrirlestrana inn og birta.
}
 
router.get('/:slug', catchErrors(lecture));
router.get('/', catchErrors(list));


module.exports = router;