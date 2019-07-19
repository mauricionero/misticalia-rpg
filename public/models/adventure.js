class Adventure extends RModel {

	// TODO:
		// criar um metodo javascript que renderize o menu (prever permissoes)
		// ao selecionar uma aventura, o menu deve ser renderizado novamente, pois pode mudar com as permissoes (mestre ou jogador)

	static ROLE_UNDEFINED = 0;
	static ROLE_PLAYER = 1;
	static ROLE_MASTER = 2;
	
	static EMOJI_ROLE_PLAYER = '♟️';
	static EMOJI_ROLE_MASTER = '♚️';
	static EMOJI_OPEN = '📂';
	static EMOJI_NAME = '🏷';
	static EMOJI_WORLD_STYLE = '🌎';

	static EMOJI_ROLE = {
		1: Adventure.EMOJI_ROLE_PLAYER,
		2: Adventure.EMOJI_ROLE_MASTER
	};

	static currentAdventureId = 0;

	// pegar do server todas as aventuras que o usuario atual pertence
	static getUserAdventures () {

		let localAdventures = localStorage.getItem('adventures');

		let adventures = JSON.parse(localStorage.getItem('adventures'));

		if (adventures == null) {
			adventures = [];
		}

		return adventures;
	}

	// criar uma nova aventura
	static newAdventure (adventure) {

		let adventures = Adventure.getUserAdventures();

		adventure['role'] = Adventure.ROLE_MASTER;

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

	static getCurrentAdventureId () {
		return Adventure.currentAdventureId;
	}

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

	static getCurrentAdventureRole () {
		let currentAdventure = Adventure.getCurrentAdventure();

		if (currentAdventure) {
			return currentAdventure['role'];
		} else {
			return Adventure.ROLE_UNDEFINED
		}
	}

	static setCurrentAdventureId (adventureId) {
		return this.currentAdventureId = adventureId;
	}

}
