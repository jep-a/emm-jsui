import {inject} from 'mobx-react'
import autobind from 'auto-bind'
import classnames from 'classnames'
import React, {Component} from 'react'
import SVG from 'react-inlinesvg'

import Flash from './flash'

@inject('emm')
export default class PrototypeRow extends Component {
	constructor(props) {
		super(props)
		autobind(this)
	}

	handleClick() {
		this.props.emm.createLobby(this.props.prototype.id)
	}

	render() {
		return (
			<li onClick={this.handleClick} className={classnames('prototype-row', `prototype-${this.props.prototype.key}`)}>
				<SVG cacheGetRequests={true} src={this.props.prototype.iconSVG} className="prototype-icon"/>
				<span className="prototype-title underline">{this.props.prototype.name}</span>
				<Flash/>
			</li>
		)
	}
}