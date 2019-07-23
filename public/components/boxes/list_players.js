class ListPlayers extends Box {

	static get windowName () { return 'list_players' };

	boxContent (options = {}) {

		let allPlayers = [];

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allPlayers = Player.getAllPlayersCurrentAdventure();
		} else {
			allPlayers = Player.getAllPlayers();
		}

		var randomId = Math.floor(Math.random() * 10000);

		let listPlayersDiv = $("<div>");

		let listPlayersTable = $("<table>");

		let currentAdventureRoleId = Adventure.getCurrentAdventureRole();

		console.log('currentAdventureRoleId', currentAdventureRoleId);

		let listPlayersTableTitle = $("<tr>");

		// titulo das colunas na tabela
		listPlayersTable.append(
			listPlayersTableTitle.append(
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
					Player.EMOJI_VISUALIZE
				),
				$("<th>", { title: t('Visualizar equipamentos do jogador') }).append(
					PlayerEquipament.EMOJI_VISUALIZE
				)
			)
		);

		// se for mestre, pode incluir equipamento no inventario
		if (currentAdventureRoleId == Adventure.ROLE_MASTER) {
			listPlayersTableTitle.append(
				$("<th>", { title: t('Adicionar equipamento no inventário do jogador') }).append(
					Equipament.EMOJI_ADD
				)
			);
		}

		allPlayers.forEach(function (player) {

			let listPlayersTableLine = $("<tr>");
			
			listPlayersTable.append(
				listPlayersTableLine.append(
					$("<td>", { title: player['name'] } ).append(
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
							value: Player.getPlayerShort(player['id'])
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
							value: player['strength']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_dextery_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['dextery']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_constitution_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['constitution']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_inteligence_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['inteligence']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_wisdom_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['wisdom']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_charisma_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['charisma']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: ListPlayers.windowName + '_sanity_' + player['id'] + '_' + randomId,
							width: 32,
							readonly: 'readonly',
							value: player['sanity']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: ListPlayers.windowName + '_visualize_' + player['id'] + '_' + randomId,
							onclick: 'VisualizePlayer.visualize_player("' + player['id'] + '")',
							value: Player.EMOJI_VISUALIZE
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: ListPlayers.windowName + '_visualize_equipaments_' + player['id'] + '_' + randomId,
							onclick: 'ListPlayerEquipaments.visualize_player_equipaments("' + player['id'] + '")',
							value: PlayerEquipament.EMOJI_VISUALIZE
						})
					)
				)
			);

			// se for mestre, pode incluir equipamento no inventario
			if (currentAdventureRoleId == Adventure.ROLE_MASTER) {
				listPlayersTableLine.append(
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: ListPlayers.windowName + '_manage_equipament_' + player['id'] + '_' + randomId,
							onclick: 'AddPlayerEquipament.visualizeEquipament("' + player['id'] + '")',
							value: Equipament.EMOJI_ADD
						}),
					)
				);
			}
		});

		listPlayersDiv.append(
			listPlayersTable
		);

		return listPlayersDiv;
	}

}

boxes[ListPlayers.windowName] = ListPlayers;
