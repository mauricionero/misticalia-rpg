class Item extends RModel {

	static get EMOJI_MAIN () { return '💊' }
    static get EMOJI_VISUALIZE () { return '👁️' }

	static get EMOJI_NAME () { return '🏷️' }
	static get EMOJI_WEIGHT () { return '⚖️' }
	static get EMOJI_DESCRIPTION () { return '📝' }

	// validações dessa model
	validations () {
		return {
			'name' : {
				'mandatory': true
			},
			'name': {
				'uniqueness': {
					'scope': [ 'currentAdventureId' ]
				}
			}
		}
	}


	// salvar um item (editar ou criar um novo)
	saveItem () {

		return this.save();
	}


	// retorna todos os itens da aventura atual
	static getAllItemsCurrentAdventure (options) {

		let allCurrentItems = this.getAllFromCurrentAdventure(options);

		return allCurrentItems;
	}

	// retorna todos os itens num array
	static getAllItems (options) {

		let items = this.getAll(options); 

		return items;
	}
}

RModel.models['Item'] = Item;
