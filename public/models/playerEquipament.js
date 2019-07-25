class PlayerEquipament extends RModel {

	static get EMOJI_VISUALIZE () { return '🛡️' }

	// traduções dos campos
	static get fieldTranslations () {
		return {
			'quantity': 'quantidade',
		}
	};

	// validações dessa model
	static validations () {
		return {
			'equipamentId': {
				'uniqueness': {
					'scope': [ 'playerId' ]
				}
			},
			'quantity' : {
				'mandatory': true
			}
		}
	}

	// adicionar um novo equipamento ao jogador
	static addPlayerEquipament (newPlayerEquipament) {
		
		return this.saveItem(newPlayerEquipament);
	}

	// retorna todos os equipamentos do jogador
	static getAllPlayerEquipaments (playerId) {

		let options = { 'filters': { 'playerId': playerId } };

		let playerEquipaments = PlayerEquipament.getAll(options);

		return playerEquipaments;
	}
}
