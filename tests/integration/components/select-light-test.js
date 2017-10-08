import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

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

test('should have no options if none are specified', function(assert) {
  this.render(hbs`{{select-light}}`);

  assert.equal(find('select').getElementsByTagName('option').length, 0);
});

test('should have placeholder option if specified', function(assert) {
  this.render(hbs`{{select-light placeholder="Walrus"}}`);

  assert.equal(find('select option').innerText.trim(), 'Walrus');
});

test('should be able to yield to passed options', function(assert) {
  this.render(hbs`
    {{#select-light}}
      <option value="plat">Platypus</option>
    {{/select-light}}
  `);

  assert.equal(find('select option').innerText, 'Platypus');
  assert.equal(find('select option').value, 'plat');
});

test('should render options from passed flat array', function(assert) {
  let options = ['squid', 'octopus'];
  this.setProperties({options});

  this.render(hbs`{{select-light options=options}}`);

  assert.equal(findAll('select option').length, options.length);
});

test('should select option that matches value', function(assert) {
  let options = ['squid', 'octopus'];
  let value = options[1];
  this.setProperties({
    options,
    value,
  });

  this.render(hbs`{{select-light options=options value=value}}`);

  assert.equal(find('select').value, value);
});

test('should change select value when changing data down value', function(assert) {
  let options = ['shortfin', 'mako'];
  let value = options[1];
  this.setProperties({
    options,
    value,
  });

  this.render(hbs`{{select-light options=options value=value placeholder="hammerhead"}}`);
  this.set('value', options[0]);

  assert.equal(find('select').value, options[0]);
});

test('should revert to placeholder option when value set to null', function(assert) {
  let options = ['Sea Turtle', 'Stingray'];
  let value = options[1];
  this.setProperties({
    options,
    value,
  });

  this.render(hbs`{{select-light options=options value=value placeholder="Fish"}}`);
  this.set('value', null);

  assert.equal(find('select').value, '');
});
