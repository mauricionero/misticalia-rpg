class EquipedEquipament extends RModel {

	// equipar um novo equipamento ao jogador
	static equipEquipament (newEquipedEquipament) {
		
		return this.saveItem(newEquipedEquipament);
	}

	// desequipar o equipamento do jogador
	static unequipEquipament (playerId, playerEquipamentId) {

		let options = {
			'filters': {
				'playerId': playerId,
				'playerEquipamentId': playerEquipamentId
			}
		}

		return this.removeItem(options);
	}

	// retorna todos os equipamentos equipados do jogador
	static getAllPlayerEquipedEquipaments (playerId, options = {}) {

		// se nao tiver os filtros, adicionar
		if (! options['filters']) {
			options = { 'filters': { } };
		}

		options['filters']['playerId'] = playerId;

		let playerEquipedEquipaments = this.getAll(options);

		return playerEquipedEquipaments;
	}
}
