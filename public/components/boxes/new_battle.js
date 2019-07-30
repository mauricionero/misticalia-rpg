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

		// let playerOptions = { 'filters': { 'isNPC': false } };
		let playerOptions = { 'order': { 'name': 'ASC' } };

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allPlayers = Player.getAllPlayersCurrentAdventure();
		} else {
			allPlayers = Player.getAllPlayers();
		}

		var randomId = Math.floor(Math.random() * 10000);

		var allPlayerIds = [];

		var maxDextery = Player.getMax('dextery');

		let newBattleDiv = $("<div>");
		let newBattleTable = $('<table>', { id: NewBattle.windowName + '_players_' + randomId } );
		let newBattleNPCTable = $('<table>', { id: NewBattle.windowName + '_npc_players_' + randomId } );

		let playerTableHead = $("<tr>").append(
			$("<th>", { title: t('Habilita e desabilita o atacante') }).append(
				Battle.EMOJI_GO_WAIT
			),
			$("<th>", { title: t('Combatente') }).append(
				Player.EMOJI_NAME
			),
			$("<th>", { title: t('Agilidade') + ' / ' + t('modificador') }).append(
				Player.EMOJI_AGILITY
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
			),
			$("<th>", { title: t('Visualizar equipamentos do jogador') }).append(
				PlayerEquipament.EMOJI_VISUALIZE
			)
		);

		newBattleTable.append(playerTableHead);
		newBattleNPCTable.append(playerTableHead.clone());

		allPlayers.forEach(function (player) {

			let isNPC = player['isNPC'];
			let playerGenderId = player['gender'];
			let playerName = player['name'];

			let playerAgility = (player['agility']) ? player['agility']['basePoints'] : 0;

			// se nao estiver definido se eh npc, ou se estiver definido de forma errada (nao boolean), pular
			if (isNPC == undefined || typeof isNPC == 'string') {
				return;
			}

			let icon;
			let playerTitle;
			let addRemovePlayerAction;

			if (isNPC) {
				icon = Player.EMOJI_IS_NPC;
				playerTitle = t('NPC') + ' ' + playerName;
				addRemovePlayerAction = 'NewBattle.addRemoveNPCPlayer("' + player['id'] + '", ' + randomId + ', this)';
			} else {
				icon = Player.EMOJI_GENDERS[playerGenderId];
				playerTitle = t('Jogador') + ' ' + playerName;
			}

			allPlayerIds.push(player['id']);
			let newLine = $("<tr>", { id: NewBattle.windowName + '_player_line_' + player['id'] + '_' + randomId } ).append(
				$("<td>").append(
					$("<input>", {
						type: 'checkbox',
						id: NewBattle.windowName + '_wait_' + player['id'] + '_' + randomId,
						class: 'check_wait',
						checked: (isNPC != true),
						onchange: addRemovePlayerAction,
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
						id: NewBattle.windowName + '_player_name_' + player['id'] + '_' + randomId,
						readonly: 'readonly',
						value: player['name']
					}),
					$("<input>", {
						type: 'hidden',
						id: NewBattle.windowName + '_player_shortname_' + player['id'] + '_' + randomId,
						readonly: 'readonly',
						value: Player.getPlayerShort(player['id'])
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: NewBattle.windowName + '_original_' + player['id'] + '_' + randomId,
						width: 32,
						readonly: true,
						title: t('Original: ') + playerAgility,
						value: playerAgility
					}),
					$("<input>", {
						type: 'text',
						id: NewBattle.windowName + '_modifier_' + player['id'] + '_' + randomId,
						width: 26,
						value: 0
					})
				),
				$("<td>").append(
					$("<div>", {
						id: NewBattle.windowName + '_current_display_' + player['id'] + '_' + randomId,
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
						id: NewBattle.windowName + '_action_' + player['id'] + '_' + NewBattle.ACTION + '_' + randomId,
						onclick: 'NewBattle.playerAction(' + randomId + ', "' + player['id'] + '", ' + NewBattle.ACTION + ')',
						value: NewBattle.ACTION_EMOJIS[NewBattle.ACTION]
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: NewBattle.windowName + '_action_' + player['id'] + '_' + NewBattle.FIGHT + '_' + randomId,
						onclick: 'NewBattle.playerAction(' + randomId + ', "' + player['id'] + '", ' + NewBattle.FIGHT + ')',
						value: NewBattle.ACTION_EMOJIS[NewBattle.FIGHT]
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: NewBattle.windowName + '_action_' + player['id'] + '_' + NewBattle.ITEM + '_' + randomId,
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
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: ListPlayers.windowName + '_visualize_equipaments_' + player['id'] + '_' + randomId,
						onclick: 'ListPlayerEquipaments.visualize_player_equipaments("' + player['id'] + '")',
						value: PlayerEquipament.EMOJI_VISUALIZE
					})
				)
			);

			// se for NPC
			if (isNPC) {
				newBattleNPCTable.append(newLine);

			// se for jogador
			} else {
				newBattleTable.append(newLine);
			}
		});

		let newBattleNPCsDiv = $('<div>', {
			class: 'new_battle_npcs',
			id: NewBattle.windowName + '_npcs_' + randomId
		});

		newBattleNPCsDiv.append(newBattleNPCTable);

		// botao de proximo a atacar
		newBattleDiv.append(
			newBattleTable,
			$("<input>", {
				type: 'button',
				id: NewBattle.windowName + '_add_npc_' + randomId,
				onclick: 'NewBattle.addNPCs(' + randomId + ')',
				value: 'NPCs'
			}),
			' ',
			$("<input>", {
				type: 'button',
				id: NewBattle.windowName + '_next_' + randomId,
				onclick: 'NewBattle.nextToAtack(' + randomId + ')',
				value: '⏭️'
			}),
			'<br />',
			'<br />',
			$("<div>", {
				id: NewBattle.windowName + '_attackers_log_' + randomId,
			}),
			'<br />',
			newBattleNPCsDiv
		);

		return newBattleDiv;
	}

	// adicionar e remover os NPCs da listagem de atacantes
	static addRemoveNPCPlayer (playerId, randomId, checkbox) {
		let tablePlayers = $('#' + NewBattle.windowName + '_players_' + randomId);
		let tableNPCPlayers = $('#' + NewBattle.windowName + '_npc_players_' + randomId);

		// se estiver selecionado
		if (checkbox.checked) {
			tableNPCPlayers.find('#' + NewBattle.windowName + '_player_line_' + playerId + '_' + randomId).each(function(){
				tablePlayers.append(this);
			});
		} else {
			tablePlayers.find('#' + NewBattle.windowName + '_player_line_' + playerId + '_' + randomId).each(function(){
				tableNPCPlayers.append(this);
			});
		}
	}

	// adicionar NPCs na batalha
	static addNPCs (randomId) {
		let result = $('#' + NewBattle.windowName + '_npcs_' + randomId).slideToggle();
	}

	// retornar num array todos os ids dos players selecionados
	static getAllEnabledPlayers (randomId) {

		var fighterIds = [];

		let allFightersIdInputs = $('.new_battle_player_ids_' + randomId);

		// pegar todos os ids de players, apenas os habilitados
		allFightersIdInputs.each(function (index) {
			let fighterInput = this;

			let fighterId = fighterInput.value;

			let enabledPlayer = $('#' + NewBattle.windowName + '_wait_' + fighterId + '_' + randomId).is(':checked');

			if (enabledPlayer) {
				fighterIds.push(fighterId);
			}
			
		});

		return fighterIds;
	}

	// calcular o proximo a atacar
	static nextToAtack (randomId) {

		var maxDextery = 0;
		var maxCurrent = 0;
		var nextIdToAttack = 0;
		var minToNextAttack = 0;
		var fighterNextAttacks = {};
		let fighterIds = NewBattle.getAllEnabledPlayers(randomId);

		console.log('fighterIds', fighterIds);

		// calcular o maximo usando ateh mesmo os jogadores pauxados para manter a normalizacao do maximo de agilidade
		fighterIds.forEach(function (fighterId) {

			let agility = $('#' + NewBattle.windowName + '_original_' + fighterId + '_' + randomId).val();
			let modifier = $('#' + NewBattle.windowName + '_modifier_' + fighterId + '_' + randomId).val();

			let totalAgility = parseInt(agility) + parseInt(modifier);

			if (totalAgility > maxDextery) {
				maxDextery = totalAgility;
			}
			
		});

		minToNextAttack = maxDextery;

		// agora com o maximo calculado:
		// calcular os progressos q cada um deve chegar e verificar o menor
		fighterIds.forEach(function (fighterId) {
			let fighterMultiplier = 0;

			let agility = $('#' + NewBattle.windowName + '_original_' + fighterId + '_' + randomId).val();
			let modifier = $('#' + NewBattle.windowName + '_modifier_' + fighterId + '_' + randomId).val();

			let current = $('#' + NewBattle.windowName + '_current_' + fighterId + '_' + randomId).val();

			let totalAgility = parseInt(agility) + parseInt(modifier);

			let fighterToNextAttack = totalAgility;

			if (maxDextery != 0) {
				fighterMultiplier = parseFloat(maxDextery) / parseFloat(totalAgility);
			}

			let fighterNextAttack = Math.round(maxDextery * fighterMultiplier);
			fighterNextAttacks[fighterId] = fighterNextAttack;

			fighterToNextAttack = fighterNextAttack - current;

			if (fighterToNextAttack < minToNextAttack) {
				minToNextAttack = fighterToNextAttack;
				nextIdToAttack = fighterId;
			}

		});

		// agora sabendo quem ataca e quanto somar a todos, somar
		fighterIds.forEach(function (fighterId) {

			let current = $('#' + NewBattle.windowName + '_current_' + fighterId + '_' + randomId).val();

			let currentNow = parseInt(current) + parseInt(minToNextAttack);

			NewBattle.changeProgress (randomId, fighterId, currentNow, fighterNextAttacks[fighterId]);

		});

	}

	// ação ou ataque de um jogador
	static playerAction (randomId, playerId, actionId) {
		let emoji = NewBattle.ACTION_EMOJIS[actionId];

		// se for ataque, abrir janela de ataque
		if (actionId == NewBattle.FIGHT) {
			let fighterIds = NewBattle.getAllEnabledPlayers(randomId);

			let options = {
				playerId: playerId,
				singleTon: true,
				fighterIds: fighterIds,
				windowId: NewAtack.windowName + '_' + playerId
			};

			let playerName = Player.getPlayer(playerId)['name'];
			let windowTitle = Battle.EMOJI_FIGHT + ' ' + playerName;

			Box.openDialog(NewAtack.windowName, windowTitle, options);
		}

		NewBattle.changeProgress (randomId, playerId, 0);

		// exibir no log de ataques
		let playerName = $('#' + NewBattle.windowName + '_player_shortname_' + playerId + '_' + randomId).val();
		$('#' + NewBattle.windowName + '_attackers_log_' + randomId).append(playerName + emoji + ', ');
	}

	// inserir valor no input de progresso do ataque
	static changeProgress (randomId, fighterId, currentNow, fighterNextAttacks = 1) {
		let displayCurrent = Math.round(currentNow * 100 / fighterNextAttacks);
		let inputDisplayCurrent = $('#' + NewBattle.windowName + '_current_display_' + fighterId + '_' + randomId);

		$('#' + NewBattle.windowName + '_current_' + fighterId + '_' + randomId).val(currentNow);
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
