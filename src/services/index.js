const users = require('./users/users.service.js');
const patient = require('./patient/patient.service.js');
const algorithms = require('./algorithms/algorithms.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(patient);
  app.configure(algorithms);
};
