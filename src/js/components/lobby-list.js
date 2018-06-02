import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import LobbyRow from './lobby-row'

@inject('lobbyContext')
@observer
export default class LobbyList extends Component {
	render() {
		return (
			<section id="lobbies-column" className="column">
				<h1 className="column-title">active lobbies</h1>
				<div id="lobbies-body" className="column-body">
					<div id="lobbies-labels" className="column-label clear-fix">
						<div className="lobbies-label-left lobbies-label-section"><span className="lobby-label-prototype">type</span></div>
						<div className="lobbies-label-left lobbies-label-section"><span className="lobby-label-host">host</span></div>
						<div className="lobbies-label-right lobbies-label-section"><span className="lobby-label-players">players</span></div>
					</div>
					<TransitionGroup id="lobby-list">
						{Array.from(this.props.lobbies.values()).map(lobby =>
							<CSSTransition key={lobby.id} timeout={200} classNames="lobby-row">
								<LobbyRow key={lobby.id} lobby={lobby} current={this.props.lobbyContext.current == lobby} selected={this.props.lobbyContext.selected == lobby}/>
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</section>
		)
	}
}