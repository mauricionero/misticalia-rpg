class PlayerItem extends RModel {

	static get EMOJI_VISUALIZE () { return '💊' }
	static get EMOJI_USE () { return '🍾' }

	static get EMOJI_QUANTITY () { return '📦' }

	// traduções dos campos
	static get fieldTranslations () {
		return {
			'quantity': 'quantidade',
		}
	}


	// adicionar um novo equipamento ao jogador
	addPlayerItem () {
		
		return this.save();
	}


	// validações dessa model
	validations () {
		return {
			'itemId': {
				'uniqueness': {
					'scope': [ 'playerId' ]
				}
			},
			'quantity' : {
				'mandatory': true
			}
		}
	}

	// usaqr o item no personagem
	useItem (useQuantity = 1) {
		let quantity = this['quantity'];
		let itemId = this['itemId'];
		let playerId = this['playerId'];

		// se tentar usar mais do que tem, converte para o maximo que tem
		if (useQuantity > quantity) {
			useQuantity = quantity;
		}

		// consumir a quantidade solicitada
		quantity -= useQuantity;

		let resultSaved = false;

		// se consumiu tudo, remover do player para nao ocupar espaço atoa na listagem
		if (quantity <= 0) {
			resultSaved = this.destroy();

		// se ainda tem, nao consumiu tudo, soh altera a quantidade
		} else {
			this['quantity'] = quantity;

			resultSaved = this.save();
		}

		// se removeu com sucesso, aplicar modificadores no personagem
		if (resultSaved) {
			let instantModifiers = InstantModifier.getAllInstantModifiers(itemId);

			instantModifiers.forEach(function (instantModifier) {
				return instantModifier.applyModifier(playerId);

			}, this);
		} else {
			console.error(t('Ocorreu um erro ao salvar a quantidade do item'));
		}

		return resultSaved;
	}

	// retorna todos os equipamentos do jogador
	static getAllPlayerItems (playerId) {

		let options = { 'filters': { 'playerId': playerId } };

		let playerItems = PlayerItem.getAll(options);

		return playerItems;
	}

	// retorna 1 item especifico pelo id
	static getPlayerItem (playerItemId) {

		let options = { 'filters': { 'id': playerItemId } };

		let playerItems = PlayerItem.getAll(options);

		return playerItems[0];
	}
}

RModel.models['PlayerItem'] = PlayerItem;
