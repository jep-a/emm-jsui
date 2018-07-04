import autobind from 'autobind-decorator'

const fastTransition = '-webkit-transform 0.2s cubic-bezier(0, 0.65, 0.35, 1)'
const slowTransition = '-webkit-transform 0.5s cubic-bezier(0.5, 0, 0.25, 1)'

function offsetLeft(node) {
	return node.offsetLeft - parseInt(window.getComputedStyle(node).marginLeft)
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

		const pageStyle = this.page.current.style

		window.requestAnimationFrame(() => {
			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = `translate3d(${-this.lobbyCardOffset}px, 0, 0)`

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = fastTransition
				pageStyle.webkitTransform = ''
			})
		})
	}

	@autobind lobbyCardExit(node) {
		node.style.position = 'absolute'
		node.style.left = `${this.lobbyCardLeft - this.lobbyCardOffset}px`

		this.updateProtosLobbiesLeft()

		const pageStyle = this.page.current.style

		window.requestAnimationFrame(() => {
			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = `translate3d(${this.lobbyCardOffset}px, 0, 0)`

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = fastTransition
				pageStyle.webkitTransform = ''
			})
		})
	}

	@autobind lobbyCardSwitch(node) {
		node.style.position = 'absolute'
		node.style.left = `${this.lobbyCardLeft}px`
	}

	@autobind lobbySettingsEnter(node) {
		this.lobbySettings = node
		this.lobbySettingsLeft = offsetLeft(node)
		this.lobbySettingsWidth = offsetWidth(node)

		const pageStyle = this.page.current.style

		window.requestAnimationFrame(() => {
			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = `translate3d(${-this.lobbySettingsOffset}px, 0, 0)`

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = slowTransition
				pageStyle.webkitTransform = ''
			})
		})
	}

	@autobind lobbySettingsExit(node) {
		node.style.position = 'absolute'
		node.style.left = `${this.lobbySettingsLeft - this.lobbySettingsOffset}px`
		node.style.width = `${this.lobbySettingsWidth}px`

		this.updateLobbyCardLeft()

		const pageStyle = this.page.current.style

		window.requestAnimationFrame(() => {
			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = `translate3d(${this.lobbySettingsOffset}px, 0, 0)`

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = slowTransition
				pageStyle.webkitTransform = ''
			})
		})
	}
}