class Player extends RModel {

	static get NO_GENDER_ID () { return 0 };
	static get MALE_ID () { return 1 };
	static get FEMALE_ID () { return 2 };
	static get TRANS_GENDER_ID () { return 3 };

	static get EMOJI_VISUALIZE () { return '👁️' };

	static get EMOJI_NAME () { return '웃' };
	static get EMOJI_SHORT_NAME () { return '…' };
	static get EMOJI_GENDER () { return '⚤' };
	static get EMOJI_GENDER_MALE () { return '👨' };
	static get EMOJI_GENDER_FEMALE () { return '👩' };
	static get EMOJI_TRANS_GENDER () { return '⚧️' };

	static get EMOJI_STRENGTH () { return '💪' };
	static get EMOJI_DEXTERY () { return '✍️' };
	static get EMOJI_AGILITY () { return '🏃' };
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

	static get EMOJI_IS_NPC () { return '♚️' };
	static get EMOJI_IS_NOT_NPC () { return '♟️' };

	static get EMOJI_GENDERS () {
		return {
			0: Player.EMOJI_GENDER,
			1: Player.EMOJI_GENDER_MALE,
			2: Player.EMOJI_GENDER_FEMALE,
			3: Player.EMOJI_TRANS_GENDER
		}
	};

	static get ALL_ATTRIBUTES () {
		return [
			'strength',
			'dextery',
			'agility',
			'constitution',
			'inteligence',
			'wisdom',
			'charisma',
			'sanity'
		]
	};

	static get ALL_SECONDARY_ATTRIBUTES () {
		return [
			'fire_protection',
			'cold_protection',
			'defense'
		]
	};

	static get ALL_ATTRIBUTES_NAMES () {
		return {
			'strength': 'Força',
			'dextery': 'Destreza',
			'agility': 'Agilidade',
			'constitution': 'Constituição',
			'inteligence': 'Inteligencia',
			'wisdom': 'Sabedoria',
			'charisma': 'Carisma',
			'sanity': 'Sanidade',
			'fire_protection': 'Proteção ao fogo',
			'cold_protection': 'Proteção ao frio',
			'defense': 'Defesa'
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

	static getAttribute (player, attribute, subAttribute) {
		if (player[attribute]) {
			return player[attribute][subAttribute] || 0;
		}

		return 0;
	}

	// pegar a tradução do atributo
	static getAttributeName (attribute) {
		return t(Player.ALL_ATTRIBUTES_NAMES[attribute])
	}

	// salvar um player (editar ou criar um novo)
	static savePlayer (player) {

		return this.saveItem(player);
	}

	// retorna todos os players num array
	static getAllPlayers (options = {}) {

		let players = this.getAll(options); 

		return players;
	}

	// retorna todos os jogadores da aventura atual
	static getAllPlayersCurrentAdventure (options = {}) {

		let allCurrentPlayers = this.getAllFromCurrentAdventure(options);

		return allCurrentPlayers;
	}

	// retorna algo para colocar num espaço pequeno sobre o player (html), tipo um avatar ou as iniciais
	static getPlayerShort (playerId) {
		let player = this.getPlayer(playerId);

		// pegar as primeiras letras do nome e deixar maiusculo
		let playerShort = player['name'].match(/\b(\w)/g).join('').toUpperCase();

		return playerShort;
	}

	// retorna 1 player especifico pelo id
	static getPlayer (playerId) {
		let allplayers = this.getAllPlayers();

		return allplayers.filter(function ( player ) { return player['id'] == playerId })[0];
	}

	// pegar o maior de um atributo entre os players
	// TODO: receber os playersIds como parametro opcional para calcular somente entre os selecionados
	static getMax (playerAttribute) {
		let allPlayers = this.getAllPlayers();

		return Math.max.apply(Math, allPlayers.map(function(player) { return player[playerAttribute]['basePoints']; }))
	}

	// retorna maximo de pontuação de acordo com o nivel
	// ja esta calculado na constante POINTS_TO_LEVEL para agilizar
	static levelMaxPointsCalculator (level) {
		return this.POINTS_TO_LEVEL[level];
	}

	// retorna o nivel de acordo com a pontuação
	static levelCalculator (points) {

		var level = 0;

		while (this.POINTS_TO_LEVEL[level + 1] <= points) {
			level++;
		} 

		return level;
		
	}

	// calcular resultado da rolagem de um dado
	static calculateDiceResult (diceRoll, totalPoints, difficulty) {

		let rollPoints = diceRoll * (totalPoints / 100);

		let level = this.levelCalculator(totalPoints);

		let result = Math.round(rollPoints - difficulty) + level - 4;

		return result;

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

	// apagar os modificadores permanentes
	static clearPermanentModifiers (playerId) {

		let player = this.getPlayer(playerId);

		// apagar todos os modificadores permanentes antes de calcular tudo de volta
		this.ALL_ATTRIBUTES.forEach(function (attribute) {
			let basePoints = player[attribute]['basePoints'] || 0;
			let permanentModifier = player[attribute]['permanentModifier'] || 0;
			let temporaryModifier = player[attribute]['temporaryModifier'] || 0;

			player[attribute]['permanentModifier'] = 0;
			player[attribute]['points'] = basePoints;
		});

		// apagar todos os modificadores secundarios também antes de calcular tudo de volta
		this.ALL_SECONDARY_ATTRIBUTES.forEach(function (attribute) {
			if (player[attribute] == undefined) {
				player[attribute] = {}
			}

			let basePoints = player[attribute]['basePoints'] || 0;
			let permanentModifier = player[attribute]['permanentModifier'] || 0;

			player[attribute]['permanentModifier'] = 0;
			player[attribute]['points'] = basePoints;
		});

		this.saveItem(player);
	}

	// calcular mira do ataque
	static atackAim (dieResult, dextery) {
		return parseInt((dieResult * dextery) / 100);
	}

	// calcular o resultado da mira no defensor
	static defenderAimResult (dieResult, dextery, atackAim) {
		return parseInt((dieResult * dextery) / 100) - atackAim;
	}
}
