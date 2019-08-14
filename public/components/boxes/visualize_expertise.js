class VisualizeExpertise extends Box {

	static get windowName () { return 'visualize_expertise' };

	boxContent (options = {}) {

		let me = this;

		let expertiseId = options['expertiseId'] || null;

		let originBoxId = options['originBoxId'] || '';
		this.originBoxId = originBoxId;

		let boxId = me.boxId;

		let expertise = Expertise.getExpertise(expertiseId);

		let expertiseName = '';
		let expertiseMultiplier = '';
		let expertiseDescription = '';
		let expertiseRule = '';
		let attributeId = 1; // selecionar o primeiro por default
		let attributeName = '';

		console.log('expertise', expertise);

		if (expertise) {
			expertiseId = expertise['id'];
			expertiseName = expertise['name'];
			expertiseMultiplier = expertise['multiplier'];
			expertiseDescription = expertise['description'];
			expertiseRule = expertise['rule'];

			attributeId = expertise['attributeId'];
			attributeName = Modifier.ALL_TYPE_NAMES[attributeId];
		}

		let radioButtonAttributeTypes = [];

		Object.keys(Player.ALL_ATTRIBUTES_TYPES).forEach(function(key, index) {

			radioButtonAttributeTypes.push(
				$('<label>', { title: t(Modifier.getTypeName(key)) } ).append(
					$('<input>', {
						type: 'radio',
						class: 'radio_attribute_type',
						name: me.createId('attribute_type'),
						value: key,
						checked: (key == attributeId)
					}),
					$('<span>').append(
						Modifier.EMOJI_TYPES[key]
					),
					' '
				)
			);
		});

		let addExpertiseDiv = $('<div>', {
			id: me.createId('expertise_div')
		});

		addExpertiseDiv.append(
			$('<table>').append(
				$('<tr>').append(
					$('<th>').append(
						Expertise.EMOJI_ATTRIBUTE + ' ' + t('Atributo')
					),
					$('<th>').append(
						radioButtonAttributeTypes,

						$('<input>', {
							type: 'hidden',
							id: me.createId('expertise_id'),
							value: expertiseId
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Expertise.EMOJI_NAME + ' ' + t('Nome')
					),
					$('<td>').append(
						$("<input>", {
							type: 'text',
							id: me.createId('expertise_name'),
							value: expertiseName
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Expertise.EMOJI_MULTIPLIER + ' ' + t('Multiplicador')
					),
					$('<td>').append(
						$("<input>", {
							type: 'number',
							id: me.createId('expertise_multiplier'),
							value: expertiseMultiplier
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Expertise.EMOJI_DESCRIPTION + ' ' + t('Descrição')
					),
					$('<td>').append(
						$('<textarea>', {
							id: me.createId('expertise_description'),
							width: '100%',
							lines: 3
						}).html(expertiseDescription)
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Expertise.EMOJI_RULE + ' ' + t('Regra')
					),
					$('<td>').append(
						$('<textarea>', {
							id: me.createId('expertise_rule'),
							width: '100%',
							lines: 3
						}).html(expertiseRule)
					)
				),

				$('<tr>').append(
					$('<th>', { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('save_expertise'),
							onclick: 'VisualizeExpertise.addExpertise("' + boxId + '", "' + originBoxId + '")',
							value: t('Salvar')
						})
					)
				)
			)
		);

		return addExpertiseDiv;
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Inserir uma perícia nessa aventura')
			),
			$('<p>').append(
				t('<b>Legendas:</b>')
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s Atributo:</b> Atributo que será relacionado a essa perícia.'), Expertise.EMOJI_ATTRIBUTE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Nome:</b> nome da perícia.'), Expertise.EMOJI_NAME)
				),
				$('<li>').append(
					sprintf(t('<b>%s Multiplicador:</b> O quanto irá multiplicar com o atributo relacionado. Costuma ficar entre 0,1 (10%) e 0,5 (50%).'), Expertise.EMOJI_MULTIPLIER)
				),
				$('<li>').append(
					sprintf(t('<b>%s Descrição:</b> Breve descrição do que faz e a ideia.'), Expertise.EMOJI_DESCRIPTION)
				),
				$('<li>').append(
					sprintf(t('<b>%s Regras:</b> Como funciona e como usar.'), Expertise.EMOJI_RULE)
				)
			),
		];
	}


	// salvar pericia
	static addExpertise (boxId, originBoxId = null) {

		let me = Box.getBox(boxId);

		let expertiseId = parseInt($('#' + me.createId('expertise_id')).val() || 0);
		let expertiseAttributeId = $("input[name='" + me.createId('attribute_type') + "']:checked").val();
		let expertiseName = $('#' + me.createId('expertise_name')).val();
		let expertiseMultiplier = $('#' + me.createId('expertise_multiplier')).val();
		let expertiseDescription = $('#' + me.createId('expertise_description')).val();
		let expertiseRule = $('#' + me.createId('expertise_rule')).val();

		let expertise = new Expertise({
			'name': expertiseName,
			'attributeId': expertiseAttributeId,
			'multiplier': expertiseMultiplier,
			'description': expertiseDescription,
			'rule': expertiseRule,
			'isGlobal': false
		});

		// caso esteja editando
		if (expertiseId) {
			expertise['id'] = expertiseId;
		}

		let resultSaved = expertise.saveExpertise();

		let saveButton = $('#' + me.createId('save_expertise'));

		if (resultSaved) {

			saveButton.val(t('Salvo'));
			saveButton.attr('disabled','disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			// atualizar listagem da dialog que originou essa dialog
			if (originBoxId) {
				let originBox = Box.getBox(originBoxId);
				originBox.callBackRender();
			}

		} else {

			saveButton.val(t('Salvar'));
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}

	// abrir visualização de detalhes do expertise
	static visualizeExpertise (expertiseId, originBoxId) {

		let expertise = Expertise.getExpertise(expertiseId);

		// se nao estiver preenchido, eh pq provavelmente nao veio dessa dialog, buscar da localStorage
		if (! expertise) {
			expertise = Expertise.getExpertise(expertiseId);
		}

		let expertiseTitle = expertise['title'];

		let windowTitle = Expertise.EMOJI_VISUALIZE + ' ' + expertiseTitle;

		let options = {
			expertiseId: expertiseId,
			singleTon: true,
			originBoxId: originBoxId,
			windowId: VisualizeExpertise.windowName + '_' + expertiseId
		};

		Box.openDialog(VisualizeExpertise.windowName, windowTitle, options);
	}

}

Box.boxes[VisualizeExpertise.windowName] = VisualizeExpertise;
