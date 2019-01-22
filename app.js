const express = require('express');
const path = require('path');
const lectures = require('./lectures.js');
const app = express();
const port = 3000;
const hostname = '127.0.0.1';

 //Use EJS
 app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, 'views'));

 app.get('/', (req, res) => {
    res.render('index', { title: 'Forsíða' });
  });
  
 app.use(express.static(path.join(__dirname, 'public')));


 function notFoundHandler(req, res, next) { /* eslint-disable-line */
    res.status(404).send('404 Not Found');
  }
  
  function errorHandler(err, req, res, next) { /* eslint-disable-line */
    console.error(err);
    res.status(500).send('Villa!');
  }
  
  app.use(notFoundHandler);
  app.use(errorHandler);

 //Lecturelist
 app.use('/', lectures);
 //app.use('/html', lectures);
 //app.use('/css', lectures);
 //app.use('/js', lectures);

 //start server
 app.listen(port, () => {
     console.info('Server running at http://${hostname}:${port}/');
 });/* todo, setja upp express */
