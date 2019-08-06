class AddEquipament extends Box {

	static get windowName () { return 'add_equipament' };

	boxContent () {

		let me = this;
		
		let boxId = me.boxId;

		let divAddEquipament = $('<div>');

		let formAddEquipament = $('<form>', {
			id: me.createId('form')
		});

		let radioButtonTypes = [];

		Object.keys(Equipament.EMOJI_TYPES).forEach(function(key, index) {
			radioButtonTypes.push(
				$('<label>', { title: t(Equipament.getTypeName(key)) } ).append(
					$('<input>', {
						type: 'radio',
						class: 'radio_equipament_type',
						name: me.createId('equipament_type'),
						checked: (key == 1),
						value: key
					}),
					$('<span>').append(
						Equipament.EMOJI_TYPES[key]
					),
					' '
				)
			);
		});

		// titulo das colunas na tabela
		formAddEquipament.append(
			$('<table>').append(
				$('<tr>').append(
					$('<th>').append(
						Equipament.EMOJI_TYPE + ' ' + t('Tipo'),

						$("<input>", {
							type: 'hidden',
							id: me.createId('equipament_id'),
							disabled: 'disabled',
							value: 0
						})
					),
					$('<th>').append(
						radioButtonTypes
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Equipament.EMOJI_NAME + ' ' + t('Nome') + '*'
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('name'),
							placeholder: t('Nome do equipamento')
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Equipament.EMOJI_WEIGHT + ' ' + t('Peso')
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
						Equipament.EMOJI_DESCRIPTION + ' ' + t('Descrição')
					),
					$('<td>').append(
						$("<textarea>", {
							type: 'text',
							id: me.createId('description'),
							placeholder: t('Breve descrição'),
							width: '100%',
							lines: 3
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						$("<input>", {
							type: 'button',
							id: me.createId('modifier_form_button'),
							title: t('Adicionar modificador'),
							onclick: 'AddEquipament.addModifiers("' + boxId + '")',
							style: 'display: none',
							value: '+ ' + t('Modificador')
						})
					),
					$('<th>').append(
						$("<input>", {
							type: 'button',
							id: me.createId('save'),
							onclick: 'AddEquipament.addEquipament("' + boxId + '")',
							value: t('Adicionar')
						})
					)
				)
			)
		);

		divAddEquipament.append(formAddEquipament);

		return divAddEquipament;
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Adicionar um novo equipamento à aventura')
			),
			Equipament.helpTypeMeaning()
		];
	}


	// abrir janela de visualizar o equipamento para adicionar os modificadores
	static addModifiers (boxId) {

		let me = Box.getBox(boxId);

		let equipamentName = $('#' + me.createId('name')).val();
		let equipamentTypeId = $("input[name='" + me.createId('equipament_type') + "']:checked").val();
		let equipamentId = $('#' + me.createId('equipament_id')).val();

		let windowTitle = Equipament.EMOJI_TYPES[equipamentTypeId] + ' ' + equipamentName;

		let options = {
			equipamentId: equipamentId,
			singleTon: true,
			addModifierOpened: true,
			windowId: VisualizeEquipament.windowName + '_' + equipamentId
		};

		Box.openDialog(VisualizeEquipament.windowName, windowTitle, options);

		$('#' + me.dialogId).dialog('close');
		$('#' + me.dialogId).remove();
	}

	// adicionar equipamento à aventura
	static addEquipament (boxId) {

		let me = Box.getBox(boxId);

		let equipamentTypeId = $("input[name='" + me.createId('equipament_type') + "']:checked").val();
		let equipamentName = $('#' + me.createId('name')).val();
		let equipamentWeight = $('#' + me.createId('weight')).val();
		let equipamentDescription = $('#' + me.createId('description')).val();

		let newEquipament = new Equipament({
			'typeId': equipamentTypeId,
			'name': equipamentName,
			'weight': equipamentWeight,
			'description': equipamentDescription
		});

		let resultSaved = newEquipament.saveEquipament();

		let saveButton = $('#' + me.createId('save'));

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled','disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			let addModifierButton = $('#' + me.createId('modifier_form_button'));
			addModifierButton.slideToggle();

			let equipamentIdInput = $('#' + me.createId('equipament_id'));
			equipamentIdInput.val(resultSaved['id']);

		} else {

			saveButton.val(t('Adicionar equipamento'));
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}

}

Box.boxes[AddEquipament.windowName] = AddEquipament;
