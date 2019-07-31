class Modifier extends RModel {

	static get EMOJI_ADD () { return '⚡' }
	static get EMOJI_VISUALIZE () { return '🗲' }
	static get EMOJI_VALUE () { return '🔢' }
	static get EMOJI_OBSERVATIONS () { return '📝' }

	static get STRENGTH () { return 1 };
	static get DEXTERY () { return 2 };
	static get AGILITY () { return 3 };
	static get CONSTITUTION () { return 4 };
	static get INTELIGENCE () { return 5 };
	static get WISDOM () { return 6 };
	static get CHARISMA () { return 7 };
	static get SANITY () { return 8 };

	static get FIRE_PROTECTION () { return 9 };
	static get COLD_PROTECTION () { return 10 };
	static get DEFENSE () { return 11 };
	static get ATACK () { return 12 };

	static get EMOJI_STRENGTH () { return Player.EMOJI_STRENGTH };
	static get EMOJI_DEXTERY () { return Player.EMOJI_DEXTERY };
	static get EMOJI_AGILITY () { return Player.EMOJI_AGILITY };
	static get EMOJI_CONSTITUTION () { return Player.EMOJI_CONSTITUTION };
	static get EMOJI_INTELIGENCE () { return Player.EMOJI_INTELIGENCE };
	static get EMOJI_WISDOM () { return Player.EMOJI_WISDOM };
	static get EMOJI_CHARISMA () { return Player.EMOJI_CHARISMA };
	static get EMOJI_SANITY () { return Player.EMOJI_SANITY };
	static get EMOJI_FIRE_PROTECTION () { return '🛡️🔥' };
	static get EMOJI_COLD_PROTECTION () { return '🛡️❄️' };
	static get EMOJI_DEFENSE () { return '🛡️' };
	static get EMOJI_ATACK () { return '🗡️' };

	static get EMOJI_TYPES () {
		return {
			1: Modifier.EMOJI_STRENGTH,
			2: Modifier.EMOJI_DEXTERY,
			3: Modifier.EMOJI_AGILITY,
			4: Modifier.EMOJI_CONSTITUTION,
			5: Modifier.EMOJI_INTELIGENCE,
			6: Modifier.EMOJI_WISDOM,
			7: Modifier.EMOJI_CHARISMA,
			8: Modifier.EMOJI_SANITY,
			9: Modifier.EMOJI_FIRE_PROTECTION,
			10: Modifier.EMOJI_COLD_PROTECTION,
			11: Modifier.EMOJI_DEFENSE,
			12: Modifier.EMOJI_ATACK
		}
	}

	static get ALL_TYPE_NAMES () {
		return {
			1: 'Força',
			2: 'Destreza',
			3: 'Agilidade',
			4: 'Constituição',
			5: 'Inteligencia',
			6: 'Sabedoria',
			7: 'Carisma',
			8: 'Sanidade',
			9: 'Proteção contra fogo',
			10: 'Proteção contra frio',
			11: 'Defesa',
			12: 'Ataque'
		}
	};

	static get ALL_TYPES () {
		return {
			1: 'strength',
			2: 'dextery',
			3: 'agility',
			4: 'constitution',
			5: 'inteligence',
			6: 'wisdom',
			7: 'charisma',
			8: 'sanity',
			9: 'fire_protection',
			10: 'cold_protection',
			11: 'defense',
			12: 'atack'
		}
	};

	static get ALL_TYPE_IDS () {
		return {
			'strength': 1,
			'dextery': 2,
			'agility': 3,
			'constitution': 4,
			'inteligence': 5,
			'wisdom': 6,
			'charisma': 7,
			'sanity': 8,
			'fire_protection': 9,
			'cold_protection': 10,
			'defense': 11,
			'atack': 12
		}
	};

	// pegar a tradução do tipo
	static getTypeName (typeId) {
		return t(Modifier.ALL_TYPE_NAMES[typeId])
	}

	// salvar um modificador (editar ou criar um novo)
	static saveModifier (modifier) {

		return this.saveItem(modifier);
	}

	// pegar todos os modificadores de um equipamento
	static getAllModifiers (equipamentId) {
		let options = { 'filters': { 'equipamentId': equipamentId } };

		let modifiers = this.getAll(options); 

		return modifiers;
	}
}
