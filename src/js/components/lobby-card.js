import React, {Component} from 'react'
import SVG from 'react-inlinesvg'
import {inject, observer} from 'mobx-react'
import autobind from 'auto-bind'
import classnames from 'classnames'
import PlayerList from './player-list';
import Flash from './flash'

class LobbyCardJoinLeaveButton extends Component {
	constructor(props) {
		super(props)
		autobind(this)
	}

	handleClick() {
		if (this.props.current) {
			window.EMM.leaveLobby()
			window.app.store.clearCurrentLobby()
			window.app.store.clearSelectedLobby()
		} else {
			window.EMM.joinLobby(this.props.lobby.id)
		}
	}

	render() {
		return (
			<div onClick={this.handleClick} className={classnames('lobby-card-join-leave-button', `prototype-${this.props.lobby.prototypeKey}`)}>
				<span className="underline">{this.props.current ? 'leave' : 'join'}</span>
				<Flash/>
			</div>
		)
	}
}

@inject('currentPlayer', 'lobbyContext')
@observer
export default class LobbyCard extends Component {
	render() {
		return (
			<section id="lobby-card-column" className={classnames('column', `prototype-${this.props.lobby.prototypeKey}`)}>
				<h1 className="column-title">{`${this.props.lobby.host == this.props.currentPlayer ? 'your' : `${this.props.lobby.hostName}'s`} lobby`}</h1>
				<div id="lobby-card-body">
					<div className="lobby-card-prototype column-section">
						<div className="lobby-card-prototype-icon-box">
							<span className="lobby-row-prototype">
								<SVG cacheGetRequests={true} src={this.props.lobby.iconSVG} className="prototype-card-icon"/>
							</span>
						</div>
						<div className="lobby-card-prototype-title">
							<span className="prototype-title">{this.props.lobby.prototypeName}</span>
						</div>
					</div>
					<div className="lobby-card-players column-section">
						<div className="lobby-card-players-label column-label clear-fix">
							<span>{`${this.props.lobby.playerCount} player${(this.props.lobby.playersLength > 1 ? 's' : '')}`}</span>
						</div>
						<PlayerList players={this.props.lobby.players} lobby={this.props.lobby}/>
					</div>
					<div className="lobby-card-join-leave column-section">
						<LobbyCardJoinLeaveButton lobby={this.props.lobby} current={this.props.lobby == this.props.lobbyContext.current}/>
					</div>
				</div>
			</section>
		)
	}
}