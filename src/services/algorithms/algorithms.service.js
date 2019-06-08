/* eslint-disable no-unused-vars */
// Initializes the `algorithms` service on path `/algorithms`
const hooks = require('./algorithms.hooks');

module.exports = function (app) {
  const myService = {
    async find(params) {},
    async get(id, params) {},
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
