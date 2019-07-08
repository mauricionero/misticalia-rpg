class VisualizePlayer extends Box {

	// boxWidth = 440;
	// boxHeight = 240;

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
				$("<th>", { title: t('Modificador momentâneo') }).append(
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
			listPlayerTable.append(
				$("<tr>").append(
					$("<td>").append(
						attribute
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: VisualizePlayer.windowName + '_level_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidthSmall,
							height: inputHeight,
							value: Player.levelCalculator(player[attribute])
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_base_points_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', ' + playerId + ', "' + attribute + '")',
							value: player[attribute]
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_permanent_modifier_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							readonly: 'readonly',
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', ' + playerId + ', "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_moment_modifier_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', ' + playerId + ', "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: VisualizePlayer.windowName + '_points_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							value: player[attribute]
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_dice_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateDiceResult(' + randomId + ', ' + playerId + ', "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_difficulty_' + playerId + '_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateDiceResult(' + randomId + ', ' + playerId + ', "' + attribute + '")',
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

		listPlayerDiv.append(
			'<br />',
			$('<a>',{
				href: '#',
				onclick: 'VisualizePlayer.toggleViewEquipaments(' + playerId + ', ' + randomId + ')'
			}).html(
				t('Ver equipamentos e itens')
			),
			'<br />',
			$('<div>', {
				class: 'visualize_player_equipament',
				id: VisualizePlayer.windowName + '_equipaments_' + playerId + '_' + randomId,
				style: 'display: none',
			}).html(
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
						),
						$('<td>').html(
							Player.EMOJI_RING_EQUIPAMENT
						)
					),
					$('<tr>').append(
						$('<td>').html(
							Player.EMOJI_SHIELD_EQUIPAMENT
						),
						$('<td>').html(
							Player.EMOJI_CHESTPLATE_EQUIPAMENT
						),
						$('<td>').html(
							Player.EMOJI_MAIN_HAND_EQUIPAMENT
						),
						$('<td>').html(
							Player.EMOJI_RING_EQUIPAMENT
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
						),
						$('<td>').html(
							Player.EMOJI_RING_EQUIPAMENT
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
						),
						$('<td>').html(
							Player.EMOJI_RING_EQUIPAMENT
						)
					)
				)
			)
		);

		return listPlayerDiv;
	}

	// mostrar e esconder os equipamentos do player
	static toggleViewEquipaments (playerId, randomId) {
		$('#' + VisualizePlayer.windowName + '_equipaments_' + playerId + '_' + randomId).slideToggle()
	}

	// abrir visualização do player
	static visualize_player (playerId) {

		console.log('playerId', playerId);

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];
		let playerGenderId = player['gender'];

		let genderTitle = (playerGenderId == Player.MALE_ID) ? 'Jogador' : 'Jogadora';
		let windowTitle = Player.EMOJI_GENDER[playerGenderId] + ' ' + t(genderTitle) + ' ' + playerName;

		let options = {
			playerId: playerId,
			singleTon: true,
			windowId: VisualizePlayer.windowName + '_' + playerId
		};

		Box.openDialog(VisualizePlayer.windowName, windowTitle, options);
	}

	// recalcula o total de pontos
	static reCalculateTotalPoints (randomId, playerId, attribute) {
		let basePoints = $('#' + VisualizePlayer.windowName + '_base_points_' + playerId + '_' + attribute + '_' + randomId).val() || 0;
		let momentModifier = $('#' + VisualizePlayer.windowName + '_moment_modifier_' + playerId + '_' + attribute + '_' + randomId).val() || 0;
		let permanentModifier = $('#' + VisualizePlayer.windowName + '_permanent_modifier_' + playerId + '_' + attribute + '_' + randomId).val() || 0;

		let totalPoints = parseInt(basePoints) + parseInt(momentModifier) + parseInt(permanentModifier);

		$('#' + VisualizePlayer.windowName + '_points_' + playerId + '_' + attribute + '_' + randomId).val(totalPoints);
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
