class Adventure extends RModel {

	static get EMOJI_MAIN () { return '🌎' };
	
	static get EMOJI_ADD () { return '➕' };
	static get EMOJI_OPEN () { return '📂' };

	static get ROLE_UNDEFINED () { return 0 };
	static get ROLE_PLAYER () { return 1 };
	static get ROLE_MASTER () { return 2 };
	
	static get EMOJI_ROLE_PLAYER () { return '♟️' };
	static get EMOJI_ROLE_MASTER () { return '♚️' };
	static get EMOJI_OPEN () { return '📂' };
	static get EMOJI_NAME () { return '🏷' };
	static get EMOJI_WORLD_STYLE () { return '🌎' };


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
				'uniqueness': {},
				'mandatory': true
			}
		}
	}


	// criar uma nova aventura
	newAdventure () {
		this['role'] = Adventure.ROLE_MASTER;
		
		return this.save();
	}
	

	static get EMOJI_ROLE () {
		return {
			1: Adventure.EMOJI_ROLE_PLAYER,
			2: Adventure.EMOJI_ROLE_MASTER
		}
	};

	// retornar todas as aventuras do usuario atual num array
	static getUserAdventures () {

		let adventures = Adventure.getAll();

		return adventures;
	}

	// pegar o id da aventura atual
	static getCurrentAdventureId () {

		let currentAdventureId = RModel.getSingleAttribute('currentAdventureId');

		if (currentAdventureId == null || currentAdventureId == undefined) {
			currentAdventureId = 0;
		}

		return currentAdventureId;
	}

	// setar o id da aventura atual
	static setCurrentAdventureId (currentAdventureId) {

		return RModel.setSingleAttribute('currentAdventureId', currentAdventureId);
	}

	// pegar a aventura atual
	static getCurrentAdventure () {
		let myAdventures = Adventure.getUserAdventures();
		let currentAdventureId = Adventure.getCurrentAdventureId();
		let currentAdventure = null;

		if (myAdventures != null) {
			currentAdventure = myAdventures.filter(adv => {
				return adv.id == currentAdventureId;
			});

			currentAdventure = currentAdventure[0];
		}

		return currentAdventure;
	}

	// pegar o papel da aventura atual (mestre, jogador ou nenhum)
	static getCurrentAdventureRole () {
		let currentAdventure = Adventure.getCurrentAdventure();

		if (currentAdventure) {
			return currentAdventure['role'];
		} else {
			return Adventure.ROLE_UNDEFINED;
		}
	}

	// pegar o nome da aventura atual
	static getCurrentAdventureName () {
		let currentAdventure = Adventure.getCurrentAdventure();

		if (currentAdventure) {
			return currentAdventure['name'];
		} else {
			return '';
		}
	}

}

RModel.models['Adventure'] = Adventure;
