import { moduleForModel, test } from 'ember-qunit';

moduleForModel('rapport', 'Unit | Model | rapport', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
