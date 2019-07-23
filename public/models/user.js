class User extends RModel {

	static get EMOJI_LOGIN () { return '@' };

	// retornar o usuario atual (logado)
	static myUser () {

		//TODO: criar no server algo que retorne o user e salvar na localStorage
			// null quando nao estiver logado
		
		return {
			username: 'mauricionero',
			token: 'ttt12345678'
		};

	}

}
