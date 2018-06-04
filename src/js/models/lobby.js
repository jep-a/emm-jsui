import {observable, computed} from 'mobx'

export default class Lobby {
	store = null

	@observable prototype = null
	@observable host = null
	@observable players = []

	constructor(store, props) {
		this.store = store
		this.id = props.id
		this.prototype = props.prototype
		this.host = props.host
		this.players = props.players
	}

	@computed get prototypeKey() {return this.prototype.key}
	@computed get prototypeName() {return this.prototype.name}
	@computed get iconSVG() {return this.prototype.iconSVG}
	@computed get hostName() {return this.host.name}
	@computed get playerCount() {return this.players.length}
	@computed get current() {return this.players.includes(this.store.currentPlayer)}
	@computed get selected() {return this == this.store.selectedLobby}
	@computed get hosting() {return this.host == this.store.currentPlayer}
	@computed get playerArray() {return Array.from(this.players.values())}
}