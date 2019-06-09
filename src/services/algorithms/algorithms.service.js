/* eslint-disable no-unused-vars */
// Initializes the `algorithms` service on path `/algorithms`
const hooks = require('./algorithms.hooks');
const siMS = require('../../algorithms/siMS');


module.exports = function (app) {
  const myService = {
    async find(params) {},
    async get(id, params) {
      if (id === 'me') {
        id = params.user._id;
      }
      const patientData = await app.service('patient').find({userId: id});

      if (patientData.total) {
        const userData = patientData.data[0];
        const siMSData = new siMS(userData);

        return {
          score: siMSData.score, 
          status: siMSData.status
        };
      }
      return {};
      
    },
    async create(data, params) {},
    async update(id, data, params) {},
    async patch(id, data, params) {},
    async remove(id, params) {},
    setup(app, path) {}
  };
  const options = {};

  // Initialize our service with any options it requires
  app.use('/algorithms', myService);

  // Get our initialized service so that we can register hooks
  const service = app.service('algorithms');

  service.hooks(hooks);
};
