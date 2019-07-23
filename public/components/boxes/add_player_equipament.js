class AddPlayerEquipament extends Box {

	static get windowName () { return 'add_player_equipament' };

	boxContent (options) {
		var randomId = Math.floor(Math.random() * 10000);

		let playerId = options['playerId'];

		let player = Player.getPlayer(playerId);

		let equipaments = Equipament.getAllEquipamentsCurrentAdventure();

		let inputWidth = 32;

		let listPlayerEquipamentTable = $("<table>");

		// titulo das colunas na tabela
		listPlayerEquipamentTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Tipo') }).append(
					Equipament.EMOJI_TYPE
				),
				$("<th>", { title: t('Nome') }).append(
					Equipament.EMOJI_NAME
				),
				$("<th>", { title: t('Peso') }).append(
					Equipament.EMOJI_WEIGHT
				),
				$("<th>", { title: t('Quantidade') }).append(
					Equipament.EMOJI_QUANTITY
				),
				$("<th>", { title: t('Adicionar ao jogador') }).append(
					Equipament.EMOJI_ADD
				)
			)
		);

		equipaments.forEach(function (equipament) {
			listPlayerEquipamentTable.append(
				$("<tr>").append(
					$("<td>").append(
						Equipament.EMOJI_TYPES[equipament['type']],
						$("<input>", {
							type: 'hidden',
							id: AddPlayerEquipament.windowName + '_type_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['type']
						})
					),
					$("<td>").append(
						equipament['name'],
						$("<input>", {
							type: 'hidden',
							id: AddPlayerEquipament.windowName + '_name_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['type']
						})
					),
					$("<td>").append(
						Equipament.weightHuman(equipament['weight']),
						$("<input>", {
							type: 'hidden',
							id: AddPlayerEquipament.windowName + '_weight_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['weight']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							width: inputWidth,
							id: AddPlayerEquipament.windowName + '_quantity_' + equipament['id'] + '_' + randomId,
							value: 1
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: AddPlayerEquipament.windowName + '_add_' + equipament['id'] + '_' + randomId,
							onclick: 'AddPlayerEquipament.addPlayerEquipament("' + playerId + '", "' + equipament['id'] + '", ' + randomId + ')',
							value: Equipament.EMOJI_ADD
						})
					),
				)
			);
		});

		return listPlayerEquipamentTable;
	}

	// adicionar o equipamento ao inventario do jogador
	static addPlayerEquipament (playerId, equipamentId, randomId) {
		let quantity = $('#' + AddPlayerEquipament.windowName + '_quantity_' + equipamentId + '_' + randomId).val();
		let addButton = $('#' + AddPlayerEquipament.windowName + '_add_' + equipamentId + '_' + randomId);

		let newPlayerEquipament = {
			'playerId': playerId,
			'equipamentId': equipamentId,
			'quantity': quantity
		}

		let resultSaved = PlayerEquipament.addPlayerEquipament(newPlayerEquipament);

		//TODO: adicionar modificadores

		if (resultSaved) {

			addButton.attr('disabled', 'disabled');
			addButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

		} else {

			addButton.val('😟'); // :(
			addButton.attr('disabled', 'disabled');
			addButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
			addButton.val(Equipament.EMOJI_ADD);
		}
	}

	// abrir visualização da adição dos equipamentos do player
	static visualizeEquipament (playerId) {

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];

		let windowTitle = Equipament.EMOJI_ADD + ' ' + playerName;

		let options = {
			playerId: playerId,
			singleTon: true,
			windowId: AddPlayerEquipament.windowName + '_' + playerId
		};

		Box.openDialog(AddPlayerEquipament.windowName, windowTitle, options);
	}

}

boxes[AddPlayerEquipament.windowName] = AddPlayerEquipament;
