class VisualizeItem extends Box {

	static get windowName () { return 'visualize_item' };

	boxContent (options) {

		let me = this;
		
		let boxId = me.boxId;

		let itemId = options['itemId'];
		this.itemId = itemId;

		let addModifierOpened = options['addModifierOpened'] || false;

		let item = Item.getItem(itemId);

		let itemName = item['name'];
		let itemWeight = item['weight'];
		let itemDescription = item['description'];

		let divEditItem = $('<div>');

		let formEditItem = $('<form>', { id: me.createId('form') });

		formEditItem.append(
			$('<table>').append(

				$('<tr>').append(
					$('<th>').append(
						Item.EMOJI_NAME + ' ' + t('Nome')
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('name'),
							placeholder: t('Nome do item'),
							value: itemName
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Item.EMOJI_WEIGHT + ' ' + t('Peso')
					),
					$('<td>').append(
						$("<input>", {
							type: 'number',
							id: me.createId('weight'),
							placeholder: t('Peso em gramas'),
							value: itemWeight
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
						}).html(itemDescription)
					)
				),

				$('<tr>').append(
					$('<th>' ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('modifier_form_button'),
							title: t('Adicionar modificador'),
							onclick: 'VisualizeItem.newFormModifier("' + itemId + '", "' + boxId + '")',
							value: '+ ' + t('Modificador')
						})
					),
					$('<th>' ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('save'),
							title: t('Salvar modificações'),
							onclick: 'VisualizeItem.updateItem("' + itemId + '", "' + boxId + '")',
							value: t('Salvar')
						})
					)
				)
			)
		);

		let radioButtonModifierTypes = [];

		Object.keys(InstantModifier.EMOJI_TYPES).forEach(function(key, index) {

			radioButtonModifierTypes.push(
				$('<label>', { title: t(InstantModifier.getTypeName(key)) } ).append(
					$('<input>', {
						type: 'radio',
						class: 'radio_modifier_type',
						name: me.createId('modifier_type'),
						value: key,
						checked: (key == 1) // selecionar o primeiro
					}),
					$('<span>').append(
						InstantModifier.EMOJI_TYPES[key]
					),
					' '
				)
			);
		});

		let modifierDefaultDisplay = 'none';
		if (addModifierOpened) {
			modifierDefaultDisplay = 'show';
		}

		let addItemModifiersDiv = $('<div>', {
			class: 'visualize_item_modifiers',
			id: me.createId('item_modifiers_' + itemId),
			style: 'display: ' + modifierDefaultDisplay,
		});

		addItemModifiersDiv.append(
			$('<table>').append(
				$('<tr>').append(
					$('<th>').append(
						InstantModifier.EMOJI_ADD + ' ' + t('Tipo')
					),
					$('<th>').append(
						radioButtonModifierTypes
					)
				),

				$('<tr>').append(
					$('<th>').append(
						InstantModifier.EMOJI_VALUE + ' ' + t('Valor')
					),
					$('<td>').append(
						$("<input>", {
							type: 'number',
							id: me.createId('modifier_value')
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						InstantModifier.EMOJI_OBSERVATIONS + ' ' + t('Notas')
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('modifier_observations')
						})
					)
				),

				$('<tr>').append(
					$('<th>', { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('modifier_save'),
							onclick: 'VisualizeItem.addModifier("' + itemId + '", "' + boxId + '")',
							value: t('Adicionar')
						})
					)
				)
			)
		);

		let listItemModifierDiv = $('<div>', {
			id: me.createId('item_modifiers_list_' + itemId)
		});

		divEditItem.append(
			formEditItem,
			'<br />',
			addItemModifiersDiv,
			listItemModifierDiv
		);

		return divEditItem;
	}
	

	// executa após printar a janela
	callBackRender () {
		
		let boxId = this.boxId;

		let itemId = this.itemId;

		this.listModifiers(itemId);
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Adicionar modificadores a um item')
			),
			sprintf(t('Para adicionar um modificador nesse item, clique em <b>+ Modificador</b>'), Item.EMOJI_VISUALIZE),
			InstantModifier.helpTypeMeaning(),
			$('<b>').append(
				t('Dica:')
			),
			$('<ul>').append(
				$('<li>').append(
					t('Leve sempre em conta o peso de um item para ter noção do quanto está carregando de peso.')
				)
			)
		];
	}


	// salvar modificações do item
	static updateItem (itemId, boxId) {

		let me = Box.getBox(boxId);

		let itemName = $('#' + me.createId('name')).val();
		let itemWeight = $('#' + me.createId('weight')).val();
		let itemDescription = $('#' + me.createId('description')).val();

		let editItem = Item.getItem(itemId);

		editItem['name'] = itemName;
		editItem['weight'] = itemWeight;
		editItem['description'] = itemDescription;

		let resultSaved = editItem.saveItem();

		let saveButton = $('#' + me.createId('save'));

		if (resultSaved) {

			saveButton.val(t('Salvo!'));
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			//TODO: quando salvar com sucesso, fazer com que a dialog de origem recarregue a lista

		} else {

			saveButton.val('😟'); // :(
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
			saveButton.val('Salvar');
		}
	}

	// abrir formulario de novo modificador no item
	static newFormModifier (itemId, boxId) {

		let me = Box.getBox(boxId);

		$('#' + me.createId('item_modifiers_' + itemId)).slideToggle();
	}

	// adicionar modificador ao item
	static addModifier (itemId, boxId) {

		let me = Box.getBox(boxId);

		let modifierType = $("input[name='" + me.createId('modifier_type') + "']:checked").val();
		let modifierValue = $('#' + me.createId('modifier_value')).val();
		let modifierObservations = $('#' + me.createId('modifier_observations')).val();

		let newModifier = new InstantModifier({
			'itemId': itemId,
			'typeId': modifierType,
			'value': modifierValue,
			'observations': modifierObservations
		});

		let resultSaved = newModifier.saveInstantModifier();

		let saveButton = $('#' + me.createId('modifier_save'));

		if (resultSaved) {

			saveButton.val(t('Salvo!'));
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			me.listModifiers(itemId);

		} else {

			saveButton.val(t('Salvar'));
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}

	// atualizar lista de modificadores quando precisar
	listModifiers (itemId) {

		let me = this;
		
		let allModifiers = InstantModifier.getAllInstantModifiers(itemId);

		let listItemModifiersDiv = $('#' + me.createId('item_modifiers_list_' + itemId));

		// apagar o conteudo antes de inserir um novo
		listItemModifiersDiv.html('');

		allModifiers.forEach(function (modifier) {
			
			listItemModifiersDiv.append(
				$("<table>").append(
					$("<tr>").append(
						$("<th>", { title: InstantModifier.ALL_TYPE_NAMES[modifier['typeId']] }).append(
							InstantModifier.EMOJI_TYPES[modifier['typeId']]
						),
						$("<td>").append(
							modifier['value']
						),
						$("<td>").append(
							modifier['observations']
						)
					)
				)
			)
		});
	}
}

Box.boxes[VisualizeItem.windowName] = VisualizeItem;
