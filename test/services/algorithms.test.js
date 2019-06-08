const assert = require('assert');
const app = require('../../src/app');

describe('\'algorithms\' service', () => {
  it('registered the service', () => {
    const service = app.service('algorithms');

    assert.ok(service, 'Registered the service');
  });
});
