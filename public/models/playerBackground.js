class PlayerBackground extends RModel {

	static get EMOJI_POINTS () { return '🔢' }

	// retorna todas as antecedentes do jogador
	static getAllPlayerBackgrounds (playerId, options = {}) {

		// se nao tiver os filtros, adicionar
		if (! options['filters']) {
			options = { 'filters': {} };
		}

		options['filters']['playerId'] = playerId;

		let playerBackgrounds = this.getAll(options);

		return playerBackgrounds;
	}

	// retorna todas as antecedentes do jogador organizadas numa hash com o indice sendo o id da antecedente
	static getPlayerBackgroundsIndex (playerId, options = {}) {
		let allPlayerBackgrounds = this.getAllPlayerBackgrounds(playerId, options);

		let organizedPlayerBackgrounds = {};

		allPlayerBackgrounds.forEach(function (playerBackground) {

			let backgroundId = playerBackground['backgroundId'];

			organizedPlayerBackgrounds[backgroundId] = playerBackground;
		});

		return organizedPlayerBackgrounds;
	}

	// retornar a background de um player
	static getPlayerBackground (playerId, backgroundId) {
		// se nao tiver os filtros, adicionar
		let options = {
			'filters': {
				'backgroundId': backgroundId
			}
		};

		let playerBackground = this.getAllPlayerBackgrounds(playerId, options);

		return playerBackground[0];
	}

	// calcular o total de pontos de uma antecedente + atributo
	static calculateTotalPoints (backgroundPoints, backgroundModifier = 0) {

		return parseInt(backgroundPoints) + parseInt(backgroundModifier);
	}

	// calcula o resultado da rolagem de dados da antecedente X dificuldade
	static calculateDiceResult (attributeTotalPoints, backgroundDie, backgroundDificulty) {

		let rollPoints = parseInt(backgroundDie) * (parseInt(attributeTotalPoints) / 100);

		return Math.round(rollPoints - backgroundDificulty);
	}
}

RModel.models['PlayerBackground'] = PlayerBackground;
