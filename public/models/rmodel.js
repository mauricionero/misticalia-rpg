class RModel {

	// fazer as validações
	static validate (newData) {

		let errorMessages = [];

		let validations = this.validations();

		if (typeof validations == 'object') {
			for (var fieldValidate in validations) {
				let whichValidations = validations[fieldValidate];

				for (var whichValidation in whichValidations) {

					if (whichValidation == 'uniqueness') {
						let scope = whichValidations[whichValidation]['scope'];

						let options = { 'filters': {} };

						options['filters'][fieldValidate] = newData[fieldValidate];

						// montar uma filtragem com todos os campos, se vier algum, eh invalido
						scope.forEach(function (fieldName) {
							options['filters'][fieldName] = newData[fieldName];
						});

						let duplicateEntries = this.getAll(options);

						if (duplicateEntries.length) {
							errorMessages.push(t('Já contém um igual'));
						}
					} else if (whichValidation == 'mandatory') {
						let isMandatory = whichValidations[whichValidation];

						// se for realmente obrigatorio
						if (isMandatory) {

							if (! newData[fieldValidate]) {

								let fieldNameTranslated = fieldValidate;

								// se existe o metodo de tradução dos campos da model
								// deixar esses warnings, eles auxiliam o que fazer em caso desse erro
								if (this.fieldTranslations == undefined) {
									console.warn(sprintf(t('Nenhum metodo de tradução encontrado para a model %s'), this.name));
									console.warn(sprintf(t('Deve ser implementado o metodo static fieldTranslations dentro da model %s'), this.name));
								} else if (this.fieldTranslations[fieldValidate] == undefined) {
									console.warn(sprintf(t('Não contém a tradução do campo %s dentro do metodo static fieldTranslations da model %s'), fieldValidate, this.name));
								} else {
									fieldNameTranslated = t(this.fieldTranslations[fieldValidate]);
								}

								errorMessages.push(sprintf(t('Obrigatório preencher o campo %s'), fieldNameTranslated));
							}
						}
					}
				}
			}
		}

		return errorMessages;
	}

	// criar novo ou editar um item
	static saveItem (item) {
		let storeName = this.name;

		let randomId = Math.floor(Math.random() * 100000);

		item['currentAdventureId'] = RModel.getSingleAttribute('currentAdventureId');

		let errorMessages = [];

		// validação
		if (this.validate === 'function') {
			errorMessages = this.validate(item);
		}
		
		// se for valido
		if (errorMessages.length == 0) {
			let storeData = this.getAll();

			// se nao tiver id: criar um para depois adicionar o novo item
			if (! item['id']) {
				item['id'] = 't' + randomId; // criar um id temporario local enquanto nao salva no servidor

			// se ja tiver id, procurar na store local e apagar para depois re-adicionar o item
			} else {
				// filtrando os dados
				storeData = storeData.filter(function (singleData) {

					// soh remove do filtro se for o id atual
					if (singleData['id'] == item['id']) {
						return false;
					}

					return true;
				});
			}

			// adicionar item na store local
			storeData.push(item);

			try {
				localStorage.setItem(storeName, JSON.stringify(storeData));

				return true;
			}
			catch (err) {
				alert(err.name);

				return false;
			}
		} else {
			alert(errorMessages.join('\n'));

			return false;
		}
	}

	// remover item de acordo com filtros
	static removeItem (options = {}) {
		let storeName = this.name;

		// pega todos os itens que nao estao no filtro
		let storeData = this.getAll(options, true);

		console.log('options removeItem', options);
		console.log('storeData removeItem', storeData);

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
	static getAll (options = {}, invert = false) {
		let storeName = this.name;

		let storeData = JSON.parse(localStorage.getItem(storeName));

		if (storeData == null || storeData == undefined) {
			storeData = [];
		}

		// verificar se tem alguma filtragem dos dados
		if (typeof options['filters'] == 'object') {

			// filtrando os dados
			storeData = storeData.filter(function (singleData) {
				let onFilter = true;

				for (var filterField in options['filters']) {
					let filterValue = options['filters'][filterField];

					// se for um array
					if (Array.isArray(filterValue)) {

						let inArray = false;

						filterValue.forEach(function (filterSingleValue) {
							if (singleData[filterField] == filterSingleValue) {
								inArray = true;
							}
						});

						// se nao achou no array, marcar para remover do filtro
						if (! inArray) {
							onFilter = false;
						}

					} else {

						// soh remove do filtro se algum dos valores nao estiver no filtro
						if (singleData[filterField] != filterValue) {
							onFilter = false;

							// se ja achou o que precisava, sai do loop
							break;
						}
					}
				}

				// retorna verificando se deve inverter a logica
				return onFilter != invert;
			});
		}

		// verificar se tem alguma ordenação dos dados
		if (typeof options['order'] == 'object') {

			// ordenação com logica manual
			storeData.sort(function(obj1, obj2) {

				let compResult = 0;

				for (var orderField in options['order']) {
					let thisResult = 0;
					let orderDirection = options['order'][orderField]; // asc ou desc

					let value1 = obj1[orderField];
					let value2 = obj2[orderField];

					if (typeof value1 == 'string') {
						value1 = value1.toLowerCase();
					}

					if (typeof value2 == 'string') {
						value2 = value2.toLowerCase();
					}

					// se for menor
					if (value1 < value2) {
						thisResult = -1;

					// se for maior
					} else if (value1 > value2) {
						thisResult = 1;
					}

					// se tiver que inverter a ordem
					if (orderDirection.toLowerCase() == 'desc') {
						thisResult = thisResult * -1;
					}

					compResult = compResult || thisResult;
				}

				return compResult;
			})
		}

		return storeData;
	}
	
	// retornar todos os dados relacionados aa essa model da aventura atual
	static getAllFromCurrentAdventure (options = {}) {
		let storeName = this.name;

		let currentAdventureId = Adventure.getCurrentAdventureId();

		let storeData = this.getAll(options);

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