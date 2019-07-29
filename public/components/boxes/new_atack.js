class NewAtack extends Box {

	static get windowName () { return 'new_atack' };

	boxContent (options) {

		let playerId = options['playerId'];

		let fighterIds = options['fighterIds'];

		let randomId = Math.floor(Math.random() * 10000);
		let player = Player.getPlayer(playerId);

		let orderNPC = 'DESC';
		// se o jogador atacante for um NPC
		if (player['isNPC']) {
			orderNPC = 'ASC';
		}

		let allPlayerOptions = {
			'filters': { 'id': fighterIds },
			'order': {
				'isNPC': orderNPC,
				'name': 'ASC'
			}
		}

		let allPlayers = Player.getAllPlayers(allPlayerOptions);

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

		let icon;
		let playerTitle;

		let isNPC = player['isNPC'];
		let playerGenderId = player['gender'];
		let playerName = player['name'];

		if (isNPC) {
			icon = Player.EMOJI_IS_NPC;
			playerTitle = t('NPC') + ' ' + playerName;
		} else {
			icon = Player.EMOJI_GENDERS[playerGenderId];
			playerTitle = t('Jogador') + ' ' + playerName;
		}

		newAtackTable.append(
			$("<tr>").append(
				$("<td>").append(
					inputAtackCheck
				),
				$("<td>", { title: playerTitle } ).append(
					icon + ' ' + Player.getPlayerShort(player['id']),
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
						value: player['strength']['basePoints']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_dextery_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['dextery']['basePoints']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_constitution_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['constitution']['basePoints']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: NewAtack.windowName + '_visualize_' + player['id'] + '_' + randomId,
						onclick: 'VisualizePlayer.visualize_player("' + player['id'] + '")',
						value: Player.EMOJI_VISUALIZE
					})
				)
			)
		)
	}
}

boxes[NewAtack.windowName] = NewAtack;
