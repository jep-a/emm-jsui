import React, {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import classnames from 'classnames'
import PrototypeList from './prototype-list'
import LobbyList from './lobby-list'
import Conditional from './conditional'
import LobbyCard from './lobby-card'

@observer export default class AppComponent extends Component {
	render() {
		const expandedLobby = this.props.lobbyContext.selected || this.props.lobbyContext.current
		return (
			<Provider currentPlayer={this.props.currentPlayer} lobbyContext={this.props.lobbyContext}>
				<TransitionGroup component="section" id="lobbies-page" className={classnames('page', 'clear-fix', {'extended': expandedLobby})}>
					<PrototypeList prototypes={this.props.prototypes}/>
					<LobbyList lobbies={this.props.lobbies}/>
					<Conditional if={expandedLobby}>
						<CSSTransition timeout={125} classNames="column">
							<LobbyCard lobby={expandedLobby}/>
						</CSSTransition>
						<Conditional if={expandedLobby.host == this.props.currentPlayer}>
							<CSSTransition timeout={125} classNames="column">
								<LobbyCard lobby={expandedLobby}/>
							</CSSTransition>
						</Conditional>
					</Conditional>
				</TransitionGroup>
			</Provider>
		)
	}
}