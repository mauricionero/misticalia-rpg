class ListPlayerEquipaments extends Box {

	static get windowName () { return 'list_player_equipaments' };

	boxContent (options = {}) {

		let me = this;

		let playerId = options['playerId'];
		this.playerId = playerId;

		let listEquipamentDiv = $('<div>', {
			id: me.createId('list_equipaments_' + playerId)
		});

		return listEquipamentDiv;
	}

	// executa após printar a janela
	callBackRender () {
		let playerId = this.playerId;
		
		this.listEquipaments(playerId);
	}

	// atualizar lista de equipamentos quando precisar
	listEquipaments (playerId) {

		let me = this;
		
		let boxId = me.boxId;

		let listEquipamentDiv = $('#' + me.createId('list_equipaments_' + playerId));

		let allPlayerEquipaments = PlayerEquipament.getAllPlayerEquipaments(playerId);

		let currentAdventureRoleId = Adventure.getCurrentAdventureRole();

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
							id: me.createId('type_' + equipament['id']),
							disabled: 'disabled',
							value: equipament['typeId']
						})
					),
					$("<td>").append(
						equipament['name'],
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + equipament['id']),
							disabled: 'disabled',
							value: equipament['name']
						})
					),
					$("<td>").append(
						Equipament.weightHuman(equipament['weight']),
						$("<input>", {
							type: 'hidden',
							id: me.createId('weight_' + equipament['id']),
							disabled: 'disabled',
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
							id: me.createId('manage_equipament_' + playerId),
							title: t('Adicionar equipamento'),
							onclick: 'AddPlayerEquipament.visualizeEquipaments("' + playerId + '", "' + boxId + '")',
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
	static visualizePlayerEquipaments (playerId) {

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

Box.boxes[ListPlayerEquipaments.windowName] = ListPlayerEquipaments;
