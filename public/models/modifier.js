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
	static get MAGIC () { return 8 };
	static get SANITY () { return 9 };

	static get FIRE_PROTECTION () { return 10 };
	static get COLD_PROTECTION () { return 11 };
	static get DEFENSE () { return 12 };
	static get ATACK () { return 13 };

	static get EMOJI_STRENGTH () { return Player.EMOJI_STRENGTH };
	static get EMOJI_DEXTERY () { return Player.EMOJI_DEXTERY };
	static get EMOJI_AGILITY () { return Player.EMOJI_AGILITY };
	static get EMOJI_CONSTITUTION () { return Player.EMOJI_CONSTITUTION };
	static get EMOJI_INTELIGENCE () { return Player.EMOJI_INTELIGENCE };
	static get EMOJI_WISDOM () { return Player.EMOJI_WISDOM };
	static get EMOJI_CHARISMA () { return Player.EMOJI_CHARISMA };
	static get EMOJI_MAGIC () { return Player.EMOJI_MAGIC };
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
			8: Modifier.EMOJI_MAGIC,
			9: Modifier.EMOJI_SANITY,
			10: Modifier.EMOJI_FIRE_PROTECTION,
			11: Modifier.EMOJI_COLD_PROTECTION,
			12: Modifier.EMOJI_DEFENSE,
			13: Modifier.EMOJI_ATACK
		}
	}

	static get ALL_TYPE_NAMES () {
		return {
			1: t('Força'),
			2: t('Destreza'),
			3: t('Agilidade'),
			4: t('Constituição'),
			5: t('Inteligencia'),
			6: t('Sabedoria'),
			7: t('Carisma'),
			8: t('Mágica'),
			9: t('Sanidade'),
			10: t('Proteção contra fogo'),
			11: t('Proteção contra frio'),
			12: t('Defesa'),
			13: t('Ataque')
		}
	};

	static get ALL_TYPE_DESCRIPTIONS () {
		return {
			1: t('Adiciona ou subtrai à força'),
			2: t('Adiciona ou subtrai à destreza'),
			3: t('Adiciona ou subtrai à agilidade'),
			4: t('Adiciona ou subtrai à constituição'),
			5: t('Adiciona ou subtrai à inteligencia'),
			6: t('Adiciona ou subtrai à sabedoria'),
			7: t('Adiciona ou subtrai ao carisma'),
			8: t('Adiciona ou subtrai à mágica'),
			9: t('Adiciona ou subtrai à sanidade'),
			10: t('Adiciona ou subtrai à proteção contra fogo'),
			11: t('Adiciona ou subtrai à proteção contra frio'),
			12: t('Adiciona ou subtrai à defesa'),
			13: t('Adiciona ou subtrai ao ataque')
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
			8: 'magic',
			9: 'sanity',
			10: 'fire_protection',
			11: 'cold_protection',
			12: 'defense',
			13: 'atack'
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
			'magic': 8,
			'sanity': 9,
			'fire_protection': 10,
			'cold_protection': 11,
			'defense': 12,
			'atack': 13
		}
	};


	// salvar um modificador (editar ou criar um novo)
	saveModifier () {

		return this.save();
	}


	// pegar a tradução do tipo
	static getTypeName (typeId) {
		return Modifier.ALL_TYPE_NAMES[typeId]
	}

	// pegar todos os modificadores de um equipamento
	static getAllModifiers (equipamentId) {
		let options = { 'filters': { 'equipamentId': equipamentId } };

		let modifiers = this.getAll(options); 

		return modifiers;
	}

	// retorna uma descrição para a box de ajuda sobre o que sao os modificadores
	static helpTypeMeaning () {

		let modificationsList = $('<ul>');

		for (var typeId in Modifier.ALL_TYPE_NAMES) {
			let typeName = Modifier.ALL_TYPE_NAMES[typeId];
			let typeDescription = Modifier.ALL_TYPE_DESCRIPTIONS[typeId];
			let typeEmoji = Modifier.EMOJI_TYPES[typeId];

			modificationsList.append(
				$('<li>').append(
					$('<b>').append(
						typeEmoji, ' ', typeName
					),
					': ', typeDescription
				)
			)
		}

		return $('<p>').append(
			$('<p>').append(
				t('Os modificadores alteram o modificador permanente do personagem que estiver usando o equipamento com esses modificadores')
			),
			modificationsList
		);
	}
}

RModel.models['Modifier'] = Modifier;
