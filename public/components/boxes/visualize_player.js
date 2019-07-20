class VisualizePlayer extends Box {

	static windowName = 'visualize_player';

	boxContent (options) {
		var randomId = Math.floor(Math.random() * 10000);

		let playerId = options['playerId'];

		let player = Player.getPlayer(playerId);

		let inputWidth = 36;
		let inputWidthSmall = 24;
		let inputHeight = 12;

		let listPlayerDiv = $('<div>');

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

		Player.ALL_ATTRIBUTES.forEach(function (attribute) {
			let basePoints = player[attribute]['basePoints'] || 0;
			let permanentModifier = player[attribute]['permanentModifier'] || 0;
			let temporaryModifier = player[attribute]['temporaryModifier'] || 0;

			listPlayerTable.append(
				$("<tr>").append(
					$("<td>").append(
						Player.getAttributeName(attribute)
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

		listPlayerDiv.html(listPlayerTable);

		let visualizePlayerEquipamentDiv = $('<div>', {
			class: 'visualize_player_equipament',
			id: VisualizePlayer.windowName + '_equipaments_' + playerId + '_' + randomId,
			style: 'display: none',
		});

		let equipamentListDiv = $('<div>', {
			id: VisualizePlayer.windowName + '_equipament_list_' + playerId + '_' + randomId,
			class: 'visualize_player_equipament_item_list'
		});

		visualizePlayerEquipamentDiv.append(
			$('<table>').append(
				$('<tr>').append(
					$('<td>').html(
						''
					),
					$('<td>').html(
						Player.EMOJI_HEAD_EQUIPAMENT
					),
					$('<td>').html(
						Player.EMOJI_AMULET_EQUIPAMENT
					)
				),
				$('<tr>').append(
					$('<td>').html(
						Player.EMOJI_MAIN_HAND_EQUIPAMENT
					),
					$('<td>').html(
						Player.EMOJI_CHESTPLATE_EQUIPAMENT
					),
					$('<td>').html(
						Player.EMOJI_SHIELD_EQUIPAMENT
					)
				),
				$('<tr>').append(
					$('<td>').html(
						''
					),
					$('<td>').html(
						Player.EMOJI_LEGS_EQUIPAMENT
					),
					$('<td>').html(
						''
					)
				),
				$('<tr>').append(
					$('<td>').html(
						''
					),
					$('<td>').html(
						Player.EMOJI_FEET_EQUIPAMENT
					),
					$('<td>').html(
						''
					)
				)
			),
			equipamentListDiv,
			$('<div>', {
				id: VisualizePlayer.windowName + '_item_list_' + playerId + '_' + randomId,
				class: 'visualize_player_equipament_item_list'
			})
		);

		listPlayerDiv.append(
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

	// abrir dialog de visualização do player
	static visualize_player (playerId) {

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];
		let playerGenderId = player['gender'] || 0;

		console.log('playerGenderId', playerGenderId);

		let genderTitle = (playerGenderId == Player.FEMALE_ID) ? 'Jogadora' : 'Jogador';
		let windowTitle = Player.EMOJI_GENDER[playerGenderId] + ' ' + t(genderTitle) + ' ' + playerName;

		let options = {
			playerId: playerId,
			singleTon: true,
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
