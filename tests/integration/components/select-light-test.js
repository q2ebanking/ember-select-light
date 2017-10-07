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

test('it should be able to toggle disabled status', function(assert) {
  this.set('disabled', false);

  this.render(hbs`{{select-light disabled=disabled}}`);

  assert.equal(find('select').hasAttribute('disabled'), false);

  this.set('disabled', true);
  assert.equal(find('select').hasAttribute('disabled'), true);
});

test('it should support tabindex', function(assert) {
  this.set('tabindex', null);

  this.render(hbs`{{select-light tabindex=tabindex}}`);
  assert.equal(find('select').hasAttribute('tabindex'), false);

  this.set('tabindex', 0);
  assert.equal(find('select').getAttribute('tabindex'), 0);
});
