class Player extends RModel {

	static MALE_ID = 1;
	static FEMALE_ID = 2;

	static EMOJI_NAME = '📛';
	static EMOJI_GENDER_MALE = '👨';
	static EMOJI_GENDER_FEMALE = '👩';
	static EMOJI_STRENGTH = '💪';
	static EMOJI_DEXTERY = '🏃';
	static EMOJI_CONSTITUTION = '✚';
	static EMOJI_INTELIGENCE = '💡';
	static EMOJI_WISDOM = '📚';
	static EMOJI_CHARISMA = '👹';
	static EMOJI_SANITY = '🙂';

	static EMOJI_LEVEL = '🎚️';
	static EMOJI_ATTRIBUTE = '✔️';
	static EMOJI_BALANCE = '⚖️';
	static EMOJI_TEMPORARY_MODIFICATOR = '⌛';
	static EMOJI_PERMANENT_MODIFICATOR = '⏳';

	static EMOJI_GENDER = {
		1: Player.EMOJI_GENDER_MALE,
		2: Player.EMOJI_GENDER_FEMALE
	};

	static ALL_ATTRIBUTES = [
		'strength',
		'dextery',
		'constitution',
		'inteligence',
		'wisdom',
		'charisma',
		'sanity',
	];

	static getAllPlayers () {

		//TODO: buscar informação do servidor e armazenar numa variavel de classe.
			// Pensar na possibilidade de um botao para atualizar informacoes.

		return [
			{
				id: 1,
				name: 'P1',
				gender: Player.MALE_ID,
				strength: 60,
				dextery: 80,
				constitution: 60,
				inteligence: 80,
				wisdom: 110,
				charisma: 30,
				sanity: 80
			},
			{
				id: 2,
				name: 'P2',
				gender: Player.MALE_ID,
				strength: 40,
				dextery: 60,
				constitution: 100,
				inteligence: 60,
				wisdom: 110,
				charisma: 30,
				sanity: 80
			},
			{
				id: 3,
				name: 'P3',
				gender: Player.FEMALE_ID,
				strength: 100,
				dextery: 40,
				constitution: 40,
				inteligence: 110,
				wisdom: 110,
				charisma: 30,
				sanity: 80
			}
		];
	}

	static getMax (playerAttribute) {
		let allPlayers = Player.getAllPlayers();

		return Math.max.apply(Math, allPlayers.map(function(player) { return player[playerAttribute]; }))
	}
}
