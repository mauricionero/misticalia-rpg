class Player extends RModel {

	static MALE_ID = 1;
	static FEMALE_ID = 2;

	static EMOJI_VISUALIZE = '👁️';

	static EMOJI_NAME = '웃';
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
	static EMOJI_POINTS = '🌡️';
	static EMOJI_ATTRIBUTE = '✔️';
	static EMOJI_BALANCE = '⚖️';
	static EMOJI_TEMPORARY_MODIFICATOR = '⌛';
	static EMOJI_PERMANENT_MODIFICATOR = '⏳';
	static EMOJI_TOTAL_POINTS = '💯';

	static EMOJI_ROLL_DICE = '🎲';
	static EMOJI_DIFFICULTY = '䷂';
	static EMOJI_RESULT = '=';

	static EMOJI_HEAD_EQUIPAMENT = '👷';
	static EMOJI_AMULET_EQUIPAMENT = '🔵';
	static EMOJI_RING_EQUIPAMENT = '⭕';
	static EMOJI_SHIELD_EQUIPAMENT = '🛡️';
	static EMOJI_CHESTPLATE_EQUIPAMENT = '👕';
	static EMOJI_MAIN_HAND_EQUIPAMENT = '🗡️';
	static EMOJI_LEGS_EQUIPAMENT = '👖';
	static EMOJI_FEET_EQUIPAMENT = '👣';

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

	// formula: Math.ceil(level**(2.4) - level**(1.4) + level)
	static POINTS_TO_LEVEL = [
		0, // 0
		1,
		5,
		13,
		25,
		44, // 5
		68,
		99,
		137,
		183,
		237, // 10
		299,
		369,
		449,
		538,
		636,
		744,
		862,
		991,
		1130,
		1280 // 20
	]

	// retorna todos os players num array
	// esse metodo deve ser comunicar com o servidor, por enquanto apenas simula o retorno de todos os players
	static getAllPlayers () {

		//TODO: buscar informação do servidor e armazenar numa variavel de classe.
			// Pensar na possibilidade de um botao para atualizar informacoes alem de atualizar quando precisar de alguma forma.

		return [
			{
				id: 1,
				shortname: 'MN',
				name: 'Mauricio Nero',
				gender: Player.MALE_ID,
				strength: 0,
				dextery: 1,
				constitution: 2,
				inteligence: 5,
				wisdom: 12,
				charisma: 13,
				sanity: 60
			},
			{
				id: 2,
				shortname: 'Zé',
				name: 'José Fontana',
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
				shortname: 'FC',
				name: 'Francieli Celeghim',
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

	// retorna algo para colocar num espaço pequeno sobre o player, tipo um avatar ou as iniciais
	static getPlayerShort (playerId) {
		let player = Player.getPlayer(playerId);

		return player['shortname'];
	}

	// retorna 1 player especifico pelo id
	static getPlayer (playerId) {
		let allplayers = Player.getAllPlayers();

		return allplayers.filter(function ( player ) { return player['id'] == playerId })[0];
	}

	// pegar o maior de um atributo entre os players
	// TODO: receber os playersIds como parametro opcional para calcular somente entre os selecionados
	static getMax (playerAttribute) {
		let allPlayers = Player.getAllPlayers();

		return Math.max.apply(Math, allPlayers.map(function(player) { return player[playerAttribute]; }))
	}

	// retorna maximo de pontuação de acordo com o nivel
	// ja esta calculado na constante POINTS_TO_LEVEL para agilizar
	static levelMaxPointsCalculator (level) {
		return Player.POINTS_TO_LEVEL[level];
	}

	// retorna o nivel de acordo com a pontuação
	static levelCalculator (points) {

		var level = 0;

		while (Player.POINTS_TO_LEVEL[level + 1] <= points) {
			level++;
		} 

		return level;
		
	}

	// calcular resultado da rolagem de um dado
	static calculateDiceResult (diceRoll, totalPoints, difficulty) {

		let rollPoints = diceRoll * (totalPoints / 100);

		let level = Player.levelCalculator(totalPoints);

		let result = Math.round(rollPoints - difficulty) + level - 4;

		return result;

	}
}
