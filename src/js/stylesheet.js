export default class StyleSheet {
	constructor() {
		this.style = document.createElement('style')
		document.head.appendChild(this.style)
	}

	insertRule(sel, rule, i) {
		let ruleString = sel instanceof Array ? sel.join() : sel
		ruleString += '{'
		for (let key in rule) {
			ruleString += `${key}:${rule[key]};`
		}
		ruleString += '}'
		this.style.sheet.insertRule(ruleString, i || (this.style.sheet.rules || this.style.sheet.cssRules).length)
	}
}
