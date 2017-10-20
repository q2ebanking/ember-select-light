# Ember-Select-Light [![npm version](https://badge.fury.io/js/ember-select-light.svg)](https://badge.fury.io/js/ember-select-light) [![Ember Observer Score](https://emberobserver.com/badges/ember-select-light.svg)](https://emberobserver.com/addons/ember-select-light)

Ember Select Light is an Ember Addon written [data-down, actions up (DDAU)](https://dockyard.com/blog/2016/11/18/checkbox-list-ember) written with in [test-driven development](https://www.agilealliance.org/glossary/tdd/) practices.

The intent is to provide a barebones `<select>` element that pairs well with modern Ember practices without styling assumptions. The result is a very functional, yet customizable, option for developers seeking a simple solution to select elements in their forms and apps.

## Install

```bash
ember install ember-select-light
```

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Contributing

We love pull requests from everyone. By participating in this project, you agree to abide by the [code of conduct](./code-of-conduct.md) and is subject to the [project license](./LICENSE.md).

Clone this repo, make your changes with test coverage, push up a fork and [submit a pull request](https://github.com/sharpshark28/ember-select-light/compare).

Soon after some primary contributors will review your code and submit feedback and hopefully click the fancy green approve button. Any test and linting failures should be caught during the pull request continuous integration environment and human eyes here after.

## Running Tests

* `npm run test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* or `ember test`

## Example Usage

```javascript
this.setProperties({
	myValue: 'turtle',
	myOptions: ['turtle', 'tortoise'],
	myAction: (event) => {
		console.log(event.target.value);
	},
});
```

```handlebars
{{select-light value=myValue options=myOptions change=(action myAction)}}
```

### `value`

String that matches the selected `<option value="...`.

### `options`

#### As a Flat Array

```javascript
['clam', 'starfish']
```

#### As an Array of Key/Value Objects

```javascript
[
	{ value: 'shortfin', label: 'Shortfin Shark' },
	{ value: 'mako', label: 'Mako Shark' },
]
```

`value` and `label` will be the default keys used unless `valueKey="...` and/or `displayKey="...` are used respectively.

#### As a Yield

```handlebars
{{#select-light}}
	<option value="clown">Clown Fish</option>
	<option value="cat">Cat Fish</option>
{{/select-light}}
```

### Handling Events

Any javascript event can be handled directly on the component such as `change` or `focusIn`. The `event` javascript object is passed along to be used however you desire.

Common usages are...

```javascript
myAction(event) {
	console.log(event.target.value); // Do something useful with the changed value
},
```

or to modify a property without a custom action...

```handlebars
{{select-light change=(action (mut myValue) value="target.value")}}
```

### Other parameters

`disabled`, `tabindex`, and `class` work as you'd expect.

```handlebars
{{select-light disabled=true tabindex="0" class="my-dropdown"}}
```
