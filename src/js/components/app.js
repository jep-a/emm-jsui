import React, {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import classnames from 'classnames'
import PrototypeList from './prototype-list'
import LobbyList from './lobby-list'
import LobbyCard from './lobby-card'

@observer export default class AppComponent extends Component {
	render() {
		const showingLobby = this.props.lobbyContext.selected || this.props.lobbyContext.current
		return (
			<Provider currentPlayer={this.props.currentPlayer} lobbyContext={this.props.lobbyContext}>
				<TransitionGroup component="section" id="lobbies-page" className={classnames('page', 'clear-fix', {'extended': showingLobby})}>
					<PrototypeList prototypes={this.props.prototypes}/>
					<LobbyList lobbies={this.props.lobbies}/>
					{showingLobby &&
						<CSSTransition timeout={125} classNames="column">
							<LobbyCard lobby={showingLobby}/>
						</CSSTransition>
					}
				</TransitionGroup>
			</Provider>
		)
	}
}