class Player extends RModel {

	static get MALE_ID () { return 1 };
	static get FEMALE_ID () { return 2 };

	static get EMOJI_VISUALIZE () { return '👁️' };
	static get EMOJI_INCLUDE_EQUIPAMENT () { return '⛨' };

	static get EMOJI_NAME () { return '웃' };
	static get EMOJI_SHORT_NAME () { return '…' };
	static get EMOJI_GENDER () { return '⚤' };
	static get EMOJI_GENDER_MALE () { return '👨' };
	static get EMOJI_GENDER_FEMALE () { return '👩' };
	static get EMOJI_STRENGTH () { return '💪' };
	static get EMOJI_DEXTERY () { return '🏃' };
	static get EMOJI_CONSTITUTION () { return '✚' };
	static get EMOJI_INTELIGENCE () { return '💡' };
	static get EMOJI_WISDOM () { return '📚' };
	static get EMOJI_CHARISMA () { return '👹' };
	static get EMOJI_SANITY () { return '🙂' };

	static get EMOJI_LEVEL () { return '🎚️' };
	static get EMOJI_POINTS () { return '🌡️' };
	static get EMOJI_ATTRIBUTE () { return '✔️' };
	static get EMOJI_BALANCE () { return '⚖️' };
	static get EMOJI_TEMPORARY_MODIFICATOR () { return '⌛' };
	static get EMOJI_PERMANENT_MODIFICATOR () { return '⏳' };
	static get EMOJI_TOTAL_POINTS () { return '💯' };

	static get EMOJI_ROLL_DICE () { return '🎲' };
	static get EMOJI_DIFFICULTY () { return '䷂' };
	static get EMOJI_RESULT () { return '=' };

	static get EMOJI_HEAD_EQUIPAMENT () { return '👷' };
	static get EMOJI_AMULET_EQUIPAMENT () { return '🔵' };
	static get EMOJI_RING_EQUIPAMENT () { return '⭕' };
	static get EMOJI_SHIELD_EQUIPAMENT () { return '🛡️' };
	static get EMOJI_CHESTPLATE_EQUIPAMENT () { return '👕' };
	static get EMOJI_MAIN_HAND_EQUIPAMENT () { return '🗡️' };
	static get EMOJI_LEGS_EQUIPAMENT () { return '👖' };
	static get EMOJI_FEET_EQUIPAMENT () { return '👣' };

	static get EMOJI_GENDERS () {
		return {
			0: Player.EMOJI_GENDER,
			1: Player.EMOJI_GENDER_MALE,
			2: Player.EMOJI_GENDER_FEMALE
		}
	};

	static get ALL_ATTRIBUTES () {
		return [
			'strength',
			'dextery',
			'constitution',
			'inteligence',
			'wisdom',
			'charisma',
			'sanity'
		]
	};

	static get ALL_ATTRIBUTES_NAMES () {
		return {
			'strength': 'Força',
			'dextery': 'Destreza',
			'constitution': 'Constiuĩção',
			'inteligence': 'Inteligencia',
			'wisdom': 'Sabedoria',
			'charisma': 'Carisma',
			'sanity': 'Sanidade'
		}
	};

	// formula: Math.ceil(level**(2.4) - level**(1.4) + level)
	static get POINTS_TO_LEVEL () {
		return [
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
	}

	// pegar a tradução do atributo
	static getAttributeName (attribute) {
		return t(Player.ALL_ATTRIBUTES_NAMES[attribute])
	}

	// retorna todos os players num array
	static getAllPlayers () {

		let players = Player.getAll(); 

		return players;
	}

	// retorna todos os jogadores da aventura atual
	static getAllPlayersCurrentAdventure () {

		let allCurrentPlayers = Player.getAllFromCurrentAdventure();

		return allCurrentPlayers;
	}

	// retorna todos os equipamentos desse jogador
	static getPlayerEquipaments (playerId) {
		//TODO: passar para uma nova model

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
		
		return Player.saveNew(newPlayer);

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
