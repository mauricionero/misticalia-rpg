class InstantModifier extends RModel {

	static get EMOJI_ADD () { return '⚡' }
	static get EMOJI_VISUALIZE () { return '🗲' }
	static get EMOJI_VALUE () { return '🔢' }
	static get EMOJI_OBSERVATIONS () { return '📝' }

	static get EMOJI_LIFE () { return '❤️' };
	static get EMOJI_MANA () { return '✨' };

	static get EMOJI_TYPES () {
		return {
			1: InstantModifier.EMOJI_LIFE,
			2: InstantModifier.EMOJI_MANA
		}
	}

	static get ALL_TYPE_NAMES () {
		return {
			1: t('Vida'),
			2: t('Mana')
		}
	};

	static get ALL_TYPE_DESCRIPTIONS () {
		return {
			1: t('Adicionar ou subtrai vida do jogador que usar'),
			2: t('Adicionar ou subtrai mana do jogador que usar (mana é o que a mágica usa, quanto mais mágica, menos mana necessária e melhores os poderes)')
		}
	};

	static get ALL_TYPES () {
		return {
			1: 'life',
			2: 'mana'
		}
	};

	static get ALL_TYPE_IDS () {
		return {
			'life': 1,
			'mana': 2
		}
	};


	// salvar um modificador (editar ou criar um novo)
	saveInstantModifier () {

		return this.save();
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
				t('Os modificadores fazem efeito no personagem que usar esse o item com esse modificador')
			),
			modificationsList
		);
	}
}

RModel.models['InstantModifier'] = InstantModifier;
