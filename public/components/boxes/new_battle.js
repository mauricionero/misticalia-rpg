class NewBattle extends Box {

	// id das acoes
	static get WAIT () { return 0 };
	static get ACTION () { return 1 };
	static get FIGHT () { return 2 };
	static get ITEM () { return 3 };

	// caractere das acoes
	static get ACTION_EMOJIS () {
		return {
			0: Battle.EMOJI_WAIT,
			1: Battle.EMOJI_ACTION,
			2: Battle.EMOJI_FIGHT,
			3: Battle.EMOJI_ITEM
		}
	};

	static get windowName () { return 'new_battle' };

	boxContent (options = {}) {

		let allPlayers = [];

		let playerOptions = { 'order': { 'isNPC': 'ASC', 'name': 'ASC' } };

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allPlayers = Player.getAllPlayersCurrentAdventure(playerOptions);
		} else {
			allPlayers = Player.getAllPlayers(playerOptions);
		}

		var randomId = Math.floor(Math.random() * 10000);

		var allPlayerIds = [];

		var maxDextery = Player.getMax('dextery');

		let newBattleDiv = $("<div>");
		let newBattleTable = $("<table>");

		newBattleTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Habilita e desabilita o atacante') }).append(
					Battle.EMOJI_GO_WAIT
				),
				$("<th>", { title: t('Combatente') }).append(
					Player.EMOJI_NAME
				),
				$("<th>", { title: t('Destreza') + ' / ' + t('modificador') }).append(
					Player.EMOJI_DEXTERY
				),
				$("<th>", { title: t('% para atacar') }).append(
					Battle.EMOJI_ACTION_WAIT
				),
				$("<th>", { title: t('Ação') }).append(
					Battle.EMOJI_ACTION
				),
				$("<th>", { title: t('Ataque') }).append(
					Battle.EMOJI_FIGHT
				),
				$("<th>", { title: t('Item') }).append(
					Battle.EMOJI_ITEM
				),
				$("<th>", { title: t('Visualizar jogador') }).append(
					'👁️'
				)
			)
		);

		console.log('allPlayers', allPlayers);

		allPlayers.forEach(function (player) {

			let isNPC = player['isNPC'];
			let playerGenderId = player['gender'];
			let playerName = player['name'];

			// se nao estiver definido se eh npc, ou se estiver definido de forma errada (nao boolean), pular
			if (isNPC == undefined || typeof isNPC == 'string') {
				return;
			}

			let icon;
			let playerTitle;

			if (isNPC) {
				icon = Player.EMOJI_IS_NPC;
				playerTitle = t('NPC') + ' ' + playerName;
			} else {
				icon = Player.EMOJI_GENDERS[playerGenderId];
				playerTitle = t('Jogador') + ' ' + playerName;
			}

			allPlayerIds.push(player['id']);
			newBattleTable.append(
				$("<tr>").append(
					$("<td>").append(
						$("<input>", {
							type: 'checkbox',
							id: 'new_battle_wait_' + player['id'] + '_' + randomId,
							class: 'check_wait',
							checked: 'checked',
							value: 1
						})
					),
					$("<td>", { title: playerTitle } ).append(
						icon + ' ' + Player.getPlayerShort(player['id']) + ':',
						$("<input>", {
							type: 'hidden',
							class: 'new_battle_player_ids_' + randomId,
							readonly: 'readonly',
							value: player['id']
						}),
						$("<input>", {
							type: 'hidden',
							id: 'new_battle_player_name_' + player['id'] + '_' + randomId,
							readonly: 'readonly',
							value: player['name']
						}),
						$("<input>", {
							type: 'hidden',
							id: 'new_battle_player_shortname_' + player['id'] + '_' + randomId,
							readonly: 'readonly',
							value: Player.getPlayerShort(player['id'])
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: 'new_battle_original_' + player['id'] + '_' + randomId,
							width: 32,
							title: t('Original: ') + player['dextery']['basePoints'],
							value: player['dextery']['basePoints']
						}),
						$("<input>", {
							type: 'text',
							id: 'new_battle_modifier_' + player['id'] + '_' + randomId,
							width: 26,
							value: 0
						})
					),
					$("<td>").append(
						$("<div>", {
							id: 'new_battle_current_display_' + player['id'] + '_' + randomId,
							width: 38,
							height: 20,
							class: 'new_battle_progressbar'
						}).progressbar({ value: 0 }),
						$("<input>", {
							type: 'hidden',
							id: 'new_battle_current_' + player['id'] + '_' + randomId,
							readonly: 'readonly',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: 'new_battle_action_' + player['id'] + '_' + NewBattle.ACTION + '_' + randomId,
							onclick: 'NewBattle.playerAction(' + randomId + ', "' + player['id'] + '", ' + NewBattle.ACTION + ')',
							value: NewBattle.ACTION_EMOJIS[NewBattle.ACTION]
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: 'new_battle_action_' + player['id'] + '_' + NewBattle.FIGHT + '_' + randomId,
							onclick: 'NewBattle.playerAction(' + randomId + ', "' + player['id'] + '", ' + NewBattle.FIGHT + ')',
							value: NewBattle.ACTION_EMOJIS[NewBattle.FIGHT]
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: 'new_battle_action_' + player['id'] + '_' + NewBattle.ITEM + '_' + randomId,
							onclick: 'NewBattle.playerAction(' + randomId + ', "' + player['id'] + '", ' + NewBattle.ITEM + ')',
							value: NewBattle.ACTION_EMOJIS[NewBattle.ITEM]
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: NewBattle.windowName + '_visualize_' + player['id'] + '_' + randomId,
							onclick: 'VisualizePlayer.visualize_player("' + player['id'] + '")',
							value: '👁️'
						})
					)
				)
			);
		});

		// botao de proximo a atacar
		newBattleDiv.append(
			newBattleTable,
			'<br />',
			$("<input>", {
				type: 'button',
				id: 'new_battle_next_' + randomId,
				onclick: 'NewBattle.nextToAtack(' + randomId + ')',
				value: '⏭️'
			}),
			'<br />',
			$("<div>", {
				id: 'new_battle_attackers_log_' + randomId,
			}),
		);

		return newBattleDiv;
	}

	// calcular o proximo a atacar
	static nextToAtack (randomId) {

		var maxDextery = 0;
		var maxCurrent = 0;
		var nextIdToAttack = 0;
		var minToNextAttack = 0;
		var fighterNextAttacks = {}
		var fighterIds = []

		let allFightersIdInputs = $('.new_battle_player_ids_' + randomId);

		console.log("allFightersIdInputs", allFightersIdInputs);

		// pegar todos os ids de players, apenas os habilitados
		allFightersIdInputs.each(function (index) {
			let fighterInput = this;

			console.log('fighterInput', fighterInput);

			let fighterId = fighterInput.value;

			let enabledPlayer = $('#new_battle_wait_' + fighterId + '_' + randomId).is(':checked');

			console.log('enabledPlayer', enabledPlayer);

			if (enabledPlayer) {
				fighterIds.push(fighterId);
			}
			
		});

		console.log('=======');
		console.log('fighterIds', fighterIds);
		console.log('___');


		// calcular o maximo usando ateh mesmo os jogadores pauxados para manter a normalizacao do maximo de agilidade
		fighterIds.forEach(function (fighterId) {

			let dextery = $('#new_battle_original_' + fighterId + '_' + randomId).val();
			let modifier = $('#new_battle_modifier_' + fighterId + '_' + randomId).val();

			let totalDextery = parseInt(dextery) + parseInt(modifier);

			if (totalDextery > maxDextery) {
				maxDextery = totalDextery;
			}
			
		});

		console.log('maxDextery', maxDextery);
		console.log('___');
		minToNextAttack = maxDextery;

		// agora com o maximo calculado:
		// calcular os progressos q cada um deve chegar e verificar o menor
		fighterIds.forEach(function (fighterId) {
			let fighterMultiplier = 0;

			let dextery = $('#new_battle_original_' + fighterId + '_' + randomId).val();
			let modifier = $('#new_battle_modifier_' + fighterId + '_' + randomId).val();

			let current = $('#new_battle_current_' + fighterId + '_' + randomId).val();

			let totalDextery = parseInt(dextery) + parseInt(modifier);

			let fighterToNextAttack = totalDextery;

			console.log('dextery', dextery);
			console.log('modifier', modifier);
			console.log('totalDextery', totalDextery);
			console.log('current', current);

			if (maxDextery != 0) {
				fighterMultiplier = parseFloat(maxDextery) / parseFloat(totalDextery);
			}

			console.log('fighterMultiplier', fighterMultiplier);

			let fighterNextAttack = Math.round(maxDextery * fighterMultiplier);
			fighterNextAttacks[fighterId] = fighterNextAttack;

			console.log('fighterNextAttack *', fighterNextAttack);

			fighterToNextAttack = fighterNextAttack - current;

			console.log('fighterToNextAttack *', fighterToNextAttack);

			if (fighterToNextAttack < minToNextAttack) {
				minToNextAttack = fighterToNextAttack;
				nextIdToAttack = fighterId;
			}

		});

		console.log('___');
		console.log('minToNextAttack', minToNextAttack);
		console.log('___');

		// agora sabendo quem ataca e quanto somar a todos, somar
		fighterIds.forEach(function (fighterId) {

			let current = $('#new_battle_current_' + fighterId + '_' + randomId).val();

			let currentNow = parseInt(current) + parseInt(minToNextAttack);

			NewBattle.changeProgress (randomId, fighterId, currentNow, fighterNextAttacks[fighterId]);

		});

	}

	// ação ou ataque de um jogador
	static playerAction (randomId, playerId, actionId) {
		let emoji = NewBattle.ACTION_EMOJIS[actionId];

		// se for ataque, abrir janela de ataque
		if (actionId == NewBattle.FIGHT) {
			let options = {
				playerId: playerId,
				singleTon: true,
				windowId: NewAtack.windowName + '_' + playerId
			};

			let playerName = Player.getPlayer(playerId)['name'];
			let windowTitle = Battle.EMOJI_FIGHT + ' ' + playerName;

			Box.openDialog(NewAtack.windowName, windowTitle, options);
		}

		NewBattle.changeProgress (randomId, playerId, 0);

		// exibir no log de ataques
		let playerName = $('#new_battle_player_shortname_' + playerId + '_' + randomId).val();
		$('#new_battle_attackers_log_' + randomId).append(playerName + emoji + ', ');
	}

	// inserir valor no input de progresso do ataque
	static changeProgress (randomId, fighterId, currentNow, fighterNextAttacks = 1) {
		let displayCurrent = Math.round(currentNow * 100 / fighterNextAttacks);
		let inputDisplayCurrent = $('#new_battle_current_display_' + fighterId + '_' + randomId);

		console.log('currentNow', currentNow);
		console.log('displayCurrent', displayCurrent);

		$('#new_battle_current_' + fighterId + '_' + randomId).val(currentNow);
		inputDisplayCurrent.progressbar( "value", displayCurrent );

		if (displayCurrent >= 100) {
			inputDisplayCurrent.animate({
				backgroundColor: '#3c3'
			});
		} else {
			inputDisplayCurrent.animate({
				backgroundColor: '#fff'
			});
		}
	}

}

boxes[NewBattle.windowName] = NewBattle;
