class Adventure extends RModel {

	// TODO:
		// criar um metodo javascript que renderize o menu (prever permissoes)
		// ao selecionar uma aventura, o menu deve ser renderizado novamente, pois pode mudar com as permissoes (mestre ou jogador)

	static ROLE_PLAYER = 1;
	static ROLE_MASTER = 2;
	
	static EMOJI_ROLE_PLAYER = '♚️';
	static EMOJI_ROLE_MASTER = '♟️';
	static EMOJI_OPEN = '📂';
	static EMOJI_NAME = '📂';

	static EMOJI_ROLE = {
		1: Adventure.EMOJI_ROLE_PLAYER,
		2: Adventure.EMOJI_ROLE_MASTER
	};

	static currentAdventureId = null;

	// pegar do server todas as aventuras que o usuario atual pertence
	static getUserAdventures () {

		return [
			{
				id: 1,
				role: Adventure.ROLE_MASTER,
				name: 'Misticália'
			},
			{
				id: 2,
				role: Adventure.ROLE_PLAYER,
				name: 'Teste'
			}
		]
	}

	static getCurrentAdventureId () {
		return this.currentAdventureId;
	}

	static setCurrentAdventureId (adventureId) {
		return this.currentAdventureId = adventureId;
	}

}
