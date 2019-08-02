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

		let listPlayerTableDiv = $('<div>', {
			id: me.createId('list_player_table_div_' + playerId)
		});

		let visualizePlayerEquipamentDiv = $('<div>', {
			class: 'visualize_player_equipament',
			id: me.createId('equipaments_' + playerId),
			style: 'display: none',
		});

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

		let itemListDiv = $('<div>', {
			id: me.createId('item_list_' + playerId),
			class: 'visualize_player_equipament_item_list'
		});

		visualizePlayerEquipamentDiv.append(
			playerEquipamentTable,
			itemListDiv,
			playerEquipamentListDiv
		);

		listPlayerDiv.append(
			listPlayerTableDiv,
			$("<input>", {
				type: 'button',
				title: t('Salvar'),
				onclick: 'VisualizePlayer.toggleViewEquipaments("' + playerId + '", "' + boxId + '")',
				value: t('Ver equipamentos e itens')
			}),
			' ',
			$("<input>", {
				type: 'button',
				id: me.createId('save'),
				title: t('Salvar'),
				onclick: 'VisualizePlayer.updatePlayer("' + playerId + '", "' + boxId + '", "' + originBoxId + '")',
				value: t('Salvar')
			}),
			'<br />',
			visualizePlayerEquipamentDiv
		);

		return listPlayerDiv;
	}

	// executa após printar a janela
	callBackRender () {

		let me = this;

		let playerId = me.playerId;
		let isNPC = me.isNPC;

		me.listPlayerAttributes(playerId, isNPC);
		me.listEquipaments(playerId, isNPC);

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

		let playerEquipamentListDiv = $('#' + me.createId('list_player_table_div_' + playerId));

		let player = Player.getPlayer(playerId);

		let inputWidth = VisualizePlayer.inputWidth;
		let inputWidthSmall = VisualizePlayer.inputWidthSmall;
		let inputHeight = VisualizePlayer.inputHeight;

		let playerSimpleData = $('<table>').append(
			$('<tr>').append(
				$('<th>').append(
					Player.EMOJI_LIFE
				),
				$('<td>').append(
					$('<input>', {
						type: 'text',
						id: me.createId('life_' + playerId),
						width: inputWidth,
						value: player.getAttribute('life') || 100
					}),
					'%'
				)
			)
		);

		let listPlayerTable = $("<table>");

		// titulo das colunas na tabela
		listPlayerTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Atributo') }).append(
					Player.EMOJI_ATTRIBUTE
				),
				$("<th>", { title: t('Nivel') }).append(
					Player.EMOJI_LEVEL
				),
				$("<th>", { title: t('Pontos') }).append(
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

			listPlayerTable.append(
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
							value: 0
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
		playerEquipamentListDiv.html('');

		playerEquipamentListDiv.append(
			playerSimpleData,
			listPlayerTable,
			secondaryAttributes
		);
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
				$("<th>", { title: t('Tipo') }).append(
					Equipament.EMOJI_TYPE
				),
				$("<th>", { title: t('Nome') }).append(
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

	// mostrar e esconder os equipamentos do player
	static toggleViewEquipaments (playerId, boxId) {

		let me = Box.getBox(boxId);

		$('#' + me.createId('equipaments_' + playerId)).slideToggle();
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

		editPlayer['life'] = life;

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

		if (resultSaved) {

			saveButton.val(t('Salvo!'));
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			// atualizar listagem da dialog que originou essa dialog
			if (originBoxId) {
				let originBox = Box.getBox(originBoxId);
				originBox.listPlayerData();
			}

		} else {

			saveButton.val('😟'); // :(
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
			saveButton.val(Equipament.EMOJI_ADD);
		}
	}
}

Box.boxes[VisualizePlayer.windowName] = VisualizePlayer;
