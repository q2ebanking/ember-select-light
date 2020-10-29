# Ember-Select-Light

![CI](https://github.com/ember-a11y/ember-select-light/workflows/CI/badge.svg?branch=main) ![PRs Welcome](https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667) ![License: MIT](https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)  [![npm package](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=2.0.0&x2=0)](https://badge.fury.io/js/ember-select-light) [![Ember Observer](https://emberobserver.com/badges/ember-select-light.svg)](https://emberobserver.com/addons/ember-select-light)

Ember-Select-Light is an Ember Addon focused on simplicity. Just powerful enough to offer expected baseline functionality while being easy to implement, style, and make accessible.

This addon is [Octane ready](https://emberjs.com/editions/octane/) and follows [ember-component-pattern's for how to best write a Select Element](https://emberjs-1.gitbook.io/ember-component-patterns/form-components/select-element).

## Getting Started

```bash
ember install ember-select-light
```

### Example Usage

```handlebars
<SelectLight
  @value="turtle"
  @options=(array "turtle" "tortoise")
  @change={{action "handleChange"}} />
```

#### With an array of objects...

```handlebars
<SelectLight
  @options=(array
    (hash value="shortfin" label="Shortfin Shark")
    (hash value="mako" label="Mako Shark")
  ) />
```

`value` and `label` will be the default object keys used unless `@valueKey="...` and/or `@displayKey="...` are used respectively, like so...

```handlebars
<SelectLight
  @options=(array
    (hash myValue="shortfin" myLabel="Shortfin Shark")
    (hash myValue="mako" myLabel="Mako Shark")
  )
  @valueKey="myValue"
  @displayKey="myLabel" />
```

#### As a Yield

```handlebars
<SelectLight>
	<option value="clown">Clown Fish</option>
	<option value="cat">Cat Fish</option>
</SelectLight>
```

### Other arguments

Other arguments are spread onto the `<select ...attributes` as you'd expect, allowing you to use common attributes such as `disabled`, `tabindex` and of course `class`.

```handlebars
<SelectLight class="my-select" disabled="true" />
```

---

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

## Contributing

We love pull requests from everyone. By participating in this project, you agree to abide by the [code of conduct](./code-of-conduct.md) and is subject to the [project license](./LICENSE.md).

Clone this repo, make your changes with test coverage, push up a fork and [submit a pull request](https://github.com/sharpshark28/ember-select-light/compare).

Soon after some primary contributors will review your code and submit feedback and hopefully click the fancy green approve button. Any test and linting failures should be caught during the pull request continuous integration environment and human eyes here after.

## Running Tests

* `npm run test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* or `ember test`
