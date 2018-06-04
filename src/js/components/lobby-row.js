import React, {Component} from 'react'
import SVG from 'react-inlinesvg'
import {observer} from 'mobx-react'
import autobind from 'auto-bind'
import classnames from 'classnames'
import Flash from './flash'

@observer export default class LobbyRow extends Component {
	constructor(props) {
		super(props)
		autobind(this)
	}

	handleClick() {
		window.app.store.setSelectedLobby(this.props.lobby.id)
	}

	handleDoubleClick() {
		if (this.props.lobby.current) {
			window.EMM.leaveLobby()
			window.app.store.clearCurrentLobby()
			window.app.store.clearSelectedLobby()
		} else {
			window.EMM.joinLobby(this.props.lobby.id)
		}
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
				<Flash/>
			</div>
		)
	}
}