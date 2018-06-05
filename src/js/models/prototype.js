export default class Prototype {
	constructor(props) {
		this.id = props.id
		this.key = props.key
		this.color = props.color
		this.name = props.name
	}

	get iconSVG() {
		return `assets/svg/${this.key}.svg`
	}
}