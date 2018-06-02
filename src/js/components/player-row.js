import React, {Component} from 'react'
import {observer} from 'mobx-react'
import classnames from 'classnames'

@observer export default class PlayerRow extends Component {
	render() {
		return (
			<div className={classnames(`player-${this.props.player.id}`, 'player-row', {'current': this.props.current})}>
				<span className="player-row-name">{this.props.current ? 'you' : this.props.player.name}</span>
			</div>
		)
	}
}