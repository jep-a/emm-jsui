import {inject, observer} from 'mobx-react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import React, {Component} from 'react'
import SVG from 'react-inlinesvg'

import PlayerList from './players'

@inject('emm') @observer class LobbyCardSwitch extends Component {
	@autobind handleClick() {
		this.props.emm.switchLobby(this.props.lobby.id)
	}

	render() {
		return (
			<div onClick={this.handleClick} className="lobby-card-switch column-section">
				<span className="underline">{this.props.lobby.current ? 'leave' : 'join'}</span>
			</div>
		)
	}
}

@inject('store') @observer export default class LobbyCard extends Component {
	render() {
		const {lobby} = this.props
		const {
			prototypeKey,
			prototypeName,
			iconSVG,
			hostName,
			hosting,
			players
		} = lobby

		return (
			<section className={classnames('lobby-card-column', `prototype-${prototypeKey}`, 'column')}>
				<h1 className="column-title">{`${hosting ? 'your' : `${hostName}'s`} lobby`}</h1>
				<div className="column-clear-body clear-fix">
					<div className="lobby-card-prototype column-section">
						<SVG cacheGetRequests={true} src={iconSVG} className="prototype-icon"/>
						<span className="prototype-title">{prototypeName}</span>
					</div>
					<PlayerList players={players} className="column-section"/>
					<LobbyCardSwitch lobby={lobby}/>
				</div>
			</section>
		)
	}
}