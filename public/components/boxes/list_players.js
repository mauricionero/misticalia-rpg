class ListPlayers extends Box {

	boxWidth = 380;
	boxHeight = 220;

	static windowName = 'list_players';

	boxContent () {

		var randomId = Math.floor(Math.random() * 10000);

		var allPlayers = Player.getAllPlayers();

		let listPlayersDiv = $("<div>");

		let listPlayersTable = $("<table>");

		// titulo das colunas na tabela
		listPlayersTable.append(
			$("<tr>").append(
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
				$("<th>", { title: t('Inteligencia') }).append(
					Player.EMOJI_INTELIGENCE
				),
				$("<th>", { title: t('Sabedoria') }).append(
					Player.EMOJI_WISDOM
				),
				$("<th>", { title: t('Carisma') }).append(
					Player.EMOJI_CHARISMA
				),
				$("<th>", { title: t('Sanidade') }).append(
					Player.EMOJI_SANITY
				),
				$("<th>", { title: t('Visualizar jogador') }).append(
					'👁️'
				)
			)
		);

		allPlayers.forEach(function (player) {
			
			listPlayersTable.append(
				$("<tr>").append(
					$("<td>").append(
						Player.getPlayerShort(player['id']),
						$("<input>", {
							type: 'hidden',
							id: ListPlayers.windowName + '_name_' + player['id'] + '_' + randomId,
							readonly: 'readonly',
							value: player['name']
						}),
						$("<input>", {
							type: 'hidden',
							id: ListPlayers.windowName + '_shortname_' + player['id'] + '_' + randomId,
							readonly: 'readonly',
							value: player['shortname']
						}),
						$("<input>", {
							type: 'hidden',
							id: ListPlayers.windowName + '_gender_' + player['id'] + '_' + randomId,
							readonly: 'readonly',
							value: player['gender']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_strength_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['strength']
						}),
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_dextery_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['dextery']
						}),
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_constitution_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['constitution']
						}),
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_inteligence_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['inteligence']
						}),
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_wisdom_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['wisdom']
						}),
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_charisma_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['charisma']
						}),
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_sanity_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['sanity']
						}),
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: ListPlayers.windowName + '_visualize_' + player['id'] + '_' + randomId,
							onclick: 'VisualizePlayer.visualize_player(' + player['id'] + ')',
							value: '👁️'
						}),
					)
				)
			)
		});

		listPlayersDiv.append(
			listPlayersTable
		);

		return listPlayersDiv;
	}

}

boxes[ListPlayers.windowName] = ListPlayers;
