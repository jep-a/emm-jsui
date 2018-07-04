import {inject, observer} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import React, {Component} from 'react'

import Animator, {timeouts} from '../animator'
import LobbyCard from './lobby-card'
import LobbyList from './lobbies'
import LobbySettings from './lobby-settings'
import NavBar from './nav'
import PrototypeList from './prototypes'

const FadeTransition = ({classNames = 'fade', ...props}) => <CSSTransition classNames={classNames} {...props}/>
const LobbyCardTransition = props => <FadeTransition timeout={timeouts.lobbyCard} {...props}/>

@inject('store') @observer export default class AppComponent extends Component {
	page = React.createRef()
	animator = new Animator(this.page)

	render() {
		const {
			page,
			animator,
			props
		} = this

		const {
			view: {showLobbySettings},
			prototypes: {array: prototypes},
			lobbies: {
				array: lobbies,
				expanded: expandedLobby,
				hosting: hostingLobby
			}
		} = props.store

		let expandedLobbyKey, hostingLobbyKey

		if (expandedLobby) {
			expandedLobbyKey = `lobby-card-${expandedLobby.id}`
		}

		if (hostingLobby) {
			hostingLobbyKey = `lobby-card-${hostingLobby.id}`
		}

		return (
			<main>
				<NavBar/>
				<div ref={page} className="page clear-fix">
					<TransitionGroup component={null}>
						{!showLobbySettings &&
							<FadeTransition
								key="protos-lobbies"
								classNames="fade-slow"
								appear={true}
								timeout={timeouts.protosLobbies}
								onEnter={animator.protosLobbiesEnter}
								onExit={animator.protosLobbiesExit}
							>
								<div className="protos-lobbies">
									<PrototypeList key="prototypes" prototypes={prototypes}/>
									<LobbyList key="lobbies" lobbies={lobbies}/>
								</div>
							</FadeTransition>
						}

						{expandedLobby &&
							<LobbyCardTransition key={'lobby-card'} onEnter={animator.lobbyCardEnter} onExit={animator.lobbyCardExit}>
								<TransitionGroup component={null}>
									<LobbyCardTransition key={expandedLobbyKey} onExit={animator.lobbyCardSwitch}>
										<LobbyCard key={expandedLobbyKey} lobby={expandedLobby}/>
									</LobbyCardTransition>
								</TransitionGroup>
							</LobbyCardTransition>
						}

						{hostingLobby && showLobbySettings &&
							<FadeTransition
								key={hostingLobbyKey}
								classNames="fade-slow"
								timeout={timeouts.protosLobbies}
								onEnter={animator.lobbySettingsEnter}
								onExit={animator.lobbySettingsExit}
							>
								<LobbySettings key={hostingLobbyKey} lobby={hostingLobby}/>
							</FadeTransition>
						}
					</TransitionGroup>
				</div>
			</main>
		)
	}
}