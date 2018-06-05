import {observable, computed, action} from 'mobx'
import Player from './models/player'
import Prototype from './models/prototype'
import Lobby from './models/lobby'

export default class Store {
	currentPlayer = null
	prototypes = new Map

	@observable players = new Map
	@observable lobbies = new Map
	@observable currentLobby = null
	@observable selectedLobby = null

	@computed get lobbyArray() {return Array.from(this.lobbies.values())}
	@computed get expandedLobby() {return this.selectedLobby || this.currentLobby}

	flattenLobbyJSON(json) {
		return {
			id: json.id,
			prototype: this.prototypes.get(json.prototype),
			host: this.players.get(json.host),
			players: json.players.map(player => this.players.get(player))
		}
	}

	loadFromJSON() {
		for (const key in window.initEmmJSON.players) {
			const json = window.initEmmJSON.players[key]
			this.players.set(json.id, new Player(this, json))
		}

		this.currentPlayer = this.players.get(window.initEmmJSON.currentPlayerID)

		for (const key in window.initEmmJSON.prototypes) {
			const json = window.initEmmJSON.prototypes[key]
			this.prototypes.set(json.id, new Prototype(json))
		}

		for (const key in window.initEmmJSON.lobbies) {
			const json = window.initEmmJSON.lobbies[key]
			this.lobbies.set(json.id, new Lobby(this, this.flattenLobbyJSON(json)))
		}

		delete window.initEmmJSON
	}

	@action addPlayerFromJSON(player) {
		this.players.set(player.id, new Player(this, player))
	}

	@action removePlayer(id) {
		this.players.delete(id)
	}

	@action setPlayerName(id, name) {
		this.players.get(id).name = name
	}

	@action addLobbyFromJSON(json) {
		const lobby = new Lobby(this, this.flattenLobbyJSON(json))
		this.lobbies.set(json.id, lobby)
		if (lobby.players.includes(this.currentPlayer)) {
			this.setCurrentLobby(json.id)
		}
		if (lobby.hosting) {
			this.setSelectedLobby(json.id)
		}
	}

	@action removeLobby(id) {
		if (this.currentLobby == this.lobbies.get(id)) {
			this.clearCurrentLobby()
		}
		if (this.selectedLobby == this.lobbies.get(id)) {
			this.clearSelectedLobby()
		}
		this.lobbies.delete(id)
	}

	@action setLobbyHost(lobbyID, playerID) {
		this.lobbies.get(lobbyID).host = this.players[playerID]
	}

	@action addLobbyPlayer(lobbyID, playerID) {
		const lobby = this.lobbies.get(lobbyID)
		lobby.players.push(this.players.get(playerID))
		if (playerID == this.currentPlayer.id) {
			this.setCurrentLobby(lobbyID)
		}
	}

	@action removeLobbyPlayer(lobbyID, playerID) {
		const lobby = this.lobbies.get(lobbyID)
		if (lobby) {
			if (this.currentLobby == lobby) {
				this.clearCurrentLobby()
			}
			lobby.players.splice(lobby.players.indexOf(this.players.get(playerID), 1))
		}
	}

	@action setCurrentLobby(id) {
		this.currentLobby = this.lobbies.get(id)
	}

	@action clearCurrentLobby() {
		this.currentLobby = null
	}

	@action setSelectedLobby(id) {
		this.selectedLobby = this.lobbies.get(id)
	}

	@action clearSelectedLobby() {
		this.selectedLobby = null
	}
}