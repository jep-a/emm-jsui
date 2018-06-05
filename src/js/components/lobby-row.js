import React, {Component} from 'react'
import SVG from 'react-inlinesvg'
import {inject, observer} from 'mobx-react'
import autobind from 'auto-bind'
import classnames from 'classnames'
import Flash from './flash'

@inject('store', 'emm')
@observer
export default class LobbyRow extends Component {
	constructor(props) {
		super(props)
		autobind(this)
	}

	handleClick() {
		this.props.store.setSelectedLobby(this.props.lobby.id)
	}

	handleDoubleClick() {
		this.props.emm.switchLobby(this.props.lobby.id)
	}

	render() {
		const className = classnames(
			'lobby-row',
			`prototype-${this.props.lobby.prototypeKey}`,
			'clear-fix',
			{'current': this.props.lobby.current},
			{'selected': this.props.lobby.selected}
		)
		return (
			<div onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} className={className}>
				<span className="lobbies-list-prototype-column lobbies-list-column"><SVG cacheGetRequests={true} src={this.props.lobby.iconSVG} className="prototype-icon"/></span>
				<span className="lobbies-list-host-column lobbies-list-column">{this.props.lobby.hosting ? 'you' : this.props.lobby.hostName}</span>
				<span className="lobbies-list-players-column lobbies-list-column badge">{this.props.lobby.playerCount}</span>
				<span className="pulse"></span>
				<Flash/>
			</div>
		)
	}
}