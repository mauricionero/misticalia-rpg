class Player extends RModel {

	static MALE_ID = 1;
	static FEMALE_ID = 2;

	static EMOJI_VISUALIZE = '👁️';
	static EMOJI_INCLUDE_EQUIPAMENT = '⛨';

	static EMOJI_NAME = '웃';
	static EMOJI_SHORT_NAME = '…';
	static EMOJI_GENDER = '⚤';
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
		0: Player.EMOJI_GENDER,
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

	static ALL_ATTRIBUTES_NAMES = {
		'strength': 'Força',
		'dextery': 'Destreza',
		'constitution': 'Constiuĩção',
		'inteligence': 'Inteligencia',
		'wisdom': 'Sabedoria',
		'charisma': 'Carisma',
		'sanity': 'Sanidade',
	};

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

	// pegar a tradução do atributo
	static getAttributeName (attribute) {
		return t(Player.ALL_ATTRIBUTES_NAMES[attribute])
	}

	// retorna todos os players num array
	// esse metodo deve ser comunicar com o servidor, por enquanto apenas simula o retorno de todos os players
	static getAllPlayers () {

		let players = JSON.parse(localStorage.getItem('players'));

		console.log('get players', players);

		if (players == null || players == undefined) {
			players = [];
		}

		return players;
	}

	// retorna todos os equipamentos desse jogador
	static getPlayerEquipaments (playerId) {
		//TODO: buscar informação do servidor e armazenar numa variavel de classe.

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
		]
	}

	// retorna algo para colocar num espaço pequeno sobre o player (html), tipo um avatar ou as iniciais
	static getPlayerShort (playerId) {
		let player = Player.getPlayer(playerId);

		// pegar as primeiras letras do nome e deixar maiusculo
		let playerShort = player['name'].match(/\b(\w)/g).join('').toUpperCase();

		return playerShort;
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

		return Math.max.apply(Math, allPlayers.map(function(player) { return player[playerAttribute]['basePoints']; }))
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

	// adicionar um novo jogador aa aventura
	static addPlayer (newPlayer) {
		var randomId = Math.floor(Math.random() * 100000);

		let players = Player.getAllPlayers();
		let currentAdventureId = Adventure.getCurrentAdventureId();

		//TODO: validar preenchimento

		newPlayer['id'] = 't' + randomId; // criar um id temporario local enquanto nao salva no servidor
		newPlayer['currentAdventureId'] = currentAdventureId;

		players.push(newPlayer);

		console.log('newPlayer', newPlayer);

		try {
			localStorage.setItem("players", JSON.stringify(players));

			return true;
		}
		catch (err) {
			alert(err.name);

			return false;
		}
	}

	// calcular o total de pontos do atributo do player
	static calculateTotalPoints (basePoints, temporaryModifier, permanentModifier) {
		if (basePoints == undefined || basePoints == null) {
			basePoints = 0;
		}
		if (temporaryModifier == undefined || temporaryModifier == null) {
			temporaryModifier = 0;
		}
		if (permanentModifier == undefined || permanentModifier == null) {
			permanentModifier = 0;
		}

		return parseInt(basePoints) + parseInt(temporaryModifier) + parseInt(permanentModifier);
	}
}
