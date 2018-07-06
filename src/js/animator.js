import autobind from 'autobind-decorator'

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
	constructor(page) {
		this.page = page
	}

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

	requestTransformFrame(transform, transition) {
		const pageStyle = this.page.current.style

		window.requestAnimationFrame(() => {
			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = transform

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = transition
				pageStyle.webkitTransform = ''
			});
		});
	}

	@autobind protosLobbiesEnter(node) {
		this.protosLobbies = node

		if (!this.protosLobbiesLeft) {
			this.updateProtosLobbiesLeft()
		}
	}

	@autobind protosLobbiesExit(node) {
		node.style.position = 'absolute'

		this.lobbySettingsOffset = this.updateLobbyCardLeft()

		node.style.left = `${this.protosLobbiesLeft + this.lobbySettingsOffset}px`
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
		this.lobbySettingsLeft = offsetLeft(node)
		this.lobbySettingsWidth = offsetWidth(node)
		this.requestTransformFrame(`translate3d(${-this.lobbySettingsOffset}px, 0, 0)`, slowTransition)
	}

	@autobind lobbySettingsExit(node) {
		node.style.position = 'absolute'
		node.style.left = `${this.lobbySettingsLeft - this.lobbySettingsOffset}px`
		node.style.width = `${this.lobbySettingsWidth}px`

		this.updateLobbyCardLeft()
		this.requestTransformFrame(`translate3d(${this.lobbySettingsOffset}px, 0, 0)`, slowTransition)
	}
}