import {observer} from 'mobx-react'
import classnames from 'classnames'
import React, {Component} from 'react'

@observer export default class PlayerRow extends Component {
	render() {
		return (
			<div className={classnames(`player-${this.props.player.id}`, 'player-row', {'current': this.props.player.current})}>
				<span className="player-row-name">{this.props.player.current ? 'you' : this.props.player.name}</span>
			</div>
		)
	}
}