import {observable, computed} from 'mobx'

import {steamPlayerAPI, steamAPIKey} from '../steam'

export default class Player {
	@observable name

	constructor(store, {id, steamID, name}) {
		this.store = store
		this.id = id
		this.steamID = steamID
		this.name = name

		this.getAvatarURL()
			.then(this.addAvatarCSS)
	}

	@computed get current() {
		return this == this.store.client
	}

	getAvatarURL() {
		return (
			fetch(`${steamPlayerAPI}?key=${steamAPIKey}&steamids=${this.steamID}`)
				.then(response => response.json())
				.then(json => new Promise(resolve => resolve(json.players[0].avatarfull)))
		)
	}

	addAvatarCSS(avatarURL) {
		this.store.root.stylesheet.insertRule(`.player-${this.id}.player-row::before`, {
			'background-image': `url(${avatarURL})`
		})
	}
}