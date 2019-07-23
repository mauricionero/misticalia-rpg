class ListPlayerEquipaments extends Box {

	static get windowName () { return 'list_player_equipaments' };

	boxContent (options = {}) {

		let playerId = options['playerId'];

		let allPlayerEquipaments = PlayerEquipament.getAllPlayerEquipaments(playerId);

		let randomId = Math.floor(Math.random() * 10000);

		let listEquipamentDiv = $('<div>');

		let listEquipamentTable = $("<table>");

		// titulo das colunas na tabela
		listEquipamentTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Tipo') }).append(
					Equipament.EMOJI_TYPE
				),
				$("<th>", { title: t('Nome') }).append(
					Equipament.EMOJI_NAME
				),
				$("<th>", { title: t('Peso') }).append(
					Equipament.EMOJI_WEIGHT
				)
			)
		);


		allPlayerEquipaments.forEach(function (playerEquipament) {

			let equipamentId = playerEquipament['equipamentId'];

			// criar filtro de equipamento
			let options = { 'filters': { 'id': equipamentId } }
			let equipament = Equipament.getAll(options)[0];

			console.log('equipament', equipament);
			
			listEquipamentTable.append(
				$("<tr>").append(
					$("<td>").append(
						Equipament.EMOJI_TYPES[equipament['typeId']],
						$("<input>", {
							type: 'hidden',
							id: ListPlayerEquipaments.windowName + '_type_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['typeId']
						})
					),
					$("<td>").append(
						equipament['name'],
						$("<input>", {
							type: 'hidden',
							id: ListPlayerEquipaments.windowName + '_name_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['name']
						})
					),
					$("<td>").append(
						Equipament.weightHuman(equipament['weight']),
						$("<input>", {
							type: 'hidden',
							id: ListPlayerEquipaments.windowName + '_weight_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['weight']
						})
					)
				)
			)
		});

		listEquipamentDiv.html(listEquipamentTable);

		return listEquipamentDiv;
	}

	// abrir visualização dos equipamentos do player
	static visualize_player_equipaments (playerId) {

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];

		let windowTitle = PlayerEquipament.EMOJI_VISUALIZE + ' ' + playerName;

		let options = {
			playerId: playerId,
			singleTon: true,
			windowId: ListPlayerEquipaments.windowName + '_' + playerId
		};

		Box.openDialog(ListPlayerEquipaments.windowName, windowTitle, options);
	}

}

boxes[ListPlayerEquipaments.windowName] = ListPlayerEquipaments;
