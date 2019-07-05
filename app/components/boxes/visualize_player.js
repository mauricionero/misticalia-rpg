class VisualizePlayer extends Box {

	boxWidth = 360;
	boxHeight = 240;

	static windowName = 'visualize_player';

	boxContent (options) {
		var randomId = Math.floor(Math.random() * 10000);

		let playerId = options['playerId'];

		let player = Player.getPlayer(playerId);

		let inputWidth = 36;
		let inputHeight = 12;

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
				$("<th>", { title: t('Modificador momentâneo') }).append(
					Player.EMOJI_TEMPORARY_MODIFICATOR
				),
				$("<th>", { title: t('Modificador permanente') }).append(
					Player.EMOJI_PERMANENT_MODIFICATOR
				),
				$("<th>", { title: t('Total de pontos') }).append(
					Player.EMOJI_TOTAL_POINTS
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
							id: VisualizePlayer.windowName + '_level_' + playerId + '_' + randomId,
							width: inputWidth - 10,
							height: inputHeight,
							value: Player.levelCalculator(player[attribute])
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_base_points_' + playerId + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', ' + playerId + ')',
							value: player[attribute]
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_moment_modifier_' + playerId + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', ' + playerId + ')',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: VisualizePlayer.windowName + '_permanent_modifier_' + playerId + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'VisualizePlayer.reCalculateTotalPoints(' + randomId + ', ' + playerId + ')',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: VisualizePlayer.windowName + '_points_' + playerId + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							value: player[attribute]
						})
					)
				)
			);
		});

		return listPlayerTable;
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

	static reCalculateTotalPoints (randomId, playerId) {
		let basePoints = $('#' + VisualizePlayer.windowName + '_base_points_' + playerId + '_' + randomId).val() || 0;
		let momentModifier = $('#' + VisualizePlayer.windowName + '_moment_modifier_' + playerId + '_' + randomId).val() || 0;
		let permanentModifier = $('#' + VisualizePlayer.windowName + '_permanent_modifier_' + playerId + '_' + randomId).val() || 0;

		let totalPoints = parseInt(basePoints) + parseInt(momentModifier) + parseInt(permanentModifier);

		$('#' + VisualizePlayer.windowName + '_points_' + playerId + '_' + randomId).val(totalPoints);
	}

}

boxes[VisualizePlayer.windowName] = VisualizePlayer;
