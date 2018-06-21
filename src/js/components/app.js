import Dev from 'mobx-react-devtools'

import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'

import LobbyCard from './lobby-card'
import LobbyList from './lobbies'
import LobbySettings from './lobby-settings'
import NavBar from './nav'
import PrototypeList from './prototypes'

@inject('store') @observer export default class AppComponent extends Component {
	render() {
		const {
			view: {showLobbySettings},
			prototypes: {array: prototypes},
			lobbies: {
				array: lobbies,
				expanded: expandedLobby,
				hosting: hostingLobby
			}
		} = this.props.store

		return (
			<main>
				<NavBar/>
				<div className="page clear-fix">
					{!showLobbySettings && [
						<PrototypeList key="prototypes" prototypes={prototypes}/>,
						<LobbyList key="lobbies" lobbies={lobbies}/>
					]}

					{expandedLobby &&
						<LobbyCard key={`lobby-card-${expandedLobby.id}`} lobby={expandedLobby}/>
					}

					{hostingLobby && showLobbySettings &&
						<LobbySettings key={`lobby-settings-${hostingLobby.id}`} lobby={hostingLobby}/>
					}
				</div>
				{/* <Dev/> */}
			</main>
		)
	}
}