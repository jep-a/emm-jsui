import {inject, observer} from 'mobx-react'
import {TransitionGroup} from 'react-transition-group'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import React, {Component} from 'react'

import FadeTransition from './transition'

@observer class NavEntry extends Component {
	containerRef = React.createRef()

	render() {
		const {handleClick, current, label} = this.props

		return (
			<div ref={this.containerRef} onClick={handleClick} className={classnames('nav', `nav-${label}`, {'current': current})}>
				<span className="underline">{label}</span>
			</div>
		)
	}
}

@inject('store') @observer class Save extends Component {
	@autobind handleClick() {
		this.props.store.lobbies.hosting.mods.save()
	}

	render() {
		return (
			<div onClick={this.handleClick} className={classnames('save nav', this.props.className)}>
				<span className="underline">save changes</span>
			</div>
		)
	}
}

@inject('store') @observer export default class NavBar extends Component {
	barRef = React.createRef()
	lobbiesRef = React.createRef()

	componentDidMount() {
		this.props.store.animator.nav.mount({bar: this.barRef, lobbies: this.lobbiesRef})
	}

	@autobind showLobbySettings() {
		this.props.store.view.toggleLobbySettings(true)
	}

	@autobind hideLobbySettings() {
		this.props.store.view.toggleLobbySettings(false)
	}

	render() {
		const {
			animator: {nav: animator},
			view: {showLobbySettings, unsavedChanges},
			lobbies: {hosting}
		} = this.props.store

		return (
			<nav ref={this.barRef} className="nav-bar">
				<TransitionGroup component={null}>
					<NavEntry ref={this.lobbiesRef} key="lobbies" handleClick={this.hideLobbySettings} current={!showLobbySettings} label="lobbies"/>

					{hosting && hosting.selected &&
						<FadeTransition key="lobby-settings" onEnter={animator.lobbySettingsEnter} onExit={animator.lobbySettingsExit}>
							<NavEntry key="lobby-settings" handleClick={this.showLobbySettings} current={showLobbySettings} label="lobby settings"/>
						</FadeTransition>
					}

					{showLobbySettings && unsavedChanges &&
						<FadeTransition key="save" onEnter={animator.saveEnter} onExit={animator.saveExit}>
							<Save key="save" className={`prototype-${hosting.prototypeKey}`}/>
						</FadeTransition>
					}
				</TransitionGroup>
			</nav>
		)
	}
}