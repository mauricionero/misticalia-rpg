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
					Modifier.EMOJI_STRENGTH
				),
				$("<th>", { title: t('Destreza') }).append(
					Modifier.EMOJI_DEXTERY
				),
				$("<th>", { title: t('Constituição') }).append(
					Modifier.EMOJI_CONSTITUTION
				),
				$("<th>", { title: t('Defesa') }).append(
					Modifier.EMOJI_DEFENSE
				),
				$("<th>", { title: t('Visualizar jogador') }).append(
					Player.EMOJI_VISUALIZE
				),
				$("<th>", { title: t('Modificadores') }).append(
					Modifier.EMOJI_VISUALIZE
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
			newAtackTable,
			$("<input>", {
				type: 'button',
				id: NewAtack.windowName + '_simple_atack_' + randomId,
				title: t('Atacar'),
				onclick: 'NewAtack.simpleAtack("' + playerId + '", ' + randomId + ')',
				value: NewBattle.ACTION_EMOJIS[NewBattle.FIGHT]
			}),
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
				class: 'new_atack_target_' + randomId,
				value: player['id']
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

		let secondaryAttributes = [];

		Player.ALL_SECONDARY_ATTRIBUTES.forEach(function (attribute) {

			let typeId = Modifier.ALL_TYPE_IDS[attribute];

			// defesa ja foi exibido
			if (typeId == Modifier.DEFENSE) {
				return true;
			}

			if (player[attribute] == undefined) {
				player[attribute] = {};
			}

			let basePoints = player[attribute]['basePoints'] || 0;
			let temporaryModifier = player[attribute]['temporaryModifier'] || 0;
			let permanentModifier = player[attribute]['permanentModifier'] || 0;

			let points = Player.calculateTotalPoints(basePoints, temporaryModifier, permanentModifier);

			// se for zero, nem exibir
			if (points == 0) {
				return true;
			}

			let modifierName = Modifier.ALL_TYPE_NAMES[typeId];

			secondaryAttributes.push(
				$('<span>', { title: modifierName } ).append(
					Modifier.EMOJI_TYPES[typeId] + points + ' '
				)
			);
		});

		if (secondaryAttributes.length == 0) {
			secondaryAttributes = '--';
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
						value: player['strength']['points']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_dextery_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['dextery']['points']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_constitution_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['constitution']['points']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_defense_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: (player['defense']) ? player['defense']['points'] : 0
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: NewAtack.windowName + '_visualize_' + player['id'] + '_' + randomId,
						onclick: 'VisualizePlayer.visualize_player("' + player['id'] + '")',
						value: Player.EMOJI_VISUALIZE
					})
				),
				$("<td>").append(
					secondaryAttributes
				)
			)
		)
	}

	// retornar num array todos os ids dos players selecionados
	static getAllCheckedPlayers (randomId) {

		var fighterIds = [];

		let allFightersIdInputs = $('.new_atack_target_' + randomId);

		// pegar todos os ids de players, apenas os checkados
		allFightersIdInputs.each(function (index) {
			let fighterInput = this;

			let fighterId = fighterInput.value;

			// verificar se esta checkado
			let enabledPlayer = $('#' + NewAtack.windowName + '_target_' + fighterId + '_' + randomId).is(':checked');

			if (enabledPlayer) {
				fighterIds.push(fighterId);
			}
			
		});

		return fighterIds;
	}

	// realizar um ataque simples
	static simpleAtack (playerId, randomId) {
		let fighterIds = NewAtack.getAllCheckedPlayers(randomId);

		let player = Player.getPlayer(playerId);

		let defenderOptions = {
			'filters': {'id': fighterIds}
		}

		let defenders = Player.getAllPlayers(defenderOptions);

		
	}
}

boxes[NewAtack.windowName] = NewAtack;
