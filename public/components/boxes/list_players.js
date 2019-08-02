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
					sprintf(t('<b>%s</b>: Clique para visualizar de forma mais completa esse personagem'), Player.EMOJI_VISUALIZE + ' Detalhes')
				),
				$('<li>').append(
					sprintf(t('<b>%s</b>: Clique para visualizar os equipamentos desse personagem'), PlayerEquipament.EMOJI_VISUALIZE + ' Equipamentos')
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
				$("<th>", { title: t('Vida') }).append(
					Player.EMOJI_LIFE
				),
				$("<th>", { title: t('Visualizar personagem') }).append(
					Player.EMOJI_VISUALIZE
				),
				$("<th>", { title: t('Visualizar equipamentos do personagem') }).append(
					PlayerEquipament.EMOJI_VISUALIZE
				)
			)
		);

		allPlayers.forEach(function (player) {

			let listPlayersTableLine = $("<tr>");

			let lifeProgressbar = player.getLifeProgressBar(boxId);
			
			listPlayersTable.append(
				listPlayersTableLine.append(
					$("<td>", { title: player['name'] } ).append(
						player.getPlayerShort(),
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + player['id']),
							disabled: 'disabled',
							value: player['name']
						}),
						$("<input>", {
							type: 'hidden',
							id: me.createId('shortname_' + player['id']),
							disabled: 'disabled',
							value: player.getPlayerShort()
						}),
						$("<input>", {
							type: 'hidden',
							id: me.createId('gender_' + player['id']),
							disabled: 'disabled',
							value: player['gender']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('strength_' + player['id']),
							width: 32,
							disabled: 'disabled',
							value: player['strength']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('dextery_' + player['id']),
							width: 32,
							disabled: 'disabled',
							value: player['dextery']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('agility_' + player['id']),
							width: 32,
							disabled: 'disabled',
							value: (player['agility']) ? player['agility']['basePoints'] : 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('constitution_' + player['id']),
							width: 32,
							disabled: 'disabled',
							value: player['constitution']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('inteligence_' + player['id']),
							width: 32,
							disabled: 'disabled',
							value: player['inteligence']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('wisdom_' + player['id']),
							width: 32,
							disabled: 'disabled',
							value: player['wisdom']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('charisma_' + player['id']),
							width: 32,
							disabled: 'disabled',
							value: player['charisma']['basePoints']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('sanity_' + player['id']),
							width: 32,
							disabled: 'disabled',
							value: player['sanity']['basePoints']
						})
					),
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
