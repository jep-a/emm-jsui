import {observable, computed, action} from 'mobx'

const inputDefaults = {
	boolean: true,
	text: '',
	time: '0000'
}

export default class Modifiable {
	@observable prereqValue
	@observable value = {}

	constructor(
		store,
		{
			prereq,
			key,
			label,
			type = 'boolean',
			default: deflt = inputDefaults[type],
			min,
			max
		}
	) {
		this.store = store
		this.prereq = prereq
		this.key = key
		this.label = label
		this.type = type
		this.deflt = deflt
		this.min = min
		this.max = max

		this.value = {
			key: key,
			saved: deflt,
			current: deflt
		}

		if (prereq) {
			const {
				prereqDefault = true,
				override
			} = prereq

			this.prereqValue = prereqDefault

			if (override != undefined) {
				this.overrideValueFromPrereq()
				this.value.saved = this.value.current
			}
		}
	}

	@computed get display() {
		let display

		if (this.prereq) {
			display = this.prereqValue != this.prereq.opposite
		} else {
			display = true
		}

		return display
	}

	@action overrideValueFromPrereq() {
		if (this.prereqValue == this.prereq.opposite) {
			this.value.current = this.prereq.override
		} else {
			this.value.current = this.deflt
		}
	}

	@action setPrereqValue(value) {
		this.prereqValue = value

		if (this.prereq.override != undefined) {
			this.overrideValueFromPrereq()
		}
	}

	@action setValue(value) {
		this.value.current = value
	}

	@action saveValue() {
		this.value.saved = this.value.current
	}
}
