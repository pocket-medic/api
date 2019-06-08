/* eslint-disable no-console */
const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow } = require('feathers-hooks-common');
const siMS = require('../../algorithms/siMS');

const calculateSiMS = async hook => {
  const app = hook.app;
  const id = hook.params.user._id;

  const userDataQuery = await app.service('patient').find(id);

  if (!userDataQuery.total) {
    throw new Error('no user data available');
  }

  const userData = userDataQuery.data[0];
  const siMSData = new siMS(userData);

  hook.results = {
    score: siMSData.score, 
    status: siMSData.status
  };

  return hook;
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [disallow()],
    get: [],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [],
    find: [],
    get: [calculateSiMS],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [hook => {
      console.log(hook.error.message);
      
      hook.error.message = 'There was an error. Please try again later';
      return hook;
    }],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
