import {observable, observe, computed, action} from 'mobx'

export default class ViewStore {
	@observable showLobbySettings

	constructor(
		root,
		{showLobbySettings = false} = {}
	) {
		this.root = root
		this.showLobbySettings = showLobbySettings

		observe(this, 'showLobbySettings', root.animator.handleToggleLobbySettings)
	}

	@computed get unsavedChanges() {
		const {hosting} = this.root.lobbies

		return hosting && hosting.mods.changedValues.size > 0
	}

	@action toggleLobbySettings(bool = !this.showLobbySettings) {
		this.showLobbySettings = bool
	}
}