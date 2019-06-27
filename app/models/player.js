class Player extends RModel {

	static getAllPlayers () {

		return [
			{
				id: 1,
				name: 'P1',
				dextery: 80
			},
			{
				id: 2,
				name: 'P2',
				dextery: 60
			},
			{
				id: 3,
				name: 'P3',
				dextery: 40
			}
		];
	}

	static getMax (player_attribute) {
		let allPlayers = Player.getAllPlayers();

		return Math.max.apply(Math, allPlayers.map(function(player) { return player[player_attribute]; }))
	}
}
