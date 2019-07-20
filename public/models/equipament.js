class Equipament extends RModel {

	static TYPE_CHESTPLATE = 1;
	static EMOJI_CHESTPLATE = '👕';
	static TYPE_HELMET = 2;
	static EMOJI_HELMET = '👷';
	static TYPE_LEGGING = 3;
	static EMOJI_LEGGING = '👖';
	static TYPE_BOOTS = 4;
	static EMOJI_BOOTS = '👣';
	static TYPE_ATACK = 5;
	static EMOJI_ATACK = '🗡️';
	static TYPE_SHIELD = 6;
	static EMOJI_SHIELD = '🛡️';
	static TYPE_AMULET = 7;
	static EMOJI_AMULET = '🔵';
	static TYPE_RING = 8;
	static EMOJI_RING = '⭕';

	static ORIGIN_PLATAFORM = 1;
	static ORIGIN_OTHER_PLAYER = 2;

	static EMOJI_TYPE = '⛨';
	static EMOJI_NAME = '🏷️';
	static EMOJI_WEIGHT = '⚖️';

	static EMOJI_TYPES = {
		1: Equipament.EMOJI_CHESTPLATE,
		2: Equipament.EMOJI_HELMET,
		3: Equipament.EMOJI_LEGGING,
		4: Equipament.EMOJI_BOOTS,
		5: Equipament.EMOJI_ATACK,
		6: Equipament.EMOJI_SHIELD,
		7: Equipament.EMOJI_AMULET,
		8: Equipament.EMOJI_RING
	};

	static ALL_TYPE_NAMES = {
		1: 'Peitoral',
		2: 'Capacete',
		3: 'Pernas',
		4: 'Botas',
		5: 'Ataque',
		6: 'Escudo',
		7: 'Amuleto',
		8: 'Anel'
	};

	// pegar a tradução do tipo
	static getTypeName (typeId) {
		return t(Equipament.ALL_TYPE_NAMES[typeId])
	}

	// retorna todos os equipamentos num array
	static getAllEquipaments () {

		let equipaments = JSON.parse(localStorage.getItem('equipaments'));

		console.log('get equipaments', equipaments);

		if (equipaments == null || equipaments == undefined) {
			equipaments = [];
		}

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
		let currentAdventureId = Adventure.getCurrentAdventureId

		// se nenhuma aventura esta selecionada, retorna vazio
		if (currentAdventureId == undefined || currentAdventureId == null) {
			return [];
		}

		let allEquipaments = Equipament.getAllEquipaments();

		return allEquipaments.filter(function ( equipament ) { return equipament['currentAdventureId'] == currentAdventureId });
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
		var randomId = Math.floor(Math.random() * 100000);

		let equipaments = Equipament.getAllEquipaments();
		let currentAdventureId = Adventure.getCurrentAdventureId();

		//TODO: validar preenchimento

		newEquipament['id'] = 't' + randomId; // criar um id temporario local enquanto nao salva no servidor
		newEquipament['currentAdventureId'] = currentAdventureId;

		equipaments.push(newEquipament);

		console.log('newEquipament', newEquipament);

		try {
			localStorage.setItem("equipaments", JSON.stringify(equipaments));

			return true;
		}
		catch (err) {
			alert(err.name);

			return false;
		}
	}
}
