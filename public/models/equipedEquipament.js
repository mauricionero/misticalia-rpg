class EquipedEquipament extends RModel {

	// equipar um novo equipamento ao jogador
	equipEquipament () {
		
		return this.save();
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

	//recalcular os modificadores dos equipamentos equipados no jogador
	static recalculateEquipedModifiers (playerId) {
		let allEquipedEquipaments = this.getAllPlayerEquipedEquipaments(playerId);

		let player = Player.getPlayer(playerId);

		player.clearPermanentModifiers();

		// pegar todos os equipamentos equipados no jogador
		allEquipedEquipaments.forEach(function (equipedEquipament) {

			let equipamentId = equipedEquipament['equipamentId'];
			let equipamentTypeId = equipedEquipament['equipamentTypeId'];

			let options = { 'filters': { 'equipamentId': equipamentId } }
			let modifiers = Modifier.getAll(options);

			// calcular para todos os modificadores desse equipamento
			modifiers.forEach(function (modifier) {

				let typeId = modifier['typeId'];
				let value = parseInt(modifier['value']);

				let typeAttribute = Modifier.ALL_TYPES[typeId];

				// verificar se esse atributo existe antes de somar
				if (player[typeAttribute] == undefined) {
					player[typeAttribute] = {}
				}

				let basePoints = parseInt(player[typeAttribute]['basePoints'] || 0);
				let temporaryModifier = parseInt(player[typeAttribute]['temporaryModifier'] || 0);
				let permanentModifier = parseInt(player[typeAttribute]['permanentModifier'] || 0);

				permanentModifier += value;

				player[typeAttribute]['permanentModifier'] = permanentModifier;

				player[typeAttribute]['points'] = Player.calculateTotalPoints(basePoints, temporaryModifier, permanentModifier);

			});
		});

		let resultSaved = player.savePlayer();
	}
}

RModel.models['EquipedEquipament'] = EquipedEquipament;
