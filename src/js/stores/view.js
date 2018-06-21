import {observable, computed, action} from 'mobx'

export default class ViewStore {
	@observable showLobbySettings

	constructor(
		root,
		{showLobbySettings = false} = {}
	) {
		this.root = root
		this.showLobbySettings = showLobbySettings
	}

	@computed get unsavedChanges() {
		const {hosting} = this.root.lobbies

		return hosting && hosting.mods.changedValues.size > 0
	}

	@action toggleLobbySettings(bool = !this.showLobbySettings) {
		this.showLobbySettings = bool
	}
}