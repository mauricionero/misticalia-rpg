class VisualizePlayer extends Box {

	static get windowName () { return 'visualize_player' };

	static get inputWidth () { return 36 };
	static get inputWidthSmall () { return 24 };
	static get inputHeight () { return 12 };

	boxContent (options) {
		var randomId = Math.floor(Math.random() * 10000);
		this.randomId = randomId;

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
			id: VisualizePlayer.windowName + '_list_player_table_div_' + playerId + '_' + randomId
		});

		let visualizePlayerEquipamentDiv = $('<div>', {
			class: 'visualize_player_equipament',
			id: VisualizePlayer.windowName + '_equipaments_' + playerId + '_' + randomId,
			style: 'display: none',
		});


		let playerEquipamentTable = $('<table>').append(
			$('<tr>').append(
				$('<td>').append(
					$('<input>', {
						type: 'hidden',
						id: VisualizePlayer.windowName + '_is_npc_' + randomId,
						value: isNPC
					}),
					$('<label>', { title: t('Sem filtro') } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_equipament_type',
							name: VisualizePlayer.windowName + '_equipament_type_' + randomId,
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
							name: VisualizePlayer.windowName + '_equipament_type_' + randomId,
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
							name: VisualizePlayer.windowName + '_equipament_type_' + randomId,
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
							name: VisualizePlayer.windowName + '_equipament_type_' + randomId,
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
							name: VisualizePlayer.windowName + '_equipament_type_' + randomId,
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
							name: VisualizePlayer.windowName + '_equipament_type_' + randomId,
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
							name: VisualizePlayer.windowName + '_equipament_type_' + randomId,
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
							name: VisualizePlayer.windowName + '_equipament_type_' + randomId,
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
			id: VisualizePlayer.windowName + '_equipament_list_' + playerId + '_' + randomId,
			class: 'visualize_player_equipament_item_list'
		});

		let itemListDiv = $('<div>', {
			id: VisualizePlayer.windowName + '_item_list_' + playerId + '_' + randomId,
			class: 'visualize_player_equipament_item_list'
		});

		visualizePlayerEquipamentDiv.append(
			playerEquipamentTable,
			itemListDiv,
			playerEquipamentListDiv
		);

		listPlayerDiv.append(
			listPlayerTableDiv,
			'<br />',
			$('<a>',{
				href: 'javascript: void(0)',
				onclick: 'VisualizePlayer.toggleViewEquipaments("' + playerId + '", ' + randomId + ')'
			}).html(
				t('Ver equipamentos e itens')
			),
			'<br />',
			visualizePlayerEquipamentDiv
		);

		return listPlayerDiv;
	}

	// executa após printar a janela
	callBackRender () {
		let randomId = this.randomId;
		let playerId = this.playerId;
		let isNPC = this.isNPC;

		VisualizePlayer.listPlayerAttributes(playerId, randomId, isNPC);
		VisualizePlayer.listEquipaments(playerId, randomId, isNPC);

		// verificar quando eh alterado o equipamento clicado
		$("input[name='" + VisualizePlayer.windowName + '_equipament_type_' + randomId + "']").change(function() {
			let equipamentTypeId = $(this).val();

			VisualizePlayer.filterListEquipaments (playerId, randomId, equipamentTypeId);
		});
	}

	// listar os atributos do jogador
	static listPlayerAttributes (playerId, randomId, isNPC = false) {
		let playerEquipamentListDiv = $('#' + VisualizePlayer.windowName + '_list_player_table_div_' + playerId + '_' + randomId);

		let player = Player.getPlayer(playerId);

		let inputWidth = this.inputWidth;
		let inputWidthSmall = this.inputWidthSmall;
		let inputHeight = this.inputHeight;

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
			let basePoints = player[attribute]['basePoints'] || 0;
			let permanentModifier = player[attribute]['permanentModifier'] || 0;
			let temporaryModifier = player[attribute]['temporaryModifier'] || 0;

			let typeId = Modifier.ALL_TYPE_IDS[attribute];

			listPlayerTable.append(
				$("<tr>").append(
					$("<td>").append(
						Modifier.EMOJI_TYPES[typeId] + ' ' + Player.getAttributeName(attribute)
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: VisualizePlayer.windowName + '_level_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidthSmall,
							height: inputHeight,
							value: Player.levelCalculator(basePoints)
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_base_points_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', "' + playerId + '", "' + attribute + '")',
							value: basePoints
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_permanent_modifier_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							readonly: 'readonly',
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', "' + playerId + '", "' + attribute + '")',
							value: permanentModifier
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_temporary_modifier_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', "' + playerId + '", "' + attribute + '")',
							value: temporaryModifier
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: VisualizePlayer.windowName + '_points_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							value: Player.calculateTotalPoints(basePoints, temporaryModifier, permanentModifier)
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_dice_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateDiceResult(' + randomId + ', "' + playerId + '", "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_difficulty_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateDiceResult(' + randomId + ', "' + playerId + '", "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							class: 'bold',
							id: VisualizePlayer.windowName + '_result_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							value: 0
						})
					)
				)
			);
		});

		let secondaryAttributes = $('<div>');

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
			listPlayerTable,
			secondaryAttributes
		);
	}

	// atualizar lista de equipamentos de acordo com filtro de tipo opcional
	static listEquipaments (playerId, randomId, isNPC = false) {
		let playerEquipamentListDiv = $('#' + VisualizePlayer.windowName + '_equipament_list_' + playerId + '_' + randomId);

		let selectedEquipamentTypeId = $("input[name='" + VisualizePlayer.windowName + '_equipament_type_' + randomId + "']:checked").val();

		let allPlayerEquipaments = PlayerEquipament.getAllPlayerEquipaments(playerId);

		let playerEquipamentListTable = $("<table>", {
			id: VisualizePlayer.windowName + '_table_equipament_list_' + playerId + '_' + randomId
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
					id: VisualizePlayer.windowName + '_player_equipament_item_' + playerEquipamentId + '_' + randomId,
					class: 'visualize_player_select_item ' + extraClass,
					onclick: 'VisualizePlayer.equipEquipament("' + playerId + '", "' + playerEquipamentId + '", "' + equipamentId + '", ' + randomId + ', ' + (hasEquipedEquipament != true) + ')'
				}).append(
					$("<td>", { title: Equipament.ALL_TYPE_NAMES[equipamentTypeId] } ).append(
						Equipament.EMOJI_TYPES[equipamentTypeId],
						$("<input>", {
							type: 'hidden',
							id: VisualizePlayer.windowName + '_player_equipament_type_' + equipamentId + '_' + randomId,
							readonly: 'readonly',
							value: equipamentTypeId
						})
					),
					$("<td>").append(
						equipament['name'],
						$("<input>", {
							type: 'hidden',
							id: VisualizePlayer.windowName + '_player_equipament_name_' + equipamentId + '_' + randomId,
							readonly: 'readonly',
							value: equipament['name']
						})
					)
				)
			)

		});

		// limpar antes de inserir o conteudo
		playerEquipamentListDiv.html('');

		playerEquipamentListDiv.append(playerEquipamentListTable);

		VisualizePlayer.filterListEquipaments (playerId, randomId, selectedEquipamentTypeId);
	}

	// equipar o item selecionado do jogador
	static equipEquipament (playerId, playerEquipamentId, equipamentId, randomId, inserting = true) {

		let equipamentTypeId = $("input[name='" + VisualizePlayer.windowName + '_equipament_type_' + randomId + "']:checked").val();

		let isNPC = $('#' + VisualizePlayer.windowName + '_is_npc_' + randomId).val();
		
		isNPC = (isNPC == 'true') ? true : false;

		console.log("isNPC", isNPC);

		let resultSaved = false;

		// se estiver equipando
		if (inserting) {
			let newEquipedEquipament = {
				'equipamentTypeId': equipamentTypeId,
				'playerId': playerId,
				'playerEquipamentId': playerEquipamentId,
				'equipamentId': equipamentId
			}

			resultSaved = EquipedEquipament.equipEquipament(newEquipedEquipament);

		// se estiver desequipando
		} else {

			resultSaved = EquipedEquipament.unequipEquipament(playerId, playerEquipamentId);
		}

		let itemClicked = $('#' + VisualizePlayer.windowName + '_player_equipament_item_' + playerEquipamentId + '_' + randomId);

		if (resultSaved) {

			EquipedEquipament.recalculateEquipedModifiers(playerId);

			// recarregar listagem
			VisualizePlayer.listEquipaments(playerId, randomId, isNPC);
			VisualizePlayer.listPlayerAttributes(playerId, randomId, isNPC);

		} else {
			itemClicked.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300);
		}
	}

	// filtrar tabela contendo os equipamentos do jogador
	static filterListEquipaments (playerId, randomId, equipamentTypeId) {
		let playerEquipamentListTable = $('#' + VisualizePlayer.windowName + '_table_equipament_list_' + playerId + '_' + randomId + ' tr');

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
	static visualize_player (playerId, isNPC) {

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];
		let playerGenderId = player['gender'] || 0;

		console.log('playerGenderId', playerGenderId);

		let genderTitle = (playerGenderId == Player.FEMALE_ID) ? 'Jogadora' : 'Jogador';
		let windowTitle = Player.EMOJI_GENDERS[playerGenderId] + ' ' + t(genderTitle) + ' ' + playerName;

		let options = {
			playerId: playerId,
			singleTon: true,
			isNPC: isNPC,
			windowId: VisualizePlayer.windowName + '_' + playerId
		};

		Box.openDialog(VisualizePlayer.windowName, windowTitle, options);
	}

	// mostrar e esconder os equipamentos do player
	static toggleViewEquipaments (playerId, randomId) {
		$('#' + VisualizePlayer.windowName + '_equipaments_' + playerId + '_' + randomId).slideToggle();
	}

	// recalcula o nivel e total de pontos
	static reCalculateTotalPoints (randomId, playerId, attribute) {
		let basePoints = $('#' + VisualizePlayer.windowName + '_base_points_' + playerId + '_' + attribute + '_' + randomId).val() || 0;
		let temporaryModifier = $('#' + VisualizePlayer.windowName + '_temporary_modifier_' + playerId + '_' + attribute + '_' + randomId).val() || 0;
		let permanentModifier = $('#' + VisualizePlayer.windowName + '_permanent_modifier_' + playerId + '_' + attribute + '_' + randomId).val() || 0;

		let levelInput = $('#' + VisualizePlayer.windowName + '_level_' + playerId + '_' + attribute + '_' + randomId);
		let totalPointsInput = $('#' + VisualizePlayer.windowName + '_points_' + playerId + '_' + attribute + '_' + randomId)

		let level = Player.levelCalculator(basePoints);
		let totalPoints = Player.calculateTotalPoints(basePoints, temporaryModifier, permanentModifier);

		totalPointsInput.val(totalPoints);
		levelInput.val(level);
	}

	// recalcula o resultado da rolagem de dados
	static reCalculateDiceResult (randomId, playerId, attribute) {
		let totalPoints = $('#' + VisualizePlayer.windowName + '_points_' + playerId + '_' + attribute + '_' + randomId).val() || 0;
		let diceRoll = $('#' + VisualizePlayer.windowName + '_dice_' + playerId + '_' + attribute + '_' + randomId).val() || 0;
		let difficulty = $('#' + VisualizePlayer.windowName + '_difficulty_' + playerId + '_' + attribute + '_' + randomId).val() || 0;

		let inputResult = $('#' + VisualizePlayer.windowName + '_result_' + playerId + '_' + attribute + '_' + randomId);

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

}

boxes[VisualizePlayer.windowName] = VisualizePlayer;
