import React, {Component} from 'react'
import SVG from 'react-inlinesvg'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {inject, observer} from 'mobx-react'
import autobind from 'auto-bind'
import classnames from 'classnames'
import PlayerList from './player-list'
import LobbyManager from './lobby-manager'
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
			<div onClick={this.handleClick} className={classnames('lobby-card-join-leave-button', `prototype-${this.props.lobby.prototypeKey}`, 'column-section')}>
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
		const hosting = this.props.lobby.host == this.props.currentPlayer
		return (
			<section className={classnames('lobby-card-column', `prototype-${this.props.lobby.prototypeKey}`, 'column', {'extended': hosting})}>
				<h1 className="column-title">{`${hosting ? 'your' : `${this.props.lobby.hostName}'s`} lobby`}</h1>
				<section className="column-clear-body">
					<section className="lobby-card column-body-column">
						<section className="lobby-card-prototype column-section">
							<div className="lobby-card-prototype-icon-box">
								<span className="lobby-row-prototype">
									<SVG cacheGetRequests={true} src={this.props.lobby.iconSVG} className="prototype-card-icon"/>
								</span>
							</div>
							<div className="lobby-card-prototype-title">
								<span className="prototype-title">{this.props.lobby.prototypeName}</span>
							</div>
						</section>
						<PlayerList players={this.props.lobby.players} className="column-section"/>
						<LobbyCardJoinLeaveButton lobby={this.props.lobby} current={this.props.lobby == this.props.lobbyContext.current}/>
					</section>
					<TransitionGroup component={null}>
						<CSSTransition timeout={200} classNames="column-body-column">
							{hosting &&
								<LobbyManager lobby={this.props.lobby}/>
							}
						</CSSTransition>
					</TransitionGroup>
				</section>
			</section>
		)
	}
}