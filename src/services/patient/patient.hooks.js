/* eslint-disable no-console */
const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow } = require('feathers-hooks-common');
const momentjs = require('moment');


const ERRORS = {
  NO_NEW_PATIENT_DATA: 'no new patient data provided'
};

const getUserObjectId = hook => {
  hook.data = Object.assign({}, hook.data, {userId: hook.params.user._id});
  return hook;
};

const updatePatientData = async hook => {
  const app = hook.app;
  const mongooseClient = app.get('mongooseClient');
  const ObjectId = mongooseClient.Schema.Types.ObjectId;

  const data = Object.keys(hook.data);
  if (data.length < 2) {
    throw new Error(ERRORS.NO_NEW_PATIENT_DATA);
  }
  const existingEntry = await app.service('patient')
    .find({ userId: new ObjectId(hook.data.userId)});

  console.dir(existingEntry.total);

  if (existingEntry.total) {
    const updatedEntry = await app.service('patient').update(existingEntry.data[0]._id, hook.data);
    hook.result = updatedEntry;
  }
  return hook;
};

const processInputData = hook => {
  const data = hook.result;
  data.age = momentjs().diff(data.dob, 'years');

  data.bmi = Math.round(data.weight/Math.pow((data.height / 100),2)  * 10) / 10;

  hook.result = data;
  return hook;
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [disallow('external')],
    get: [],
    create: [getUserObjectId, updatePatientData],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
  },

  after: {
    all: [],
    find: [],
    get: [processInputData],
    create: [processInputData],
    update: [processInputData],
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
