import {observable, observe, action} from 'mobx'
import autobind from 'autobind-decorator'

import Modifiable from '../models/modifiable'

export default class ModifiableStore {
	disposers = []
	flatMap = new Map
	@observable changedValues = new Map
	@observable array = []

	constructor(root, modTemplate) {
		this.root = root

		for (const {key, label, mods} of modTemplate) {
			this.array.push({
				key: key,
				label: label,
				mods: mods.map(mod => {
					const modModel = new Modifiable(this, mod)

					this.flatMap.set(mod.key, modModel)
					this.disposers.push(observe(modModel.value, this.handleOnChange))

					return modModel
				})
			})
		}
	}

	@autobind @action handleOnChange(
		{
			object: {key, saved},
			newValue
		}
	) {
		if (newValue != saved) {
			this.changedValues.set(key, newValue)
		} else if (this.changedValues.has(key)) {
			this.changedValues.delete(key)
		}
	}

	save() {
		this.root.emm.saveMods(this.changedValues.toJS())

		for (const [key] of this.changedValues) {
			this.flatMap.get(key).saveValue()
		}
	}

	dispose() {
		for (const dispose of this.disposers) {
			dispose()
		}
	}
}