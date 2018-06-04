import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import LobbyRow from './lobby-row'

@observer export default class LobbyList extends Component {
	render() {
		return (
			<section className="lobbies-column column">
				<h1 className="column-title">active lobbies</h1>
				<div className="lobbies column-body">
					<div className="column-label clear-fix">
						<span className="lobbies-list-prototype-column lobbies-list-column">type</span>
						<span className="lobbies-list-host-column lobbies-list-column">host</span>
						<span className="lobbies-list-players-column lobbies-list-column">players</span>
					</div>
					<TransitionGroup className="lobbies-list">
						{Array.from(this.props.lobbies.values()).map(lobby =>
							<CSSTransition key={lobby.id} timeout={200} classNames="lobby-row">
								<LobbyRow key={lobby.id} lobby={lobby}/>
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</section>
		)
	}
}