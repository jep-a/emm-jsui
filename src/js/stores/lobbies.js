import {observable, computed, action} from 'mobx'

import Lobby from '../models/lobby'
import ModifiableStore from './modifiables'
import MapStore from './map-store'

export default class LobbyStore extends MapStore {
	@observable current
	@observable selected

	constructor(root, lobbies) {
		super(root)

		for (const id in lobbies) {
			this.map.set(+id, new Lobby(this, this.denormalize(lobbies[id])))
		}
	}

	denormalize(json) {
		const {prototypes, players} = this.root
		const prototype = prototypes.get(json.prototype)

		const lobby = {
			id: json.id,
			prototype: prototype,
			host: players.get(json.host),
			players: json.players.map(player => players.get(player))
		}

		if (lobby.host == players.client) {
			lobby.mods = new ModifiableStore(this.root, prototype.modTemplate)
		}

		return lobby
	}

	@computed get array() {
		return Array.from(this.map.values())
	}

	@computed get expanded() {
		let expanded

		if (this.root.view.showLobbySettings) {
			expanded = this.hosting
		} else {
			expanded = this.selected || this.current
		}

		return expanded
	}

	@computed get hosting() {
		let hosting

		if (this.current && this.current.hosting) {
			hosting = this.current
		}

		return hosting
	}

	@action add(json) {
		const lobby = new Lobby(this, this.denormalize(json))

		this.map.set(json.id, lobby)

		if (lobby.players.includes(this.root.players.client)) {
			this.setCurrent(json.id)
		}

		if (lobby.hosting) {
			this.setSelected(json.id)
		}
	}

	@action remove(id) {
		const lobby = this.map.get(id)

		if (this.current == lobby) {
			this.clearCurrent()
		}

		if (this.selected == lobby) {
			this.clearSelected()
		}

		lobby.mods.dispose()
		this.map.delete(id)
	}

	@action addPlayer(lobbyID, playerID) {
		this.map.get(lobbyID).players.push(this.root.players.get(playerID))

		if (playerID == this.root.players.client.id) {
			this.setCurrent(lobbyID)
		}
	}

	@action setLobbyHost(lobbyID, playerID) {
		this.map.get(lobbyID).host = this.root.players.get(playerID)
	}

	@action removePlayer(lobbyID, playerID) {
		const lobby = this.map.get(lobbyID)

		if (lobby) {
			if (lobby == this.current) {
				this.clearCurrent()
			}

			lobby.players.splice(lobby.players.indexOf(this.root.players.get(playerID), 1))
		}
	}

	@action setCurrent(id) {
		this.current = this.map.get(id)
	}

	@action clearCurrent() {
		this.current = null
		this.root.view.toggleLobbySettings(false)
	}

	@action setSelected(id) {
		this.selected = this.map.get(id)
	}

	@action clearSelected() {
		this.selected = null
	}
}