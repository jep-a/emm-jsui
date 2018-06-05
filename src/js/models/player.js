import {observable, computed} from 'mobx'

export default class Player {
	store = null
	@observable name = null

	constructor(store, props) {
		this.store = store
		this.id = props.id
		this.steamID = props.steamID
		this.name = props.name
	}

	@computed get current() {return this == this.store.currentPlayer}
}