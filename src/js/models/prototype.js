import hex from 'rgb-hex'

import expandModTemplate from '../modifiables'

export default class Prototype {
	modTemplate = []
	playerClasses = []

	constructor(store,
		{
			id,
			key,
			color,
			name,
			modifiables = [],
			playerClasses = []
		}
	) {
		this.store = store
		this.id = id
		this.key = key
		this.color = color
		this.iconSVG = `assets/svg/${key}.svg`
		this.name = name
		this.modTemplate = expandModTemplate({color, modifiables, playerClasses})
		this.playerClasses = playerClasses

		this.addCSS()
	}

	addCSS() {
		const {stylesheet} = this.store.root
		const prototypeSelector = `.prototype-${this.key}`

		stylesheet.insertRule(
			[
				`.prototype-row${prototypeSelector}:hover`,
				`.lobby-row${prototypeSelector}:hover`,
				`.lobby-card-column${prototypeSelector} .prototype-title`
			], {
				'color': this.color
			}
		)

		stylesheet.insertRule(
			[
				`.prototype-row${prototypeSelector}:hover svg .outline`,
				`.lobby-row${prototypeSelector}:hover svg .outline`
			], {
				'stroke': this.color
			}
		)

		stylesheet.insertRule(
			[
				`.save${prototypeSelector}`,
				`.save${prototypeSelector}:hover`,
				`.lobby-card-column${prototypeSelector} .prototype-icon`,
				`.lobby-card-column${prototypeSelector} .prototype-icon`,
				`.lobby-card-column${prototypeSelector} .lobby-card-switch`,
				`.lobby-settings-column${prototypeSelector} .mod-category-label`
			], {
				'background-color': this.color
			}
		)

		for (const i in this.modTemplate) {
			const {color} = this.modTemplate[i]

			if (color) {
				stylesheet.insertRule(
					`.lobby-settings-column${prototypeSelector} .mod-category-column.mod-category-${i} .mod-category-label`,
					{'background-color': `#${hex(color.r, color.g, color.b)}`}
				)
			}
		}
	}
}