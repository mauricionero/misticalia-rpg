class AddPlayerEquipament extends Box {

	static get windowName () { return 'add_player_equipament' };

	boxContent (options) {

		let me = this;
		
		let boxId = me.boxId;

		let playerId = options['playerId'];
		let originBoxId = options['originBoxId'];

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
				),
				$("<th>", { title: t('Detalhes') }).append(
					Equipament.EMOJI_VISUALIZE
				)
			)
		);

		equipaments.forEach(function (equipament) {
			listPlayerEquipamentTable.append(
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
							value: equipament['type']
						})
					),
					$("<td>").append(
						weightHuman(equipament['weight']),
						$("<input>", {
							type: 'hidden',
							id: me.createId('weight_' + equipament['id']),
							disabled: 'disabled',
							value: equipament['weight']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							width: inputWidth,
							id: me.createId('quantity_' + equipament['id']),
							value: 1
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('add_' + equipament['id']),
							onclick: 'AddPlayerEquipament.addPlayerEquipament("' + playerId + '", "' + equipament['id'] + '", "' + boxId + '", "' + originBoxId + '")',
							value: Equipament.EMOJI_ADD
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('visualize_' + equipament['id']),
							onclick: 'ListEquipaments.visualizeEquipament("' + equipament['id'] + '", "' + boxId + '")',
							value: Equipament.EMOJI_VISUALIZE
						})
					)
				)
			);
		});

		return listPlayerEquipamentTable;
	}

	// adicionar o equipamento ao inventario do jogador
	static addPlayerEquipament (playerId, equipamentId, boxId, originBoxId = null) {

		let me = Box.getBox(boxId);

		let quantity = $('#' + me.createId('quantity_' + equipamentId)).val();
		let addButton = $('#' + me.createId('add_' + equipamentId));

		let newPlayerEquipament = new PlayerEquipament({
			'playerId': playerId,
			'equipamentId': equipamentId,
			'quantity': quantity
		});

		let resultSaved = newPlayerEquipament.addPlayerEquipament();

		if (resultSaved) {

			addButton.attr('disabled', 'disabled');
			addButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			// atualizar listagem da dialog que originou essa dialog
			if (originBoxId) {
				let originBox = Box.getBox(originBoxId);
				originBox.listEquipaments(playerId);
			}

		} else {

			addButton.val('😟'); // :(
			addButton.attr('disabled', 'disabled');
			addButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
			addButton.val(Equipament.EMOJI_ADD);
		}
	}

	// abrir visualização da adição dos equipamentos do player
	static visualizeEquipaments (playerId, originBoxId) {

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];

		let windowTitle = Equipament.EMOJI_ADD + ' ' + playerName;

		let options = {
			playerId: playerId,
			originBoxId: originBoxId,
			singleTon: true,
			windowId: AddPlayerEquipament.windowName + '_' + playerId
		};

		Box.openDialog(AddPlayerEquipament.windowName, windowTitle, options);
	}

}

Box.boxes[AddPlayerEquipament.windowName] = AddPlayerEquipament;
