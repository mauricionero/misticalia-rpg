class VisualizeEquipament extends Box {

	static get windowName () { return 'visualize_equipament' };

	boxContent (options) {
		var randomId = Math.floor(Math.random() * 10000);
		this.randomId = randomId;

		let equipamentId = options['equipamentId'];
		this.equipamentId = equipamentId;

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
							type: 'number',
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
							id: VisualizeEquipament.windowName + '_modifier_form_button_' + randomId,
							title: t('Adicionar modificador'),
							onclick: 'VisualizeEquipament.newFormModifier("' + equipamentId + '", ' + randomId + ')',
							value: '+ ' + t('Modificador')
						})
					),
					$('<th>' ).append(
						$("<input>", {
							type: 'button',
							id: VisualizeEquipament.windowName + '_save_' + randomId,
							title: t('Salvar modificações'),
							onclick: 'VisualizeEquipament.updateEquipament("' + equipamentId + '", ' + randomId + ')',
							value: t('Salvar')
						})
					)
				)
			)
		);

		let radioButtonModifierTypes = [];

		Object.keys(Modifier.EMOJI_TYPES).forEach(function(key, index) {

			radioButtonModifierTypes.push(
				$('<label>', { title: t(Modifier.getTypeName(key)) } ).append(
					$('<input>', {
						type: 'radio',
						class: 'radio_modifier_type',
						name: VisualizeEquipament.windowName + '_modifier_type_' + randomId,
						value: key,
						checked: (key == 1) // selecionar o primeiro
					}),
					$('<span>').append(
						Modifier.EMOJI_TYPES[key]
					),
					' '
				)
			);
		});

		let addEquipamentModifiersDiv = $('<div>', {
			class: 'visualize_equipament_modifiers',
			id: VisualizeEquipament.windowName + '_equipament_modifiers_' + equipamentId + '_' + randomId,
			style: 'display: none',
		});

		addEquipamentModifiersDiv.append(
			$('<table>').append(
				$('<tr>').append(
					$('<th>').append(
						Modifier.EMOJI_ADD + ' ' + t('Tipo')
					),
					$('<th>').append(
						radioButtonModifierTypes
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Modifier.EMOJI_VALUE + ' ' + t('Valor')
					),
					$('<td>').append(
						$("<input>", {
							type: 'number',
							id: VisualizeEquipament.windowName + '_modifier_value_' + randomId
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Modifier.EMOJI_OBSERVATIONS + ' ' + t('Notas')
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: VisualizeEquipament.windowName + '_modifier_observations_' + randomId
						})
					)
				),

				$('<tr>').append(
					$('<th>', { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: VisualizeEquipament.windowName + '_modifier_save_' + randomId,
							onclick: 'VisualizeEquipament.addModifier("' + equipamentId + '", ' + randomId + ')',
							value: t('Adicionar')
						})
					)
				)
			)
		);

		let listEquipamentModifierDiv = $('<div>', {
			id: VisualizeEquipament.windowName + '_equipament_modifiers_list_' + equipamentId + '_' + randomId
		});

		divEditEquipament.append(
			formEditEquipament,
			'<br />',
			addEquipamentModifiersDiv,
			'<br />',
			listEquipamentModifierDiv
		);

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
		console.log('equipamentId', equipamentId);
		console.log('randomId', randomId);
		$('#' + VisualizeEquipament.windowName + '_equipament_modifiers_' + equipamentId + '_' + randomId).slideToggle();
	}

	// adicionar modificador ao equipamento
	static addModifier (equipamentId, randomId) {

		let modifierType = $("input[name='" + VisualizeEquipament.windowName + '_modifier_type_' + randomId + "']:checked").val();
		let modifierValue = $('#' + VisualizeEquipament.windowName + '_modifier_value_' + randomId).val();
		let modifierObservations = $('#' + VisualizeEquipament.windowName + '_modifier_observations_' + randomId).val();

		let newModifier = {
			'equipamentId': equipamentId,
			'typeId': modifierType,
			'value': modifierValue,
			'observations': modifierObservations
		}

		let resultSaved = Modifier.saveModifier(newModifier);

		let saveButton = $('#' + VisualizeEquipament.windowName + '_modifier_save_' + randomId);

		//TODO: adicionar modificadores

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			VisualizeEquipament.listModifiers(equipamentId, randomId);

		} else {

			saveButton.val('😟'); // :(
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
			saveButton.val(t('Adicionar'));
		}
	}

	// executa após printar a janela
	callBackRender () {
		let randomId = this.randomId;
		let equipamentId = this.equipamentId;

		VisualizeEquipament.listModifiers(equipamentId, randomId);
	}

	// atualizar lista de modificadores quando precisar
	static listModifiers (equipamentId, randomId) {
		
		let allModifiers = Modifier.getAllModifiers(equipamentId);

		let listEquipamentModifiersDiv = $('#' + VisualizeEquipament.windowName + '_equipament_modifiers_list_' + equipamentId + '_' + randomId);

		// apagar o conteudo antes de inserir um novo
		listEquipamentModifiersDiv.html('');

		allModifiers.forEach(function (modifier) {
			
			listEquipamentModifiersDiv.append(
				$("<table>").append(
					$("<tr>").append(
						$("<th>", { title: Modifier.ALL_TYPE_NAMES[modifier['typeId']] }).append(
							Modifier.EMOJI_TYPES[modifier['typeId']]
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

boxes[VisualizeEquipament.windowName] = VisualizeEquipament;
