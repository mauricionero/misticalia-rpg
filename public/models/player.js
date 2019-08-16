class Player extends RModel {

	static get SUGESTION_POINTS_PER_ATTRIBUTE () { return 80 };

	static get EMOJI_MAIN () { return '♟️' };
	static get EMOJI_NPC_MAIN () { return '😐' };
	static get EMOJI_LIST () { return '📝' };

	static get NO_GENDER_ID () { return 0 };
	static get MALE_ID () { return 1 };
	static get FEMALE_ID () { return 2 };
	static get TRANS_GENDER_ID () { return 3 };

	static get EMOJI_VISUALIZE () { return '👁️' };

	static get EMOJI_NAME () { return '웃' };
	static get EMOJI_SHORT_NAME () { return '…' };
	static get EMOJI_LIFE () { return '❤️' };
	static get EMOJI_MAXLIFE () { return '💗' };
	static get EMOJI_MANA () { return '✨' };

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
	static get EMOJI_MAGIC () { return '🔮' };
	static get EMOJI_SANITY () { return '🙂' };

	static get EMOJI_LEVEL () { return '🎚️' };
	static get EMOJI_POINTS () { return '🌡️' };
	static get EMOJI_ATTRIBUTE () { return '✔️' };
	static get EMOJI_EXPERTISE () { return '🏅' };
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

	static get EMOJI_DISTRIBUTE () { return '📊' };

	static get EMOJI_GENDERS () {
		return {
			0: Player.EMOJI_GENDER,
			1: Player.EMOJI_GENDER_MALE,
			2: Player.EMOJI_GENDER_FEMALE,
			3: Player.EMOJI_TRANS_GENDER
		}
	};

	static get ALL_ATTRIBUTES_TYPES () {
		return {
			1: 'strength',
			2: 'dextery',
			3: 'agility',
			4: 'constitution',
			5: 'inteligence',
			6: 'wisdom',
			7: 'charisma',
			8: 'magic',
			9: 'sanity'
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
			'magic',
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
			'life': 'Vida',
			'maxLife': 'Vida máxima',
			'strength': 'Força',
			'dextery': 'Destreza',
			'agility': 'Agilidade',
			'constitution': 'Constituição',
			'inteligence': 'Inteligencia',
			'wisdom': 'Sabedoria',
			'charisma': 'Carisma',
			'magic': 'Mágica',
			'sanity': 'Sanidade',
			'fire_protection': 'Proteção ao fogo',
			'cold_protection': 'Proteção ao frio',
			'defense': 'Defesa',
			'atack': 'Ataque'
		}
	};

	// todas as descrições dos atributos por id
	static get ALL_TYPE_DESCRIPTIONS () {
		return {
			1: t('Quão forte irá acertar algo, quanto maior, mais impacto'),
			2: t('Quão preciso será o acerto, quanto maior, mais certeiro'),
			3: t('Quão rápido irá atacar, quanto mais rapido, mais vezes ataca e antes dos outros'),
			4: t('Quanto absorve de impacto, quanto maior, menos dano sofre com ataques'),
			5: t('Testes de inteligência do personagem, soluções criativas que não dependem exatamente de conhecimento'),
			6: t('Testes de conhecimento do personagem, algo que depende de se conhecer algo previo'),
			7: t('O quão apresentavel e comunicativo o personagem é'),
			8: t('O poder mágico. Quanto mais mágica, melhores os poderes e menos gasta mana para realizar as ações mágicas'),
			9: t('Coisas amedrontadoras exigem testes de sanidade para ver se terá alguma reação consciente ou definida pelo mestre'),
			10: t('Defesa a ser levada em conta pelo mestre contra fogo'),
			11: t('Defesa a ser levada em conta pelo mestre contra frio'),
			12: t('O quanto conseguirá defender antes de chegar o dano ao personagem, quanto maior, mais impacto será absorvido antes de ser levado pelo personagem'),
			13: t('O quanto irá dar de dano a mais em um ataque')
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
			}
		}
	}


	// salvar um player (editar ou criar um novo)
	savePlayer () {

		return this.save();
	}

	// pegar o valor de um atributo
	getAttribute (attribute, subAttribute = '') {

		let defaultValue = 0;

		// no caso do maximo de vida
		if (attribute == 'maxLife' || attribute == 'life') {
			defaultValue = 100;
		}

		let value = defaultValue;

		// se tiver subatributo
		if (subAttribute) {
			if (this[attribute] == undefined) {
				console.warn(sprintf(t('Não foi possivel achar o atributo %s no Player'), attribute));
				value = defaultValue;
			} else {
				value = this[attribute][subAttribute];
			}

		// se for um atributo de 1 nivel soh (sem subatributo)
		} else {
			value = this[attribute];
		}

		if (value == undefined) {
			value = defaultValue;
		}

		return value;
	}

	// alterar o valor de um atributo
	setAttribute (value, attribute, subAttribute = '') {

		// se tiver subatributo
		if (subAttribute) {
			if (this[attribute]) {
				this[attribute][subAttribute] = value;
			} else {
				console.error(sprintf(t('Não foi possivel achar o atributo %s no Player'), attribute));
			}

		// se for um atributo de 1 nivel soh (sem subatributo)
		} else {
			this[attribute] = value;
		}

		return this.save();
	}

	// modificar o atributo com algum modificador
	modifyAttribute (modificationValue, attribute, subAttribute = '') {

		let value = 0;

		// se tiver subatributo
		if (subAttribute) {
			if (this[attribute]) {
				value = parseInt(this[attribute][subAttribute]);
			} else {
				console.error(sprintf(t('Não foi possivel achar o atributo %s no Player'), attribute));
			}

		// se for um atributo de 1 nivel soh (sem subatributo)
		} else {
			value = parseInt(this[attribute]);
		}

		value += parseInt(modificationValue);

		// verificar particularidades
		// caso seja vida
		if (attribute == 'life') {

			let maxLife = this.getAttribute('maxLife');

			// nao deixar ficar maior que a vida máxima
			if (value > maxLife) {
				value = maxLife;

			// nem menor que zero
			} else if (value < 0) {
				value = 0;
			}
		}

		return this.setAttribute(value, attribute, subAttribute);
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

	// montar o progressbar da vida do jogador
	getLifeProgressBar (boxId) {

		let box = Box.getBox(boxId);

		let playerLife = this.getAttribute('life') || 100;

		let lifeProgressbar = $("<div>", {
			id: box.createId('life_display_' + this['id']),
			width: 38,
			height: 20,
			title: playerLife + '%'
		}).progressbar({ value: playerLife })

		lifeProgressbar.children().css({ 'background': 'Red' });

		return lifeProgressbar;
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
	static levelMaxPointsCalculator (level) {
		return level**2 + 7*level - level;
	}

	// retorna a formula do nivel
	static get levelCalculatorFormula () {
		return t('chão( (-6 + √(36 - 4 * -pontos)) / 2 )')
	}
	// retorna o nivel de acordo com a pontuação
	static levelCalculator (points) {
		let level = Math.floor( (-6 + Math.sqrt(36 - 4 * -points)) / 2 );

		return level;
	}

	// retorna formula do calculo dos dados em string para exibição
	static get calculateDiceResultFormula () {
		return t('(dado - dificuldade) + nivel - 6');
	}

	// calcular resultado da rolagem de um dado
	static calculateDiceResult (diceRoll, totalPoints, difficulty) {

		let rollPoints = diceRoll * (totalPoints / 100);

		let level = this.levelCalculator(totalPoints);

		let result = Math.round(rollPoints - difficulty) + level - 6;

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

	// retornar formula do calculo da mira para o atacante
	static get atackAimFormula () {
		return t('(dado * destreza) / 100 + nivelDestreza');
	}
	// calcular mira do ataque
	static atackAim (dieAim, dextery) {
		let level = this.levelCalculator(dextery);

		// verificar a habilidade de mirar
		let aimPoints = parseInt((dieAim * dextery) / 100) + level;

		return aimPoints;
	}

	// retornar formula do calculo da mira para o defensor
	static get defendAimFormula () {
		return t('(dado * destreza / 100) - ataque + nivelDestreza');
	}
	// retornar formula do calculo da mira para o defensor
	static get defendAimCriticalFormula () {
		return t('(pontosDefesa + 100) * 10%');
	}
	// calcular o resultado do quanto acertou o defensor
	static defendAimResult (dieAim, dextery, aimPoints) {
		let level = this.levelCalculator(dextery);
		
		let minNormalAim = -100;

		// pontos da rolagem de dados da defesa
		let dodgePoints = (dieAim * dextery / 100);

		// pontos da rolagem da defesa comparados com o ataque
		dodgePoints = dodgePoints - aimPoints + level;

		// pontos da rolagem limitados ateh o maximo de ataque sem ser critico (minNormalAim)
		// e calcular o ataque critico, que eh 10% da diferença de minNormalAim e o restante
		let totalDodgeLimited = dodgePoints;
		let criticalHit = 0;
		if (totalDodgeLimited < minNormalAim) {
			totalDodgeLimited = minNormalAim;
			criticalHit = (dodgePoints - minNormalAim) * 0.1;
		}

		// o total da defesa sera o total limitado + o critico
		let totalDodge = parseInt(totalDodgeLimited + criticalHit);

		return totalDodge;
	}

	// retornar formula do calculo da força para o atacante
	static get atackStrengthFormula () {
		return t('((dado * força) / 100) + nivelForça + ataque');
	}
	// calcular o resultado da força do ataque
	static atackStrength(dieStrength, strength, atack) {
		let level = this.levelCalculator(strength);

		let atackStrength = parseInt((dieStrength * strength) / 100) + level + atack;

		return atackStrength;
	}

	// retornar formula do calculo da força para o defensor
	static get defendStrengthFormula () {
		return t('((dado * força) / 100) + nivelForça + defesa - (forçaAtaque * (totalEsquiva / 100 * -1))');
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

	// retornar formula do calculo da força para o defensor
	static get defendLifeFormula () {
		return t('resultDefesa * (100 / constituição) + nivelConstituição');
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

	// retorna uma descrição para a box de ajuda sobre o que sao os atributos
	static helpAttributesMeaning (showAllAttributes = false) {

		let attributeList = $('<ul>');

		let allAttributes = Player.ALL_ATTRIBUTES;
		if (showAllAttributes) {
			allAttributes = allAttributes.concat(Player.ALL_SECONDARY_ATTRIBUTES);
		}

		allAttributes.forEach(function (attribute) {

			let typeId = Modifier.ALL_TYPE_IDS[attribute];

			let attributeEmoji = Modifier.EMOJI_TYPES[typeId];
			let attributeName = Player.getAttributeName(attribute);
			let attributeDescription = Player.ALL_TYPE_DESCRIPTIONS[typeId];

			attributeList.append(
				$('<li>').append(
					$('<b>').append(
						attributeEmoji, ' ', attributeName
					),
					': ', attributeDescription
				)
			)
		});

		return $('<p>').append(
			$('<p>').append(
				$('<b>').append(
					t('Atributos:')
				)
			),
			attributeList
		);
	}
}

RModel.models['Player'] = Player;
