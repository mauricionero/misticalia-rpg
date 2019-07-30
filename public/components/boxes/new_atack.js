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
				$("<th>", { title: t('Rolar dados') }).append(
					Dice.EMOJI_DICE
				),
				$("<th>", { title: t('Nome') }).append(
					Player.EMOJI_NAME
				),
				$("<th>", { title: t('Destreza / Acerto') }).append(
					Modifier.EMOJI_DEXTERY + ' ' + Battle.EMOJI_TARGET
				),
				$("<th>", { title: t('Força') }).append(
					Modifier.EMOJI_STRENGTH
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

		let atackIterationDiv = $('<div>', { id: NewAtack.windowName + '_atack_iteration_' + randomId } );

		newAtackDiv.append(
			newAtackTable,
			$("<input>", {
				type: 'button',
				id: NewAtack.windowName + '_simple_atack_' + randomId,
				title: t('Atacar corpo a corpo'),
				onclick: 'NewAtack.meleeAtack("' + playerId + '", ' + randomId + ')',
				value: NewBattle.ACTION_EMOJIS[NewBattle.FIGHT]
			}),
			'<br />',
			'<br />',
			atackIterationDiv
		);

		return newAtackDiv;
	}

	// inserir linha do player atual
	static insertPlayerLine (newAtackTable, player, randomId, currentPlayer) {

		let playerId = player['id'];

		let diceSides = 100;

		let inputAtackCheck = '';

		let playerIdClass;

		if (currentPlayer) {
			inputAtackCheck = '';
			playerIdClass = 'new_atack_atacker_' + randomId;
		} else {
			inputAtackCheck = $("<input>", {
				type: 'checkbox',
				id: NewAtack.windowName + '_target_' + playerId + '_' + randomId,
				class: 'new_atack_target_' + randomId,
				value: playerId
			});
			playerIdClass = 'new_atack_defender_' + randomId;
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
				$("<td>").append(
					$("<input>", {
						id: NewAtack.windowName + '_atack_aim_' + playerId + '_' + randomId,
						type: 'text',
						width: 36,
						onkeyup: 'NewAtack.reCalculateAimResult(' + randomId + ')'
					})
				),
				$("<td>", { title: playerTitle } ).append(
					icon + ' ' + Player.getPlayerShort(playerId),
					$("<input>", {
						type: 'hidden',
						id: NewAtack.windowName + '_player_id_' + playerId + '_' + randomId,
						readonly: 'readonly',
						class: playerIdClass,
						value: playerId
					}),
					$("<input>", {
						type: 'hidden',
						id: NewAtack.windowName + '_name_' + playerId + '_' + randomId,
						readonly: 'readonly',
						value: player['name']
					}),
					$("<input>", {
						type: 'hidden',
						id: NewAtack.windowName + '_shortname_' + playerId + '_' + randomId,
						readonly: 'readonly',
						value: player['shortname']
					}),
					$("<input>", {
						type: 'hidden',
						id: NewAtack.windowName + '_gender_' + playerId + '_' + randomId,
						readonly: 'readonly',
						value: player['gender']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_dextery_' + playerId + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['dextery']['points']
					}),
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_aim_result_' + playerId + '_' + randomId,
						width: 26,
						readonly: 'readonly',
						value: 0
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_strength_' + playerId + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['strength']['points']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_constitution_' + playerId + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: player['constitution']['points']
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_defense_' + playerId + '_' + randomId,
						width: 32,
						readonly: 'readonly',
						value: (player['defense']) ? player['defense']['points'] : 0
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: NewAtack.windowName + '_visualize_' + playerId + '_' + randomId,
						onclick: 'VisualizePlayer.visualize_player("' + playerId + '")',
						value: Player.EMOJI_VISUALIZE
					})
				),
				$("<td>").append(
					secondaryAttributes
				)
			)
		)
	}

	// calcular se acertou de acordo com as rolagens de dados
	static reCalculateAimResult (randomId) {
		let atackerId = $('.new_atack_atacker_' + randomId)[0].value;

		let atackerDie = parseInt($('#' + NewAtack.windowName + '_atack_aim_' + atackerId + '_' + randomId).val() || 0);
		let atackerDextery = parseInt($('#' + NewAtack.windowName + '_dextery_' + atackerId + '_' + randomId).val() || 0);

		// colocar o resultado da rolagem da mira do atacante aqui
		let atackerAimInput = $('#' + NewAtack.windowName + '_aim_result_' + atackerId + '_' + randomId);

		let defenderIdInputs = $('.new_atack_defender_' + randomId);

		// calcular o resultado da mira do ataque
		let aimResult = Player.atackAim(atackerDie, atackerDextery);

		// insere o resultado no input e processa visualmente
		processVisualResultInput(atackerAimInput, aimResult);

		defenderIdInputs.each(function() {
			let defenderId = $(this).val();
			let defenderDie = parseInt($('#' + NewAtack.windowName + '_atack_aim_' + defenderId + '_' + randomId).val() || 0);
			let defenderDextery = parseInt($('#' + NewAtack.windowName + '_dextery_' + defenderId + '_' + randomId).val() || 0);

			let defenderAimResult = Player.defenderAimResult(defenderDie, defenderDextery, aimResult);

			let defenderAimInput = $('#' + NewAtack.windowName + '_aim_result_' + defenderId + '_' + randomId);

			// insere o resultado no input e processa visualmente
			processVisualResultInput(defenderAimInput, defenderAimResult);
		});


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

	// realizar um ataque corpo a corpo
	static meleeAtack (playerId, randomId) {
		let fighterIds = NewAtack.getAllCheckedPlayers(randomId);

		if (fighterIds.length <= 0) {
			alert(t('Selecione ao menos 1 jogador para receber o ataque'));

			return false;
		}

		let player = Player.getPlayer(playerId);

		let defenderOptions = {
			'filters': {'id': fighterIds}
		}

		let defenders = Player.getAllPlayers(defenderOptions);

		let atackIterationDiv = $('#' + NewAtack.windowName + '_atack_iteration_' + randomId);

		let meleeAtackDice1Id = NewAtack.windowName + '_melee_atack_1_' + randomId;

		atackIterationDiv.append(atackIterationDiv);
	}
}

boxes[NewAtack.windowName] = NewAtack;
