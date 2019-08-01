class ListPlayers extends Box {

	static get windowName () { return 'list_players' };

	boxContent (options = {}) {

		let me = this;

		let boxId = me.boxId;

		// se eh NPC
		let isNPC = false;
		if (options['isNPC']) {
			isNPC = true;
		}

		// filtrar se eh npc ou nao
		let optionFilter = { 'filters': { 'isNPC': isNPC } }

		let allPlayers = [];

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allPlayers = Player.getAllPlayersCurrentAdventure(optionFilter);
		} else {
			allPlayers = Player.getAllPlayers(optionFilter);
		}

		let listPlayersDiv = $("<div>");

		let listPlayersTable = $("<table>");

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
				$("<th>", { title: t('Agilidade') }).append(
					Player.EMOJI_AGILITY
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

		allPlayers.forEach(function (player) {

			let listPlayersTableLine = $("<tr>");
			
			listPlayersTable.append(
				listPlayersTableLine.append(
					$("<td>", { title: player['name'] } ).append(
						Player.getPlayerShort(player['id']),
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + player['id']),
							readonly: 'readonly',
							value: player['name']
						}),
						$("<input>", {
							type: 'hidden',
							id: me.createId('shortname_' + player['id']),
							readonly: 'readonly',
							value: Player.getPlayerShort(player['id'])
						}),
						$("<input>", {
							type: 'hidden',
							id: me.createId('gender_' + player['id']),
							readonly: 'readonly',
							value: player['gender']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('strength_' + player['id']),
							width: 32,
							readonly: 'readonly',
							value: player['strength']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('dextery_' + player['id']),
							width: 32,
							readonly: 'readonly',
							value: player['dextery']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('agility_' + player['id']),
							width: 32,
							readonly: 'readonly',
							value: (player['agility']) ? player['agility']['basePoints'] : 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('constitution_' + player['id']),
							width: 32,
							readonly: 'readonly',
							value: player['constitution']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('inteligence_' + player['id']),
							width: 32,
							readonly: 'readonly',
							value: player['inteligence']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('wisdom_' + player['id']),
							width: 32,
							readonly: 'readonly',
							value: player['wisdom']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('charisma_' + player['id']),
							width: 32,
							readonly: 'readonly',
							value: player['charisma']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('sanity_' + player['id']),
							width: 32,
							readonly: 'readonly',
							value: player['sanity']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('visualize_' + player['id']),
							onclick: 'VisualizePlayer.visualizePlayer("' + player['id'] + '", ' + isNPC + ')',
							value: Player.EMOJI_VISUALIZE
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('visualize_equipaments_' + player['id']),
							onclick: 'ListPlayerEquipaments.visualizePlayerEquipaments("' + player['id'] + '")',
							value: PlayerEquipament.EMOJI_VISUALIZE
						})
					)
				)
			);
		});

		listPlayersDiv.append(
			listPlayersTable
		);

		return listPlayersDiv;
	}

}

Box.boxes[ListPlayers.windowName] = ListPlayers;
