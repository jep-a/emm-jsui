import autobind from 'autobind-decorator'
import React from 'react'

const fastTransition = '-webkit-transform 0.2s cubic-bezier(0, 0.5, 0.35, 1)'
const slowTransition = '-webkit-transform 0.4s cubic-bezier(0.5, 0, 0.25, 1)'

function offsetLeft(node) {
	return node.offsetLeft - (parseInt(window.getComputedStyle(node).marginLeft) || 0)
}

function offsetWidth(node) {
	const compStyle = window.getComputedStyle(node)

	return node.offsetWidth + parseInt(compStyle.marginLeft) + parseInt(compStyle.marginRight)
}

export const timeouts = {
	protosLobbies: 400,
	lobbyCard: 200
}

export default class Animator {
	pageRef = React.createRef()
	promises = []

	updateProtosLobbiesLeft() {
		const oldLeft = this.protosLobbiesLeft

		this.protosLobbiesLeft = offsetLeft(this.protosLobbies)

		return this.protosLobbiesLeft - oldLeft
	}

	updateLobbyCardLeft() {
		const oldLeft = this.lobbyCardLeft

		this.lobbyCardLeft = offsetLeft(this.lobbyCard)

		return this.lobbyCardLeft - oldLeft
	}

	waitForNode(nodeName) {
		return new Promise(resolve => {this.promises[nodeName] = resolve})
	}

	requestTransformFrame(transform, transition) {
		const pageStyle = this.pageRef.current.style

		window.requestAnimationFrame(() => {
			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = transform

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = transition
				pageStyle.webkitTransform = ''
			});
		});
	}

	async startLobbySettingsEnter() {
		await this.waitForNode('lobbySettings')

		this.protosLobbies.style.position = 'absolute'
		this.lobbySettingsOffset = this.updateLobbyCardLeft()
		this.protosLobbies.style.left = `${this.protosLobbiesLeft + this.lobbySettingsOffset}px`

		this.lobbySettingsLeft = offsetLeft(this.lobbySettings)
		this.lobbySettingsWidth = offsetWidth(this.lobbySettings)

		this.requestTransformFrame(`translate3d(${-this.lobbySettingsOffset}px, 0, 0)`, slowTransition)
	}

	async startLobbySettingsExit() {
		await this.waitForNode('protosLobbies')

		this.lobbySettings.style.position = 'absolute'
		this.lobbySettings.style.left = `${this.lobbySettingsLeft - this.lobbySettingsOffset}px`
		this.lobbySettings.style.width = `${this.lobbySettingsWidth}px`

		this.updateLobbyCardLeft()
		this.requestTransformFrame(`translate3d(${this.lobbySettingsOffset}px, 0, 0)`, slowTransition)
	}

	@autobind handleToggleLobbySettings({newValue}) {
		if (newValue) {
			this.startLobbySettingsEnter()
		} else {
			this.startLobbySettingsExit()
		}
	}

	@autobind protosLobbiesEnter(node) {
		this.protosLobbies = node

		if (this.promises.protosLobbies) {
			this.promises.protosLobbies(node)
		}

		if (!this.protosLobbiesLeft) {
			this.updateProtosLobbiesLeft()
		}
	}

	@autobind lobbyCardEnter(node) {
		this.lobbyCard = node
		this.updateLobbyCardLeft()
		this.lobbyCardOffset = this.updateProtosLobbiesLeft()
		this.requestTransformFrame(`translate3d(${-this.lobbyCardOffset}px, 0, 0)`, fastTransition)
	}

	@autobind lobbyCardExit(node) {
		node.style.position = 'absolute'
		node.style.left = `${this.lobbyCardLeft - this.lobbyCardOffset}px`

		this.updateProtosLobbiesLeft()
		this.requestTransformFrame(`translate3d(${this.lobbyCardOffset}px, 0, 0)`, fastTransition)
	}

	@autobind lobbyCardSwitchEnter(node) {
		this.lobbyCard = node
	}

	@autobind lobbyCardSwitchExit(node) {
		node.style.position = 'absolute'
		node.style.left = `${offsetLeft(this.lobbyCard)}px`
	}

	@autobind lobbySettingsEnter(node) {
		this.lobbySettings = node

		if (this.promises.lobbySettings) {
			this.promises.lobbySettings(node)
		}
	}
}