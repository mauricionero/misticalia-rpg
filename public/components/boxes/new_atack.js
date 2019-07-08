class NewAtack extends Box {

	boxWidth = 260;
	boxHeight = 220;

	windowName = 'new_atack';

	boxContent (options) {

		var playerId = options['playerId'];

		var randomId = Math.floor(Math.random() * 10000);

		var allPlayers = Player.getAllPlayers();
		var player = Player.getPlayer(playerId);

		let newAtackDiv = $("<div>");

		let newAtackTable = $("<table>");

		NewAtack.insertPlayerLine(newAtackTable, player, randomId, true);

		// titulo das colunas na tabela
		newAtackTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Alvo do ataque') }).append(
					Battle.EMOJI_TARGET
				),
				$("<th>", { title: t('Nome') }).append(
					Player.EMOJI_NAME
				),
				$("<th>", { title: t('Força') }).append(
					Player.EMOJI_STRENGTH
				),
				$("<th>", { title: t('Destreza') }).append(
					Player.EMOJI_DEXTERY
				),
				$("<th>", { title: t('Constituição') }).append(
					Player.EMOJI_CONSTITUTION
				),
				$("<th>", { title: t('Visualizar jogador') }).append(
					Player.EMOJI_VISUALIZE
				)
			)
		);

		allPlayers.forEach(function (player) {

			// se for o proprio player, pular
			if (playerId == player['id']) {
				return;
			}

			NewAtack.insertPlayerLine(newAtackTable, player, randomId, false);
			
		});

		newAtackDiv.append(
			newAtackTable
		);

		return newAtackDiv;
	}

	// inserir linha do player atual
	static insertPlayerLine (newAtackTable, player, randomId, currentPlayer) {

		let inputAtackCheck = '';

		if (currentPlayer) {
			inputAtackCheck = ''; // TODO: colocar radiobuttons do tipo de ataque
		} else {
			inputAtackCheck = $("<input>", {
				type: 'checkbox',
				id: NewAtack.windowName + '_target_' + player['id'] + '_' + randomId,
				class: 'target',
				value: 1
			});
		}

		newAtackTable.append(
			$("<tr>").append(
				$("<td>").append(
					inputAtackCheck
				),
				$("<td>").append(
					Player.getPlayerShort(player['id']),
					$("<input>", {
						type: 'hidden',
						id: NewAtack.windowName + '_name_' + player['id'] + '_' + randomId,
						readonly: 'readonly',
						value: player['name']
					}),
					$("<input>", {
						type: 'hidden',
						id: NewAtack.windowName + '_shortname_' + player['id'] + '_' + randomId,
						readonly: 'readonly',
						value: player['shortname']
					}),
					$("<input>", {
						type: 'hidden',
						id: NewAtack.windowName + '_gender_' + player['id'] + '_' + randomId,
						readonly: 'readonly',
						value: player['gender']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_strength_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['strength']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_dextery_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['dextery']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_constitution_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['constitution']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: NewAtack.windowName + '_visualize_' + player['id'] + '_' + randomId,
						onclick: 'VisualizePlayer.visualize_player(' + player['id'] + ')',
						value: Player.EMOJI_VISUALIZE
					})
				)
			)
		)
	}
}

boxes[NewAtack.windowName] = NewAtack;
