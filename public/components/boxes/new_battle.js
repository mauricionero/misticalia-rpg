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

		let me = this;
		
		let boxId = me.boxId;

		let allPlayers = [];

		// let playerOptions = { 'filters': { 'isNPC': false } };
		let playerOptions = { 'order': { 'name': 'ASC' } };

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allPlayers = Player.getAllPlayersCurrentAdventure(playerOptions);
		} else {
			allPlayers = Player.getAllPlayers(playerOptions);
		}

		var allPlayerIds = [];

		var maxDextery = Player.getMax('dextery');

		let newBattleDiv = $("<div>");
		let newBattleTable = $('<table>', { id: me.createId('players') } );
		let newBattleNPCTable = $('<table>', { id: me.createId('npc_players') } );

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
			$("<th>", { title: t('Vida') }).append(
				Player.EMOJI_LIFE
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
				Player.EMOJI_VISUALIZE
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

			let playerAgility = player.getAttribute('agility', 'basePoints') || 0;

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
				addRemovePlayerAction = 'NewBattle.addRemoveNPCPlayer("' + player['id'] + '", "' + boxId + '", this)';
			} else {
				icon = Player.EMOJI_GENDERS[playerGenderId];
				playerTitle = t('Jogador') + ' ' + playerName;
			}

			let lifeProgressbar = player.getLifeProgressBar(boxId);

			let atackProgressbar = $("<div>", {
				id: me.createId('current_display_' + player['id']),
				width: 38,
				height: 20
			}).progressbar({ value: 0 })

			atackProgressbar.children().css({ 'background': 'Green' });

			allPlayerIds.push(player['id']);
			let newLine = $("<tr>", { id: me.createId('player_line_' + player['id']) } ).append(
				$("<td>").append(
					$("<input>", {
						type: 'checkbox',
						id: me.createId('wait_' + player['id']),
						class: 'check_wait',
						checked: (isNPC != true),
						onchange: addRemovePlayerAction,
						value: 1
					})
				),
				$("<td>", { title: playerTitle } ).append(
					icon + ' ' + player.getPlayerShort() + ':',
					$("<input>", {
						type: 'hidden',
						class: me.createId('new_battle_player_ids'),
						disabled: 'disabled',
						value: player['id']
					}),
					$("<input>", {
						type: 'hidden',
						id: me.createId('player_name_' + player['id']),
						disabled: 'disabled',
						value: player['name']
					}),
					$("<input>", {
						type: 'hidden',
						id: me.createId('player_shortname_' + player['id']),
						disabled: 'disabled',
						value: player.getPlayerShort()
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'text',
						id: me.createId('original_' + player['id']),
						width: 32,
						readonly: true,
						title: t('Original: ') + playerAgility,
						value: playerAgility
					}),
					$("<input>", {
						type: 'text',
						id: me.createId('modifier_' + player['id']),
						width: 26,
						value: 0
					})
				),
				$("<td>").append(

					lifeProgressbar
				),
				$("<td>").append(
					atackProgressbar,
					$("<input>", {
						type: 'hidden',
						id: me.createId('current_' + player['id']),
						disabled: 'disabled',
						value: 0
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: me.createId('action_' + player['id'] + '_' + NewBattle.ACTION),
						onclick: 'NewBattle.playerAction("' + boxId + '", "' + player['id'] + '", ' + NewBattle.ACTION + ')',
						value: NewBattle.ACTION_EMOJIS[NewBattle.ACTION]
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: me.createId('action_' + player['id'] + '_' + NewBattle.FIGHT),
						onclick: 'NewBattle.playerAction("' + boxId + '", "' + player['id'] + '", ' + NewBattle.FIGHT + ')',
						value: NewBattle.ACTION_EMOJIS[NewBattle.FIGHT]
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: me.createId('action_' + player['id'] + '_' + NewBattle.ITEM),
						onclick: 'NewBattle.playerAction("' + boxId + '", "' + player['id'] + '", ' + NewBattle.ITEM + ')',
						value: NewBattle.ACTION_EMOJIS[NewBattle.ITEM]
					})
				),
				$("<td>").append(
					$("<input>", {
						type: 'button',
						id: me.createId('visualize_' + player['id']),
						onclick: 'VisualizePlayer.visualizePlayer("' + player['id'] + '")',
						value: '👁️'
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
			id: me.createId('npcs')
		});

		newBattleNPCsDiv.append(newBattleNPCTable);

		// botao de proximo a atacar
		newBattleDiv.append(
			newBattleTable,
			$("<input>", {
				type: 'button',
				id: me.createId('add_npc'),
				onclick: 'NewBattle.addNPCs("' + boxId + '")',
				value: 'NPCs'
			}),
			' ',
			$("<input>", {
				type: 'button',
				id: me.createId('next'),
				onclick: 'NewBattle.nextToAtack("' + boxId + '")',
				value: Battle.EMOJI_NEXT_ATACKER
			}),
			'<br />',
			'<br />',
			$("<div>", {
				id: me.createId('attackers_log'),
			}),
			'<br />',
			newBattleNPCsDiv
		);

		return newBattleDiv;
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				sprintf(t('Iniciar uma batalha'))
			),
			$('<p>').append(
				t('São listados todos os jogadores (por primeiro) e NPCs (separados para facilitar)')
			),
			$('<p>').append(
				sprintf(t('Os ataques são por turno levando em conta a agilidade para aumentar a barra de progresso. Quem preencher toda a barra está apto a atacar. O sistema não limita quem pode ou não atacar, apenas sugere. Clique em %s para avançar para o próximo atacante'), Battle.EMOJI_NEXT_ATACKER)
			),
			$('<p>').append(
				t('<b>Legendas:</b> (basta deixar o mouse em cima de cada icone para aparecer o que significam)')
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s</b> Selecionar para indicar que está fazendo parte da batalha'), Battle.EMOJI_GO_WAIT)
				),
				$('<li>').append(
					sprintf(t('<b>%s Nome abreviado</b>, deixe o mouse em cima para ver o nome completo'), Player.EMOJI_NAME)
				),
				$('<li>').append(
					sprintf(t('<b>%s Agilidade</b>, define quem ataca por primeiro e quantas vezes ataca. Quanto maior, mais progride a barra de ataque. Pode ser adicionado um modificador temporario na agilidade no campo aberto.'), Player.EMOJI_AGILITY)
				),
				$('<li>').append(
					sprintf(t('<b>%s Vida</b> do personagem. Deixe o mouse em cima para ver exatamente quanto de vida tem'), Player.EMOJI_LIFE)
				),
				$('<li>').append(
					sprintf(t('<b>%s % para atacar</b>: Barra de progresso dos atacantes, quem enche essa barra, está apto a atacar! Quanto mais alto a agilidade, mais rápido enche e antes ataca. Clique em %s para avançar ao próximo atacante'), Battle.EMOJI_ACTION_WAIT, Battle.EMOJI_NEXT_ATACKER)
				),
				$('<li>').append(
					sprintf(t('<b>%s Ação</b>. Ação que será feita pelo jogador. Reseta o progresso de ataque desse personagem'), Battle.EMOJI_ACTION)
				),
				$('<li>').append(
					sprintf(t('<b>%s Ataque</b>. Abrirá uma nova janela para realizar um ataque. Reseta o progresso de ataque desse personagem. Ver o manual dessa janela para mais detalhes'), Battle.EMOJI_FIGHT)
				),
				$('<li>').append(
					sprintf(t('<b>%s Item</b>. Ainda não implementado, mas servirá para usar algum item do inventário. Reseta o progresso de ataque desse personagem'), Battle.EMOJI_ITEM)
				),
				$('<li>').append(
					sprintf(t('<b>%s Visualizar personagem</b>. Abre uma nova janela com os detalhes do personagem'), Player.EMOJI_VISUALIZE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Equipamentos</b>. Abre uma nova janela com os equipamentos do personagem'), PlayerEquipament.EMOJI_VISUALIZE)
				),
			),
			$('<p>').append(
				t('<b>NPCs:</b> Ao clicar, esconde ou mostra os NPCs que não estão em combate, util para economizar espaço após definir os atacantes.')
			),
			$('<p>').append(
				sprintf(t('<b>%s:</b> Enche as barras de progresso até o próximo apto a atacar. Cálculo para o progresso de cada personagem: <b>%s</b>'), Battle.EMOJI_NEXT_ATACKER, Battle.fighterNextAtackFormula())
			),
		];
	}


	// adicionar e remover os NPCs da listagem de atacantes
	static addRemoveNPCPlayer (playerId, boxId, checkbox) {

		let me = Box.getBox(boxId);

		let tablePlayers = $('#' + me.createId('players'));
		let tableNPCPlayers = $('#' + me.createId('npc_players'));

		// se estiver selecionado
		if (checkbox.checked) {
			tableNPCPlayers.find('#' + me.createId('player_line_' + playerId)).each(function(){
				tablePlayers.append(this);
			});
		} else {
			tablePlayers.find('#' + me.createId('player_line_' + playerId)).each(function(){
				tableNPCPlayers.append(this);
			});
		}
	}

	// adicionar NPCs na batalha
	static addNPCs (boxId) {

		let me = Box.getBox(boxId);

		let result = $('#' + me.createId('npcs')).slideToggle();
	}

	// retornar num array todos os ids dos players selecionados
	getAllEnabledPlayers () {

		let me = this;

		var fighterIds = [];

		let allFightersIdInputs = $('.' + me.createId('new_battle_player_ids'));

		// pegar todos os ids de players, apenas os habilitados
		allFightersIdInputs.each(function (index) {
			let fighterInput = this;

			let fighterId = fighterInput.value;

			let enabledPlayer = $('#' + me.createId('wait_' + fighterId)).is(':checked');

			if (enabledPlayer) {
				fighterIds.push(fighterId);
			}
			
		});

		return fighterIds;
	}

	// calcular o proximo a atacar
	static nextToAtack (boxId) {

		let me = Box.getBox(boxId);

		let maxDextery = 0;
		let maxCurrent = 0;
		let nextIdToAttack = 0;
		let minToNextAttack = 0;
		let fighterNextAttacks = {};
		let fighterIds = me.getAllEnabledPlayers();

		// calcular o maximo usando ateh mesmo os jogadores pauxados para manter a normalizacao do maximo de agilidade
		fighterIds.forEach(function (fighterId) {

			let agility = $('#' + me.createId('original_' + fighterId)).val();
			let modifier = $('#' + me.createId('modifier_' + fighterId)).val();

			let totalAgility = parseInt(agility) + parseInt(modifier);

			if (totalAgility > maxDextery) {
				maxDextery = totalAgility;
			}
			
		});

		minToNextAttack = maxDextery;

		// agora com o maximo calculado:
		// calcular os progressos q cada um deve chegar e verificar o menor
		fighterIds.forEach(function (fighterId) {

			let agility = $('#' + me.createId('original_' + fighterId)).val();
			let modifier = $('#' + me.createId('modifier_' + fighterId)).val();

			let current = $('#' + me.createId('current_' + fighterId)).val();

			let totalAgility = parseInt(agility) + parseInt(modifier);

			let fighterToNextAttack = totalAgility;

			let fighterNextAttack = Battle.fighterNextAtack(maxDextery, totalAgility)
			fighterNextAttacks[fighterId] = fighterNextAttack;

			fighterToNextAttack = fighterNextAttack - current;

			if (fighterToNextAttack < minToNextAttack) {
				minToNextAttack = fighterToNextAttack;
				nextIdToAttack = fighterId;
			}

		});

		// agora sabendo quem ataca e quanto somar a todos, somar
		fighterIds.forEach(function (fighterId) {

			let current = $('#' + me.createId('current_' + fighterId)).val();

			let currentNow = parseInt(current) + parseInt(minToNextAttack);

			me.changeProgress (fighterId, currentNow, fighterNextAttacks[fighterId]);

		});

	}

	// ação ou ataque de um jogador
	static playerAction (boxId, playerId, actionId) {

		let me = Box.getBox(boxId);

		let emoji = NewBattle.ACTION_EMOJIS[actionId];

		// se for ataque, abrir janela de ataque
		if (actionId == NewBattle.FIGHT) {
			let fighterIds = me.getAllEnabledPlayers();

			let options = {
				playerId: playerId,
				singleTon: true,
				fighterIds: fighterIds,
				boxId: boxId,
				windowId: NewAtack.windowName + '_' + playerId
			};

			let playerName = Player.getPlayer(playerId)['name'];
			let windowTitle = Battle.EMOJI_FIGHT + ' ' + playerName;

			Box.openDialog(NewAtack.windowName, windowTitle, options);
		}

		me.changeProgress(playerId, 0);

		// exibir no log de ataques
		let playerName = $('#' + me.createId('player_shortname_' + playerId)).val();
		$('#' + me.createId('attackers_log')).append(playerName + emoji + ', ');
	}

	// inserir valor no input de progresso do ataque
	changeProgress (fighterId, currentNow, fighterNextAttacks = 1) {

		let me = this;

		let displayCurrent = Math.round(currentNow * 100 / fighterNextAttacks);
		let inputDisplayCurrent = $('#' + me.createId('current_display_' + fighterId));

		$('#' + me.createId('current_' + fighterId)).val(currentNow);
		inputDisplayCurrent.progressbar( "value", displayCurrent );
	}

}

Box.boxes[NewBattle.windowName] = NewBattle;
