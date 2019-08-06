class Item extends RModel {

	static get EMOJI_MAIN () { return '💊' }
    static get EMOJI_VISUALIZE () { return '👁️' }
	static get EMOJI_ADD () { return '✚' }

	static get EMOJI_NAME () { return '🏷️' }
	static get EMOJI_WEIGHT () { return '⚖️' }
	static get EMOJI_DESCRIPTION () { return '📝' }

	// traduções dos campos
	static get fieldTranslations () {
		return {
			'name': 'Nome',
		}
	}

	// validações dessa model
	validations () {
		return {
			'name': {
				'uniqueness': {
					'scope': [ 'currentAdventureId' ]
				},
				'mandatory': true
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

	// retorna 1 item especifico pelo id
	static getItem (itemId) {
		let allItems = Item.getAllItems();

		return allItems.filter(function ( item ) { return item['id'] == itemId })[0];
	}
}

RModel.models['Item'] = Item;
