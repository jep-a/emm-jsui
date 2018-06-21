import LobbyStore from './stores/lobbies'
import PlayerStore from './stores/players'
import PrototypeStore from './stores/prototypes'
import ViewStore from './stores/view'

export default class Store {
	constructor(
		emm,
		{
			clientID,
			players,
			prototypes,
			lobbies
		},
		stylesheet
	) {
		this.emm = emm
		this.stylesheet = stylesheet
		this.view = new ViewStore(this)
		this.players = new PlayerStore(this, clientID, players)
		this.prototypes = new PrototypeStore(this, prototypes)
		this.lobbies = new LobbyStore(this, lobbies)
	}
}