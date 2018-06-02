export default class Prototype {
	constructor(props) {
		this.id = props.id
		this.key = props.key
		this.color = props.color
		this.name = props.name
		this.addCSS()
	}

	addCSS() {
		const sel = `.prototype-${this.key}`

		window.app.stylesheet.insertRule([
			`.prototype-row${sel}:hover`,
			`.lobby-row${sel}:hover`
		], {
			'color': this.color
		})

		window.app.stylesheet.insertRule([
			`.prototype-row${sel}:hover .icon-svg-path`,
			`.lobby-row${sel}:hover .icon-svg-path`
		], {
			'stroke': this.color
		})

		window.app.stylesheet.insertRule(`${sel} .lobby-card-prototype-icon-box`, {
			'background-color': this.color
		})

		window.app.stylesheet.insertRule(`${sel} .lobby-card-prototype-title`, {
			'color': this.color
		})

		window.app.stylesheet.insertRule(`${sel} .lobby-card-join-leave`, {
			'background-color': this.color
		})
	}

	get iconSVG() {
		return `assets/svg/${this.key}.svg`
	}
}