class User extends RModel {

	static get EMOJI_LOGIN () { return '@' };

	// retornar o usuario atual (logado)
	static myUser () {
		// null quando nao estiver logado
		
		return {
			username: 'mauricionero',
			token: 'ttt12345678'
		};

	}

}
