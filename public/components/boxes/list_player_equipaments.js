class ListPlayerEquipaments extends Box {

	static get windowName () { return 'list_player_equipaments' };

	boxContent (options = {}) {

		let randomId = Math.floor(Math.random() * 10000);
		this.randomId = randomId;

		let playerId = options['playerId'];
		this.playerId = playerId;

		let listEquipamentDiv = $('<div>', {
			id: ListPlayerEquipaments.windowName + '_list_equipaments_' + playerId + '_' + randomId
		});

		return listEquipamentDiv;
	}

	// executa após printar a janela
	callBackRender () {
		let randomId = this.randomId;
		let playerId = this.playerId;

		ListPlayerEquipaments.listEquipaments(playerId, randomId);
	}

	// atualizar lista de equipamentos quando precisar
	static listEquipaments (playerId, randomId) {

		let allPlayerEquipaments = PlayerEquipament.getAllPlayerEquipaments(playerId);

		let currentAdventureRoleId = Adventure.getCurrentAdventureRole();

		let listEquipamentDiv = $('#' + ListPlayerEquipaments.windowName + '_list_equipaments_' + playerId + '_' + randomId);

		// apagar conteudo antes de inserir
		listEquipamentDiv.html('');

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

			listEquipamentTable.append(
				$("<tr>").append(
					$("<td>", { title: Equipament.ALL_TYPE_NAMES[equipament['typeId']] } ).append(
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
		
		// se for mestre, pode incluir equipamento no inventario
		if (currentAdventureRoleId == Adventure.ROLE_MASTER) {
			listEquipamentTable.append(
				$("<tr>").append(
					$("<th>", { colspan: 3 } ).append(
						$("<input>", {
							type: 'button',
							id: ListPlayerEquipaments.windowName + '_manage_equipament_' + playerId + '_' + randomId,
							title: t('Adicionar equipamento'),
							onclick: 'AddPlayerEquipament.visualizeEquipaments("' + playerId + '", ' + randomId + ')',
							value: Equipament.EMOJI_ADD
						})
					)
				)
			);
		}

		listEquipamentDiv.append(
			listEquipamentTable
		);
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
