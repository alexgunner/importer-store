import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | offices', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:offices');
    assert.ok(route);
  });
});
