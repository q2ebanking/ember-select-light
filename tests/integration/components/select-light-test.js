import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('select-light', 'Integration | Component | select light', {
  integration: true
});

test('it should be a <select> element', function(assert) {
  this.render(hbs`{{select-light}}`);

  assert.equal(find('select').tagName, 'SELECT');
});

test('it should allow classes on parent <select>', function(assert) {
  this.render(hbs`{{select-light class="form-item"}}`);

  assert.ok(find('select').className.indexOf('form-item') !== -1);
});
