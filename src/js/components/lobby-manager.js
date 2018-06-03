import React, {Component} from 'react'
import {observer} from 'mobx-react'

@observer export default class LobbyManager extends Component {
	render() {
		return (
			<section className="lobby-manager column-body-column">
				<section className="lobby-manager-password column-section">
				</section>
				<section className="lobby-manager-variables column-section">
				</section>
			</section>
		)
	}
}