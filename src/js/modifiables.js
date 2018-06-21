const isArray = arr => arr instanceof Array
const isObject = obj => obj && obj instanceof Object && !isArray(obj)

export default function expandModTemplate({modifiables, playerClasses}) {
	const categories = []

	if (modifiables) {
		const gameCategory = {
			key: './',
			label: 'game',
			mods: []
		}

		categories.push(gameCategory)

		for (const [modKey, modObject] of modifiables) {
			const [expandPlayerClasses, playerClassesModKey] = modKey.match(/player_classes\.\*\.?(.*)$/) || []
			const modProps = isObject(modObject) && modObject
			const modList = isArray(modObject) && modObject

			if (expandPlayerClasses) {
				if (playerClassesModKey.length && modProps) {
					for (const [playerClassKey, playerClassColor] of playerClasses) {
						const _modKey = `player_classes.${playerClassKey}`

						categories.push({
							key: _modKey,
							label: 'all player classes',
							color: playerClassColor,
							mods: [{key: `${_modKey}.${playerClassesModKey}`, ...modProps}]
						})
					}
				} else if (modList) {
					for (const [playerClassKey, {color: playerClassColor}] of playerClasses) {
						const _modkey = `player_classes.${playerClassKey}`

						const plyClassCategory = {
							key: _modkey,
							label: playerClassKey,
							color: playerClassColor,
							mods: []
						}

						categories.push(plyClassCategory)

						for (const [childModKey, childModProps] of modList) {
							plyClassCategory.mods.push({key: `${_modkey}.${childModKey}`, ...childModProps})
						}
					}
				}
			} else {
				if (modProps) {
					gameCategory.mods.push({key: modKey, ...modProps})
				} else if (modList) {
					for (const [childModKey, childModProps] of modList) {
						gameCategory.mods.push({key: `${modKey}.${childModKey}`, ...childModProps})
					}
				}
			}
		}
	}

	return categories
}