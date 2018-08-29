import {observable, action} from 'mobx'

import Player from '../models/player'
import MapStore from './map-store'

export default class PlayerStore extends MapStore {
	constructor(root, client, players) {
		super(root)

		for (const id in players) {
			this.map.set(+id, new Player(this, players[id]))
		}

		this.client = this.map.get(client)
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