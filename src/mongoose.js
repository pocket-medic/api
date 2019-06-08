/* eslint-disable no-console */
const mongoose = require('mongoose');

const client = function (app) {
  mongoose.connect(
    `${app.get('mongodb')}?authSource=admin`,
    { useCreateIndex: true, useNewUrlParser: true, user: 'root', pass: 'example'  }
  );
  mongoose.Promise = global.Promise;

  // Connected handler
  mongoose.connection.on('connected', function () {
    console.log('Connected to DB using: ' + app.get('mongodb'));
  });

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.log(err);
  });

  app.set('mongooseClient', mongoose);
};

module.exports = client;