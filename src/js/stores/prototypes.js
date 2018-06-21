import {observable, computed} from 'mobx'

import Prototype from '../models/prototype'

export default class PrototypeStore {
	@observable map = new Map

	constructor(root, prototypes) {
		this.root = root

		for (const id in prototypes) {
			this.map.set(+id, new Prototype(this, prototypes[id]))
		}
	}

	get(id) {
		return this.map.get(id)
	}

	@computed get array() {
		return Array.from(this.map.values())
	}
}