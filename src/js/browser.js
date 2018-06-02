export default class BrowserEMM {
	constructor() {
		window.initEmmJSON = {
			currentPlayerID: 5,
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
		if (window.app.store.lobbyContext.current) {
			this.leaveLobby()
		}
	}

	createLobby(prototypeID) {
		this.overrideLobby()
		window.app.store.addLobbyFromJSON({
			id: 4,
			prototype: prototypeID,
			host: 5,
			players: [5]
		})
		window.app.store.setCurrentLobby(4)
		window.app.store.setSelectedLobby(4)
	}

	removeLobby() {
		window.app.store.removeLobby(4)
	}

	joinLobby(id) {
		this.overrideLobby()
		window.app.store.addLobbyPlayer(id, 5)
		window.app.store.setCurrentLobby(id)
	}

	leaveLobby() {
		if (window.app.store.lobbyContext.current && window.app.store.lobbyContext.current.id == 4) {
			this.removeLobby()
		} else {
			window.app.store.removeLobbyPlayer(window.app.store.lobbyContext.current.id, 5)
		}

		window.app.store.clearCurrentLobby()

		if (window.app.store.lobbyContext.selected && window.app.store.lobbyContext.selected.id == 4) {
			window.app.store.clearSelectedLobby()
		}
	}
}
