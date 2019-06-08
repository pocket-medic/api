/* eslint-disable no-console */
const mongoose = require('mongoose');

const accounts = function (app) {
  mongoose.connect(
    `${app.get('mongodb-accounts')}?authSource=admin`,
    { useCreateIndex: true, useNewUrlParser: true, user: 'root', pass: 'example'  }
  );
  mongoose.Promise = global.Promise;

  // Connected handler
  mongoose.connection.on('connected', function () {
    console.log("Connected to DB using chain: " + app.get('mongodb-accounts'));
  });

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.log(err);
  });

  app.set('mongooseClient', mongoose);
};

const patients = function (app) {
  mongoose.connect(
    `${app.get('mongodb-patients')}?authSource=admin`,
    { useCreateIndex: true, useNewUrlParser: true, user: 'root', pass: 'example'  }
  );
  mongoose.Promise = global.Promise;

  // Connected handler
  mongoose.connection.on('connected', function () {
    console.log("Connected to DB using chain: " + app.get('mongodb-patients'));
  });

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.log(err);
  });

  app.set('mongooseClient', mongoose);
};
module.exports = {accounts, patients};