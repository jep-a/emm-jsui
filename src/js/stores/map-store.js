import {observable} from 'mobx'

export default class MapStore {
	@observable map = new Map

	constructor(root) {
		this.root = root
	}

	get(id) {
		return this.map.get(id)
	}
}