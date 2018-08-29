import {inject, observer} from 'mobx-react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import React, {Component} from 'react'
import SVG from 'react-inlinesvg'

@inject('emm') @observer class PrototypeRow extends Component {
	@autobind handleClick() {
		this.props.emm.createLobby(this.props.prototype.id)
	}

	render() {
		const {key, name, iconSVG} = this.props.prototype

		return (
			<div onClick={this.handleClick} className={classnames('prototype-row', `prototype-${key}`)}>
				<SVG cacheGetRequests={true} src={iconSVG} className="prototype-icon"/>
				<span className="prototype-title underline">{name}</span>
			</div>
		)
	}
}

@observer export default class PrototypeList extends Component {
	render() {
		return (
			<section className="prototypes-column column">
				<h1 className="column-title">make a lobby</h1>
				<div className="prototypes-list column-body">
					{this.props.prototypes.map(prototype => <PrototypeRow key={prototype.id} prototype={prototype}/>)}
				</div>
			</section>
		)
	}
}