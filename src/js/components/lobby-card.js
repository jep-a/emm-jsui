import {inject, observer} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import autobind from 'auto-bind'
import classnames from 'classnames'
import React, {Component} from 'react'
import SVG from 'react-inlinesvg'

import Flash from './flash'
import LobbyManager from './lobby-manager'
import PlayerList from './player-list'

@inject('emm')
@observer
class LobbyCardSwitch extends Component {
	constructor(props) {
		super(props)
		autobind(this)
	}

	handleClick() {
		this.props.emm.switchLobby(this.props.lobby.id)
	}

	render() {
		return (
			<div onClick={this.handleClick} className={classnames('lobby-card-switch', `prototype-${this.props.lobby.prototypeKey}`, 'column-section')}>
				<span className="underline">{this.props.lobby.current ? 'leave' : 'join'}</span>
				<Flash/>
			</div>
		)
	}
}

@observer export default class LobbyCard extends Component {
	render() {
		return (
			<section className={classnames('lobby-card-column', `prototype-${this.props.lobby.prototypeKey}`, 'column', {'extended': this.props.lobby.hosting})}>
				<h1 className="column-title">{`${this.props.lobby.hosting ? 'your' : `${this.props.lobby.hostName}'s`} lobby`}</h1>
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
						<PlayerList players={this.props.lobby.playerArray} className="column-section"/>
						<LobbyCardSwitch lobby={this.props.lobby}/>
					</section>
					<TransitionGroup component={null}>
						{this.props.lobby.hosting &&
							<CSSTransition timeout={200} classNames="column-body-column">
								<LobbyManager lobby={this.props.lobby}/>
							</CSSTransition>
						}
					</TransitionGroup>
				</section>
			</section>
		)
	}
}