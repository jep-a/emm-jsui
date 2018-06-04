import React, {Component} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {observer} from 'mobx-react'
import classnames from 'classnames'
import PlayerRow from './player-row'

@observer export default class PlayerList extends Component {
	render() {
		return (
			<section className={classnames('players', this.props.className)}>
				<div className="column-label clear-fix">
					<span>{`${this.props.players.length} player${(this.props.players.length > 1 ? 's' : '')}`}</span>
				</div>
				<TransitionGroup className="player-list">
					{Array.from(this.props.players.values()).map(player =>
						<CSSTransition key={player.id} timeout={200} classNames="player-row">
							<PlayerRow key={player.id} player={player}/>
						</CSSTransition>
					)}
				</TransitionGroup>
			</section>
		)
	}
}