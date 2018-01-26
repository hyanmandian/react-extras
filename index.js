/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import _autoBind from 'auto-bind';

export const autoBind = _autoBind.react;

export const classNames = (...args) => {
	const ret = new Set();

	for (const item of args) {
		const type = typeof item;

		if (type === 'string' && item.length > 0) {
			ret.add(item);
		} else if (type === 'object' && item !== null) {
			for (const [key, value] of Object.entries(item)) {
				if (value) {
					ret.add(key);
				}
			}
		}
	}

	return [...ret].join(' ');
};

export const If = props => props.condition ? (props.render ? props.render() : props.children) : null;
If.propTypes = {
	condition: PropTypes.bool.isRequired,
	children: PropTypes.node,
	render: PropTypes.func
};

export const For = ({render, children, of}) => of.map((item, index) => render ? render(item, index) : children(item, index));
For.propTypes = {
	of: PropTypes.array.isRequired,
	children: PropTypes.func,
	render: PropTypes.func
};

class ElementClass extends React.PureComponent {
	componentWillMount() {
		const {add, remove} = this.props;
		const {classList} = this.element;

		if (add) {
			classList.add(...add.trim().split(' '));
		}

		if (remove) {
			classList.remove(...remove.trim().split(' '));
		}
	}

	componentWillUnmount() {
		const {add, remove} = this.props;
		const {classList} = this.element;

		if (add) {
			classList.remove(...add.trim().split(' '));
		}

		if (remove) {
			classList.add(...remove.trim().split(' '));
		}
	}

	render() {
		return null;
	}
}
ElementClass.propTypes = {
	add: PropTypes.string,
	remove: PropTypes.string
};

export class RootClass extends ElementClass {
	constructor() {
		super();
		this.element = document.documentElement;
	}
}
RootClass.propTypes = ElementClass.propTypes;

export class BodyClass extends ElementClass {
	constructor() {
		super();
		this.element = document.body;
	}
}
BodyClass.propTypes = ElementClass.propTypes;

export const canUseDOM = typeof window !== 'undefined' && 'document' in window && 'createElement' in window.document;
