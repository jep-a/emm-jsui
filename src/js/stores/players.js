import {observable, action} from 'mobx'

import Player from '../models/player'

export default class PlayerStore {
	@observable map = new Map

	constructor(root, client, players) {
		this.root = root

		for (const id in players) {
			this.map.set(+id, new Player(this, players[id]))
		}

		this.client = this.map.get(client)
	}

	get(id) {
		return this.map.get(id)
	}

	@action add(json) {
		this.map.set(json.id, new Player(this, json))
	}

	@action remove(id) {
		this.map.delete(id)
	}

	@action setName(id, name) {
		this.map.get(id).name = name
	}
}