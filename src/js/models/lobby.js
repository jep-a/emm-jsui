import {observable, computed} from 'mobx'

export default class Lobby {
	@observable prototype = null
	@observable host = null
	@observable players = []

	constructor(props) {
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
}