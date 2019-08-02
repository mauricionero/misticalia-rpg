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
						Equipament.EMOJI_TYPE + ' ' + t('Tipo')
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
					$('<th>', { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('save'),
							onclick: 'AddEquipament.addEquipament("' + boxId + '")',
							value: t('Adicionar equipamento')
						})
					)
				)
			)
		);

		divAddEquipament.append(formAddEquipament);

		return divAddEquipament;
	}

	// adicionar equipamento à aventura
	static addEquipament (boxId) {

		let me = Box.getBox(boxId);

		let equipamentType = $("input[name='" + me.createId('equipament_type') + "']:checked").val();
		let equipamentName = $('#' + me.createId('name')).val();
		let equipamentWeight = $('#' + me.createId('weight')).val();

		let newEquipament = new Equipament({
			'typeId': equipamentType,
			'name': equipamentName,
			'weight': equipamentWeight
		});

		let resultSaved = newEquipament.saveEquipament();

		let saveButton = $('#' + me.createId('save'));

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled','disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			//TODO: apos salvar, abrir dialog dos detalhes desse equipamento ou dar um jeito de usar a propria visualização para adicioanr um novo

		} else {

			saveButton.val(t('Adicionar equipamento'));
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}

}

Box.boxes[AddEquipament.windowName] = AddEquipament;
