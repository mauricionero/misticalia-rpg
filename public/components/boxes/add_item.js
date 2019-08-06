class AddItem extends Box {

	static get windowName () { return 'add_item' };

	boxContent () {

		let me = this;
		
		let boxId = me.boxId;

		let divAddItem = $('<div>');

		let formAddItem = $('<form>', {
			id: me.createId('form')
		});

		formAddItem.append(
			$('<table>').append(

				$('<tr>').append(
					$('<th>').append(
						Item.EMOJI_NAME + ' ' + t('Nome') + '*'
					),
					$('<td>').append(
						$("<input>", {
							type: 'hidden',
							id: me.createId('item_id'),
							disabled: 'disabled',
							value: 0
						}),
						$("<input>", {
							type: 'text',
							id: me.createId('name'),
							placeholder: t('Nome do item')
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Item.EMOJI_WEIGHT + ' ' + t('Peso')
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('weight'),
							placeholder: t('Peso em gramas')
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Item.EMOJI_DESCRIPTION + ' ' + t('Descrição')
					),
					$('<td>').append(
						$("<textarea>", {
							type: 'text',
							id: me.createId('description'),
							placeholder: t('Utilidade'),
							width: '100%',
							lines: 2
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						$("<input>", {
							type: 'button',
							id: me.createId('modifier_form_button'),
							title: t('Adicionar modificador'),
							onclick: 'AddItem.addModifiers("' + boxId + '")',
							style: 'display: none',
							value: '+ ' + t('Modificador')
						})
					),
					$('<th>').append(
						$("<input>", {
							type: 'button',
							id: me.createId('save'),
							onclick: 'AddItem.addItem("' + boxId + '")',
							value: t('Adicionar')
						})
					)
				)
			)
		);

		divAddItem.append(formAddItem);

		return divAddItem;
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Adicionar um novo item à aventura')
			)
		];
	}


	// abrir janela de visualizar o item para adicionar os modificadores
	static addModifiers (boxId) {

		let me = Box.getBox(boxId);

		let itemName = $('#' + me.createId('name')).val();
		let itemId = $('#' + me.createId('item_id')).val();

		let windowTitle = Item.EMOJI_MAIN + ' ' + itemName;

		let options = {
			itemId: itemId,
			singleTon: true,
			addModifierOpened: true,
			windowId: VisualizeItem.windowName + '_' + itemId
		};

		Box.openDialog(VisualizeItem.windowName, windowTitle, options);

		$('#' + me.dialogId).dialog('close');
		$('#' + me.dialogId).remove();
	}

	// adicionar item à aventura
	static addItem (boxId) {

		let me = Box.getBox(boxId);

		let itemName = $('#' + me.createId('name')).val();
		let itemWeight = $('#' + me.createId('weight')).val();
		let itemDescription = $('#' + me.createId('description')).val();

		let newItem = new Item({
			'name': itemName,
			'weight': itemWeight,
			'description': itemDescription
		});

		let resultSaved = newItem.saveItem();

		let saveButton = $('#' + me.createId('save'));

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled','disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			let addModifierButton = $('#' + me.createId('modifier_form_button'));
			addModifierButton.slideToggle();

			let itemIdInput = $('#' + me.createId('item_id'));
			itemIdInput.val(resultSaved['id']);

		} else {

			saveButton.val(t('Adicionar item'));
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}

}

Box.boxes[AddItem.windowName] = AddItem;
