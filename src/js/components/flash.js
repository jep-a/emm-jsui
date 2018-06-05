import {CSSTransition} from 'react-transition-group'
import autobind from 'auto-bind'
import React, {Component} from 'react'

export default class Flash extends Component {
	state = {
		in: false
	}

	constructor(props) {
		super(props)
		autobind(this)
	}

	handleClick() {
		this.setState({in: true})
	}
	
	resetState() {
		this.setState({in: false})
	}

	render () {
		return (
			<CSSTransition in={this.state.in} timeout={500} onClick={this.handleClick} onEntered={this.resetState} classNames="flash">
				<span className="flash"></span>
			</CSSTransition>
		)
	}
}