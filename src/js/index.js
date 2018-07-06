import './polyfill'

import {Provider} from 'mobx-react'
import {render} from 'react-dom'
import React from 'react'

import {BrowserEMM, browserStore} from './browser'
import AppComponent from './components/app'
import Store from './store'
import Stylesheet from './stylesheet'
import Animator from './animator'

const body = document.body

class App {
	constructor(emm, initStore) {
		window.app = this

		this.emm = emm
		this.stylesheet = new Stylesheet
		this.animator = new Animator
		this.store = new Store(emm, initStore, this.stylesheet, this.animator)
		this.render()
	}

	render() {
		render(
			(
				<Provider store={this.store} emm={this.emm}>
					<AppComponent/>
				</Provider>
			),
			body
		)
	}

	show() {
		body.classList.add('active')
		this.emm.togglePanel(true)
	}

	hide() {
		body.classList.remove('active')

		setTimeout(
			() => {
				if (!body.classList.contains('active')) {
					this.emm.togglePanel(false)
				}
			},
			200
		)
	}
}

if (window.EMM) {
	new App(window.EMM, window.emmStore)
} else {
	new App(new BrowserEMM, browserStore)
	body.classList.add('browser')
}