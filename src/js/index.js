import './polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'
import BrowserEMM from './browser'
import Stylesheet from './stylesheet'
import Store from './store'
import AppComponent from './components/app'

const body = document.getElementsByTagName('body')[0]

class App {
	stylesheet = new Stylesheet
	store = new Store

	constructor() {
		window.app = this
		this.fillStore()
		this.render()
	}

	fillStore() {
		this.store.loadFromJSON()
	}

	render() {
		render(<AppComponent currentPlayer={this.store.currentPlayer} prototypes={this.store.prototypes} lobbies={this.store.lobbies} lobbyContext={this.store.lobbyContext}/>, document.getElementById('app-container'))
	}

	show() {
		body.classList.add('active')
		window.EMM.togglePanel(true)
	}

	hide() {
		body.classList.remove('active')
		setTimeout(() => {
			if (!body.classList.contains('active')) {
				window.EMM.togglePanel(false)
			}
		}, 200)
	}
}

if (!window.EMM) {
	window.EMM = new BrowserEMM
	body.classList.add('browser')
}

new App