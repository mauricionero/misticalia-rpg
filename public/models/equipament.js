class Equipament extends RModel {

	static get EMOJI_ADD () { return '➕' }
	static get EMOJI_QUANTITY () { return '📦' }

	static get TYPE_CHESTPLATE () { return 1 };
	static get EMOJI_CHESTPLATE () { return '👕' };
	static get TYPE_HELMET () { return 2 };
	static get EMOJI_HELMET () { return '👷' };
	static get TYPE_LEGGING () { return 3 };
	static get EMOJI_LEGGING () { return '👖' };
	static get TYPE_BOOTS () { return 4 };
	static get EMOJI_BOOTS () { return '👣' };
	static get TYPE_ATACK () { return 5 };
	static get EMOJI_ATACK () { return '🗡️' };
	static get TYPE_SHIELD () { return 6 };
	static get EMOJI_SHIELD () { return '🛡️' };
	static get TYPE_AMULET () { return 7 };
	static get EMOJI_AMULET () { return '🔵' };
	static get TYPE_RING () { return 8 };
	static get EMOJI_RING () { return '⭕' };

	static get ORIGIN_PLATAFORM () { return 1 };
	static get ORIGIN_OTHER_PLAYER () { return 2 };

	static get EMOJI_TYPE () { return '⛨' };
	static get EMOJI_NAME () { return '🏷️' };
	static get EMOJI_WEIGHT () { return '⚖️' };

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
	};

	static get ALL_TYPE_NAMES () {
		return {
			1: 'Peitoral',
			2: 'Capacete',
			3: 'Pernas',
			4: 'Botas',
			5: 'Ataque',
			6: 'Escudo',
			7: 'Amuleto',
			8: 'Anel'
		}
	};

	//TODO: criar metodo estatico padronizado e colocar os campos a serem validados e o tipo de validacao

	// pegar a tradução do tipo
	static getTypeName (typeId) {
		return t(Equipament.ALL_TYPE_NAMES[typeId])
	}

	// retorna todos os equipamentos da aventura atual
	static getAllEquipamentsCurrentAdventure () {

		let allCurrentEquipaments = Equipament.getAllFromCurrentAdventure();

		return allCurrentEquipaments;
	}

	// retorna todos os equipamentos num array
	static getAllEquipaments () {

		let equipaments = Equipament.getAll(); 

		return equipaments;

		//TODO: buscar informação do servidor e armazenar numa variavel de classe.
			// Pensar na possibilidade de um botao para atualizar informacoes alem de atualizar quando precisar de alguma forma.

		return [
			{
				id: 1,
				type: Equipament.TYPE_CHESTPLATE,
				name: t('Peitoral de bronze'),
				weight: 13000,
				origin: Equipament.ORIGIN_PLATAFORM,
				modifiers: [
					{
						attribute: Modifier.DEXTERY,
						value: -10,
						observation: t('Pesado')
					},
					{
						attribute: Modifier.STRENGTH,
						value: -4,
						observation: t('- mobilidade')
					},
					{
						attribute: Modifier.DEFENSE,
						value: 15,
					}
				]
			},
			{
				id: 1,
				type: Equipament.TYPE_CHESTPLATE,
				name: t('Peitoral de aço'),
				weight: 16000,
				origin: Equipament.ORIGIN_PLATAFORM,
				modifiers: [
					{
						attribute: Modifier.DEXTERY,
						value: -13,
						observation: t('Pesado')
					},
					{
						attribute: Modifier.STRENGTH,
						value: -4,
						observation: t('- mobilidade')
					},
					{
						attribute: Modifier.DEFENSE,
						value: 20
					}
				]
			},
			{
				id: 3,
				type: Equipament.TYPE_SHIELD,
				name: t('Escudo de madeira'),
				weight: 3000,
				origin: Equipament.ORIGIN_PLATAFORM,
				modifiers: [
					{
						attribute: Modifier.DEXTERY,
						value: -5,
						observation: t('Leve')
					},
					{
						attribute: Modifier.STRENGTH,
						value: -4,
						observation: t('- mobilidade')
					},
					{
						attribute: Modifier.DEFENSE,
						value: 10
					}
				]
			}
		];
	}

	// retorna todos os equipamentos da aventura atual
	static getAllEquipamentsCurrentAdventure () {

		let allCurrentEquipaments = Equipament.getAllFromCurrentAdventure();

		return allCurrentEquipaments;
	}

	// converter peso sendo recebido em gramas em algo mais legivel
	static weightHuman (weight) {
		var measureUnit = 'g';

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

	// adicionar um novo equipamento aa aventura
	static addEquipament (newEquipament) {

		return Equipament.saveNew(newEquipament);
	}
}
