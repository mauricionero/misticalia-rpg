class Equipament extends RModel {

	static get EMOJI_MAIN () { return '⛨' }

	static get EMOJI_ADD () { return '⛨' }

    static get EMOJI_VISUALIZE () { return '👁️' }
	static get EMOJI_QUANTITY () { return '📦' }

	static get EMOJI_REMOVE () { return '❎' }

	static get TYPE_CHESTPLATE () { return 1 }
	static get EMOJI_CHESTPLATE () { return '👕' }
	static get TYPE_HELMET () { return 2 }
	static get EMOJI_HELMET () { return '👷' }
	static get TYPE_LEGGING () { return 3 }
	static get EMOJI_LEGGING () { return '👖' }
	static get TYPE_BOOTS () { return 4 }
	static get EMOJI_BOOTS () { return '👣' }
	static get TYPE_ATACK () { return 5 }
	static get EMOJI_ATACK () { return '🗡️' }
	static get TYPE_SHIELD () { return 6 }
	static get EMOJI_SHIELD () { return '🛡️' }
	static get TYPE_AMULET () { return 7 }
	static get EMOJI_AMULET () { return '🔵' }
	static get TYPE_RING () { return 8 }
	static get EMOJI_RING () { return '⭕' }

	static get ORIGIN_PLATAFORM () { return 1 }
	static get ORIGIN_OTHER_PLAYER () { return 2 }

	static get EMOJI_TYPE () { return '🛡️' }
	static get EMOJI_NAME () { return '🏷️' }
	static get EMOJI_WEIGHT () { return '⚖️' }

	static get EMOJI_TYPES () {
		return {
			1: Equipament.EMOJI_CHESTPLATE,
			2: Equipament.EMOJI_HELMET,
			3: Equipament.EMOJI_LEGGING,
			4: Equipament.EMOJI_BOOTS,
			5: Equipament.EMOJI_ATACK,
			6: Equipament.EMOJI_SHIELD,
			7: Equipament.EMOJI_AMULET,
			8: Equipament.EMOJI_RING
		}
	}

	static get ALL_TYPE_NAMES () {
		return {
			1: t('Peito'),
			2: t('Cabeça'),
			3: t('Pernas'),
			4: t('Pés'),
			5: t('Ataque'),
			6: t('Defesa'),
			7: t('Amuleto'),
			8: t('Anel')
		}
	}

	static get ALL_TYPE_DESCRIPTIONS () {
		return {
			1: t('Para se colocar no torax'),
			2: t('Para colocar na cabeça'),
			3: t('Para colocar nas pernas'),
			4: t('Para colocar nos pés'),
			5: t('Para colocar na mão que ataca'),
			6: t('Para colocar na mão que defende'),
			7: t('Para se usar no pescoço'),
			8: t('Para se usar nos dedos')
		}
	};

	// traduções dos campos
	static get fieldTranslations () {
		return {
			'name': 'Nome',
		}
	}

	// validações dessa model
	validations () {
		return {
			'name' : {
				'mandatory': true
			},
			'name': {
				'uniqueness': {
					'scope': [ 'currentAdventureId' ]
				}
			}
		}
	}


	// salvar um equipamento (editar ou criar um novo)
	saveEquipament () {

		return this.save();
	}


	//TODO: validar

	// pegar a tradução do tipo
	static getTypeName (typeId) {
		return Equipament.ALL_TYPE_NAMES[typeId]
	}

	// retorna 1 equipamento especifico pelo id
	static getEquipament (EquipamentId) {
		let allEquipaments = Equipament.getAllEquipaments();

		return allEquipaments.filter(function ( equipament ) { return equipament['id'] == EquipamentId })[0];
	}

	// retorna todos os equipamentos da aventura atual
	static getAllEquipamentsCurrentAdventure (options) {

		let allCurrentEquipaments = Equipament.getAllFromCurrentAdventure(options);

		return allCurrentEquipaments;
	}

	// retorna todos os equipamentos num array
	static getAllEquipaments (options) {

		let equipaments = this.getAll(options); 

		return equipaments;
	}

	// retorna todos os equipamentos da aventura atual
	static getAllEquipamentsCurrentAdventure (options) {

		let allCurrentEquipaments = Equipament.getAllFromCurrentAdventure(options);

		return allCurrentEquipaments;
	}

	// converter peso sendo recebido em gramas em algo mais legivel
	static weightHuman (weight) {
		var measureUnit = 'g';

		if (! weight) {
			return '?';
		}

		if (weight >= 1000 && weight < 10000) {
			weight = Math.round(weight / 100) / 10; // 1 casa decimal
			measureUnit = 'Kg';
		} else if (weight >= 10000 && weight < 1000000) {
			weight = Math.round(weight / 1000); // sem casa decimal
			measureUnit = 'Kg';
		} else if (weight >= 1000000 && weight < 10000000) {
			weight = Math.round(weight / 100000) / 10; // 1 casa decimal
			measureUnit = 'T';
		} else if (weight >= 10000000) {
			weight = Math.round(weight / 100000); // sem casa decimal
			measureUnit = 'T';
		}

		return weight + measureUnit;
	}

	// retorna uma descrição para a box de ajuda sobre o que sao os tipos dos equipamentos
	static helpTypeMeaning () {

		let equipamentTypeList = $('<ul>');

		for (var typeId in Equipament.ALL_TYPE_NAMES) {
			let typeName = Equipament.ALL_TYPE_NAMES[typeId];
			let typeDescription = Equipament.ALL_TYPE_DESCRIPTIONS[typeId];
			let typeEmoji = Equipament.EMOJI_TYPES[typeId];

			equipamentTypeList.append(
				$('<li>').append(
					$('<b>').append(
						typeEmoji, ' ', typeName
					),
					': ', typeDescription
				)
			)
		}

		return $('<p>').append(
			$('<p>').append(
				sprintf(t('Os equipamentos podem ser dados aos jogadores. Deve-se ir no menu %s Jogadores > %s Listar jogadores e então clicar no %s para visualizar os equipamentos desse jogador, clique no icone %s para adicionar um novo equipamento'), Player.EMOJI_MAIN, Player.EMOJI_LIST, PlayerEquipament.EMOJI_VISUALIZE, Equipament.EMOJI_ADD)
			),
			$('<p>').append(
				sprintf(t('O personagem portando o equipamento que lhe foi dado, pode se equipar com ele. Vá no menu %s Jogadores > %s Listar jogadores e então clicar no %s para visualizar detalhes do jogador. Nessa janela terá a opção de ver os equipamentos para equipar ou desequipar'), Player.EMOJI_MAIN, Player.EMOJI_LIST, Player.EMOJI_VISUALIZE)
			),
			equipamentTypeList
		);
	}
}

RModel.models['Equipament'] = Equipament;
