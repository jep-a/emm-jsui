import React, {Component} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {inject, observer} from 'mobx-react'
import PlayerRow from './player-row'

@inject('currentPlayer')
@observer
export default class PlayerList extends Component {
	render() {
		return (
			<TransitionGroup className="player-list">
				{Array.from(this.props.players.values()).map(player =>
					<CSSTransition key={player.id} timeout={200} classNames="player-row">
						<PlayerRow key={player.id} player={player} current={this.props.currentPlayer == player} lobby={this.props.lobby}/>
					</CSSTransition>
				)}
			</TransitionGroup>
		)
	}
}