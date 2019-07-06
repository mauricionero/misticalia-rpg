class User extends RModel {

	// retornar o usuario atual (logado)
	static myUser () {
		// null quando nao estiver logado
		
		return {
			username: 'mauricionero',
			token: 'ttt12345678'
		};

	}

}
