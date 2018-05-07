import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cart/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cart/new');
    assert.ok(route);
  });
});
