import {observable, action} from 'mobx'
import Player from './models/player'
import Prototype from './models/prototype'
import Lobby from './models/lobby'

export default class Store {
	@observable players = new Map
	@observable lobbies = new Map
	@observable lobbyContext = {
		current: null,
		selected: null
	}
	prototypes = new Map
	currentPlayer = {}

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
			this.players.set(window.initEmmJSON.players[key].id, new Player(window.initEmmJSON.players[key]))
		}

		this.currentPlayer = this.players.get(window.initEmmJSON.currentPlayerID)

		for (const key in window.initEmmJSON.prototypes) {
			this.prototypes.set(window.initEmmJSON.prototypes[key].id, new Prototype(window.initEmmJSON.prototypes[key]))
		}

		for (const key in window.initEmmJSON.lobbies) {
			this.lobbies.set(window.initEmmJSON.lobbies[key].id, new Lobby(this.flattenLobbyJSON(window.initEmmJSON.lobbies[key])))
		}

		delete window.initEmmJSON
	}

	@action addPlayerFromJSON(player) {
		this.players.set(player.id, new Player(player))
	}

	@action removePlayer(id) {
		this.players.delete(id)
	}

	@action setPlayerName(id, name) {
		this.players.get(id).name = name
	}

	@action addLobbyFromJSON(json) {
		const lobby = new Lobby(this.flattenLobbyJSON(json))
		this.lobbies.set(json.id, lobby)
		if (lobby.players.includes(this.currentPlayer)) {
			this.setCurrentLobby(json.id)
		}
	}

	@action removeLobby(id) {
		if (this.lobbyContext.current == this.lobbies.get(id)) {
			this.clearCurrentLobby()
		}
		if (this.lobbyContext.selected == this.lobbies.get(id)) {
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
			if (this.lobbyContext.current == lobby) {
				this.clearCurrentLobby()
			}
			lobby.players.splice(lobby.players.indexOf(this.players.get(playerID), 1))
		}
	}

	@action setCurrentLobby(id) {
		this.lobbyContext.current = this.lobbies.get(id)
	}

	@action clearCurrentLobby() {
		this.lobbyContext.current = null
	}

	@action setSelectedLobby(id) {
		this.lobbyContext.selected = this.lobbies.get(id)
	}

	@action clearSelectedLobby() {
		this.lobbyContext.selected = null
	}
}