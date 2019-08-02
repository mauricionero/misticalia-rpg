class PlayerEquipament extends RModel {

	static get EMOJI_VISUALIZE () { return '🛡️' }

	// traduções dos campos
	static get fieldTranslations () {
		return {
			'quantity': 'quantidade',
		}
	}


	// adicionar um novo equipamento ao jogador
	addPlayerEquipament () {
		
		return this.save();
	}


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

	// retorna todos os equipamentos do jogador
	static getAllPlayerEquipaments (playerId) {

		let options = { 'filters': { 'playerId': playerId } };

		let playerEquipaments = PlayerEquipament.getAll(options);

		return playerEquipaments;
	}
}

RModel.models['PlayerEquipament'] = PlayerEquipament;
