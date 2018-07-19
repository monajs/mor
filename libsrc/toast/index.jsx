import React, { Component } from 'react';
import classNames from 'classnames';

export default class Toast extends Component {
	static config(options) {
		console.log(options)
	}
	render() {
		return (
			<div className="mona-toast"></div>
		)
	}
}
