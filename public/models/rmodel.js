class RModel {

	// inserir um novo dado relacionado aa essa model
	static saveNew (newData) {
		let storeName = this.name;

		let randomId = Math.floor(Math.random() * 100000);

		let storeData = this.getAll();

		newData['id'] = 't' + randomId; // criar um id temporario local enquanto nao salva no servidor
		newData['currentAdventureId'] = RModel.getSingleAttribute('currentAdventureId');
		
		//TODO: validar preenchimento (criar padrao de static com os campos e os tipos de validacao)
			// criar na RModel um validador e verificar se existem campos nesse metodo estatico a serem validados

		storeData.push(newData);

		try {
			localStorage.setItem(storeName, JSON.stringify(storeData));

			return true;
		}
		catch (err) {
			alert(err.name);

			return false;
		}
	}
	
	// retornar todos os dados relacionados aa essa model
	static getAll () {
		let storeName = this.name;

		let storeData = JSON.parse(localStorage.getItem(storeName));

		if (storeData == null || storeData == undefined) {
			storeData = [];
		}

		return storeData;
	}
	
	// retornar todos os dados relacionados aa essa model da aventura atual
	static getAllFromCurrentAdventure () {
		let storeName = this.name;

		let currentAdventureId = Adventure.getCurrentAdventureId();

		let storeData = this.getAll();

		return storeData.filter(function ( singleData ) { return singleData['currentAdventureId'] == currentAdventureId });

		return storeData;
	}

	// pegar um atributo singular do armazenamento local
	static getSingleAttribute (attribute) {

		let singleAttribute = localStorage.getItem(attribute);

		return singleAttribute;
	}

	// salvar um atributo singular do armazenamento local
	static setSingleAttribute (attribute, value) {

		try {
			localStorage.setItem(attribute, value);

			return true;
		}
		catch (err) {
			alert(err.name);

			return false;
		}
	}

}