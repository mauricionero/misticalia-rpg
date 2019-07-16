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

	static ORIGIN_PLATAFORM = 1;
	static ORIGIN_OTHER_PLAYER = 2;

	static EMOJI_TYPE = '⛨';
	static EMOJI_NAME = '🏷️';
	static EMOJI_WEIGHT = '⚖️';

	static EMOJI_AMULET_EQUIPAMENT = '🔵';
	static EMOJI_RING_EQUIPAMENT = '⭕';

	static EMOJI_TYPES = {
		1: Equipament.EMOJI_CHESTPLATE,
		2: Equipament.EMOJI_HELMET,
		3: Equipament.EMOJI_LEGGING,
		4: Equipament.EMOJI_BOOTS,
		5: Equipament.EMOJI_ATACK,
		6: Equipament.EMOJI_SHIELD,
	};

	// retorna todos os equipamentos num array
	// esse metodo deve ser comunicar com o servidor, por enquanto apenas simula o retorno de todos os equipamentos
	static getAllEquipaments () {

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
}
