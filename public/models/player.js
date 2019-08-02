class Player extends RModel {

	static get NO_GENDER_ID () { return 0 };
	static get MALE_ID () { return 1 };
	static get FEMALE_ID () { return 2 };
	static get TRANS_GENDER_ID () { return 3 };

	static get EMOJI_VISUALIZE () { return '👁️' };

	static get EMOJI_NAME () { return '웃' };
	static get EMOJI_SHORT_NAME () { return '…' };
	static get EMOJI_LIFE () { return '❤️' };

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

	static get EMOJI_SAVE () { return '💾' };

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
			'defense',
			'atack'
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
			'defense': 'Defesa',
			'atack': 'Ataque'
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


	// salvar um player (editar ou criar um novo)
	savePlayer () {

		return this.save();
	}

	// pegar o valor de um atributo
	getAttribute (attribute, subAttribute = '') {

		// se tiver subatributo
		if (subAttribute) {
			if (this[attribute]) {
				return this[attribute][subAttribute] || 0;
			}

		// se for um atributo de 1 nivel soh (sem subatributo)
		} else {
			return this[attribute]
		}

		return 0;
	}

	// retorna algo para colocar num espaço pequeno sobre o player (html), tipo um avatar ou as iniciais
	getPlayerShort () {
		// pegar as primeiras letras do nome e deixar maiusculo
		let playerShort = this['name'].match(/\b(\w)/g).join('').toUpperCase();

		return playerShort;
	}

	// apagar os modificadores permanentes
	clearPermanentModifiers () {

		// apagar todos os modificadores permanentes antes de calcular tudo de volta
		Player.ALL_ATTRIBUTES.forEach(function (attribute) {
			let basePoints = this[attribute]['basePoints'] || 0;
			let permanentModifier = this[attribute]['permanentModifier'] || 0;
			let temporaryModifier = this[attribute]['temporaryModifier'] || 0;

			this[attribute]['permanentModifier'] = 0;
			this[attribute]['points'] = basePoints;
		}, this);

		// apagar todos os modificadores secundarios também antes de calcular tudo de volta
		Player.ALL_SECONDARY_ATTRIBUTES.forEach(function (attribute) {
			if (this[attribute] == undefined) {
				this[attribute] = {}
			}

			let basePoints = this[attribute]['basePoints'] || 0;
			let permanentModifier = this[attribute]['permanentModifier'] || 0;

			this[attribute]['permanentModifier'] = 0;
			this[attribute]['points'] = basePoints;
		}, this);

		this.save();
	}


	// salvar um valor de um atributo com o id do jogador
	static saveAttribute (playerId, attribute, value) {
		let player = this.getPlayer(playerId);

		player[attribute] = value;

		return player.savePlayer();
	}

	// pegar a tradução do atributo
	static getAttributeName (attribute) {
		return t(Player.ALL_ATTRIBUTES_NAMES[attribute])
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

	// calcular mira do ataque
	static atackAim (dieAim, dextery) {
		let level = this.levelCalculator(dextery);

		// verificar a habilidade de mirar
		let aimPoints = parseInt((dieAim * dextery) / 100) + level;

		return aimPoints;
	}

	// calcular o resultado do quanto acertou o defensor
	static defendAimResult (dieAim, dextery, aimPoints) {
		let level = this.levelCalculator(dextery);
		
		let minNormalAim = -100;

		// verificar a habilidade de desviar
		let dodgePoints = parseInt((dieAim * dextery) / 100) + level;
		
		let totalDodge = 0;
		if (dodgePoints == 0) {
			dodgePoints = -1;
		}
		totalDodge = (parseInt((aimPoints / dodgePoints) * 100) - 100);
		if (totalDodge > 0) {
			totalDodge *= -1;
		}

		// a partir de 100% de acerto (negativo), amortecer o acerto critico
		if (totalDodge < minNormalAim) {
			// pegar 10% do que esta passando de 100% como critico
			let criticalHit = (totalDodge - minNormalAim) * 0.1;

			totalDodge = parseInt(minNormalAim + criticalHit);
		}

		return totalDodge;
	}


	// calcular o resultado da força do ataque
	static atackStrength(dieStrength, strength, atack) {
		let level = this.levelCalculator(strength);

		let atackStrength = parseInt((dieStrength * strength) / 100) + level + atack;

		return atackStrength;
	}

	// calcular o resultado da força do ataque no defensor
	static defendStrength(dieStrength, strength, defense, totalDodge, atackStrength) {
		let level = this.levelCalculator(strength);

		// quantos % do ataque levou?
		let hitModifier = totalDodge / 100 * -1;

		// verificar quanto de hit (força do ataque * multiplicador do acerto)
		let totalHit = parseInt(atackStrength * hitModifier);

		// verificar primeiro se passou da defesa total
		let totalDefense = parseInt((dieStrength * strength) / 100) + level + defense;

		let defenseResult = totalDefense - totalHit;

		return defenseResult;
	}

	// calcular o quanto de vida perdeu de acordo com o ataque recebido
	static defendLifeResult(constitution, totalDefense) {

		let level = this.levelCalculator(constitution);
		
		let constitutionModifier = 0;
		if (constitution != 0) {
			constitutionModifier = 100 / constitution;
		}

		let lifeDifference = parseInt(totalDefense * constitutionModifier) + level;
		
		// positivo eh pq nao levou dano
		if (lifeDifference > 0) {
			lifeDifference = 0;
		}

		return lifeDifference;
	}

	// alterar o valor de um progressbar de vida
	static alterLifeProgressbar (lifeProgressbarId, totalLife) {
		let lifeProgressbar = $('#' + lifeProgressbarId);

		lifeProgressbar.progressbar('value', totalLife);
		lifeProgressbar.attr('title', totalLife + '%');

		// se morreu, colocar um fundo diferente
		if (totalLife <= 0) {
			lifeProgressbar.css({ 'background': 'Black' });
		} else {
			lifeProgressbar.css({ 'background': 'none' });
		}
	}
}

RModel.models['Player'] = Player;
