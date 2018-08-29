import {observer} from 'mobx-react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import React, {Component} from 'react'

import {CheckboxInput, TextInput, TimeInput} from './input'

const inputTypes = {
	boolean: CheckboxInput,
	text: TextInput,
	time: TimeInput,
}

@observer class ModRow extends Component {
	constructor(props) {
		super(props)
		
		const {type, prereq} = props.mod

		this.component = inputTypes[type]

		if (prereq) {
			this.prereqKey = `${prereq.key}.prereq`
		}
	}

	@autobind handleOnChange(value) {
		this.props.mod.setValue(value)
	}

	@autobind handlePrereqOnChange(value) {
		this.props.mod.setPrereqValue(value)
	}

	render() {
		const {
			prereq,
			prereqValue,
			key,
			type,
			label,
			display,
			value: {current: value},
			...props
		} = this.props.mod

		const InputComponent = this.component
		const input = <InputComponent key={key} onChange={this.handleOnChange} label={label} value={value} {...props}/>

		if (prereq) {
			return [
				<CheckboxInput key={this.prereqKey} onChange={this.handlePrereqOnChange} value={prereqValue} {...prereq}/>,
				display && input
			]
		} else {
			return input
		}
	}
}

@observer class ModList extends Component {
	render() {
		return this.props.mods.map(mod => <ModRow key={mod.key} mod={mod}/>)
	}
}

@observer class ModCategories extends Component {
	render() {
		return (
			<div className="column-clear-body clear-fix">
				{this.props.modCategories.map(({key, label, mods}, i) => (
					<div key={key} className={classnames('mod-category-column column-body-column', `mod-category-${i}`)}>
						<h2 className="mod-category-label column-label">{label}</h2>
						<ModList mods={mods}/>
					</div>
				))}
			</div>
		)
	}
}

@observer export default class LobbySettings extends Component {
	render() {
		const {lobby} = this.props

		return (
			<section className={classnames('lobby-settings-column', `prototype-${lobby.prototypeKey}`, 'column')}>
				<h1 className="column-title">settings</h1>
				<ModCategories modCategories={lobby.mods.array}/>
			</section>
		)
	}
}