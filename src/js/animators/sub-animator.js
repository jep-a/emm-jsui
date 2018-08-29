export const transitions = {
	slow: {
		timeout: 400,
		transition: '-webkit-transform 0.4s cubic-bezier(0.5, 0, 0.25, 1)'
	},
	fast: {
		timeout: 200,
		transition: '-webkit-transform 0.2s cubic-bezier(0, 0.5, 0.35, 1)'
	}
}

function offsetLeft(node) {
	return node.offsetLeft - (parseInt(window.getComputedStyle(node).marginLeft) || 0)
}

function offsetWidth(node) {
	const compStyle = window.getComputedStyle(node)

	return node.offsetWidth + parseInt(compStyle.marginLeft) + parseInt(compStyle.marginRight)
}

export default class SubAnimator {
	nodes = {}

	registerNode(nodeName, node) {
		if (!this.nodes[nodeName]) {
			this.nodes[nodeName] = {}
		}

		this.nodes[nodeName].node = node
		this.resolveNode(nodeName, node)
		this.updateOffset(nodeName)
	}

	getNode(nodeName) {
		return this.nodes[nodeName].node
	}

	hasNode(nodeName) {
		const node = this.nodes[nodeName]
		let hasNode

		if (node && node.node) {
			hasNode = true
		} else {
			hasNode = false
		}

		return hasNode
	}

	waitForNode(nodeName) {
		if (!this.nodes[nodeName]) {
			this.nodes[nodeName] = {}
		}

		return new Promise(resolve => {this.nodes[nodeName].resolve = resolve})
	}

	resolveNode(nodeName, node) {
		const _node = this.nodes[nodeName]

		if (_node.resolve) {
			_node.resolve(node)
		}
	}

	updateOffset(nodeName) {
		const node = this.nodes[nodeName]
		const oldOffset = node.offset
		const newOffset = node.offset = offsetLeft(node.node)

		return newOffset - oldOffset
	}

	getSavedOffset(nodeName) {
		return this.nodes[nodeName].offset
	}

	getCurrentOffset(nodeName) {
		return offsetLeft(this.nodes[nodeName].node)
	}

	getCurrentWidth(nodeName) {
		return offsetWidth(this.nodes[nodeName].node)
	}

	setStyle(nodeName, style) {
		let node

		if (nodeName instanceof Node) {
			node = nodeName
		} else {
			node = this.nodes[nodeName].node
		}

		for (const key in style) {
			node.style[key] = style[key]
		}
	}

	flashTransform(nodeName, transform, transition) {
		const {style} = this.nodes[nodeName].node

		window.requestAnimationFrame(() => {
			style.webkitTransition = ''
			style.webkitTransform = transform

			window.requestAnimationFrame(() => {
				style.webkitTransition = transition
				style.webkitTransform = ''
			});
		});
	}
}