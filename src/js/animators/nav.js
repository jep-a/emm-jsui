import autobind from 'autobind-decorator'

import SubAnimator, {transitions} from './sub-animator'

export default class NavAnimator extends SubAnimator {
	mount({bar, lobbies}) {
		this.registerNode('bar', bar.current)
		this.registerNode('lobbies', lobbies.current.containerRef.current)
	}

	@autobind lobbySettingsEnter(node) {
		this.setStyle(node, {
			position: '',
			left: ''
		})

		this.registerNode('lobbySettings', node)
		this.lobbySettingsOffset = this.updateOffset('lobbies')
		this.lobbySettingsLeft = this.getSavedOffset('lobbySettings')
		this.flashTransform('bar', `translate3d(${-this.lobbySettingsOffset}px, 0, 0)`, transitions.fast.transition)
	}

	@autobind lobbySettingsExit(node) {
		this.setStyle(node, {
			position: 'absolute',
			left: `${this.lobbySettingsLeft - this.lobbySettingsOffset}px`
		})

		this.updateOffset('lobbies')
		this.flashTransform('bar', `translate3d(${this.lobbySettingsOffset}px, 0, 0)`, transitions.fast.transition)
	}

	@autobind saveEnter(node) {
		this.registerNode('save', node)
		this.saveOffset = this.updateOffset('lobbies')
		this.saveLeft = this.getSavedOffset('save')
		this.flashTransform('bar', `translate3d(${-this.saveOffset}px, 0, 0)`, transitions.fast.transition)
	}

	@autobind saveExit(node) {
		this.setStyle(node, {
			position: 'absolute',
			left: `${this.saveLeft - this.saveOffset}px`
		})

		this.updateOffset('lobbies')
		this.flashTransform('bar', `translate3d(${this.saveOffset}px, 0, 0)`, transitions.fast.transition)
	}
}