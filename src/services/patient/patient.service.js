// Initializes the `patient` service on path `/patient`
const createService = require('feathers-mongoose');
const createModel = require('../../models/patient.model');
const hooks = require('./patient.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/patient', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('patient');

  service.hooks(hooks);
};
