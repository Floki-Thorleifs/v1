const express = require('express');
const path = require('path');
const lectures = require('./lectures.js');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';

//Use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', lectures);

app.get('/', (req, res) => {
    res.render('index', { title: 'Forsíða' });
  });
  
 
 
 function notFoundHandler(req, res, next) { /* eslint-disable-line */
  const title = 'Fannst ekki';
  const message = 'Ó nei, efnið finnst ekki!';
  res.status(404).render('error', { title, message });
}

function errorHandler(err, req, res, next) { /* eslint-disable-line */
  const title = 'Villa kom upp';
  const message = '';
  res.status(500).render('error', { title, message })
}


  app.use(notFoundHandler);
  app.use(errorHandler);

 //Lecturelist

 //start server
 app.listen(port, () => {
     console.info(`Server running at http://${hostname}:${port}/`);
 });
