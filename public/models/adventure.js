class Adventure extends RModel {

	// TODO:
		// criar um metodo javascript que renderize o menu (prever permissoes)
		// ao selecionar uma aventura, o menu deve ser renderizado novamente, pois pode mudar com as permissoes (mestre ou jogador)

	static get ROLE_UNDEFINED () { return 0 };
	static get ROLE_PLAYER () { return 1 };
	static get ROLE_MASTER () { return 2 };
	
	static get EMOJI_ROLE_PLAYER () { return '♟️' };
	static get EMOJI_ROLE_MASTER () { return '♚️' };
	static get EMOJI_OPEN () { return '📂' };
	static get EMOJI_NAME () { return '🏷' };
	static get EMOJI_WORLD_STYLE () { return '🌎' };

	static get EMOJI_ROLE () {
		return {
			1: Adventure.EMOJI_ROLE_PLAYER,
			2: Adventure.EMOJI_ROLE_MASTER
		}
	};

	// pegar do server todas as aventuras que o usuario atual pertence
	static getUserAdventures () {

		let adventures = JSON.parse(localStorage.getItem('adventures'));

		if (adventures == null || adventures == undefined) {
			adventures = [];
		}

		return adventures;
	}

	// criar uma nova aventura
	static newAdventure (adventure) {
		var randomId = Math.floor(Math.random() * 100000);

		let adventures = Adventure.getUserAdventures();

		adventure['id'] = 't' + randomId; // criar um id temporario local enquanto nao salva no servidor
		adventure['role'] = Adventure.ROLE_MASTER;
		
		//TODO: validar preenchimento

		adventures.push(adventure);

		console.log('adventures', adventures);

		try {
			localStorage.setItem("adventures", JSON.stringify(adventures));

			return true;
		}
		catch (err) {
			alert(err.name);

			return false;
		}
	}

	// pegar o id da aventura atual
	static getCurrentAdventureId () {
		let currentAdventureId = localStorage.getItem('currentAdventureId');

		if (currentAdventureId == null || currentAdventureId == undefined) {
			currentAdventureId = 0;
		}

		return currentAdventureId;
	}

	// setar o id da aventura atual
	static setCurrentAdventureId (currentAdventureId) {
		console.log('currentAdventureId', currentAdventureId);
		try {
			localStorage.setItem("currentAdventureId", currentAdventureId);

			return true;
		}
		catch (err) {
			alert(err.name);

			return false;
		}
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
