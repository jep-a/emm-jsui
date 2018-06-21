import {inject, observer} from 'mobx-react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import React, {Component} from 'react'

@observer class NavEntry extends Component {
	render() {
		const {handleClick, current, label} = this.props

		return (
			<div onClick={handleClick} className={classnames('nav', {'current': current})}>
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
	@autobind showLobbySettings() {
		this.props.store.view.toggleLobbySettings(true)
	}

	@autobind hideLobbySettings() {
		this.props.store.view.toggleLobbySettings(false)
	}

	render() {
		const {view, lobbies} = this.props.store
		const {showLobbySettings, unsavedChanges} = view

		return (
			<nav className="nav-bar">
				<NavEntry key="nav-lobbies" handleClick={this.hideLobbySettings} current={!showLobbySettings} label="lobbies"/>

				{lobbies.hosting &&
					<NavEntry key="nav-lobby-settings" handleClick={this.showLobbySettings} current={showLobbySettings} label="lobby settings"/>
				}

				{showLobbySettings && unsavedChanges &&
					<Save className={`prototype-${lobbies.hosting.prototypeKey}`}/>
				}
			</nav>
		)
	}
}