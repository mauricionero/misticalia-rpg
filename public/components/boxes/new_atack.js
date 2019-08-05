class NewAtack extends Box {

	static get windowName () { return 'new_atack' };

	boxContent (options) {

		let me = this;
		
		let boxId = me.boxId;

		let originalBoxId = options['boxId'];

		let playerId = options['playerId'];

		let fighterIds = options['fighterIds'];

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

		let count = 1;

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
				$("<th>", { title: t('Destreza (Mira)') }).append(
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
				$("<th>", { title: t('Modificadores') }).append(
					Modifier.EMOJI_VISUALIZE
				)
			)
		);

		let insertPlayerLineOptions = {
			count: count,
			howManyPlayers: allPlayers.length
		}

		me.insertPlayerLine(newAtackTable, player, true, insertPlayerLineOptions);

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
				$("<th>", { title: t('Destreza (esquiva)') }).append(
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

			count += 1;

			let options = {
				count: count,
				howManyPlayers: allPlayers.length
			}
			me.insertPlayerLine(newAtackTable, player, false, options);
			
		});

		let atackIterationDiv = $('<div>', { id: me.createId('atack_iteration') } );

		newAtackDiv.append(
			newAtackTable,
			$("<input>", {
				type: 'button',
				id: me.createId('save_button'),
				title: t('Salvar'),
				onclick: 'NewAtack.saveResults("' + boxId + '", "' + originalBoxId + '")',
				value: Player.EMOJI_SAVE
			}),
			'<br />',
			'<br />',
			atackIterationDiv
		);

		return newAtackDiv;
	}

	// inserir linha do player atual
	insertPlayerLine (newAtackTable, player, currentPlayer, options) {

		let me = this;
		
		let boxId = me.boxId;

		let count = options['count'];
		let howManyPlayers = options['howManyPlayers'];

		let playerId = player['id'];

		let diceSides = 100;

		let inputAtackCheck = '';

		let playerIdClass;

		let atackDefenseInput;

		let inputWidth = 30;
		let inputWidthSmall = 26;

		let playerLife = player.getAttribute('life') || 100;

		if (currentPlayer) {
			inputAtackCheck = '';
			playerIdClass = me.createId('atacker');
			atackDefenseInput = $("<input>", {
				type: 'text',
				id: me.createId('atack_' + playerId),
				width: inputWidth,
				onkeyup: 'NewAtack.reCalculateAtackResult("' + boxId + '")',
				value: player.getAttribute('atack', 'points')
			});
		} else {
			inputAtackCheck = $("<input>", {
				type: 'checkbox',
				id: me.createId('target_' + playerId),
				class: me.createId('target'),
				value: playerId
			});
			playerIdClass = me.createId('defender');
			atackDefenseInput = $("<input>", {
				type: 'text',
				id: me.createId('defense_' + playerId),
				width: inputWidth,
				onkeyup: 'NewAtack.reCalculateAtackResult("' + boxId + '")',
				value: player.getAttribute('defense', 'points')
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

		let lifeProgressbar = player.getLifeProgressBar(boxId);

		newAtackTable.append(
			$("<tr>").append(
				$("<td>").append(
					inputAtackCheck
				),
				$("<td>").append(
					$("<input>", {
						id: me.createId('atack_general_' + playerId),
						type: 'text',
						width: inputWidth,
						onkeyup: 'NewAtack.fillDiceWithGeneralDie("' + boxId + '")',
						tabindex: (howManyPlayers * 0 + count),
						placeholder: Dice.EMOJI_DICE
					})
				),
				$("<td>", { title: playerTitle } ).append(
					icon + ' ' + player.getPlayerShort(),
					$("<input>", {
						type: 'hidden',
						id: me.createId('player_id_' + playerId),
						disabled: 'disabled',
						class: playerIdClass,
						value: playerId
					}),
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
						value: player['shortname']
					}),
					$("<input>", {
						type: 'hidden',
						id: me.createId('gender_' + playerId),
						disabled: 'disabled',
						value: player['gender']
					})
				),
				$("<td>").append(
					$("<input>", {
						id: me.createId('atack_aim_' + playerId),
						type: 'text',
						width: inputWidth,
						onkeyup: 'NewAtack.reCalculateAtackResult("' + boxId + '")',
						tabindex: (howManyPlayers * 1 + count),
						placeholder: Dice.EMOJI_DICE
					}),
					$("<input>", {
						type: 'text',
						id: me.createId('dextery_' + playerId),
						width: inputWidth,
						onkeyup: 'NewAtack.reCalculateAtackResult("' + boxId + '")',
						value: player['dextery']['points']
					}),
					$("<input>", {
						type: 'text',
						id: me.createId('aim_result_' + playerId),
						width: inputWidth,
						disabled: 'disabled',
						value: 0
					})
				),
				$("<td>").append(
					$("<input>", {
						id: me.createId('atack_strength_' + playerId),
						type: 'text',
						width: inputWidth,
						onkeyup: 'NewAtack.reCalculateAtackResult("' + boxId + '")',
						tabindex: (howManyPlayers * 2 + count),
						placeholder: Dice.EMOJI_DICE
					}),
					$("<input>", {
						type: 'text',
						id: me.createId('strength_' + playerId),
						width: inputWidth,
						onkeyup: 'NewAtack.reCalculateAtackResult("' + boxId + '")',
						value: player.getAttribute('strength', 'points')
					})
				),
				$("<td>").append(

					atackDefenseInput,

					$("<input>", {
						type: 'text',
						id: me.createId('strength_result_' + playerId),
						width: inputWidth,
						disabled: 'disabled',
						value: 0
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: me.createId('constitution_' + playerId),
						width: inputWidth,
						onkeyup: 'NewAtack.reCalculateAtackResult("' + boxId + '")',
						value: player.getAttribute('constitution', 'points')
					}),
					$("<input>", {
						type: 'text',
						id: me.createId('life_result_' + playerId),
						width: inputWidth,
						value: 0,
						onkeyup: 'NewAtack.changeCurrentLifeResult("' + boxId + '", "' + playerId + '", this)',
						tabindex: (howManyPlayers * 3 + count)
					}),
				),
				$("<td>").append(

					lifeProgressbar,

					$("<input>", {
						id: me.createId('life_' + playerId),
						type: 'hidden',
						disabled: 'disabled',
						value: playerLife
					}),
					$("<input>", {
						id: me.createId('current_life_' + playerId),
						type: 'hidden',
						disabled: 'disabled',
						value: playerLife
					})
				),
				$("<td>").append(
					secondaryAttributes
				)
			)
		)
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				sprintf(t('Realizar um ataque'))
			),
			$('<p>').append(
				t('São listados todos os personagens selecionados na batalha')
			),
			$('<p>').append(
				t('Na primeira linha está o personagem que está realizando o ataque. Deve ser checkado os personagens que irão receber o ataque. Cabe ao mestre julgar se é possível ou não mais de 1 personagem receber o ataque.')
			),
			$('<p>').append(
				t('<b>Legendas:</b>')
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s Alvo do ataque:</b> Selecione para que o ataque seja calculado para esse personagem'), Battle.EMOJI_TARGET)
				),
				$('<li>').append(
					sprintf(t('<b>%s Dados geral</b>: Você pode escolher preencher apenas esse rolar de dados que irá preencher as outras rolagens para agilizar, ou rolar outros 2 dados em outros campos para deixar mais interessante: um para ver se acertou, outro para saber o dano causado.'), Dice.EMOJI_DICE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Abreviação do nome</b>: Para ver o nome completo, deixe o mouse em cima'), Player.EMOJI_NAME)
				),
				$('<li>').append(
					sprintf(t('<b>%s</b>: Rolagem de dado individual para verificar se acertou o alvo; Destreza; Resultado da rolagem. Serão realizados 2 cálculos diferentes, um para o atacante, que leva em conta a rolagem de dados e a destreza (que pode ser alterada). Para o defensor recebendo o ataque, será levado em conta a rolagem do dado, a destreza (para saber se conseguiu desviar) e será comparado com o resultado do atacante. Os resultados devem ser interpretados como o quanto acertou no defensor:'), Dice.EMOJI_DICE + ' ' + Modifier.EMOJI_DEXTERY + ' ='),

					$('<ul>').append(
						$('<li>').append(
							t('<b>< -100:</b> Acerto total da forma mais perfeita possível com um extra de acerto crítico! (+ de 100% de aproveitamento do golpe).')
						),
						$('<li>').append(
							t('<b>-100:</b> Acerto total da forma mais perfeita possível (100% de aproveitamento do golpe).')
						),
						$('<li>').append(
							t('<b>0:</b> Passou de raspão sem acertar.')
						),
						$('<li>').append(
							t('<b>100:</b> Esquiva total e perfeita')
						)
					),
					'<br />',
					t('<b>Fórmulas:</b>'),
					$('<ul>').append(
						$('<li>').append(
							t('<b>Atacante (mira):</b>'),
							'<br />',
							$('<pre>').append(
								Player.atackAimFormula
							)
						),
						$('<li>').append(
							t('<b>Defensor (esquiva):</b> Está limitado a -100 de resultado, abaixo disso é considerado crítico e é pego 10% da diferença:'),
							'<br />',
							t('<b>Pontos:</b>'),
							'<br />',
							$('<pre>').append(
								Player.defendAimFormula
							),
							'<br />',
							t('<b>Crítico:</b>'),
							'<br />',
							$('<pre>').append(
								Player.defendAimCriticalFormula
							),
							'<br />',
							t('Somando os 2 valores, acha-se o resultado final da esquiva')
						)
					)
				),
				$('<li>').append(
					sprintf(t('<b>%s Força</b>: Rolagem de dado individual para verificar a força do ataque; Destreza; Resultado da rolagem. Serão realizados 2 cálculos diferentes, um para o atacante, que leva em conta a rolagem de dados e a destreza (que pode ser alterada). Para o defensor recebendo o ataque, será levado em conta a rolagem do dado, a destreza (para saber se conseguiu desviar) e será comparado com o resultado do atacante. Quanto menor o número no defensor, maior o dano causado (leva em conta a mira)'), Dice.EMOJI_DICE + ' ' + Modifier.EMOJI_STRENGTH),
				),
				$('<li>').append(
					sprintf(t('<b>%s Ataque</b>: Modificador de ataque, pode ser alterado. Fórmula do ataque:'), Modifier.EMOJI_ATACK + ' ='),
					'<br />',
					$('<pre>').append(
						Player.atackStrengthFormula
					)
				),
				$('<li>').append(
					sprintf(t('<b>%s Defesa</b>: Modificador de defesa, pode ser alterado. Fórmula do resultado da defesa (leva em conta a mira):'), Modifier.EMOJI_DEFENSE + ' ='),
					'<br />',
					$('<pre>').append(
						Player.defendStrengthFormula
					)
				),
				$('<li>').append(
					sprintf(t('<b>%s Constituição</b>: Pode ser alterado. Resultado do quanto de vida o ataque tirou do defensor, caso tenha acertado. Quanto maior a constituição, menos dano irá causar. Resultado será subtraido da vida total. Fórmula para o defensor:'), Modifier.EMOJI_CONSTITUTION + ' ' + Battle.EMOJI_HURT),
					$('<pre>').append(
						Player.defendLifeFormula
					)
				),
				$('<li>').append(
					sprintf(t('<b>%s Vida</b>: Para ver a quantidade, deixe o mouse em cima'), Player.EMOJI_LIFE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Modificadores extras</b>: Outros modificadores para que o mestre possa levar em conta na hora de decidir os ataques e os valores dos modificadores.'), Modifier.EMOJI_VISUALIZE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Salvar</b>: Salvar as vidas calculadas nesse ataque. Pode ser alterada manualmente, inclusive a do atacante.'), Player.EMOJI_SAVE)
				)
			)
		];
	}


	// preencher os dados individuais com o dado geral
	static fillDiceWithGeneralDie (boxId) {

		let me = Box.getBox(boxId);

		let atackerId = $('.' + me.createId('atacker'))[0].value;

		let atackerDie = parseInt($('#' + me.createId('atack_general_' + atackerId)).val() || 0);

		let aimDieInput = $('#' + me.createId('atack_aim_' + atackerId));
		let strengthDieInput = $('#' + me.createId('atack_strength_' + atackerId));

		aimDieInput.val(atackerDie);
		strengthDieInput.val(atackerDie);

		// recalcular o restante
		NewAtack.reCalculateAtackResult(boxId);
	}

	// calcular acertos e danos de acordo com as rolagens de dados
	static reCalculateAtackResult (boxId) {

		let me = Box.getBox(boxId);

		let atackerId = $('.' + me.createId('atacker'))[0].value;

		let atackerDie = parseInt($('#' + me.createId('atack_general_' + atackerId)).val() || 0);
		let atackerDextery = parseInt($('#' + me.createId('dextery_' + atackerId)).val() || 0);
		let atackerStrength = parseInt($('#' + me.createId('strength_' + atackerId)).val() || 0);
		let atackerAtack = parseInt($('#' + me.createId('atack_' + atackerId)).val() || 0);

		// colocar o resultado da rolagem do atacante aqui
		let atackerAimInput = $('#' + me.createId('aim_result_' + atackerId));
		let atackerStrengthInput = $('#' + me.createId('strength_result_' + atackerId));

		let atackerAimDie = parseInt($('#' + me.createId('atack_aim_' + atackerId)).val() || 0);
		let atackerStrengthDie = parseInt($('#' + me.createId('atack_strength_' + atackerId)).val() || 0);

		// calcular o resultado da mira do ataque
		let aimResult = Player.atackAim(atackerAimDie, atackerDextery);
		processVisualResultInput(atackerAimInput, aimResult);

		// calcular o resultado da força do ataque
		let atackStrength = Player.atackStrength(atackerStrengthDie, atackerStrength, atackerAtack);
		processVisualResultInput(atackerStrengthInput, atackStrength);


		// verificar defensores
		let defenderIdInputs = $('.' + me.createId('defender'));

		defenderIdInputs.each(function() {

			let defenderId = $(this).val();

			let enabledDefender = $('#' + me.createId('target_' + defenderId)).is(':checked');

			// continua apenas se estiver checkado
			if (! enabledDefender) {
				return true;
			}

			let defenderDie = parseInt($('#' + me.createId('atack_general_' + defenderId)).val() || 0);
			let defenderDextery = parseInt($('#' + me.createId('dextery_' + defenderId)).val() || 0);
			let defenderDefense = parseInt($('#' + me.createId('defense_' + defenderId)).val() || 0);
			let defenderStrength = parseInt($('#' + me.createId('strength_' + defenderId)).val() || 0);
			let defenderConstitution = parseInt($('#' + me.createId('constitution_' + defenderId)).val() || 0);

			// colocar o resultado da rolagem do defensor aqui
			let defenderAimInput = $('#' + me.createId('aim_result_' + defenderId));
			let defenderStrengthInput = $('#' + me.createId('strength_result_' + defenderId));
			let defenderLifeInput = $('#' + me.createId('life_result_' + defenderId));

			let defenderAimDie = defenderDie;
			let defenderStrengthDie = defenderDie;

			// verificar valores individuais dos dados caso o dado geral nao esteja preenchido
			if (! defenderDie) {
				defenderAimDie = parseInt($('#' + me.createId('atack_aim_' + defenderId)).val() || 0);
				defenderStrengthDie = parseInt($('#' + me.createId('atack_strength_' + defenderId)).val() || 0);
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

			me.changeLife(defenderId, defenderdiferenceResult);
		});
	}

	// alterar vida do player
	changeLife (playerId, lifeDiference) {
		let me = this;

		lifeDiference = parseInt(lifeDiference);

		if (! lifeDiference) {
			lifeDiference = 0;
		}

		let totalLife = parseInt($('#' + me.createId('life_' + playerId)).val() || 0);
		let currentLifeInput = $('#' + me.createId('current_life_' + playerId));
		let lifeProgressbarId = me.createId('life_display_' + playerId);

		totalLife = totalLife + lifeDiference;

		currentLifeInput.val(totalLife);

		Player.alterLifeProgressbar(lifeProgressbarId, totalLife);
	}

	// // retornar num array todos os ids dos players selecionados
	// static getAllCheckedPlayers (randomId) {

	// 	var fighterIds = [];

	// 	let allFightersIdInputs = $('.' + me.createId('target'));

	// 	// pegar todos os ids de players, apenas os checkados
	// 	allFightersIdInputs.each(function (index) {
	// 		let fighterInput = this;

	// 		let fighterId = fighterInput.value;

	// 		// verificar se esta checkado
	// 		let enabledPlayer = $('#' + NewAtack.windowName + '_target_' + fighterId + '_' + randomId).is(':checked');

	// 		if (enabledPlayer) {
	// 			fighterIds.push(fighterId);
	// 		}
			
	// 	});

	// 	return fighterIds;
	// }

	// realizar um ataque corpo a corpo
	static saveResults (boxId, originalBoxId) {

		let me = Box.getBox(boxId);
		let originalBox = Box.getBox(originalBoxId);

		let atackerId = $('.' + me.createId('atacker'))[0].value;

		// verificar defensores
		let defenderIdInputs = $('.' + me.createId('defender'));

		let playerIds = [atackerId];

		defenderIdInputs.each(function() {
			let defenderId = $(this).val();

			let enabledDefender = $('#' + me.createId('target_' + defenderId)).is(':checked');

			// continua apenas se estiver checkado
			if (! enabledDefender) {
				return true;
			}

			playerIds.push(defenderId);
		});

		let allSaved = true;

		playerIds.forEach(function (playerId) {
			let currentLife = parseInt($('#' + me.createId('current_life_' + playerId)).val() || 0);

			// salvar o valor da vida
			let resultSaved = Player.saveAttribute(playerId, 'life', currentLife);

			if (resultSaved) {
				let battlePlayerLifeInputId = originalBox.createId('life_display_' + playerId);

				Player.alterLifeProgressbar(battlePlayerLifeInputId, currentLife);
			} else {
				allSaved = false;
			}
		});

		let saveButton = $('#' + me.createId('save_button'));

		if (allSaved) {

			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

		} else {

			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}

	// alterar manualmente de acordo com o input preenchido pelo usuario
	static changeCurrentLifeResult (boxId, playerId, input) {

		let me = Box.getBox(boxId);

		let lifeLoss = input.value;

		me.changeLife(playerId, lifeLoss);
	}
}

Box.boxes[NewAtack.windowName] = NewAtack;
