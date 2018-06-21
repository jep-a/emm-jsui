import {observable, computed, action} from 'mobx'

export default class Lobby {
	@observable prototype
	@observable mods = []
	@observable host
	@observable players = []

	constructor(
		store,
		{
			id,
			prototype,
			mods,
			host,
			players
		}
	) {
		this.store = store
		this.id = id
		this.prototype = prototype
		this.mods = mods
		this.host = host
		this.players = players
	}

	@computed get prototypeKey() {
		return this.prototype.key
	}

	@computed get prototypeName() {
		return this.prototype.name
	}

	@computed get iconSVG() {
		return this.prototype.iconSVG
	}

	@computed get hostName() {
		return this.host.name
	}

	@computed get playerCount() {
		return this.players.length
	}

	@computed get current() {
		return this.players.includes(this.store.root.players.client)
	}

	@computed get selected() {
		return this == this.store.selected
	}

	@computed get hosting() {
		return this.host == this.store.root.players.client
	}

	@action select() {
		this.store.setSelected(this.id)
	}
}