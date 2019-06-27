class NewBattle extends Box {

	boxWidth = 360;
	boxHeight = 210;

	boxContent () {

		var random_id = Math.floor(Math.random() * 10000);

		var allPlayers = Player.getAllPlayers();
		var allPlayerIds = [];

		var maxDextery = Player.getMax('dextery');

		let newBattleDiv = $("<div>");

		allPlayers.forEach(function (player) {
			allPlayerIds.push(player['id']);
			newBattleDiv.append(
				player['name'] + ': ',
				$("<input>", {
					id: 'new_battle_original_' + player['id'] + '_' + random_id,
					type: 'text',
					width: 34,
					value: player['dextery']
				}),
				$("<input>", {
					id: 'new_battle_current_display_' + player['id'] + '_' + random_id,
					type: 'text',
					width: 38,
					value: 0
				}),
				$("<input>", {
					id: 'new_battle_current_' + player['id'] + '_' + random_id,
					type: 'hidden',
					value: 0
				}),
				'<br />'
			);
		});

		// botao de proximo a atacar
		newBattleDiv.append(
			'<br />',
			$("<input>", {
				type: 'button',
				id: 'new_battle_next_' + random_id,
				onclick: 'NewBattle.nextToAtack(' + random_id + ', [' + allPlayerIds.join(',') + '])',
				value: t('Próximo')
			}),
			$("<div>", {
				id: 'new_battle_attackers_' + random_id,
			}),
		);

		let newBattleTable = $("<table>");

		allPlayers.forEach(function (player) {
			newBattleTable.append(player);
		});

		return newBattleDiv;
	}

	static nextToAtack (random_id, fighterIds) {

		var maxDextery = 0;
		var maxCurrent = 0;
		var nextIdToAttack = 0;
		var minToNextAttack = 0;
		var fighterNextAttacks = {}

		// calcular o maximo
		fighterIds.forEach(function (fighterId) {

			let dextery = $('#new_battle_original_' + fighterId + '_' + random_id).val();

			if (dextery > maxDextery) {
				maxDextery = dextery;
			}
			
		});

		console.log('maxDextery', maxDextery);
		minToNextAttack = maxDextery;

		// agora com o maximo calculado:
		// calcular os progressos q cada um deve chegar e verificar o menor
		fighterIds.forEach(function (fighterId) {
			let fighterMultiplier = 0;

			let dextery = $('#new_battle_original_' + fighterId + '_' + random_id).val();
			let current = $('#new_battle_current_' + fighterId + '_' + random_id).val();

			if (maxDextery != 0) {
				fighterMultiplier = parseFloat(maxDextery) / parseFloat(dextery);
			}

			let fighterNextAttack = Math.round(maxDextery * fighterMultiplier);
			fighterNextAttacks[fighterId] = fighterNextAttack;

			if (fighterNextAttack < minToNextAttack) {
				minToNextAttack = fighterNextAttack;
				nextIdToAttack = fighterId;
			}

		});

		// agora sabendo quem ataca e quanto somar a todos, somar
		fighterIds.forEach(function (fighterId) {

			let current = $('#new_battle_current_' + fighterId + '_' + random_id).val();

			let currentNow = parseInt(current) + parseInt(minToNextAttack);
			let displayCurrent = Math.round(currentNow * 100 / fighterNextAttacks[fighterId]);

			$('#new_battle_current_' + fighterId + '_' + random_id).val(currentNow);
			$('#new_battle_current_display_' + fighterId + '_' + random_id).val(displayCurrent + '%');

		});

	}

}

boxes['new_battle'] = NewBattle;
