import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import classnames from 'classnames'
import PrototypeList from './prototype-list'
import LobbyList from './lobby-list'
import LobbyCard from './lobby-card'
import LobbyManager from './lobby-manager'

@observer export default class AppComponent extends Component {
	render() {
		return (
			<section id="lobbies-page" className={classnames('page', 'clear-fix', {'extended': this.props.store.expandedLobby})}>
				<PrototypeList prototypes={this.props.store.prototypes}/>
				<LobbyList lobbies={this.props.store.lobbyArray}/>
				<TransitionGroup component={null}>
					{this.props.store.expandedLobby &&
						<CSSTransition timeout={200} classNames="column">
							<LobbyCard lobby={this.props.store.expandedLobby}/>
						</CSSTransition>
					}
				</TransitionGroup>
			</section>
		)
	}
}