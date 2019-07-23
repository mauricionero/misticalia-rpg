class VisualizeEquipament extends Box {

	static get windowName () { return 'visualize_equipament' };

	boxContent (options) {
		var randomId = Math.floor(Math.random() * 10000);

		let equipamentId = options['equipamentId'];

		let equipament = Equipament.getEquipament(equipamentId);

		let equipamentTypeId = equipament['typeId'];
		let equipamentName = equipament['name'];
		let equipamentWeight = equipament['weight'];

		let divEditEquipament = $('<div>');

		let formEditEquipament = $('<form>', { id: VisualizeEquipament.windowName + '_form_' + randomId });
		
		let radioButtonTypes = [];

		Object.keys(Equipament.EMOJI_TYPES).forEach(function(key, index) {

			radioButtonTypes.push(
				$('<label>', { title: t(Equipament.getTypeName(key)) } ).append(
					$('<input>', {
						type: 'radio',
						class: 'radio_equipament_type',
						name: VisualizeEquipament.windowName + '_equipament_type_' + randomId,
						value: key,
						checked: (key == equipamentTypeId)
					}),
					$('<span>').append(
						Equipament.EMOJI_TYPES[key]
					),
					' '
				)
			);
		});

		formEditEquipament.append(
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
							id: VisualizeEquipament.windowName + '_name_' + randomId,
							placeholder: t('Nome do equipamento'),
							value: equipamentName
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
							id: VisualizeEquipament.windowName + '_weight_' + randomId,
							placeholder: t('Peso em gramas'),
							value: equipamentWeight
						})
					)
				),

				$('<tr>').append(
					$('<th>' ).append(
						$("<input>", {
							type: 'button',
							id: VisualizeEquipament.windowName + '_modifier_form_' + randomId,
							onclick: 'VisualizeEquipament.newFormModifier("' + equipamentId + '", ' + randomId + ')',
							value: Modifier.EMOJI_ADD + ' ' + t('Modificador')
						})
					),
					$('<th>' ).append(
						$("<input>", {
							type: 'button',
							id: VisualizeEquipament.windowName + '_save_' + randomId,
							title: t('Adicionar modificador'),
							onclick: 'VisualizeEquipament.updateEquipament("' + equipamentId + '", ' + randomId + ')',
							value: t('Salvar')
						})
					)
				)
			)
		);

		//TODO: adicionar modificadores igual ao adicionar o equipamento, inclusive com os radiobuttons para o atributo

		divEditEquipament.html(formEditEquipament);

		return divEditEquipament;
	}

	// salvar modificações do equipamento
	static updateEquipament (equipamentId, randomId) {

		let equipamentType = $("input[name='" + VisualizeEquipament.windowName + '_equipament_type_' + randomId + "']:checked").val();
		let equipamentName = $('#' + VisualizeEquipament.windowName + '_name_' + randomId).val();
		let equipamentWeight = $('#' + VisualizeEquipament.windowName + '_weight_' + randomId).val();

		let editEquipament = {
			'id': equipamentId, // identificar o registro a ser editado
			'typeId': equipamentType,
			'name': equipamentName,
			'weight': equipamentWeight
		}

		let resultSaved = Equipament.saveEquipament(editEquipament);

		let saveButton = $('#' + VisualizeEquipament.windowName + '_save_' + randomId);

		if (resultSaved) {

			saveButton.val(t('Salvo!'));
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

		} else {

			saveButton.val('😟'); // :(
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
			saveButton.val(Equipament.EMOJI_ADD);
		}
	}

	// abrir formulario de novo modificador no equipamento
	static newFormModifier (equipamentId, randomId) {
		$('#' + VisualizeEquipament.windowName + '_modifier_form_' + playerId + '_' + randomId).slideToggle();
	}
}

boxes[VisualizeEquipament.windowName] = VisualizeEquipament;
