class AddEquipament extends Box {

	static get windowName () { return 'add_equipament' };

	boxContent () {

		var randomId = Math.floor(Math.random() * 10000);

		let divAddEquipament = $('<div>');

		let formAddEquipament = $('<form>', { id: AddEquipament.windowName + '_form_' + randomId });

		let radioButtonTypes = [];

		Object.keys(Equipament.EMOJI_TYPES).forEach(function(key, index) {
			radioButtonTypes.push(
				$('<label>', { title: t(Equipament.getTypeName(key)) } ).append(
					$('<input>', {
						type: 'radio',
						class: 'radio_equipament_type',
						name: AddEquipament.windowName + '_equipament_type_' + randomId,
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
						Equipament.EMOJI_NAME + ' ' + t('Nome')
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: AddEquipament.windowName + '_name_' + randomId,
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
							id: AddEquipament.windowName + '_weight_' + randomId,
							placeholder: t('Peso em gramas')
						})
					)
				),

				$('<tr>').append(
					$('<th>', { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: AddEquipament.windowName + '_save_' + randomId,
							onclick: 'AddEquipament.addEquipament(' + randomId + ')',
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
	static addEquipament (randomId) {

		let equipamentType = $("input[name='" + AddEquipament.windowName + '_equipament_type_' + randomId + "']:checked").val();
		let equipamentName = $('#' + AddEquipament.windowName + '_name_' + randomId).val();
		let equipamentWeight = $('#' + AddEquipament.windowName + '_weight_' + randomId).val();

		let newEquipament = {
			'typeId': equipamentType,
			'name': equipamentName,
			'weight': equipamentWeight
		}

		let resultSaved = Equipament.addEquipament(newEquipament);

		let saveButton = $('#' + AddEquipament.windowName + '_save_' + randomId);

		//TODO: adicionar modificadores

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled','disabled');

		} else {

			saveButton.val(t('Erro :('));
		}
	}

}

boxes[AddEquipament.windowName] = AddEquipament;
