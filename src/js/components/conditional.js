import React, {Component} from 'react'

export default class Conditional extends Component {
	render () {
		return this.props.if && this.props.children
	}
}