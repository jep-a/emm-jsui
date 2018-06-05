export default class BrowserEMM {
	playerID = 5
	lobbyID = 4

	constructor() {
		window.initEmmJSON = {
			currentPlayerID: this.playerID,
			players: {
				1: {
					id: 1,
					steamID: '76561198098030659',
					name: 'lemon'
				},
				2: {
					id: 2,
					steamID: '76561198012036938',
					name: 'lime'
				},
				3: {
					id: 3,
					steamID: '76561198034459238',
					name: 'dog'
				},
				4: {
					id: 4,
					steamID: '76561198096881202',
					name: 'cat'
				},
				5: {
					id: 5,
					steamID: '76561197961945289',
					name: 'you'
				}
			},
			prototypes: {
				1: {
					id: 1,
					key: "bunnyhunt",
					color: "#f7a1f6",
					name: "Bunny Hunt"
				},
				2: {
					id: 2,
					key: "cloud",
					color: "#967ed0",
					name: "Cloud"
				},
				3: {
					id: 3,
					key: "deathmatch",
					color: "#ff6363",
					name: "Deathmatch"
				},
				4: {
					id: 4,
					key: "elimination",
					color: "#ff6421",
					name: "Elimination"
				},
				5: {
					id: 5,
					key: "freezetag",
					color: "#bcecf7",
					name: "Freezetag"
				},
				7: {
					id: 7,
					key: "hunted",
					color: "#6496ff",
					name: "Hunted"
				},
				8: {
					id: 8,
					key: "misc",
					color: "#b9bcff",
					name: "Miscellaneous"
				},
				10: {
					id: 10,
					key: "tag",
					color: "#7aff83",
					name: "Tag"
				}
			},
			lobbies: {
				1: {
					id: 1,
					prototype: 1,
					host: 1,
					players: [
						1
					]
				},
				2: {
					id: 2,
					prototype: 2,
					host: 2,
					players: [
						2
					]
				},
				3: {
					id: 3,
					prototype: 3,
					host: 3,
					players: [
						3,
						4
					]
				}
			}
		}
	}

	overrideLobby() {
		if (window.app.store.currentLobby) {
			this.leaveLobby()
		}
	}

	createLobby(prototypeID) {
		this.overrideLobby()
		window.app.store.addLobbyFromJSON({
			id: this.lobbyID,
			prototype: prototypeID,
			host: this.playerID,
			players: [this.playerID]
		})
	}

	removeLobby() {
		window.app.store.removeLobby(this.lobbyID)
	}

	switchLobby(id) {
		if (window.app.store.currentLobby && window.app.store.currentLobby.id == id) {
			this.leaveLobby()
		} else {
			this.joinLobby(id)
		}
	}

	joinLobby(id) {
		this.overrideLobby()
		window.app.store.addLobbyPlayer(id, this.playerID)
	}

	leaveLobby() {
		if (window.app.store.currentLobby.hosting) {
			this.removeLobby()
		} else {
			window.app.store.removeLobbyPlayer(window.app.store.currentLobby.id, this.playerID)
		}
	}
}
