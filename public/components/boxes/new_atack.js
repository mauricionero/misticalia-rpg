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

		// titulo das colunas na tabela do atacante
		newAtackTable.append(
			$("<tr>").append(
				$("<th>").append(
					' '
				),
				$("<th>", { title: t('Rolar dados de forma geral, substitui todas as outras rolagens') }).append(
					Dice.EMOJI_DICE
				),
				$("<th>", { title: t('Nome') }).append(
					Player.EMOJI_NAME
				),
				$("<th>", { title: t('Destreza') }).append(
					Dice.EMOJI_DICE + ' ' + Modifier.EMOJI_DEXTERY + ' ='
				),
				$("<th>", { title: t('Força') }).append(
					Dice.EMOJI_DICE + ' ' + Modifier.EMOJI_STRENGTH
				),
				$("<th>", { title: t('Ataque') }).append(
					Modifier.EMOJI_ATACK + ' ='
				),
				$("<th>", { title: t('Constituição / Dano') }).append(
					Modifier.EMOJI_CONSTITUTION + ' ' + Battle.EMOJI_HURT
				),
				$("<th>", { title: t('Vida') }).append(
					Player.EMOJI_LIFE
				),
				$("<th>", { title: t('Visualizar jogador') }).append(
					Player.EMOJI_VISUALIZE
				),
				$("<th>", { title: t('Modificadores') }).append(
					Modifier.EMOJI_VISUALIZE
				)
			)
		);

		NewAtack.insertPlayerLine(newAtackTable, player, randomId, true);

		// titulo das colunas na tabela do defensor
		newAtackTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Alvo do ataque') }).append(
					Battle.EMOJI_TARGET
				),
				$("<th>", { title: t('Rolar dados de forma geral, substitui todas as outras rolagens') }).append(
					Dice.EMOJI_DICE
				),
				$("<th>", { title: t('Nome') }).append(
					Player.EMOJI_NAME
				),
				$("<th>", { title: t('Destreza') }).append(
					Dice.EMOJI_DICE + ' ' + Modifier.EMOJI_DEXTERY + ' ='
				),
				$("<th>", { title: t('Força') }).append(
					Dice.EMOJI_DICE + ' ' + Modifier.EMOJI_STRENGTH
				),
				$("<th>", { title: t('Defesa') }).append(
					Modifier.EMOJI_DEFENSE + ' ='
				),
				$("<th>", { title: t('Constituição / Dano') }).append(
					Modifier.EMOJI_CONSTITUTION + ' ' + Battle.EMOJI_HURT
				),
				$("<th>", { title: t('Vida') }).append(
					Player.EMOJI_LIFE
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
				id: NewAtack.windowName + '_save_button_' + randomId,
				title: t('Salvar'),
				onclick: 'NewAtack.saveResults(' + randomId + ')',
				value: Player.EMOJI_SAVE
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

		let atackDefenseInput;

		let inputWidth = 30;
		let inputWidthSmall = 26;

		let playerLife = Player.getAttribute(player, 'life') || 100;

		if (currentPlayer) {
			inputAtackCheck = '';
			playerIdClass = 'new_atack_atacker_' + randomId;
			atackDefenseInput = $("<input>", {
				type: 'text',
				id: NewAtack.windowName + '_atack_' + playerId + '_' + randomId,
				width: inputWidth,
				readonly: 'readonly',
				value: Player.getAttribute(player, 'atack', 'points')
			});
		} else {
			inputAtackCheck = $("<input>", {
				type: 'checkbox',
				id: NewAtack.windowName + '_target_' + playerId + '_' + randomId,
				class: 'new_atack_target_' + randomId,
				value: playerId
			});
			playerIdClass = 'new_atack_defender_' + randomId;
			atackDefenseInput = $("<input>", {
				type: 'text',
				id: NewAtack.windowName + '_defense_' + playerId + '_' + randomId,
				width: inputWidth,
				readonly: 'readonly',
				value: Player.getAttribute(player, 'defense', 'points')
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
			if (typeId == Modifier.DEFENSE || typeId == Modifier.ATACK) {
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

		let lifeProgressbar = $("<div>", {
			id: NewAtack.windowName + '_life_display_' + player['id'] + '_' + randomId,
			width: 38,
			height: 20,
			title: playerLife + '%'
		}).progressbar({ value: playerLife })

		lifeProgressbar.children().css({ 'background': 'Red' });

		newAtackTable.append(
			$("<tr>").append(
				$("<td>").append(
					inputAtackCheck
				),
				$("<td>").append(
					$("<input>", {
						id: NewAtack.windowName + '_atack_general_' + playerId + '_' + randomId,
						type: 'text',
						width: inputWidth,
						onkeyup: 'NewAtack.reCalculateAtackResult(' + randomId + ')'
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
						id: NewAtack.windowName + '_atack_aim_' + playerId + '_' + randomId,
						type: 'text',
						width: inputWidth,
						onkeyup: 'NewAtack.reCalculateAtackResult(' + randomId + ')'
					}),
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_dextery_' + playerId + '_' + randomId,
						width: inputWidth,
						readonly: 'readonly',
						value: player['dextery']['points']
					}),
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_aim_result_' + playerId + '_' + randomId,
						width: inputWidth,
						readonly: 'readonly',
						value: 0
					})
				),
				$("<td>").append(
					$("<input>", {
						id: NewAtack.windowName + '_atack_strength_' + playerId + '_' + randomId,
						type: 'text',
						width: inputWidth,
						onkeyup: 'NewAtack.reCalculateAtackResult(' + randomId + ')'
					}),
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_strength_' + playerId + '_' + randomId,
						width: inputWidth,
						readonly: 'readonly',
						value: Player.getAttribute(player, 'strength', 'points')
					})
				),
				$("<td>").append(

					atackDefenseInput,

					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_strength_result_' + playerId + '_' + randomId,
						width: inputWidth,
						readonly: 'readonly',
						value: 0
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_constitution_' + playerId + '_' + randomId,
						width: inputWidth,
						readonly: 'readonly',
						value: Player.getAttribute(player, 'constitution', 'points')
					}),
					$("<input>", {
						type: 'text',
						id: NewAtack.windowName + '_life_result_' + playerId + '_' + randomId,
						width: inputWidth,
						value: 0
					}),
				),
				$("<td>").append(

					lifeProgressbar,

					$("<input>", {
						id: NewAtack.windowName + '_life_' + playerId + '_' + randomId,
						type: 'hidden',
						readonly: 'readonly',
						value: playerLife
					}),
					$("<input>", {
						id: NewAtack.windowName + '_current_life_' + playerId + '_' + randomId,
						type: 'hidden',
						readonly: 'readonly',
						value: playerLife
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

	// calcular acertos e danos de acordo com as rolagens de dados
	static reCalculateAtackResult (randomId) {
		let atackerId = $('.new_atack_atacker_' + randomId)[0].value;

		let atackerDie = parseInt($('#' + NewAtack.windowName + '_atack_general_' + atackerId + '_' + randomId).val() || 0);
		let atackerDextery = parseInt($('#' + NewAtack.windowName + '_dextery_' + atackerId + '_' + randomId).val() || 0);
		let atackerStrength = parseInt($('#' + NewAtack.windowName + '_strength_' + atackerId + '_' + randomId).val() || 0);
		let atackerAtack = parseInt($('#' + NewAtack.windowName + '_atack_' + atackerId + '_' + randomId).val() || 0);

		// colocar o resultado da rolagem do atacante aqui
		let atackerAimInput = $('#' + NewAtack.windowName + '_aim_result_' + atackerId + '_' + randomId);
		let atackerStrengthInput = $('#' + NewAtack.windowName + '_strength_result_' + atackerId + '_' + randomId);

		let atackerAimDie = atackerDie;
		let atackerStrengthDie = atackerDie;

		// verificar valores individuais dos dados caso o dado geral nao esteja preenchido
		if (! atackerDie) {
			atackerAimDie = parseInt($('#' + NewAtack.windowName + '_atack_aim_' + atackerId + '_' + randomId).val() || 0);
			atackerStrengthDie = parseInt($('#' + NewAtack.windowName + '_atack_strength_' + atackerId + '_' + randomId).val() || 0);
		}

		// calcular o resultado da mira do ataque
		let aimResult = Player.atackAim(atackerAimDie, atackerDextery);
		processVisualResultInput(atackerAimInput, aimResult);

		// calcular o resultado da força do ataque
		let atackStrength = Player.atackStrength(atackerStrengthDie, atackerStrength, atackerAtack);
		processVisualResultInput(atackerStrengthInput, atackStrength);


		// verificar defensores
		let defenderIdInputs = $('.new_atack_defender_' + randomId);

		defenderIdInputs.each(function() {

			let defenderId = $(this).val();

			let enabledDefender = $('#' + NewAtack.windowName + '_target_' + defenderId + '_' + randomId).is(':checked');

			// continua apenas se estiver checkado
			if (! enabledDefender) {
				return true;
			}

			let defenderDie = parseInt($('#' + NewAtack.windowName + '_atack_general_' + defenderId + '_' + randomId).val() || 0);
			let defenderDextery = parseInt($('#' + NewAtack.windowName + '_dextery_' + defenderId + '_' + randomId).val() || 0);
			let defenderDefense = parseInt($('#' + NewAtack.windowName + '_defense_' + defenderId + '_' + randomId).val() || 0);
			let defenderStrength = parseInt($('#' + NewAtack.windowName + '_strength_' + defenderId + '_' + randomId).val() || 0);
			let defenderConstitution = parseInt($('#' + NewAtack.windowName + '_constitution_' + defenderId + '_' + randomId).val() || 0);

			// colocar o resultado da rolagem do defensor aqui
			let defenderAimInput = $('#' + NewAtack.windowName + '_aim_result_' + defenderId + '_' + randomId);
			let defenderStrengthInput = $('#' + NewAtack.windowName + '_strength_result_' + defenderId + '_' + randomId);
			let defenderLifeInput = $('#' + NewAtack.windowName + '_life_result_' + defenderId + '_' + randomId);

			let defenderAimDie = defenderDie;
			let defenderStrengthDie = defenderDie;

			// verificar valores individuais dos dados caso o dado geral nao esteja preenchido
			if (! defenderDie) {
				defenderAimDie = parseInt($('#' + NewAtack.windowName + '_atack_aim_' + defenderId + '_' + randomId).val() || 0);
				defenderStrengthDie = parseInt($('#' + NewAtack.windowName + '_atack_strength_' + defenderId + '_' + randomId).val() || 0);
			}

			// calcular o resultado da mira do ataque no defensor
			let defenderAimResult = Player.defendAimResult(defenderAimDie, defenderDextery, aimResult);
			processVisualResultInput(defenderAimInput, defenderAimResult);

			// calcular o resultado da força do ataque no defensor
			let defenderStrengthResult = Player.defendStrength(defenderStrengthDie, defenderStrength, defenderDefense, defenderAimResult, atackStrength);
			processVisualResultInput(defenderStrengthInput, defenderStrengthResult);

			// calcular a quantidade de vida diminuida do defensor
			let defenderdiferenceResult = Player.defendLifeResult(defenderConstitution, defenderStrengthResult);
			processVisualResultInput(defenderLifeInput, defenderdiferenceResult);

			NewAtack.changeLife(defenderId, defenderdiferenceResult, randomId);
		});
	}

	// alterar vida do player
	static changeLife (playerId, lifeDiference, randomId) {
		let totalLife = parseInt($('#' + NewAtack.windowName + '_life_' + playerId + '_' + randomId).val() || 0);
		let currentLifeInput = $('#' + NewAtack.windowName + '_current_life_' + playerId + '_' + randomId);
		let lifeProgressbar = $('#' + NewAtack.windowName + '_life_display_' + playerId + '_' + randomId);

		console.log('totalLife antes', totalLife);
		console.log('lifeDiference', lifeDiference);
		totalLife = totalLife + lifeDiference;

		console.log('totalLife depois', totalLife);

		lifeProgressbar.progressbar('value', totalLife);
		lifeProgressbar.attr('title', totalLife + '%');

		currentLifeInput.val(totalLife);
		
		console.log('currentLifeInput', currentLifeInput);

		// se morreu, colocar um fundo diferente
		if (totalLife <= 0) {
			lifeProgressbar.css({ 'background': 'Black' });
		} else {
			lifeProgressbar.css({ 'background': 'none' });
		}
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
	static saveResults (randomId) {
		let atackerId = $('.new_atack_atacker_' + randomId)[0].value;

		// verificar defensores
		let defenderIdInputs = $('.new_atack_defender_' + randomId);

		let playerIds = [atackerId];

		defenderIdInputs.each(function() {
			let defenderId = $(this).val();

			playerIds.push(defenderId);
		});

		let allSaved = true;

		playerIds.forEach(function (playerId) {
			let currentLife = parseInt($('#' + NewAtack.windowName + '_current_life_' + playerId + '_' + randomId).val() || 0);

			// salvar o valor da vida
			let resultSaved = Player.saveAttribute(playerId, 'life', currentLife);

			if (! resultSaved) {
				allSaved = false;
			}
		});

		let saveButton = $('#' + NewAtack.windowName + '_save_button_' + randomId);

		if (allSaved) {

			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

		} else {

			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}
}

boxes[NewAtack.windowName] = NewAtack;
