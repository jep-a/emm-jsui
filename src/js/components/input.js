import autobind from 'autobind-decorator'
import classnames from 'classnames'
import React, {Component} from 'react'

const InputWrapper = props => (
	<div onClick={props.onClick} className={classnames('input', 'clear-fix', props.className)}>
		<span className="input-label">{props.label}</span>
		{props.children}
	</div>
)

class Input extends Component {
	constructor(props) {
		super(props)

		const {deflt = this.deflt, value = deflt} = this.props

		this.state = {value: value}
	}

	@autobind handleOnChange(newVal) {
		const {onChange} = this.props

		if (onChange) {
			onChange(newVal)
		}
	}
}

export class CheckboxInput extends Input {
	default = true

	@autobind handleClick() {
		const value = !this.state.value

		this.setState({value: value})
		this.handleOnChange(value)
	}

	render() {
		return (
			<InputWrapper onClick={this.handleClick} label={this.props.label} className="input-checkbox">
				<span className={classnames('input-checkbox-checkbox', 'input-value', {'true': this.state.value})}></span>
			</InputWrapper>
		)
	}
}

export class TextInput extends Input {
	default = ''

	@autobind handleChange({event}) {
		const value = event.target.value

		this.setState({value: value})
		this.handleOnChange(value)
	}

	render() {
		return (
			<InputWrapper label={this.props.label} className="input-text">
				<input onChange={this.handleChange} type="text" className="input-text-input input-value"></input>
			</InputWrapper>
		)
	}
}

export class TimeInput extends Input {
	default = '0000'

	@autobind handleChange({target}) {
		const value = target.value.slice(-4)

		this.setState({value: value})
		this.handleOnChange(value)
	}

	render() {
		const {value} = this.state
		const paddedVal = value.toString().padStart(4, '0')
		const formattedVal = paddedVal.replace(/(\d\d)(\d\d)$/, '$1:$2')

		return (
			<InputWrapper label={this.props.label} className="input-time">
				<input onChange={this.handleChange} value={value} type="number" className="input-time-input input-value"></input>
				<span className="input-time-display input-value">{formattedVal}</span>
			</InputWrapper>
		)
	}
}