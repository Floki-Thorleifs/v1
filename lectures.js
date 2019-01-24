const express = require('express');
const util = require('util');
const fs = require('fs');
const items = require('./items.js');

const router = express.Router();

const readFileAsync = util.promisify(fs.readFile);

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function lesaJSON() {
  const file = await readFileAsync('./lectures.json');
  return JSON.parse(file);
}

async function list(req, res) {
  const title = 'Fyrirlestrar';
  const data = await lesaJSON();

  res.render('index', { title, lectures: data.lectures });
}

async function lecture(req, res, next) {
  const { slug } = req.params;
  const lectures = await lesaJSON();

  const foundLecture = lectures.lectures.find(a => a.slug === slug);

  if (!foundLecture) {
    return next();
  }

  const { title } = foundLecture;
  const { category } = foundLecture;
  const html = items.createContent(foundLecture.content);

  return res.render('lecture', {
    title, html, category, lecture: foundLecture,
  });
}

router.get('/:slug', catchErrors(lecture));
router.get('/', catchErrors(list));

module.exports = router;
