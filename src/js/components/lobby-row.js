import React, {Component} from 'react'
import SVG from 'react-inlinesvg'
import {inject, observer} from 'mobx-react'
import autobind from 'auto-bind'
import classnames from 'classnames'
import Flash from './flash'

@inject('currentPlayer')
@observer
export default class LobbyRow extends Component {
	constructor(props) {
		super(props)
		autobind(this)
	}

	handleClick() {
		window.app.store.setSelectedLobby(this.props.lobby.id)
	}

	handleDoubleClick() {
		if (this.props.current) {
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
			{'current': this.props.current},
			{'selected': this.props.selected}
		)
		return (
			<div onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} className={className}>
				<div className="lobby-row-left lobby-row-section">
					<span className="lobby-row-prototype">
						<SVG cacheGetRequests={true} src={this.props.lobby.iconSVG} className="prototype-icon"/>
					</span>
				</div>
				<div className="lobby-row-left lobby-row-section">
					<span className="lobby-row-host">{this.props.lobby.host == this.props.currentPlayer ? 'you' : this.props.lobby.hostName}</span>
				</div>
				<div className="lobby-row-right lobby-row-section">
					<span className="lobby-row-players lobby-row-badge">{this.props.lobby.playerCount}</span>
				</div>
				<Flash/>
			</div>
		)
	}
}