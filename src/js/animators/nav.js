import autobind from 'autobind-decorator'

import SubAnimator, {transitions} from './sub-animator'

export default class NavAnimator extends SubAnimator {
	mount({bar, lobbies}) {
		this.registerNode('bar', bar.current, true)
		this.registerNode('lobbies', lobbies.current.containerRef.current, true)
	}

	@autobind lobbySettingsEnter(node) {
		this.registerNode('lobbySettings', node, true)
		this.lobbySettingsOffset = this.updateOffset('lobbies')
		this.lobbySettingsLeft = this.getCurrentOffset('lobbySettings')
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
}