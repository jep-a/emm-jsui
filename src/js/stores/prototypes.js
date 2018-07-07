import {observable, computed} from 'mobx'

import Prototype from '../models/prototype'
import MapStore from './map-store'

export default class PrototypeStore extends MapStore {
	constructor(root, prototypes) {
		super(root)

		for (const id in prototypes) {
			this.map.set(+id, new Prototype(this, prototypes[id]))
		}
	}

	@computed get array() {
		return Array.from(this.map.values())
	}
}