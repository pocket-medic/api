const assert = require('assert');
const app = require('../../src/app');

describe('\'patient\' service', () => {
  it('registered the service', () => {
    const service = app.service('patient');

    assert.ok(service, 'Registered the service');
  });
});
