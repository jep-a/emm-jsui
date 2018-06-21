import {observer} from 'mobx-react'
import classnames from 'classnames'
import React, {Component} from 'react'

@observer class PlayerRow extends Component {
	render() {
		const {id, name, current} = this.props.player

		return (
			<div className={classnames(`player-${id}`, 'player-row', {'current': current})}>
				<span className="player-row-name">{current ? 'you' : name}</span>
			</div>
		)
	}
}

@observer class PlayerList extends Component {
	render() {
		return this.props.players.map(player => <PlayerRow key={player.id} player={player}/>)
	}
}

@observer export default class PlayerListContainer extends Component {
	render() {
		const {className, players} = this.props
		const {length} = players

		return (
			<div className={classnames('players-list', className)}>
				<h2 className="column-label">{`${length} player${length > 1 ? 's' : ''}`}</h2>
				<PlayerList players={players}/>
			</div>
		)
	}
}