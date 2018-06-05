import React, {Component} from 'react'

import PrototypeRow from './prototype-row'

export default class PrototypeList extends Component {
	render() {
		return (
			<section className="prototypes-column column">
				<h1 className="column-title">make a lobby</h1>
				<div className="prototypes column-body">
					<ul className="prototypes-list">
						{Array.from(this.props.prototypes.values()).map(prototype =>
							<PrototypeRow key={prototype.id} prototype={prototype}/>
						)}
					</ul>
				</div>
			</section>
		)
	}
}