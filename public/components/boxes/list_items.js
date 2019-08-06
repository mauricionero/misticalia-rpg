class ListItems extends Box {

	static get windowName () { return 'list_items' };

	boxContent (options = {}) {

		let me = this;
		
		let boxId = me.boxId;

		let allItems = [];

		// filtrar se eh npc ou nao
		let optionFilter = {
			'order': {
				'typeId': 'ASC',
				'name': 'ASC'
			}
		}

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allItems = Item.getAllItemsCurrentAdventure(optionFilter);
		} else {
			allItems = Item.getAllItems(optionFilter);
		}

		let listItemDiv = $('<div>');

		let listItemTable = $("<table>");

		// titulo das colunas na tabela
		listItemTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Nome') }).append(
					Item.EMOJI_NAME
				),
				$("<th>", { title: t('Peso') }).append(
					Item.EMOJI_WEIGHT
				),
				$("<th>", { title: t('Detalhes') }).append(
					Item.EMOJI_VISUALIZE
				)
			)
		);

		allItems.forEach(function (item) {
			
			listItemTable.append(
				$("<tr>").append(
					$("<td>").append(
						item['name'],
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + item['id']),
							disabled: 'disabled',
							value: item['name']
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
							type: 'button',
							id: me.createId('visualize_' + item['id']),
							onclick: 'ListItems.visualizeItem("' + item['id'] + '", "' + boxId + '")',
							value: Item.EMOJI_VISUALIZE
						})
					)
				)
			)
		});

		listItemDiv.html(listItemTable);

		return listItemDiv;
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Listar itemos da aventura')
			),
			sprintf(t('Para ver os modificadores de um itemo, clique em <b>%s</b>'), Item.EMOJI_VISUALIZE)
		];
	}


	// abrir visualização de detalhes do itemo
	static visualizeItem (itemId, boxId) {

		let me = Box.getBox(boxId);

		let itemName = $('#' + me.createId('name_' + itemId)).val();

		// se nao estiver preenchido, eh pq provavelmente nao veio dessa dialog, buscar da localStorage
		if (itemName == undefined) {
			let item = Item.getItem(itemId);

			itemName = item['name'];
		}

		let windowTitle = Item.EMOJI_MAIN + ' ' + itemName;

		let options = {
			itemId: itemId,
			singleTon: true,
			windowId: VisualizeItem.windowName + '_' + itemId
		};

		Box.openDialog(VisualizeItem.windowName, windowTitle, options);
	}

}

Box.boxes[ListItems.windowName] = ListItems;
