import autobind from 'autobind-decorator'

const fastTransition = '-webkit-transform 0.2s cubic-bezier(0, 0.75, 0.25, 1)'
const slowTransition = '-webkit-transform 0.4s cubic-bezier(0.2, 0.8, 0.4, 1)'

export default class Animator {
	static timeouts = {
		protosLobbies: 400,
		lobbyCard: 200
	}

	constructor(page) {
		this.page = page
	}

	@autobind protosLobbiesExit(node) {
		this.protosLobbiesLeft = this.protosLobbiesLeft || node.offsetLeft

		const pageStyle = this.page.current.style
		const nodeStyle = node.style
		const oldLobbyCardLeft = this.lobbyCardLeft

		window.requestAnimationFrame(() => {
			nodeStyle.position = 'absolute'

			this.lobbySettingsOffset = oldLobbyCardLeft - this.lobbyCard.offsetLeft

			nodeStyle.left = `${this.protosLobbiesLeft - this.lobbySettingsOffset}px`

			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = `translate3d(${this.lobbySettingsOffset}px, 0, 0)`

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = slowTransition
				pageStyle.webkitTransform = ''
			})
		})
	}

	@autobind lobbyCardEnter(node) {
		this.lobbyCard = node
		this.lobbyCardLeft = node.offsetLeft
		this.lobbyCardOffset = node.offsetWidth/2

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

	@autobind lobbyCardExit(node) {
		const pageStyle = this.page.current.style
		const nodeStyle = node.style

		window.requestAnimationFrame(() => {
			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = `translate3d(-${this.lobbyCardOffset}px, 0, 0)`

			nodeStyle.position = 'absolute'
			nodeStyle.left = `${this.lobbyCardLeft + this.lobbyCardOffset}px`

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = fastTransition
				pageStyle.webkitTransform = ''
			})
		})
	}

	@autobind lobbyCardSwitch(node) {
		const style = node.style
		const computedStyle = window.getComputedStyle(node)
		const left = `${node.offsetLeft - node.offsetWidth/2 - parseInt(computedStyle.marginLeft) - parseInt(computedStyle.marginRight)}px`

		window.requestAnimationFrame(() => {
			style.position = 'absolute'
			style.left = left
		})
	}

	@autobind lobbySettingsEnter(node) {
		this.lobbySettingsLeft = node.offsetLeft
		this.lobbySettingsWidth = node.offsetWidth
	}

	@autobind lobbySettingsExit(node) {
		const pageStyle = this.page.current.style
		const nodeStyle = node.style

		window.requestAnimationFrame(() => {
			pageStyle.webkitTransition = ''
			pageStyle.webkitTransform = `translate3d(-${this.lobbySettingsOffset}px, 0, 0)`

			nodeStyle.position = 'absolute'
			nodeStyle.left = `${this.lobbySettingsLeft + this.lobbySettingsOffset + this.lobbyCardOffset}px`
			nodeStyle.width = `${this.lobbySettingsWidth}px`

			window.requestAnimationFrame(() => {
				pageStyle.webkitTransition = slowTransition
				pageStyle.webkitTransform = ''
			})
		})
	}
}