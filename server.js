const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');

const reportRoutes = require('./server/routes/reports');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.info('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Report = require('./server/models/report');

const data = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf-8'));

Report.collection.remove({});
Report.collection.insertMany(data);

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/reports', reportRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found on server.js");
    error.status = 404;
    next(error);
  });
  
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
});
  
const port = process.env.PORT || 5000;
app.listen(port, () => console.info(`Server started on port ${port}`));