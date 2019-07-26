class Modifier extends RModel {

	static get EMOJI_ADD () { return '⚡' }
	static get EMOJI_VISUALIZE () { return '🗲' }
	static get EMOJI_VALUE () { return '🔢' }
	static get EMOJI_OBSERVATIONS () { return '📝' }

	static get STRENGTH () { return 1 };
	static get DEXTERY () { return 2 };
	static get CONSTITUTION () { return 3 };
	static get INTELIGENCE () { return 4 };
	static get WISDOM () { return 5 };
	static get CHARISMA () { return 6 };
	static get SANITY () { return 7 };

	static get FIRE_PROTECTION () { return 8 };
	static get COLD_PROTECTION () { return 9 };
	static get DEFENSE () { return 10 };

	static get EMOJI_STRENGTH () { return Player.EMOJI_STRENGTH };
	static get EMOJI_DEXTERY () { return Player.EMOJI_DEXTERY };
	static get EMOJI_CONSTITUTION () { return Player.EMOJI_CONSTITUTION };
	static get EMOJI_INTELIGENCE () { return Player.EMOJI_INTELIGENCE };
	static get EMOJI_WISDOM () { return Player.EMOJI_WISDOM };
	static get EMOJI_CHARISMA () { return Player.EMOJI_CHARISMA };
	static get EMOJI_SANITY () { return Player.EMOJI_SANITY };
	static get EMOJI_FIRE_PROTECTION () { return '🔥' };
	static get EMOJI_COLD_PROTECTION () { return '❄️' };
	static get EMOJI_DEFENSE () { return '🛡️' };

	static get EMOJI_TYPES () {
		return {
			1: Modifier.EMOJI_STRENGTH,
			2: Modifier.EMOJI_DEXTERY,
			3: Modifier.EMOJI_CONSTITUTION,
			4: Modifier.EMOJI_INTELIGENCE,
			5: Modifier.EMOJI_WISDOM,
			6: Modifier.EMOJI_CHARISMA,
			7: Modifier.EMOJI_SANITY,
			8: Modifier.EMOJI_FIRE_PROTECTION,
			9: Modifier.EMOJI_COLD_PROTECTION,
			10: Modifier.EMOJI_DEFENSE
		}
	}

	static get ALL_TYPE_NAMES () {
		return {
			1: 'Força',
			2: 'Destreza',
			3: 'Constituição',
			4: 'Inteligencia',
			5: 'Sabedoria',
			6: 'Carisma',
			7: 'Sanidade',
			8: 'Proteção contra fogo',
			9: 'Proteção contra frio',
			10: 'Defesa'
		}
	};

	static get ALL_TYPES () {
		return {
			1: 'strength',
			2: 'dextery',
			3: 'constitution',
			4: 'inteligence',
			5: 'wisdom',
			6: 'charisma',
			7: 'sanity',
			8: 'fire_protection',
			9: 'cold_protection',
			10: 'defense'
		}
	};

	static get ALL_TYPE_IDS () {
		return {
			'strength': 1,
			'dextery': 2,
			'constitution': 3,
			'inteligence': 4,
			'wisdom': 5,
			'charisma': 6,
			'sanity': 7,
			'fire_protection': 8,
			'cold_protection': 9,
			'defense': 10
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
