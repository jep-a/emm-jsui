import React, {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import classnames from 'classnames'
import PrototypeList from './prototype-list'
import LobbyList from './lobby-list'
import LobbyCard from './lobby-card'
import LobbyManager from './lobby-manager'

@observer export default class AppComponent extends Component {
	render() {
		const expandedLobby = this.props.lobbyContext.selected || this.props.lobbyContext.current
		return (
			<Provider currentPlayer={this.props.currentPlayer} lobbyContext={this.props.lobbyContext}>
				<section id="lobbies-page" className={classnames('page', 'clear-fix', {'extended': expandedLobby})}>
					<PrototypeList prototypes={this.props.prototypes}/>
					<LobbyList lobbies={this.props.lobbies}/>
					<TransitionGroup component={null}>
						{expandedLobby &&
							<CSSTransition timeout={200} classNames="column">
								<LobbyCard lobby={expandedLobby}/>
							</CSSTransition>
						}
					</TransitionGroup>
				</section>
			</Provider>
		)
	}
}