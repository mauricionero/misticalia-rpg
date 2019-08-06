class ListPlayerItems extends Box {

	static get windowName () { return 'list_player_items' };

	boxContent (options = {}) {

		let me = this;

		let playerId = options['playerId'];
		this.playerId = playerId;

		let listItemDiv = $('<div>', {
			id: me.createId('list_items_' + playerId)
		});

		return listItemDiv;
	}

	// executa após printar a janela
	callBackRender () {
		let playerId = this.playerId;
		
		this.listItems(playerId);
	}

	// atualizar lista de items quando precisar
	listItems (playerId) {

		let me = this;
		
		let boxId = me.boxId;

		let listItemDiv = $('#' + me.createId('list_items_' + playerId));

		let allPlayerItems = PlayerItem.getAllPlayerItems(playerId);

		let currentAdventureRoleId = Adventure.getCurrentAdventureRole();

		// apagar conteudo antes de inserir
		listItemDiv.html('');

		let listItemTable = $("<table>");

		// titulo das colunas na tabela
		listItemTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Quantidade') }).append(
					PlayerItem.EMOJI_QUANTITY
				),
				$("<th>", { title: t('Nome') }).append(
					Item.EMOJI_NAME
				),
				$("<th>", { title: t('Peso') }).append(
					Item.EMOJI_WEIGHT
				),
				$("<th>", { title: t('Usar') }).append(
					PlayerItem.EMOJI_USE
				)
			)
		);

		allPlayerItems.forEach(function (playerItem) {

			let itemId = playerItem['itemId'];
			let quantity = playerItem['quantity'];

			// criar filtro de item
			let options = { 'filters': { 'id': itemId } }
			let item = Item.getAll(options)[0];

			listItemTable.append(
				$("<tr>").append(
					$("<td>").append(
						quantity,
						$("<input>", {
							type: 'hidden',
							id: me.createId('quantity_' + item['id']),
							disabled: 'disabled',
							value: quantity
						})
					),
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
							id: me.createId('item_use_' + item['id']),
							title: sprintf(t("Usar 1 '%s' nesse personagem"), item['name']),
							onclick: 'ListPlayerItems.useItem("' + playerItem['id'] + '", "' + boxId + '")',
							value: PlayerItem.EMOJI_USE
						})
					)
				)
			)

		});
		
		// se for mestre, pode incluir item no inventario
		if (currentAdventureRoleId == Adventure.ROLE_MASTER) {
			listItemTable.append(
				$("<tr>").append(
					$("<th>", { colspan: 4 } ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('manage_item_' + playerId),
							title: t('Adicionar item ao inventário desse personagem'),
							onclick: 'AddPlayerItem.visualizeItems("' + playerId + '", "' + boxId + '")',
							value: Item.EMOJI_ADD + ' ' + t('Add item')
						})
					)
				)
			);
		}

		listItemDiv.append(
			listItemTable
		);
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Listagem dos itens do personagem')
			),
			$('<p>').append(
				t('<b>Legendas:</b> (basta deixar o mouse em cima de cada icone para aparecer o que significam)')
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s Quantidade:</b> desse item no inventário'), PlayerItem.EMOJI_QUANTITY)
				),
				$('<li>').append(
					sprintf(t('<b>%s Nome</b> desse item'), Item.EMOJI_NAME)
				),
				$('<li>').append(
					sprintf(t('<b>%s Peso</b> desse item'), Item.EMOJI_WEIGHT)
				),
				$('<li>').append(
					sprintf(t('<b>%s Usar</b> 1 unidade desse item'), PlayerItem.EMOJI_USE)
				)
			)
		];
	}


	// abrir visualização dos items do player
	static visualizePlayerItems (playerId) {

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];

		let windowTitle = PlayerItem.EMOJI_VISUALIZE + ' ' + playerName;

		let options = {
			playerId: playerId,
			singleTon: true,
			windowId: ListPlayerItems.windowName + '_' + playerId
		};

		Box.openDialog(ListPlayerItems.windowName, windowTitle, options);
	}

	// usar 1 item no personagem
	static useItem  (playerItemId, boxId) {

		let me = Box.getBox(boxId);

		let playerItem = PlayerItem.getPlayerItem(playerItemId);

		console.log('playerItem', playerItem);

		let resultSaved = playerItem.useItem();

		if (resultSaved) {

			me.callBackRender();
		}
	}

}

Box.boxes[ListPlayerItems.windowName] = ListPlayerItems;
