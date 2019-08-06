class AddPlayerItem extends Box {

	static get windowName () { return 'add_player_item' };

	boxContent (options) {

		let me = this;
		
		let boxId = me.boxId;

		let playerId = options['playerId'];
		let originBoxId = options['originBoxId'];

		let player = Player.getPlayer(playerId);

		let items = Item.getAllItemsCurrentAdventure();

		let inputWidth = 32;

		let listPlayerItemTable = $("<table>");

		// titulo das colunas na tabela
		listPlayerItemTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Nome') }).append(
					Item.EMOJI_NAME
				),
				$("<th>", { title: t('Peso') }).append(
					Item.EMOJI_WEIGHT
				),
				$("<th>", { title: t('Quantidade') }).append(
					PlayerItem.EMOJI_QUANTITY
				),
				$("<th>", { title: t('Adicionar ao jogador') }).append(
					Item.EMOJI_ADD
				),
				$("<th>", { title: t('Detalhes') }).append(
					Item.EMOJI_VISUALIZE
				)
			)
		);

		items.forEach(function (item) {
			listPlayerItemTable.append(
				$("<tr>").append(
					$("<td>").append(
						item['name'],
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + item['id']),
							disabled: 'disabled',
							value: item['type']
						})
					),
					$("<td>").append(
						weightHuman(item['weight']),
						$("<input>", {
							type: 'hidden',
							id: me.createId('weight_' + item['id']),
							disabled: 'disabled',
							value: item['weight']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							width: inputWidth,
							id: me.createId('quantity_' + item['id']),
							value: 1
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('add_' + item['id']),
							onclick: 'AddPlayerItem.addPlayerItem("' + playerId + '", "' + item['id'] + '", "' + boxId + '", "' + originBoxId + '")',
							value: Item.EMOJI_ADD
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('visualize_' + item['id']),
							onclick: 'ListItems.visualizeItem("' + item['id'] + '", "' + boxId + '")',
							value: Item.EMOJI_VISUALIZE
						})
					)
				)
			);
		});

		return listPlayerItemTable;
	}

	// adicionar o item ao inventario do jogador
	static addPlayerItem (playerId, itemId, boxId, originBoxId = null) {

		let me = Box.getBox(boxId);

		let quantity = parseInt($('#' + me.createId('quantity_' + itemId)).val());
		let addButton = $('#' + me.createId('add_' + itemId));

		let newPlayerItem = new PlayerItem({
			'playerId': playerId,
			'itemId': itemId,
			'quantity': quantity
		});

		let resultSaved = newPlayerItem.addPlayerItem();

		if (resultSaved) {

			addButton.attr('disabled', 'disabled');
			addButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			// atualizar listagem da dialog que originou essa dialog
			if (originBoxId) {
				let originBox = Box.getBox(originBoxId);
				originBox.listItems(playerId);
			}

		} else {

			addButton.val('😟'); // :(
			addButton.attr('disabled', 'disabled');
			addButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
			addButton.val(Item.EMOJI_ADD);
		}
	}

	// abrir visualização da adição dos items do player
	static visualizeItems (playerId, originBoxId) {

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];

		let windowTitle = Item.EMOJI_ADD + ' ' + playerName;

		let options = {
			playerId: playerId,
			originBoxId: originBoxId,
			singleTon: true,
			windowId: AddPlayerItem.windowName + '_' + playerId
		};

		Box.openDialog(AddPlayerItem.windowName, windowTitle, options);
	}

}

Box.boxes[AddPlayerItem.windowName] = AddPlayerItem;
