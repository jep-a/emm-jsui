import {inject, observer} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import classnames from 'classnames'
import React, {Component} from 'react'

import LobbyCard from './lobby-card'
import LobbyList from './lobby-list'
import PrototypeList from './prototype-list'

@inject('store')
@observer
export default class AppComponent extends Component {
	render() {
		return (
			<section id="lobbies-page" className={classnames('page', 'clear-fix', {'extended': this.props.store.expandedLobby})}>
				<PrototypeList prototypes={this.props.store.prototypes}/>
				<LobbyList lobbies={this.props.store.lobbyArray}/>
				<TransitionGroup component={null}>
					{this.props.store.expandedLobby &&
						<CSSTransition key={this.props.store.expandedLobby.id} timeout={200} classNames="column">
							<LobbyCard key={this.props.store.expandedLobby.id} lobby={this.props.store.expandedLobby}/>
						</CSSTransition>
					}
				</TransitionGroup>
			</section>
		)
	}
}