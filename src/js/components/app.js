import {inject, observer} from 'mobx-react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import React, {Component} from 'react'

import {transitions} from '../animators/sub-animator'
import LobbyCard from './lobby-card'
import LobbyList from './lobbies'
import LobbySettings from './lobby-settings'
import NavBar from './nav'
import PrototypeList from './prototypes'

const FadeTransition = ({classNames = 'fade', ...props}) => <CSSTransition classNames={classNames} {...props}/>
const LobbyCardTransition = props => <FadeTransition timeout={transitions.fast.timeout} {...props}/>

@inject('store') @observer export default class AppComponent extends Component {
	pageRef = React.createRef()

	componentDidMount() {
		this.props.store.animator.page.mount({page: this.pageRef})
	}

	render() {
		const {
			animator: {page: animator},
			view: {showLobbySettings},
			prototypes: {array: prototypes},
			lobbies: {
				array: lobbies,
				expanded: expandedLobby,
				hosting: hostingLobby
			}
		} = this.props.store

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
				<div ref={this.pageRef} className="page clear-fix">
					<TransitionGroup component={null}>
						{!showLobbySettings &&
							<FadeTransition
								key="protos-lobbies"
								classNames="fade-slow"
								appear={true}
								timeout={transitions.slow.timeout}
								onEnter={animator.protosLobbiesEnter}
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
									<LobbyCardTransition key={expandedLobbyKey} onEnter={animator.lobbyCardSwitchEnter} onExit={animator.lobbyCardSwitchExit}>
										<LobbyCard key={expandedLobbyKey} lobby={expandedLobby}/>
									</LobbyCardTransition>
								</TransitionGroup>
							</LobbyCardTransition>
						}

						{hostingLobby && showLobbySettings &&
							<FadeTransition
								key={hostingLobbyKey}
								classNames="fade-slow"
								timeout={transitions.slow.timeout}
								onEnter={animator.lobbySettingsEnter}
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