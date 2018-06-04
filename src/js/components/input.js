import React, {Component} from 'react'

// radio, text, select

export default class Input extends Component {
	render () {
		return (
			<div class="input">
				<span class="input-label">{this.props.label}</span>
				<span class="input-radio"></span>
			</div>
		)
	}
}