# react-extras [![Build Status](https://travis-ci.org/sindresorhus/react-extras.svg?branch=master)](https://travis-ci.org/sindresorhus/react-extras)

> Useful components and utilities for working with [React](https://reactjs.org)

*Note that this package targets modern browsers. It's up to you to transpile if you need to support older browsers.*


## Install

```
$ npm install react-extras
```


## Usage

```js
import React from 'react';
import {If} from 'react-extras';

const App = props => (
	<If condition={props.showUnicorn}>
		<div className="unicorn">
			🦄
		</div>
	</If>
);
```


## API

### autoBind(self, [options])

Automatically binds your `React.Component` subclass methods to the instance. See the [`autoBind.react()` docs](https://github.com/sindresorhus/auto-bind#autobindreactself-options).

### classNames(…input)

Conditionally join CSS class names together.

#### input

Type: `string` `Object`

Accepts a combination of strings and objects. Only object keys with truthy values are included. Anything else is ignored.

```js
classNames('unicorn', 'rainbow');
//=> 'unicorn rainbow'

classNames({awesome: true, foo: false}, 'unicorn', {rainbow: false});
//=> 'awesome unicorn'

classNames('unicorn', null, undefined, 0, 1, {foo: null});
//=> 'unicorn'

const buttonType = 'main';
classNames({[`button-${buttonType}`]: true});
//=> 'button-main'
```

```jsx
const Button = props => {
	console.log(props);
	/*
	{
		type: 'success',
		small: true
	}
	*/

	const buttonClass = classNames(
		'button',
		{
			[`button-${props.type}`]: props.type,
			'button-block': props.block,
			'button-small': props.small
		}
	);

	console.log(buttonClass);
	//=> 'button button-success button-small'

	return <button className={buttonClass}>…</button>;
};
```

### `<If>`

React component that renders the children if the `condition` prop is `true`.

Beware that even though the children are not rendered when the `condition` is `false`, they're still evaluated.

If you need it to not be evaluated on `false`, you can pass a function to the `render` prop that returns the children:

```jsx
<div>
	<If condition={props.error} render={() => (
		<h1>{props.error}</h1>
	)}/>
</div>
```

Or you could just use plain JavaScript:

```jsx
<div>
	{props.error && (
		<h1>{props.error}</h1>
	)}
</div>
```

### `<RootClass/>`

Renderless React component that can add and remove classes to the root `<html>` element. It accepts an `add` prop for adding classes, and a `remove` prop for removing classes. Both accept either a single class or multiple classes separated by space.

```jsx
<If condition={props.isDarkMode}>
	<RootClass add="dark-mode"/>
</If>
```

```jsx
<RootClass add="logged-in paid-user" remove="promo"/>
```

### `<BodyClass/>`

Same as `<RootClass/>` but for `<body>`.

Prefer `<RootClass/>` though, because it's nicer to put global classes on `<html>` as you can consistently prefix everything with the class:

```css
.dark-mode body {
	background: #000;
}

.dark-mode a {
	…
}
```

With `<BodyClass/>` you need to do:

```css
body.dark-mode {
	background: #000;
}

.dark-mode a {
	…
}
```

### canUseDOM

A boolean of whether you're running in a context with a [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). Can be used to check if your component is running in the browser or if it's being server-rendered.


## Related

- [react-router-util](https://github.com/sindresorhus/react-router-util) - Useful components and utilities for working with React Router


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
