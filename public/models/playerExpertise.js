class PlayerExpertise extends RModel {

	static get EMOJI_POINTS () { return '🔢' }

	// retorna todas as pericias do jogador
	static getAllPlayerExpertises (playerId, options = {}) {

		// se nao tiver os filtros, adicionar
		if (! options['filters']) {
			options = { 'filters': {} };
		}

		options['filters']['playerId'] = playerId;

		let playerExpertises = this.getAll(options);

		return playerExpertises;
	}

	// retorna todas as pericias do jogador organizadas numa hash com o indice sendo o id da pericia
	static getPlayerExpertisesIndex (playerId, options = {}) {
		let allPlayerExpertises = this.getAllPlayerExpertises(playerId, options);

		let organizedPlayerExpertises = {};

		allPlayerExpertises.forEach(function (playerExpertise) {

			let expertiseId = playerExpertise['expertiseId'];

			organizedPlayerExpertises[expertiseId] = playerExpertise;
		});

		return organizedPlayerExpertises;
	}

	// calcular o total de pontos de uma pericia + atributo
	static calculateTotalPoints (expertisePoints, expertiseMultiplier, attributePoints, expertiseModifier = 0) {

		return Math.round(parseInt(attributePoints) + ( (parseInt(expertisePoints) + parseInt(expertiseModifier) ) * parseFloat(expertiseMultiplier) ) );
	}

	// calcula o resultado da rolagem de dados da pericia X dificuldade
	static calculateDiceResult (attributeTotalPoints, expertiseDie, expertiseDificulty) {

		let rollPoints = parseInt(expertiseDie) * (parseInt(attributeTotalPoints) / 100);

		return Math.round(rollPoints - expertiseDificulty);
	}
}

RModel.models['PlayerExpertise'] = PlayerExpertise;
