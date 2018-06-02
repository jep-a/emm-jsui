import React, {Component} from 'react'
import PrototypeRow from './prototype-row'

export default class PrototypeList extends Component {
	render() {
		return (
			<section id="prototypes-column" className="column">
				<h1 className="column-title">make a lobby</h1>
				<div id="prototypes-body" className="column-body">
					<ul id="prototype-list">
						{Array.from(this.props.prototypes.values()).map(prototype =>
							<PrototypeRow key={prototype.id} prototype={prototype}/>
						)}
					</ul>
				</div>
			</section>
		)
	}
}