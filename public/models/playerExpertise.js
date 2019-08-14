class PlayerExpertise extends RModel {

	// retorna todas as pericias do jogador
	static getAllPlayerExpertises (playerId, options = {}) {

		// se nao tiver os filtros, adicionar
		if (! options['filters']) {
			options = { 'filters': { } };
		}

		options['filters']['playerId'] = playerId;

		let playerExpertises = this.getAll(options);

		return playerExpertises;
	}
}

RModel.models['PlayerExpertise'] = PlayerExpertise;
