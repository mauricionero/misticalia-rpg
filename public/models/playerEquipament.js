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
		
		return this.saveNew(newPlayerEquipament);
	}

	// retorna todos os equipamentos do jogador
	static getAllPlayerEquipaments (playerId) {

		let options = { 'filters': { 'playerId': playerId } };

		let playerEquipaments = PlayerEquipament.getAll(options);

		return playerEquipaments;

		return [
			{
				id: 1,
				type: Equipament.TYPE_CHESTPLATE,
				name: t('Peitoral de bronze'),
				weight: 13000,
				origin: Equipament.ORIGIN_PLATAFORM,
				modifiers: [
					{
						attribute: Modifier.DEXTERY,
						value: -10,
						observation: t('Pesado')
					},
					{
						attribute: Modifier.STRENGTH,
						value: -4,
						observation: t('- mobilidade')
					},
					{
						attribute: Modifier.DEFENSE,
						value: 15,
					}
				]
			},
			{
				id: 3,
				type: Equipament.TYPE_SHIELD,
				name: t('Escudo de madeira'),
				weight: 3000,
				origin: Equipament.ORIGIN_PLATAFORM,
				modifiers: [
					{
						attribute: Modifier.DEXTERY,
						value: -5,
						observation: t('Leve')
					},
					{
						attribute: Modifier.STRENGTH,
						value: -4,
						observation: t('- mobilidade')
					},
					{
						attribute: Modifier.DEFENSE,
						value: 10
					}
				]
			}
		]
	}
}
