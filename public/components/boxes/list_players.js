class ListPlayers extends Box {

	static get windowName () { return 'list_players' };

	boxContent (options = {}) {

		this.options = options;

		let me = this;

		let listPlayersDiv = $("<div>", { id: me.createId('list_players') } );

		return listPlayersDiv;
	}

	// executa após printar a janela
	callBackRender () {
		
		let boxId = this.boxId;

		this.listPlayerData();
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Listagem dos jogadores')
			),
			$('<p>').append(
				t('<b>Legendas:</b> (basta deixar o mouse em cima de cada icone para aparecer o que significam)')
			),
			Player.helpAttributesMeaning(),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s</b>: Vida total, deixando o mouse em cima, pode-se verificar o percentual total de vida'), Player.EMOJI_LIFE + ' ' + Player.getAttributeName('life'))
				),
				$('<li>').append(
					sprintf(t('<b>%s Detalhes</b>: Clique para visualizar de forma mais completa esse personagem'), Player.EMOJI_VISUALIZE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Equipamentos</b>: Clique para visualizar os equipamentos desse personagem'), PlayerEquipament.EMOJI_VISUALIZE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Itens</b>: Clique para visualizar os itens desse personagem'), PlayerItem.EMOJI_VISUALIZE)
				)
			)
		];
	}

	// listar dados do jogador
	listPlayerData () {

		let me = this;

		let boxId = me.boxId;

		let options = this.options;

		// se eh NPC
		let isNPC = false;
		if (options['isNPC']) {
			isNPC = true;
		}

		// filtrar se eh npc ou nao
		let optionFilter = {
			'filters': { 'isNPC': isNPC },
			'order': { 'name': 'ASC' }
		}

		let allPlayers = [];

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allPlayers = Player.getAllPlayersCurrentAdventure(optionFilter);
		} else {
			allPlayers = Player.getAllPlayers(optionFilter);
		}

		// div principal
		let listPlayersDiv = $('#' + me.createId('list_players'));
		listPlayersDiv.html('');

		let listPlayersTable = $("<table>");

		let listPlayersTableTitle = $("<tr>");

		listPlayersTableTitle.append(
			$("<th>", { title: t('Nome') }).append(
				Player.EMOJI_NAME
			)
		);

		Player.ALL_ATTRIBUTES.forEach(function (attribute) {
			let typeId = Modifier.ALL_TYPE_IDS[attribute];

			listPlayersTableTitle.append(
				$("<th>", { title: Player.getAttributeName(attribute) } ).append(
					Modifier.EMOJI_TYPES[typeId]
				)
			);
		});

		listPlayersTableTitle.append(
			$("<th>", { title: Player.ALL_ATTRIBUTES_NAMES['life'] } ).append(
				Player.EMOJI_LIFE
			),
			$("<th>", { title: t('Visualizar personagem') } ).append(
				Player.EMOJI_VISUALIZE
			),
			$("<th>", { title: t('Visualizar equipamentos do personagem') } ).append(
				PlayerEquipament.EMOJI_VISUALIZE
			),
			$("<th>", { title: t('Visualizar itens do personagem') } ).append(
				PlayerItem.EMOJI_VISUALIZE
			)
		);

		// titulo das colunas na tabela
		listPlayersTable.append(
			listPlayersTableTitle
		);

		allPlayers.forEach(function (player) {

			let playerId = player['id'];

			let listPlayersTableLine = $('<tr>');

			let lifeProgressbar = player.getLifeProgressBar(boxId);

			listPlayersTable.append(
				listPlayersTableLine.append(
					$("<td>", { title: player['name'] } ).append(
						player.getPlayerShort(),
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + playerId),
							disabled: 'disabled',
							value: player['name']
						}),
						$("<input>", {
							type: 'hidden',
							id: me.createId('shortname_' + playerId),
							disabled: 'disabled',
							value: player.getPlayerShort()
						}),
						$("<input>", {
							type: 'hidden',
							id: me.createId('gender_' + playerId),
							disabled: 'disabled',
							value: player['gender']
						})
					)
				)
			);

			Player.ALL_ATTRIBUTES.forEach(function (attribute) {
				let basePoints = player.getAttribute(attribute, 'basePoints');

				let typeId = Modifier.ALL_TYPE_IDS[attribute];

				listPlayersTableLine.append(
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId(attribute + '_' + playerId),
							width: 32,
							disabled: 'disabled',
							value: basePoints
						})
					)
				);
			});
			
			listPlayersTable.append(
				listPlayersTableLine.append(
					$("<td>").append(
						lifeProgressbar
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('visualize_' + player['id']),
							title: t('Visualizar personagem'),
							onclick: 'VisualizePlayer.visualizePlayer("' + player['id'] + '", ' + isNPC + ', "' + boxId + '")',
							value: Player.EMOJI_VISUALIZE
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('visualize_equipaments_' + player['id']),
							onclick: 'ListPlayerEquipaments.visualizePlayerEquipaments("' + player['id'] + '")',
							title: t('Visualizar equipamentos do personagem'),
							value: PlayerEquipament.EMOJI_VISUALIZE
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('visualize_itens_' + player['id']),
							onclick: 'ListPlayerItems.visualizePlayerItems("' + player['id'] + '")',
							title: t('Visualizar itens do personagem'),
							value: PlayerItem.EMOJI_VISUALIZE
						})
					)
				)
			);
		});

		listPlayersDiv.append(
			listPlayersTable
		);
	}
}

Box.boxes[ListPlayers.windowName] = ListPlayers;
