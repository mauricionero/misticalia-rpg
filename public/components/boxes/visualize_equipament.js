class VisualizeEquipament extends Box {

	static get windowName () { return 'visualize_equipament' };

	boxContent (options) {

		let me = this;
		
		let boxId = me.boxId;

		let equipamentId = options['equipamentId'];
		this.equipamentId = equipamentId;

		let equipament = Equipament.getEquipament(equipamentId);

		let equipamentTypeId = equipament['typeId'];
		let equipamentName = equipament['name'];
		let equipamentWeight = equipament['weight'];

		let divEditEquipament = $('<div>');

		let formEditEquipament = $('<form>', { id: me.createId('form') });
		
		let radioButtonTypes = [];

		Object.keys(Equipament.EMOJI_TYPES).forEach(function(key, index) {

			radioButtonTypes.push(
				$('<label>', { title: t(Equipament.getTypeName(key)) } ).append(
					$('<input>', {
						type: 'radio',
						class: 'radio_equipament_type',
						name: me.createId('equipament_type'),
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
							id: me.createId('name'),
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
							id: me.createId('weight'),
							placeholder: t('Peso em gramas'),
							value: equipamentWeight
						})
					)
				),

				$('<tr>').append(
					$('<th>' ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('modifier_form_button'),
							title: t('Adicionar modificador'),
							onclick: 'VisualizeEquipament.newFormModifier("' + equipamentId + '", "' + boxId + '")',
							value: '+ ' + t('Modificador')
						})
					),
					$('<th>' ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('save'),
							title: t('Salvar modificações'),
							onclick: 'VisualizeEquipament.updateEquipament("' + equipamentId + '", "' + boxId + '")',
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
						name: me.createId('modifier_type'),
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
			id: me.createId('equipament_modifiers_' + equipamentId),
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
							id: me.createId('modifier_value')
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
							id: me.createId('modifier_observations')
						})
					)
				),

				$('<tr>').append(
					$('<th>', { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('modifier_save'),
							onclick: 'VisualizeEquipament.addModifier("' + equipamentId + '", "' + boxId + '")',
							value: t('Adicionar')
						})
					)
				)
			)
		);

		let listEquipamentModifierDiv = $('<div>', {
			id: me.createId('equipament_modifiers_list_' + equipamentId)
		});

		divEditEquipament.append(
			formEditEquipament,
			'<br />',
			addEquipamentModifiersDiv,
			listEquipamentModifierDiv
		);

		return divEditEquipament;
	}

	// executa após printar a janela
	callBackRender () {
		
		let boxId = this.boxId;

		let equipamentId = this.equipamentId;

		this.listModifiers(equipamentId);
	}

	// salvar modificações do equipamento
	static updateEquipament (equipamentId, boxId) {

		let me = Box.getBox(boxId);

		let equipamentType = $("input[name='" + me.createId('equipament_type') + "']:checked").val();
		let equipamentName = $('#' + me.createId('name')).val();
		let equipamentWeight = $('#' + me.createId('weight')).val();

		let editEquipament = {
			'id': equipamentId, // identificar o registro a ser editado
			'typeId': equipamentType,
			'name': equipamentName,
			'weight': equipamentWeight
		}

		let resultSaved = Equipament.saveEquipament(editEquipament);

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
			saveButton.val(Equipament.EMOJI_ADD);
		}
	}

	// abrir formulario de novo modificador no equipamento
	static newFormModifier (equipamentId, boxId) {

		let me = Box.getBox(boxId);

		$('#' + me.createId('equipament_modifiers_' + equipamentId)).slideToggle();
	}

	// adicionar modificador ao equipamento
	static addModifier (equipamentId, boxId) {

		let me = Box.getBox(boxId);

		let modifierType = $("input[name='" + me.createId('modifier_type') + "']:checked").val();
		let modifierValue = $('#' + me.createId('modifier_value')).val();
		let modifierObservations = $('#' + me.createId('modifier_observations')).val();

		let newModifier = {
			'equipamentId': equipamentId,
			'typeId': modifierType,
			'value': modifierValue,
			'observations': modifierObservations
		}

		let resultSaved = Modifier.saveModifier(newModifier);

		let saveButton = $('#' + me.createId('modifier_save'));

		//TODO: atualizar os players que estiverem usando esse equipamento com os modificadores...

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			me.listModifiers(equipamentId);

		} else {

			saveButton.val('😟'); // :(
			saveButton.attr('disabled', 'disabled');
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
			saveButton.val(t('Adicionar'));
		}
	}

	// atualizar lista de modificadores quando precisar
	listModifiers (equipamentId) {

		let me = this;
		
		let allModifiers = Modifier.getAllModifiers(equipamentId);

		let listEquipamentModifiersDiv = $('#' + me.createId('equipament_modifiers_list_' + equipamentId));

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

Box.boxes[VisualizeEquipament.windowName] = VisualizeEquipament;
