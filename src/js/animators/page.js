import autobind from 'autobind-decorator'

import SubAnimator, {transitions} from './sub-animator'

export default class PageAnimator extends SubAnimator {
	mount({page}) {
		this.registerNode('page', page.current)
	}

	async startLobbySettingsEnter() {
		this.setStyle('page', {transition: ''})

		if (this.hasNode('lobbySettings')) {
			this.setStyle('lobbySettings', {position: '', left: ''})
		}

		this.updateOffset('protosLobbies')

		await this.waitForNode('lobbySettings')

		this.setStyle('protosLobbies', {position: 'absolute'})

		this.lobbySettingsOffset = this.updateOffset('lobbyCard')
		this.lobbySettingsWidth = this.getCurrentWidth('lobbySettings')

		this.setStyle('protosLobbies', {left: `${this.getSavedOffset('protosLobbies') + this.lobbySettingsOffset}px`})
		this.flashTransform('page', `translate3d(${-this.lobbySettingsOffset}px, 0, 0)`, transitions.slow.transition)
	}

	async startLobbySettingsExit() {
		this.setStyle('page', {transition: ''})

		if (this.hasNode('protosLobbies')) {
			this.setStyle('protosLobbies', {position: '', left: ''})
		}
	
		this.updateOffset('lobbySettings')

		await this.waitForNode('protosLobbies')

		this.setStyle('lobbySettings', {
			position: 'absolute',
			left: `${this.getSavedOffset('lobbySettings') - this.lobbySettingsOffset}px`,
			width: `${this.lobbySettingsWidth}px`
		})

		this.updateOffset('lobbyCard')
		this.flashTransform('page', `translate3d(${this.lobbySettingsOffset}px, 0, 0)`, transitions.slow.transition)
	}

	@autobind handleToggleLobbySettings({newValue}) {
		if (newValue) {
			this.startLobbySettingsEnter()
		} else {
			this.startLobbySettingsExit()
		}
	}

	@autobind protosLobbiesEnter(node) {
		this.registerNode('protosLobbies', node)
	}

	@autobind lobbyCardEnter(node) {
		this.registerNode('lobbyCard', node)
		this.lobbyCardOffset = this.updateOffset('protosLobbies')
		this.lobbyCardLeft = this.getSavedOffset('lobbyCard')
		this.flashTransform('page', `translate3d(${-this.lobbyCardOffset}px, 0, 0)`, transitions.fast.transition)
	}

	@autobind lobbyCardExit(node) {
		this.setStyle(node, {
			position: 'absolute',
			left: `${this.lobbyCardLeft - this.lobbyCardOffset}px`
		})

		this.updateOffset('protosLobbies')
		this.flashTransform('page', `translate3d(${this.lobbyCardOffset}px, 0, 0)`, transitions.fast.transition)
	}

	@autobind lobbyCardSwitchEnter(node) {
		this.registerNode('lobbyCard', node)
	}

	@autobind lobbyCardSwitchExit(node) {
		this.setStyle(node, {
			position: 'absolute',
			left: `${this.lobbyCardLeft}px`
		})
	}

	@autobind lobbySettingsEnter(node) {
		this.registerNode('lobbySettings', node)
	}
}