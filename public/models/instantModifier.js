class InstantModifier extends RModel {

	static get EMOJI_ADD () { return '⚡' }
	static get EMOJI_VISUALIZE () { return '🗲' }
	static get EMOJI_VALUE () { return '🔢' }
	static get EMOJI_OBSERVATIONS () { return '📝' }

	static get EMOJI_LIFE () { return Player.EMOJI_LIFE };
	static get EMOJI_MAXLIFE () { return Player.EMOJI_MAXLIFE };
	static get EMOJI_MANA () { return Player.EMOJI_MANA };

	static get EMOJI_TYPES () {
		return {
			1: InstantModifier.EMOJI_LIFE,
			2: InstantModifier.EMOJI_MAXLIFE,
			3: InstantModifier.EMOJI_MANA,
			4: Player.EMOJI_STRENGTH,
			5: Player.EMOJI_DEXTERY,
			6: Player.EMOJI_AGILITY,
			7: Player.EMOJI_CONSTITUTION,
			8: Player.EMOJI_INTELIGENCE,
			9: Player.EMOJI_WISDOM,
			10: Player.EMOJI_CHARISMA,
			11: Player.EMOJI_MAGIC,
			12: Player.EMOJI_SANITY
		}
	}

	static get ALL_TYPE_NAMES () {
		return {
			1: t('Vida'),
			2: t('Máximo de Vida'),
			3: t('Mana'),
			4: t('Força base'),
			5: t('Destreza base'),
			6: t('Agilidade base'),
			7: t('Constituição base'),
			8: t('Inteligencia base'),
			9: t('Sabedoria base'),
			10: t('Carisma base'),
			11: t('Mágica base'),
			12: t('Sanidade base')
		}
	};

	static get ALL_TYPE_DESCRIPTIONS () {
		return {
			1: t('Adicionar ou subtrai vida do jogador que usar'),
			2: t('Adicionar ou subtrai o máximo de vida do jogador que usar'),
			3: t('Adicionar ou subtrai mana do jogador que usar (mana é o que a mágica usa, quanto mais mágica, menos mana necessária e melhores os poderes)'),
			4: t('Adiciona ou subtrai à força base'),
			5: t('Adiciona ou subtrai à destreza base'),
			6: t('Adiciona ou subtrai à agilidade base'),
			7: t('Adiciona ou subtrai à constituição base'),
			8: t('Adiciona ou subtrai à inteligencia base'),
			9: t('Adiciona ou subtrai à sabedoria base'),
			10: t('Adiciona ou subtrai ao carisma base'),
			11: t('Adiciona ou subtrai à mágica base'),
			12: t('Adiciona ou subtrai à sanidade base')
		}
	};

	static get ALL_TYPES () {
		return {
			1: 'life',
			2: 'maxLife',
			3: 'mana',
			4: 'strength',
			5: 'dextery',
			6: 'agility',
			7: 'constitution',
			8: 'inteligence',
			9: 'wisdom',
			10: 'charisma',
			11: 'magic',
			12: 'sanity'
		}
	};

	static get ALL_TYPE_IDS () {
		return {
			'life': 1,
			'maxLife': 2,
			'mana': 3,
			'strength': 4,
			'dextery': 5,
			'agility': 6,
			'constitution': 7,
			'inteligence': 8,
			'wisdom': 9,
			'charisma': 10,
			'magic': 11,
			'sanity': 12
		}
	};


	// salvar um modificador (editar ou criar um novo)
	saveInstantModifier () {

		return this.save();
	}

	// aplicar o modificador atual no player
	applyModifier(playerId) {

		let player = Player.getPlayer(playerId);

		let typeId = parseInt(this['typeId']);

		switch(typeId) {
			case InstantModifier.ALL_TYPE_IDS['life']:
			case InstantModifier.ALL_TYPE_IDS['maxLife']:
			case InstantModifier.ALL_TYPE_IDS['mana']:
				
				return player.modifyAttribute(this['value'], InstantModifier.ALL_TYPES[typeId]);
				break;

			default:

				return player.modifyAttribute(this['value'], InstantModifier.ALL_TYPES[typeId], 'basePoints');
				break;
		}
	}


	// pegar a tradução do tipo
	static getTypeName (typeId) {
		return InstantModifier.ALL_TYPE_NAMES[typeId]
	}

	// pegar todos os modificadores de um item
	static getAllInstantModifiers (itemId) {
		let options = { 'filters': { 'itemId': itemId } };

		let instantModifiers = this.getAll(options); 

		return instantModifiers;
	}

	// retorna uma descrição para a box de ajuda sobre o que sao os modificadores
	static helpTypeMeaning () {

		let modificationsList = $('<ul>');

		for (var typeId in InstantModifier.ALL_TYPE_NAMES) {
			let typeName = InstantModifier.ALL_TYPE_NAMES[typeId];
			let typeDescription = InstantModifier.ALL_TYPE_DESCRIPTIONS[typeId];
			let typeEmoji = InstantModifier.EMOJI_TYPES[typeId];

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
				t('Os modificadores fazem efeito uma vez no momento que é consumido no personagem que usar esse o item com esse modificador')
			),
			modificationsList
		);
	}
}

RModel.models['InstantModifier'] = InstantModifier;
