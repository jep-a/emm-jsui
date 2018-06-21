export default class StyleSheet {
	constructor() {
		this.style = document.createElement('style')
		document.head.appendChild(this.style)
	}

	insertRule(selector, rule, i) {
		const {sheet} = this.style
		let ruleString
		
		if (selector instanceof Array) {
			ruleString = selector.join()
		} else {
			ruleString = selector
		}

		ruleString += '{'

		for (let key in rule) {
			ruleString += `${key}:${rule[key]};`
		}

		ruleString += '}'

		this.style.sheet.insertRule(ruleString, i || (this.style.sheet.rules || this.style.sheet.cssRules).length)
	}
}
