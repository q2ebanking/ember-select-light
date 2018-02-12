import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, fillIn, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('select-light', 'Integration | Component | select light', {
  integration: true
});

test('should be a <select> element', function(assert) {
  this.render(hbs`{{select-light}}`);

  assert.equal(find('select').tagName, 'SELECT');
});

test('should allow classes on parent <select>', function(assert) {
  this.render(hbs`{{select-light class="form-item"}}`);

  assert.ok(find('select').className.indexOf('form-item') !== -1);
});

test('should allow name and id changes on the parent <select>', function(assert) {
  this.render(hbs`{{select-light name="snail" id="slug"}}`)

  assert.equal(find('select').getAttribute('name'), 'snail');
  assert.equal(find('select').getAttribute('id'), 'slug');
});

test('should be able to toggle disabled status', function(assert) {
  this.set('disabled', false);

  this.render(hbs`{{select-light disabled=disabled}}`);

  assert.equal(find('select').hasAttribute('disabled'), false);

  this.set('disabled', true);
  assert.equal(find('select').hasAttribute('disabled'), true);
});

test('should support tabindex', function(assert) {
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

test('should have a disabled placeholder', function(assert) {
  this.render(hbs`{{select-light placeholder="Walrus" options=options}}`);

  assert.equal(this.$('option').attr('disabled'), 'disabled');
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

test('should render options correctly when passed array of objects', function(assert) {
  let options = [
    { value: 'shortfin', label: 'Shortfin Shark' },
    { value: 'mako', label: 'Mako Shark' },
  ];
  let value = options[1].value;
  this.setProperties({
    options,
    value,
  });

  this.render(hbs`{{select-light options=options value=value}}`);

  assert.equal(findAll('select option').length, options.length);
  assert.equal(find('select option').getAttribute('value'), options[0].value);
  assert.equal(find('select option').innerText.trim(), options[0].label);
  assert.equal(find('select').value, value);
});

test('should render options with customized value and display keys when passed array of objects', function(assert) {
  let options = [
    { val: 'shortfin', description: 'Shortfin Shark' },
    { val: 'mako', description: 'Mako Shark' },
  ];
  let value = options[1].value;
  this.setProperties({
    options,
    value,
  });

  this.render(hbs`{{select-light options=options value=value valueKey="val" displayKey="description"}}`);

  assert.equal(find('select option').getAttribute('value'), options[0].val);
  assert.equal(find('select option').innerText.trim(), options[0].description);
});

test('should fire change when user chooses option, mut with yield', async function(assert) {
  this.set('myValue', null);

  this.render(hbs`
    {{#select-light change=(action (mut myValue) value="target.value")}}
      <option value="turtle">Turtle</option>
    {{/select-light}}
  `);

  await fillIn('select', 'turtle');
  await triggerEvent('select', 'change');

  assert.equal(find('select').value, 'turtle');
  assert.equal(this.get('myValue'), 'turtle');
});

test('should fire change when user chooses option, mut with flat array', async function(assert) {
  let options = ['clam', 'starfish'];
  this.setProperties({
    options,
    myValue: options[1],
    value: options[1],
  });

  this.render(hbs`{{select-light options=options value=value change=(action (mut myValue) value="target.value")}}`);

  await fillIn('select', options[0]);
  await triggerEvent('select', 'change');

  assert.equal(find('select').value, options[0]);
  assert.equal(this.get('myValue'), options[0]);
});

test('should fire change when user chooses option, custom action with flat array', async function(assert) {
  let options = ['clam', 'starfish'];
  this.setProperties({
    options,
    value: options[1],
    customAction: (event) => {
      assert.equal(event.target.value, options[0]);
    },
  });

  this.render(hbs`{{select-light options=options value=value change=(action customAction)}}`);

  await fillIn('select', options[0]);
  await triggerEvent('select', 'change');
});

test('should fire focusIn and focusOut events when needed', async function(assert) {
  assert.expect(2);

  this.setProperties({
    options: ['clown fish', 'cat fish'],
    focusIn: (event) => {
      assert.equal(event.type, 'focusin');
    },
    focusOut: (event) => {
      assert.equal(event.type, 'focusout');
    },
  });

  this.render(hbs`{{select-light options=options focusIn=(action focusIn) focusOut=(action focusOut)}}`);

  await triggerEvent('select', 'focus');
  await triggerEvent('select', 'blur');
});
