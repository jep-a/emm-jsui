import {inject, observer} from 'mobx-react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import React, {Component} from 'react'
import SVG from 'react-inlinesvg'

@inject('store', 'emm') @observer class LobbyRow extends Component {
	@autobind handleClick() {
		if (!this.props.lobby.selected) {
			this.props.lobby.select()
		}
	}

	@autobind handleDoubleClick() {
		this.props.emm.switchLobby(this.props.lobby.id)
	}

	render() {
		const {
			prototypeKey,
			iconSVG,
			hostName,
			hosting,
			playerCount,
			current,
			selected
		} = this.props.lobby

		const className = classnames(
			'lobby-row',
			`prototype-${prototypeKey}`,
			'clear-fix',
			{'current': current},
			{'selected': selected}
		)

		return (
			<div onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} className={className}>
				<span className="lobbies-list-prototype-column lobbies-list-column"><SVG cacheGetRequests={true} src={iconSVG} className="prototype-icon"/></span>
				<span className="lobbies-list-host-column lobbies-list-column">{hosting ? 'you' : hostName}</span>
				<span className="lobbies-list-players-column lobbies-list-column badge">{playerCount}</span>
				<span className="lobby-row-pulse"></span>
			</div>
		)
	}
}

@observer class LobbyList extends Component {
	render() {
		return (
			<div className="lobbies-list">
				{this.props.lobbies.map(lobby => <LobbyRow key={lobby.id} lobby={lobby}/>)}
			</div>
		)
	}
}

@observer export default class LobbyListContainer extends Component {
	render() {
		const {lobbies} = this.props
		const {length} = lobbies

		return (
			<section className="lobbies-column column">
				<h1 className="column-title">{`${length > 0 ? length : 'no'} active lobb${length == 1 ? 'y' : 'ies'}`}</h1>
				<div className="column-body">
					<header className="column-label clear-fix">
						<span className="lobbies-list-prototype-column lobbies-list-column">type</span>
						<span className="lobbies-list-host-column lobbies-list-column">host</span>
						<span className="lobbies-list-players-column lobbies-list-column">players</span>
					</header>
					<LobbyList lobbies={lobbies}/>
				</div>
			</section>
		)
	}
}