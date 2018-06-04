import {observable, computed} from 'mobx'
import {steamAPI, steamAPIKey} from '../steam'

export default class Player {
	store = null
	@observable name = null

	constructor(store, props) {
		this.store = store
		this.id = props.id
		this.steamID = props.steamID
		this.name = props.name
		this.getAvatarURL()
	}

	@computed get current() {return this == this.store.currentPlayer}

	getAvatarURL() {
		const xhr = new XMLHttpRequest
		xhr.onreadystatechange = () => {
			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
				this.avatarURL = JSON.parse(xhr.responseText).response.players[0].avatarfull
				this.addBackgroundCSS()
			}
		}
		xhr.open('GET', `${steamAPI}?key=${steamAPIKey}&steamids=${this.steamID}`)
		xhr.send()
	}

	addBackgroundCSS() {
		app.stylesheet.insertRule(`.player-${this.id}.player-row::before`, {
			'background-image': `url(${this.avatarURL})`
		})
	}
}