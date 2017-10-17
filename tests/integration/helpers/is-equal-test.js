
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('is-equal', 'helper:is-equal', {
  integration: true
});

test('should be true when passed true and true', function(assert) {
  this.render(hbs`{{is-equal true true}}`);

  assert.equal(find('div').innerText.trim(), 'true');
});

test('should be false when passed false and true', function(assert) {
  this.render(hbs`{{is-equal false true}}`);

  assert.equal(find('div').innerText.trim(), 'false');
});

test('should be false when passed true and false', function(assert) {
  this.render(hbs`{{is-equal true false}}`);

  assert.equal(find('div').innerText.trim(), 'false');
});

test('should be true when passed false and false', function(assert) {
  this.render(hbs`{{is-equal false false}}`);

  assert.equal(find('div').innerText.trim(), 'true');
});

test('should be true if passed matching strings', function(assert) {
  this.render(hbs`{{is-equal 'foo' 'foo'}}`);

  assert.equal(find('div').innerText.trim(), 'true');
});

test('should be false if passed NOT matching strings', function(assert) {
  this.render(hbs`{{is-equal 'foo' 'bar'}}`);

  assert.equal(find('div').innerText.trim(), 'false');
});

test('should be true if passed two matching properties', function(assert) {
  this.setProperties({
    left: 'foo',
    right: 'foo',
  });

  this.render(hbs`{{is-equal left right}}`);

  assert.equal(find('div').innerText.trim(), 'true');
});

test('should be false if passed two NOT matching properties', function(assert) {
  this.setProperties({
    left: 'foo',
    right: 'bar',
  });

  this.render(hbs`{{is-equal left right}}`);

  assert.equal(find('div').innerText.trim(), 'false');
});

test('should switch as computed properties change', function(assert) {
  this.setProperties({
    left: 'foo',
    right: 'bar',
  });

  this.render(hbs`{{is-equal left right}}`);

  assert.equal(find('div').innerText.trim(), 'false');

  this.set('right', 'foo');
  assert.equal(find('div').innerText.trim(), 'true');

  this.set('left', 'bar');
  assert.equal(find('div').innerText.trim(), 'false');
});


test('should be true when comparing with the get helper', function(assert) {
  this.setProperties({
    left: 'foo',
    right: { deeper: 'foo', },
  });

  this.render(hbs`{{is-equal left (get right 'deeper')}}`);

  assert.equal(find('div').innerText.trim(), 'true');
});

test('should be usable inline to toggle an attribute', function(assert) {
  this.setProperties({
    left: 'foo',
    right: 'bar',
  });

  this.render(hbs`<input disabled={{is-equal left right}} />`);

  assert.equal(find('input').hasAttribute('disabled'), false);

  this.set('right', 'foo');
  assert.equal(find('input').hasAttribute('disabled'), true);
});
