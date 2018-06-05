import './polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'
import autobind from 'auto-bind'

import BrowserEMM from './browser'
import Store from './store'
import Stylesheet from './stylesheet'
import AppComponent from './components/app'
import {steamPlayerAPI, steamAPIKey} from './steam'

const body = document.getElementsByTagName('body')[0]

class App {
	constructor(emm) {
		window.app = this
		autobind(this)
		this.emm = emm
		this.store = new Store
		this.stylesheet = new Stylesheet
		this.fillStore()
		this.addStoreCSS()
		this.render()
	}

	fillStore() {
		this.store.loadFromJSON()
	}

	addStoreCSS() {
		this.store.prototypes.forEach(this.addPrototypeCSS)
		this.store.players.forEach(ply => {this.getAvatarURL(ply).then(avatarURL => this.addAvatarCSS)})
	}

	addPrototypeCSS({key, color}) {
		const sel = `.prototype-${key}`

		this.stylesheet.insertRule([
			`.prototype-row${sel}:hover`,
			`.lobby-row${sel}:hover`
		], {
			'color': color
		})

		this.stylesheet.insertRule([
			`.prototype-row${sel}:hover .icon-svg-path`,
			`.lobby-row${sel}:hover .icon-svg-path`
		], {
			'stroke': color
		})

		this.stylesheet.insertRule(`${sel} .lobby-card-prototype-icon-box`, {
			'background-color': color
		})

		this.stylesheet.insertRule(`${sel} .lobby-card-prototype-title`, {
			'color': color
		})

		this.stylesheet.insertRule(`.lobby-card-switch${sel}`, {
			'background-color': color
		})
	}

	getAvatarURL({steamID}) {
		return (
			fetch(`${steamPlayerAPI}?key=${steamAPIKey}&steamids=${steamID}`).
			then(reponse => response.json()).
			then(json => new Promise(resolve => resolve(json.players[0].avatarfull)))
		)
	}

	addAvatarCSS(avatarURL) {
		this.stylesheet.insertRule(`.player-${this.id}.player-row::before`, {
			'background-image': `url(${avatarURL})`
		})
	}

	render() {
		render(
			<Provider store={this.store} emm={this.emm}>
				<AppComponent/>
			</Provider>
		, document.getElementById('app-container'))
	}

	show() {
		body.classList.add('active')
		this.emm.togglePanel(true)
	}

	hide() {
		body.classList.remove('active')
		setTimeout(() => {
			if (!body.classList.contains('active')) {
				this.emm.togglePanel(false)
			}
		}, 200)
	}
}

if (!window.EMM) {
	window.EMM = new BrowserEMM
	body.classList.add('browser')
}

new App(window.EMM)