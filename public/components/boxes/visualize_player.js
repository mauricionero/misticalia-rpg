class VisualizePlayer extends Box {

	static get windowName () { return 'visualize_player' };

	static get inputWidth () { return 36 };
	static get inputWidthSmall () { return 24 };
	static get inputHeight () { return 12 };

	boxContent (options) {

		let me = this;
		
		let boxId = me.boxId;

		let originBoxId = options['boxId'];

		let playerId = options['playerId'];
		this.playerId = playerId;

		// se eh NPC
		let isNPC = false;
		if (options['isNPC']) {
			isNPC = true;
		}
		this.isNPC = isNPC;

		let listPlayerDiv = $('<div>');

		// criar as abas de atributos e habilidades
		let playerTabs = $('<div>', { id: me.createId('tabs') } );

		let listPlayerAttributesTableDiv = $('<div>', {
			id: me.createId('list_player_table_div_' + playerId),
			display: 'inline'
		});

		let listPlayerExpertiseTableDiv = $('<div>', {
			id: me.createId('list_player_expertise_table_div_' + playerId),
			display: 'inline'
		});

		let visualizePlayerEquipamentTableItems = $('<table>', {
			class: 'visualize_player_equipament',
			id: me.createId('equipaments_' + playerId)
		});

		let visualizePlayerEquipamentItems = $('<div>').append(
			visualizePlayerEquipamentTableItems,
			'<br />',
			$("<input>", {
				type: 'button',
				id: me.createId('manage_equipament_' + playerId),
				title: t('Adicionar equipamento ao inventário desse personagem'),
				onclick: 'AddPlayerEquipament.visualizeEquipaments("' + playerId + '", "' + boxId + '")',
				value: Equipament.EMOJI_ADD + ' ' + t('Adicionar equipamento')
			}),
		);

		let listPlayerDescriptions = $('<div>', {
			id: me.createId('list_player_descriptions_div_' + playerId),
			display: 'inline'
		});

		playerTabs.append(
			$('<ul>').append(
				$('<li>', { title: t('Atributos') } ).append(
					$('<a>', { href: '#' + me.createId('tab-1') } ).html(
						$('<b>').append(
							Player.EMOJI_ATTRIBUTE
						)
					)
				),
				$('<li>', { title: t('Perícias') } ).append(
					$('<a>', { href: '#' + me.createId('tab-2') } ).html(
						$('<b>').append(
							Player.EMOJI_EXPERTISE
						)
					)
				),
				$('<li>', { title: t('Equipamentos') } ).append(
					$('<a>', { href: '#' + me.createId('tab-3') } ).html(
						$('<b>').append(
							Equipament.EMOJI_MAIN
						)
					)
				),
				$('<li>', { title: t('Descrições') } ).append(
					$('<a>', { href: '#' + me.createId('tab-4') } ).html(
						$('<b>').append(
							Player.EMOJI_BACKGROUND
						)
					)
				)
			),
			$('<div>', { id: me.createId('tab-1') } ).append(
				listPlayerAttributesTableDiv,
				$("<input>", {
					type: 'button',
					id: me.createId('save'),
					title: t('Salvar'),
					onclick: 'VisualizePlayer.updatePlayer("' + playerId + '", "' + boxId + '", "' + originBoxId + '")',
					value: t('Salvar')
				})
			),
			$('<div>', { id: me.createId('tab-2') } ).append(
				listPlayerExpertiseTableDiv
			),
			$('<div>', { id: me.createId('tab-3') } ).append(
				visualizePlayerEquipamentItems
			),
			$('<div>', { id: me.createId('tab-4') } ).append(
				listPlayerDescriptions,
				$("<input>", {
					type: 'button',
					id: me.createId('save_2'),
					title: t('Salvar'),
					onclick: 'VisualizePlayer.updatePlayer("' + playerId + '", "' + boxId + '", "' + originBoxId + '")',
					value: t('Salvar')
				})
			)
		);

		let playerEquipamentTable = $('<table>').append(
			$('<tr>').append(
				$('<td>').append(
					$('<input>', {
						type: 'hidden',
						id: me.createId('is_npc'),
						value: isNPC
					}),
					$('<label>', { title: t('Sem filtro') } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: me.createId('equipament_type'),
							checked: true,
							value: 0
						}),
						$('<span>').append(
							'&nbsp;&nbsp;&nbsp;'
						)
					)
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_HELMET)) } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: me.createId('equipament_type'),
							value: Equipament.TYPE_HELMET
						}),
						$('<span>').append(
							Equipament.EMOJI_HELMET
						)
					)
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_AMULET)) } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: me.createId('equipament_type'),
							value: Equipament.TYPE_AMULET
						}),
						$('<span>').append(
							Equipament.EMOJI_AMULET
						)
					)
				)
			),
			$('<tr>').append(
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_ATACK)) } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: me.createId('equipament_type'),
							value: Equipament.TYPE_ATACK
						}),
						$('<span>').append(
							Equipament.EMOJI_ATACK
						)
					)
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_CHESTPLATE)) } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: me.createId('equipament_type'),
							value: Equipament.TYPE_CHESTPLATE
						}),
						$('<span>').append(
							Equipament.EMOJI_CHESTPLATE
						)
					)
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_CHESTPLATE)) } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: me.createId('equipament_type'),
							value: Equipament.TYPE_SHIELD
						}),
						$('<span>').append(
							Equipament.EMOJI_SHIELD
						)
					)
				)
			),
			$('<tr>').append(
				$('<td>').html(
					''
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_LEGGING)) } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: me.createId('equipament_type'),
							value: Equipament.TYPE_LEGGING
						}),
						$('<span>').append(
							Equipament.EMOJI_LEGGING
						)
					)
				),
				$('<td>').html(
					''
				)
			),
			$('<tr>').append(
				$('<td>').html(
					''
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_BOOTS)) } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: me.createId('equipament_type'),
							value: Equipament.TYPE_BOOTS
						}),
						$('<span>').append(
							Equipament.EMOJI_BOOTS
						)
					)
				),
				$('<td>').html(
					''
				)
			)
		);

		let playerEquipamentListDiv = $('<div>', {
			id: me.createId('equipament_list_' + playerId),
			class: 'visualize_player_equipament_item_list'
		});

		visualizePlayerEquipamentTableItems.append(
			$('<tr>').append(
				$('<td>').append(
					playerEquipamentTable
				),
				$('<td>').append(
					playerEquipamentListDiv
				)
			)
		);

		listPlayerDiv.append(
			playerTabs
		);

		return listPlayerDiv;
	}

	// executa após printar a janela
	callBackRender () {

		let me = this;

		let playerId = me.playerId;
		let isNPC = me.isNPC;

		let playerTabs = $('#' + me.createId('tabs') );
		playerTabs.tabs();

		me.listPlayerAttributes(playerId, isNPC);
		me.listPlayerExpertises(playerId);
		me.listEquipaments(playerId, isNPC);
		me.listPlayerDescriptions(playerId);

		// verificar quando eh alterado o equipamento clicado
		$("input[name='" + me.createId('equipament_type') + "']").change(function() {
			let equipamentTypeId = $(this).val();

			me.filterListEquipaments(playerId, equipamentTypeId);
		});
	}

	// listar os atributos do jogador
	listPlayerAttributes (playerId, isNPC = false) {

		let me = this;
		
		let boxId = me.boxId;

		let listPlayerAttributesTableDiv = $('#' + me.createId('list_player_table_div_' + playerId));

		let player = Player.getPlayer(playerId);

		let inputWidth = VisualizePlayer.inputWidth;
		let inputWidthSmall = VisualizePlayer.inputWidthSmall;
		let inputHeight = VisualizePlayer.inputHeight;

		let playerSimpleData = $('<table>').append(
			$('<tr>').append(
				$('<th>', { title: t('Vida') } ).append(
					Player.EMOJI_LIFE
				),
				$('<td>').append(
					$('<input>', {
						type: 'text',
						id: me.createId('life_' + playerId),
						width: inputWidth,
						value: player.getAttribute('life')
					}),
					'%'
				),
				$('<th>', { title: t('Vida máxima') } ).append(
					Player.EMOJI_MAXLIFE
				),
				$('<td>').append(
					$('<input>', {
						type: 'text',
						id: me.createId('max_life_' + playerId),
						width: inputWidth,
						value: player.getAttribute('maxLife')
					}),
					'%&nbsp;'
				),
				$('<th>', { title: t('Mana') } ).append(
					'&nbsp;' + Player.EMOJI_MANA
				),
				$('<td>').append(
					$('<input>', {
						type: 'text',
						id: me.createId('mana_' + playerId),
						width: inputWidth,
						value: player.getAttribute('mana')
					})
				)
			)
		);

		let listPlayerAttributesTable = $("<table>");

		// titulo das colunas na tabela
		listPlayerAttributesTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Atributo') }).append(
					Player.EMOJI_ATTRIBUTE
				),
				$("<th>", { title: t('Nivel') }).append(
					Player.EMOJI_LEVEL
				),
				$("<th>", { title: t('Pontos base') }).append(
					Player.EMOJI_POINTS
				),
				$("<th>", { title: t('Modificador permanente') }).append(
					Player.EMOJI_PERMANENT_MODIFICATOR
				),
				$("<th>", { title: t('Modificador temporario') }).append(
					Player.EMOJI_TEMPORARY_MODIFICATOR
				),
				$("<th>", { title: t('Total de pontos') }).append(
					Player.EMOJI_TOTAL_POINTS
				),
				$("<th>", { title: t('Rolagem de dados') }).append(
					Player.EMOJI_ROLL_DICE
				),
				$("<th>", { title: t('Dificuldade') }).append(
					Player.EMOJI_DIFFICULTY
				),
				$("<th>", { title: t('Resultado rolagem') }).append(
					Player.EMOJI_RESULT
				)
			)
		);

		let allAttributes = Player.ALL_ATTRIBUTES;
		if (isNPC) {
			allAttributes = allAttributes.concat(Player.ALL_SECONDARY_ATTRIBUTES);
		}

		allAttributes.forEach(function (attribute) {
			let basePoints = player.getAttribute(attribute, 'basePoints');
			let permanentModifier = player.getAttribute(attribute, 'permanentModifier');
			let temporaryModifier = player.getAttribute(attribute, 'temporaryModifier');

			let typeId = Modifier.ALL_TYPE_IDS[attribute];

			listPlayerAttributesTable.append(
				$("<tr>").append(
					$("<td>").append(
						Modifier.EMOJI_TYPES[typeId] + ' ' + Player.getAttributeName(attribute)
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							disabled: 'disabled',
							id: me.createId('level_' + playerId + '_' + attribute),
							width: inputWidthSmall,
							height: inputHeight,
							value: Player.levelCalculator(basePoints)
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('base_points_' + playerId + '_' + attribute),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints("' + boxId + '", "' + playerId + '", "' + attribute + '")',
							value: basePoints
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('permanent_modifier_' + playerId + '_' + attribute),
							width: inputWidth,
							height: inputHeight,
							disabled: 'disabled',
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints("' + boxId + '", "' + playerId + '", "' + attribute + '")',
							value: permanentModifier
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('temporary_modifier_' + playerId + '_' + attribute),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints("' + boxId + '", "' + playerId + '", "' + attribute + '")',
							value: temporaryModifier
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							disabled: 'disabled',
							id: me.createId('points_' + playerId + '_' + attribute),
							width: inputWidth,
							height: inputHeight,
							value: Player.calculateTotalPoints(basePoints, temporaryModifier, permanentModifier)
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('dice_' + playerId + '_' + attribute),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateDiceResult("' + boxId + '", "' + playerId + '", "' + attribute + '")',
							placeholder: Dice.EMOJI_DICE
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('difficulty_' + playerId + '_' + attribute),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateDiceResult("' + boxId + '", "' + playerId + '", "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							disabled: 'disabled',
							class: 'bold',
							id: me.createId('result_' + playerId + '_' + attribute),
							width: inputWidth,
							height: inputHeight,
							value: 0
						})
					)
				)
			);
		});

		let secondaryAttributes = $('<div>').append('&nbsp;');

		Player.ALL_SECONDARY_ATTRIBUTES.forEach(function (attribute) {
			if (player[attribute] == undefined) {
				player[attribute] = {};
			}

			let points = parseInt(player[attribute]['points'] || 0);

			// se for zero, nem exibir
			if (points == 0) {
				return true;
			}

			let typeId = Modifier.ALL_TYPE_IDS[attribute];

			let modifierName = Modifier.ALL_TYPE_NAMES[typeId];

			secondaryAttributes.append(
				$('<span>', { title: modifierName } ).append(
					Modifier.EMOJI_TYPES[typeId] + points + ' '
				)
			);
		});

		// limpar antes de adicionar novo conteudo
		listPlayerAttributesTableDiv.html('');

		listPlayerAttributesTableDiv.append(
			playerSimpleData,
			'<br />',
			listPlayerAttributesTable,
			secondaryAttributes
		);
	}

	// listar as pericias do jogador
	listPlayerExpertises (playerId) {

		let me = this;
		
		let boxId = me.boxId;

		let listPlayerExpertiseTableDiv = $('#' + me.createId('list_player_expertise_table_div_' + playerId));

		let player = Player.getPlayer(playerId);

		let inputWidth = VisualizePlayer.inputWidth;
		let inputWidthSmall = VisualizePlayer.inputWidthSmall;
		let inputHeight = VisualizePlayer.inputHeight;

		// ordenar por atributo e nome
		let optionFilter = {
			'filters': {},
			'order': {
				'attributeId': 'ASC',
				'name': 'ASC'
			}
		}
		
		let allExpertises = Expertise.getAllExpertises(optionFilter);

		let allAttributes = Expertise.getAllAttributes();

		let organizedPlayerExpertises = PlayerExpertise.getPlayerExpertisesIndex(playerId);

		// criar as abas de atributos e habilidades
		let expertiseTabs = $('<div>', { id: me.createId('tabs') } );
		let expertiseTabsUl = $('<ul>');

		// criar indice das tabs
		allAttributes.forEach(function (attribute) {

			let attributeId = Modifier.ALL_TYPE_IDS[attribute];
			let attributeName = Modifier.ALL_TYPE_NAMES[attributeId];

			expertiseTabsUl.append(
				$('<li>', { title: attributeName } ).append(
					$('<a>', { href: '#' + me.createId('expertise-tab-' + attributeId) } ).html(
						$('<b>').append(
							Modifier.EMOJI_TYPES[attributeId]
						)
					)
				)
			);
		});

		expertiseTabsUl.append('<br /><br />');

		let listExpertiseTable = [];

		// criar as tabelas das tabs
		allAttributes.forEach(function (attribute) {

			let attributeId = Modifier.ALL_TYPE_IDS[attribute];
			let attributeName = Modifier.ALL_TYPE_NAMES[attributeId];

			listExpertiseTable[attributeId] = $('<table>', { id: me.createId('table_attribute_' + attributeId) } );

			// titulo das colunas na tabela
			listExpertiseTable[attributeId].append(
				$('<tr>').append(
					$('<th>', { title: t('Perícia') }).append(
						Expertise.EMOJI_MAIN
					),
					$('<th>', { title: t('Pontos') }).append(
						PlayerExpertise.EMOJI_POINTS
					),
					$('<th>', { title: t('Multiplicador') }).append(
						Expertise.EMOJI_MULTIPLIER
					),
					$('<th>', { title: t('Pontos do atributo') }).append(
						Player.EMOJI_ATTRIBUTE
					),
					$('<th>', { title: t('Modificador temporario') }).append(
						Expertise.EMOJI_TEMPORARY_MODIFIER
					),
					$('<th>', { title: t('Total de pontos nessa perícia') }).append(
						Expertise.EMOJI_TOTAL_POINTS
					),
					$('<th>', { title: t('Rolagem de dados') }).append(
						Player.EMOJI_ROLL_DICE
					),
					$('<th>', { title: t('Dificuldade') }).append(
						Player.EMOJI_DIFFICULTY
					),
					$('<th>', { title: t('Resultado rolagem') }).append(
						Player.EMOJI_RESULT
					)
				)
			);

			expertiseTabsUl.append(
				$('<div>', { id: me.createId('expertise-tab-' + attributeId) } ).html(
					listExpertiseTable[attributeId]
				)
			);
		});

		// preencher as tabelas de pericias criadas anteriormente dentro das abas
		allExpertises.forEach(function (expertise) {

			let expertiseId = expertise['id'];

			if (! expertiseId) {
				return;
			}

			let expertiseName = expertise['name'];
			let expertiseMultiplier = expertise['multiplier'];

			let attributeId = expertise['attributeId'];

			if (! attributeId) {
				return;
			}
			let attributeName = Modifier.ALL_TYPE_NAMES[attributeId];
			let attributeEmoji = Modifier.EMOJI_TYPES[attributeId];
			let attribute = Modifier.ALL_TYPES[attributeId];
			let attributePoints = $('#' + me.createId('points_' + playerId + '_' + attribute)).val();

			let expertisePoints = (organizedPlayerExpertises[expertiseId]) ? organizedPlayerExpertises[expertiseId]['points'] : 0;

			listExpertiseTable[attributeId].append(
				$("<tr>").append(
					$('<td>').append(
						expertiseName
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('expertise_' + expertiseId),
							width: inputWidthSmall,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateExpertisePoints("' + boxId + '", "' + playerId + '", "' + expertiseId + '")',
							onchange: 'VisualizePlayer.savePlayerExpertise("' + boxId + '", "' + playerId + '", "' + expertiseId + '")',
							value: expertisePoints
						})
					),
					$('<td>', { title: attributeName } ).append(
						$("<input>", {
							type: 'text',
							id: me.createId('expertise_multiplier_' + expertiseId),
							width: inputWidthSmall,
							height: inputHeight,
							disabled: 'disabled',
							value: expertiseMultiplier
						})
					),
					$('<td>').append(
						attributeEmoji,
						$("<input>", {
							type: 'text',
							id: me.createId('expertise_attribute_points_' + expertiseId),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateExpertisePoints("' + boxId + '", "' + playerId + '", "' + expertiseId + '")',
							onchange: 'VisualizePlayer.savePlayerExpertise("' + boxId + '", "' + playerId + '", "' + expertiseId + '")',
							value: attributePoints
						})
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('expertise_modifier_' + expertiseId),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateExpertisePoints("' + boxId + '", "' + playerId + '", "' + expertiseId + '")',
							onchange: 'VisualizePlayer.savePlayerExpertise("' + boxId + '", "' + playerId + '", "' + expertiseId + '")',
							value: 0
						})
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('expertise_total_points_' + expertiseId),
							width: inputWidth,
							height: inputHeight,
							value: PlayerExpertise.calculateTotalPoints(expertisePoints, expertiseMultiplier, attributePoints)
						})
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('expertise_dice_' + expertiseId),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateExpertiseDiceResult("' + boxId + '", "' + playerId + '", "' + expertiseId + '")',
							placeholder: Dice.EMOJI_DICE
						})
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('expertise_difficulty_' + expertiseId),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateExpertiseDiceResult("' + boxId + '", "' + playerId + '", "' + expertiseId + '")',
							value: 0
						})
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							disabled: 'disabled',
							class: 'bold',
							id: me.createId('expertise_result_' + expertiseId),
							width: inputWidth,
							height: inputHeight,
							value: 0
						})
					)
				)
			)
		});

		expertiseTabs.append(
			expertiseTabsUl
		);

		listPlayerExpertiseTableDiv.html('');

		listPlayerExpertiseTableDiv.append(expertiseTabs);

		expertiseTabs.tabs();
	}

	// atualizar lista de equipamentos de acordo com filtro de tipo opcional
	listEquipaments (playerId, isNPC = false) {

		let me = this;
		
		let boxId = me.boxId;

		let playerEquipamentListDiv = $('#' + me.createId('equipament_list_' + playerId));

		let selectedEquipamentTypeId = $("input[name='" + me.createId('equipament_type') + "']:checked").val();

		let allPlayerEquipaments = PlayerEquipament.getAllPlayerEquipaments(playerId);

		let playerEquipamentListTable = $("<table>", {
			id: me.createId('table_equipament_list_' + playerId)
		});

		playerEquipamentListTable.append(
			$("<tr>").append(
				$('<th>', { title: t('Tipo') }).append(
					Equipament.EMOJI_TYPE
				),
				$('<th>', { title: t('Nome') }).append(
					Equipament.EMOJI_NAME
				)
			)
		);

		allPlayerEquipaments.forEach(function (playerEquipament) {

			let equipamentId = playerEquipament['equipamentId'];
			let playerEquipamentId = playerEquipament['id'];

			// criar filtro de equipamento
			let options = { 'filters': { 'id': equipamentId } }
			let equipament = Equipament.getAll(options)[0];

			// criar filtro de equipamento
			options = { 'filters': { 'equipamentId': equipamentId } }
			let hasEquipedEquipament = (EquipedEquipament.getAllPlayerEquipedEquipaments(playerId, options)[0]) ? true : false;

			let extraClass = '';

			// se esta equipado esse equipamento, destacar
			if (hasEquipedEquipament) {
				extraClass = 'visualize_player_equiped'
			}

			let equipamentTypeId = equipament['typeId'];

			playerEquipamentListTable.append(
				$("<tr>", {
					id: me.createId('_player_equipament_item_' + playerEquipamentId),
					class: 'visualize_player_select_item ' + extraClass,
					onclick: 'VisualizePlayer.equipEquipament("' + playerId + '", "' + playerEquipamentId + '", "' + equipamentId + '", "' + boxId + '", ' + (hasEquipedEquipament != true) + ')'
				}).append(
					$("<td>", { title: Equipament.ALL_TYPE_NAMES[equipamentTypeId] } ).append(
						Equipament.EMOJI_TYPES[equipamentTypeId],
						$("<input>", {
							type: 'hidden',
							id: me.createId('player_equipament_type_' + equipamentId),
							disabled: 'disabled',
							value: equipamentTypeId
						})
					),
					$("<td>").append(
						equipament['name'],
						$("<input>", {
							type: 'hidden',
							id: me.createId('player_equipament_name_' + equipamentId),
							disabled: 'disabled',
							value: equipament['name']
						})
					)
				)
			)

		});

		// limpar antes de inserir o conteudo
		playerEquipamentListDiv.html('');

		playerEquipamentListDiv.append(playerEquipamentListTable);

		me.filterListEquipaments (playerId, selectedEquipamentTypeId);
	}

	// listar as descrições do personagem, tal como background, motivações e defeitos
	listPlayerDescriptions(playerId) {
		let me = this;

		let listPlayerDescriptions = $('#' + me.createId('list_player_descriptions_div_' + playerId));
		
		let player = Player.getPlayer(playerId);

		let playerBackground = player['background'];
		let playerDefects = player['defects'];
		let playerMotivations = player['motivations'];

		listPlayerDescriptions.append(
			$('<table>').append(
				$('<tr>').append(
					$('<th>').append(
						Player.EMOJI_BACKGROUND,
						t('Background'),
						'<br />',
						$("<textarea>", {
							type: 'text',
							id: me.createId('background'),
							placeholder: t('História do personagem'),
							width: 400,
							height: 130
						}).html(playerBackground)
					)
				),
				$('<tr>').append(
					$('<th>').append(
						Player.EMOJI_DEFECTS,
						t('Defeitos e imperfeições'),
						'<br />',
						$("<textarea>", {
							type: 'text',
							id: me.createId('defects'),
							placeholder: t('Defeitos e imperfeições do personagem'),
							width: 400,
							height: 130
						}).html(playerDefects)
					)
				),
				$('<tr>').append(
					$('<th>').append(
						Player.EMOJI_MOTIVATIONS,
						t('Motivações'),
						'<br />',
						$("<textarea>", {
							type: 'text',
							id: me.createId('motivations'),
							placeholder: t('O que motiva esse personagem'),
							width: 400,
							height: 130
						}).html(playerMotivations)
					)
				)
			)
		);
	}

	// filtrar tabela contendo os equipamentos do jogador
	filterListEquipaments (playerId, equipamentTypeId) {

		let me = this;

		let playerEquipamentListTable = $('#' + me.createId('table_equipament_list_' + playerId) + ' tr');

		let filterValue = '';

		if (equipamentTypeId != 0) {
			filterValue = Equipament.EMOJI_TYPES[equipamentTypeId];
		}

		playerEquipamentListTable.filter(function() {
			$(this).toggle(
				// filtrar pelo tipo do equipamento + a label no titulo + remover equipamento
				$(this).text().toLowerCase().indexOf(filterValue) > -1 || $(this).text().toLowerCase().indexOf(Equipament.EMOJI_NAME) > -1 || $(this).text().toLowerCase().indexOf(Equipament.EMOJI_REMOVE) > -1
			)
		});
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		let isNPC = $('#' + me.createId('is_npc')).val();
		isNPC = (isNPC == 'true') ? true : false;

		let playerOrNPC = (isNPC) ? t('NPCs') : t('personagens');

		let complement = '';

		if (isNPC) {
			complement = t('Um NPC é um personagem controlado apenas pelo mestre, alguém que faz parte da aventura como um personagem que não será jogado por nenhum jogador senão o mestre');
		}

		let playerEquipamentTable = $('<table>', { style: 'border: 1px solid #999; float: left; margin-right: 5px' } ).append(
			$('<tr>').append(
				$('<td>').append(
					''
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_HELMET)) } ).append(
						Equipament.EMOJI_HELMET
					)
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_AMULET)) } ).append(
						Equipament.EMOJI_AMULET
					)
				)
			),
			$('<tr>').append(
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_ATACK)) } ).append(
						Equipament.EMOJI_ATACK
					)
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_CHESTPLATE)) } ).append(
						Equipament.EMOJI_CHESTPLATE
					)
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_CHESTPLATE)) } ).append(
						Equipament.EMOJI_SHIELD
					)
				)
			),
			$('<tr>').append(
				$('<td>').html(
					''
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_LEGGING)) } ).append(
						Equipament.EMOJI_LEGGING
					)
				),
				$('<td>').html(
					''
				)
			),
			$('<tr>').append(
				$('<td>').html(
					''
				),
				$('<td>').append(
					$('<label>', { title: t(Equipament.getTypeName(Equipament.TYPE_BOOTS)) } ).append(
						Equipament.EMOJI_BOOTS
					)
				),
				$('<td>').html(
					''
				)
			)
		);

		return [
			$('<h3>').append(
				sprintf(t('Listar os %s da aventura'), playerOrNPC)
			),
			complement,
			$('<p>').append(
				t('<b>Legendas:</b> (basta deixar o mouse em cima de cada icone para aparecer o que significam)')
			),
			$('<h3>').append(
				sprintf(t('Aba %s (Atributos)'), Player.EMOJI_ATTRIBUTE)
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s Vida</b> desse personagem (percentual), quanto mais constituição, menos vida perde'), Player.EMOJI_LIFE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Vida máxima</b> desse personagem (percentual). Aumenta o limite de vida, além de 100% inclusive.'), Player.EMOJI_MAXLIFE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Mana</b> desse personagem. Gasta-se mana para realizar ações mágicas.'), Player.EMOJI_MANA)
				),
				'<br />',
				$('<li>').append(
					sprintf(t('<b>%s Atributo</b>'), Player.EMOJI_ATTRIBUTE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Nível</b> desse atributo. Fórmula:'), Player.EMOJI_LEVEL),
					$('<pre>').append(
						Player.levelCalculatorFormula
					)
				),
				$('<li>').append(
					sprintf(t('<b>%s Pontuação base</b> desse atributo, o "normal" para um jovem adulto gira em torno de 100'), Player.EMOJI_POINTS)
				),
				$('<li>').append(
					sprintf(t('<b>%s Modificador permanente</b> desse atributo, modificado apenas por equipamentos contendo modificadores. Aumentam o total de pontos do atributo'), Player.EMOJI_PERMANENT_MODIFICATOR)
				),
				$('<li>').append(
					sprintf(t('<b>%s Modificador temporario</b> desse atributo, modificado a qualquer momento pelo mestre. Aumentam o total de pontos do atributo'), Player.EMOJI_TEMPORARY_MODIFICATOR)
				),
				$('<li>').append(
					sprintf(t('<b>%s Total de pontos</b>, isso irá mudar ao longo da aventura. Alguns equipamentos e modificadores podem alterar isso'), Player.EMOJI_TOTAL_POINTS)
				),
				$('<li>').append(
					sprintf(t('<b>%s Dado rolado</b>, coloque nesse campo o valor de uma rolagem de dados para que seja calculado o resultado de algum teste desse atributo'), Player.EMOJI_ROLL_DICE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Dificuldade</b> do teste, coloque nesse campo o valor da dificuldade de algum teste que queira fazer para que seja calculado o resultado combinado com a rolagem de dados'), Player.EMOJI_DIFFICULTY)
				),
				$('<li>').append(
					sprintf(t('<b>%s Resultado</b> do teste, mostra o resultado do teste combinando o valor do dado rolado com a dificuldade e a pontuação desse atributo. Fórmula:'), Player.EMOJI_RESULT),
					$('<pre>').append(
						Player.calculateDiceResultFormula
					)
				)
			),
			Player.helpAttributesMeaning(isNPC),
			$('<p>').append(
				t('<b>Salvar:</b> Ao clicar salva qualquer modificação feita nos atributos ou vida do personagem')
			),

			$('<h3>').append(
				sprintf(t('Aba %s (Perícias)'), Player.EMOJI_EXPERTISE)
			),
			$('<p>').append(
				t('Essa aba contém todas as perícias do personagem')
			),
			$('<p>').append(
				t('Sempre que precisar fazer uma rolagem de algo mais específico que apenas o atributo do personagem, deve-se rolar nessa aba.')
			),
			$('<p>').append(
				t('Podem ser criadas novas perícias no menu da aventura. A ideia é que quanto mais específico a perícia for, maior o multiplicador dela que será somado ao atributo relacionado.')
			),
			$('<p>').append(
				t('<b>Legendas:</b>')
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s Perícia:</b> Nome dessa perícia'), Expertise.EMOJI_MAIN)
				),
				$('<li>').append(
					sprintf(t('<b>%s Pontos:</b> Quantos pontos tem nessa perícia. A sugestão é que a soma de todas as perícias de um atributo nunca passem o valor do atributo.'), PlayerExpertise.EMOJI_POINTS)
				),
				$('<li>').append(
					sprintf(t('<b>%s Multiplicador:</b> Por quanto irá multiplicar os pontos dessa perícia antes de somar aos pontos do atributo relacionado'), Expertise.EMOJI_MULTIPLIER)
				),
				$('<li>').append(
					sprintf(t('<b>%s Pontos do atributo:</b> Pontuação total do atributo relacionado.'), Player.EMOJI_ATTRIBUTE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Modificador temporario:</b> Modificador para alterar a pontuação final rapidamente. Útil para algum bônus ou penalidade numa rolagem de dados.'), Expertise.EMOJI_TEMPORARY_MODIFIER)
				),
				$('<li>').append(
					sprintf(t('<b>%s Total de pontos nessa perícia:</b> (perícia + modificador) * multiplicador + atributo.'), Expertise.EMOJI_TOTAL_POINTS)
				),
				$('<li>').append(
					sprintf(t('<b>%s Rolagem de dados:</b> Rolar um d100 para essa perícia para realizar algum teste.'), Player.EMOJI_ROLL_DICE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Dificuldade:</b> A dificuldade que esse teste tem nessa perícia.'), Player.EMOJI_DIFFICULTY)
				),
				$('<li>').append(
					sprintf(t('<b>%s Resultado rolagem:</b> Resultado que a rolagem teve em comparação com a dificuldade do teste.'), Player.EMOJI_RESULT)
				),
			),

			$('<h3>').append(
				sprintf(t('Aba %s (Equipamentos)'), Equipament.EMOJI_MAIN)
			),
			$('<p>').append(
				t('Exibe os equipamentos que o personagem tem em seu inventario podendo equipar ou desequipar')
			),
			playerEquipamentTable,
			$('<p>').append(
				t('Clicando nos itens dessa tabela você pode filtrar os equipamentos que se encontram ao lado dela')
			),
			'<br style="clear: both" />',
			$('<p>').append(
				t('Na tabela, são listados os equipamentos que o personagem possui, clicando em algum, esse equipamento ficará em negrito para indicar que foi equipado. Se clicar em um equipamento em negrito, irá desequipar. Perceba que os modificadores desse equipamento farão efeito nos atributos correspondentes')
			),
			$('<p>').append(
				sprintf(t('<b>%s:</b> Ao clicar, abre uma janela para adicionar equipamentos ao inventário desse personagem'), Equipament.EMOJI_ADD + ' ' + t('Adicionar equipamento'))
			)
		];
	}


	// equipar o item selecionado do jogador
	static equipEquipament (playerId, playerEquipamentId, equipamentId, boxId, inserting = true) {

		let me = Box.getBox(boxId);

		let equipamentTypeId = $("input[name='" + me.createId('equipament_type') + "']:checked").val();

		let isNPC = $('#' + me.createId('is_npc')).val();
		
		isNPC = (isNPC == 'true') ? true : false;

		let resultSaved = false;

		// se estiver equipando
		if (inserting) {
			let newEquipedEquipament = new EquipedEquipament({
				'equipamentTypeId': equipamentTypeId,
				'playerId': playerId,
				'playerEquipamentId': playerEquipamentId,
				'equipamentId': equipamentId
			});

			resultSaved = newEquipedEquipament.equipEquipament();

		// se estiver desequipando
		} else {

			resultSaved = EquipedEquipament.unequipEquipament(playerId, playerEquipamentId);
		}

		let itemClicked = $('#' + me.createId('player_equipament_item_' + playerEquipamentId));

		if (resultSaved) {

			EquipedEquipament.recalculateEquipedModifiers(playerId);

			// recarregar listagem
			me.listEquipaments(playerId, isNPC);
			me.listPlayerAttributes(playerId, isNPC);

		} else {
			itemClicked.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300);
		}
	}

	// abrir dialog de visualização do player
	static visualizePlayer (playerId, isNPC, boxId = null) {

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];
		let playerGenderId = player['gender'] || 0;

		let genderTitle = (playerGenderId == Player.FEMALE_ID) ? 'Jogadora' : 'Jogador';
		let windowTitle = Player.EMOJI_GENDERS[playerGenderId] + ' ' + t(genderTitle) + ' ' + playerName;

		let options = {
			playerId: playerId,
			singleTon: true,
			isNPC: isNPC,
			boxId: boxId,
			windowId: VisualizePlayer.windowName + '_' + playerId
		};

		Box.openDialog(VisualizePlayer.windowName, windowTitle, options);
	}

	// recalcula o nivel e total de pontos
	static reCalculateTotalPoints (boxId, playerId, attribute) {

		let me = Box.getBox(boxId);

		let basePoints = $('#' + me.createId('base_points_' + playerId + '_' + attribute)).val() || 0;
		let temporaryModifier = $('#' + me.createId('temporary_modifier_' + playerId + '_' + attribute)).val() || 0;
		let permanentModifier = $('#' + me.createId('permanent_modifier_' + playerId + '_' + attribute)).val() || 0;

		let levelInput = $('#' + me.createId('level_' + playerId + '_' + attribute));
		let totalPointsInput = $('#' + me.createId('points_' + playerId + '_' + attribute));

		let level = Player.levelCalculator(basePoints);
		let totalPoints = Player.calculateTotalPoints(basePoints, temporaryModifier, permanentModifier);

		totalPointsInput.val(totalPoints);
		levelInput.val(level);
	}

	// recalcula o resultado da rolagem de dados
	static reCalculateDiceResult (boxId, playerId, attribute) {

		let me = Box.getBox(boxId);

		let totalPoints = $('#' + me.createId('points_' + playerId + '_' + attribute)).val() || 0;
		let diceRoll = $('#' + me.createId('dice_' + playerId + '_' + attribute)).val() || 0;
		let difficulty = $('#' + me.createId('difficulty_' + playerId + '_' + attribute)).val() || 0;

		let inputResult = $('#' + me.createId('result_' + playerId + '_' + attribute));

		let result = Player.calculateDiceResult(diceRoll, totalPoints, difficulty);

		inputResult.val(result);

		// mudar cor conforme resultado
		// se resultado positivo
		if (result > 0) {
			inputResult.addClass('positive_result');
			inputResult.removeClass('negative_result');
			inputResult.removeClass('neutral_result');

		// resultado negativo
		} else if (result < 0) {
			inputResult.removeClass('positive_result');
			inputResult.addClass('negative_result');
			inputResult.removeClass('neutral_result');

		// exatamente o que precisava...
		} else {
			inputResult.removeClass('positive_result');
			inputResult.removeClass('negative_result');
			inputResult.addClass('neutral_result');
		}
	}

	// recalcula o total de pontos da pericia + atributo
	static reCalculateExpertisePoints (boxId, playerId, expertiseId) {

		let me = Box.getBox(boxId);

		let expertisePoints = $('#' + me.createId('expertise_' + expertiseId)).val() || 0;
		let expertiseMultiplier = $('#' + me.createId('expertise_multiplier_' + expertiseId)).val() || 0;
		let attributePoints = $('#' + me.createId('expertise_attribute_points_' + expertiseId)).val() || 0;
		let expertiseModifier = $('#' + me.createId('expertise_modifier_' + expertiseId)).val() || 0;

		let attributeTotalPointsInput = $('#' + me.createId('expertise_total_points_' + expertiseId));

		let totalPoints = PlayerExpertise.calculateTotalPoints(expertisePoints, expertiseMultiplier, attributePoints, expertiseModifier);

		attributeTotalPointsInput.val(totalPoints);
	}

	// salvar a pericia especifica do jogador
	static savePlayerExpertise (boxId, playerId, expertiseId) {

		let me = Box.getBox(boxId);

		let expertisePoints = parseInt($('#' + me.createId('expertise_' + expertiseId)).val()) || 0;
		let expertiseModifier = parseInt($('#' + me.createId('expertise_modifier_' + expertiseId)).val()) || 0;

		let playerExpertise = PlayerExpertise.getPlayerExpertise(playerId, expertiseId);

		// se nao existe ainda cadastrado
		if (! playerExpertise) {
			playerExpertise = new PlayerExpertise({
				'playerId': playerId,
				'expertiseId': expertiseId,
				'points': expertisePoints,
				'modifier': expertiseModifier
			});
		} else {
			playerExpertise['points'] = expertisePoints;
			playerExpertise['modifier'] = expertiseModifier;
		}

		if (! playerExpertise.save() ) {
			console.error(t('Não foi possível salvar a perícia do personagem :('));
		}
	}

	// recalcula o total de pontos
	static reCalculateExpertiseDiceResult (boxId, playerId, expertiseId) {

		let me = Box.getBox(boxId);

		let attributeTotalPoints = $('#' + me.createId('expertise_total_points_' + expertiseId)).val() || 0;
		let expertiseDie = $('#' + me.createId('expertise_dice_' + expertiseId)).val() || 0;
		let expertiseDificulty = $('#' + me.createId('expertise_difficulty_' + expertiseId)).val() || 0;

		let expertiseResultInput = $('#' + me.createId('expertise_result_' + expertiseId));

		let result = PlayerExpertise.calculateDiceResult(attributeTotalPoints, expertiseDie, expertiseDificulty);

		// mudar cor conforme resultado
		processVisualResultInput(expertiseResultInput, result);
	}

	// salvar modificações do jogador
	static updatePlayer (playerId, boxId, originBoxId) {

		let me = Box.getBox(boxId);

		let isNPC = $('#' + me.createId('is_npc')).val();
		isNPC = (isNPC == 'true') ? true : false;

		let editPlayer = Player.getPlayer(playerId);

		let allAttributes = Player.ALL_ATTRIBUTES;
		if (isNPC) {
			allAttributes = allAttributes.concat(Player.ALL_SECONDARY_ATTRIBUTES);
		}

		let life = parseInt($('#' + me.createId('life_' + playerId)).val());
		let maxLife = parseInt($('#' + me.createId('max_life_' + playerId)).val());
		let mana = parseInt($('#' + me.createId('mana_' + playerId)).val());

		let playerBackground = $('#' + me.createId('background')).val();
		let playerDefects = $('#' + me.createId('defects')).val();
		let playerMotivations = $('#' + me.createId('motivations')).val();

		editPlayer['life'] = life;
		editPlayer['maxLife'] = maxLife;
		editPlayer['mana'] = mana;

		editPlayer['background'] = playerBackground;
		editPlayer['defects'] = playerDefects;
		editPlayer['motivations'] = playerMotivations;

		allAttributes.forEach(function (attribute) {
			let basePoints = parseInt($('#' + me.createId('base_points_' + playerId + '_' + attribute)).val());
			let points = parseInt($('#' + me.createId('points_' + playerId + '_' + attribute)).val());
			let temporaryModifier = $('#' + me.createId('temporary_modifier_' + playerId + '_' + attribute)).val() || 0;

			if (editPlayer[attribute]) {
				editPlayer[attribute]['basePoints'] = basePoints;
				editPlayer[attribute]['points'] = points;
				editPlayer[attribute]['temporaryModifier'] = temporaryModifier;
			} else {
				editPlayer[attribute] = {
					'basePoints': basePoints,
					'points': points,
					'temporaryModifier': temporaryModifier
				}
			}
		});

		let resultSaved = editPlayer.savePlayer();

		let saveButton = $('#' + me.createId('save'));
		let saveButton2 = $('#' + me.createId('save_2'));

		if (resultSaved) {

			saveButton.val(t('Salvo!'));
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300);
			saveButton2.val(t('Salvo!'));
			saveButton2.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300);

			// atualizar listagem da dialog que originou essa dialog
			if (originBoxId) {
				let originBox = Box.getBox(originBoxId);
				originBox.listPlayerData();
			}

		} else {

			saveButton.val('😟'); // :(
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300);
			saveButton.val(Equipament.EMOJI_ADD);
			saveButton2.val('😟'); // :(
			saveButton2.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300);
			saveButton2.val(Equipament.EMOJI_ADD);
		}
	}
}

Box.boxes[VisualizePlayer.windowName] = VisualizePlayer;
