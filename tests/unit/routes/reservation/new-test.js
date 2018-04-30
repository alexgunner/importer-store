import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | reservation/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:reservation/new');
    assert.ok(route);
  });
});
