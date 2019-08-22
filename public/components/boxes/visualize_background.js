class VisualizeBackground extends Box {

	static get windowName () { return 'visualize_background' };

	boxContent (options = {}) {

		let me = this;

		let backgroundId = options['backgroundId'] || null;

		let originBoxId = options['originBoxId'] || '';

		let boxId = me.boxId;

		let background = Background.getBackground(backgroundId);

		let backgroundName = '';
		let backgroundDescription = '';

		if (background) {
			backgroundId = background['id'];
			backgroundName = background['name'];
			backgroundDescription = background['description'];
		}

		let addBackgroundDiv = $('<div>', {
			id: me.createId('background_div')
		});

		addBackgroundDiv.append(
			$('<table>').append(

				$('<tr>').append(
					$('<th>').append(
						Background.EMOJI_NAME + ' ' + t('Nome') + '*'
					),
					$('<td>').append(
						$('<input>', {
							type: 'hidden',
							id: me.createId('background_id'),
							value: backgroundId
						}),
						$("<input>", {
							type: 'text',
							id: me.createId('background_name'),
							value: backgroundName
						})
					)
				),

				$('<tr>').append(
					$('<th>').append(
						Background.EMOJI_DESCRIPTION + ' ' + t('Descrição')
					),
					$('<td>').append(
						$('<textarea>', {
							id: me.createId('background_description'),
							width: '100%',
							lines: 3
						}).html(backgroundDescription)
					)
				),

				$('<tr>').append(
					$('<th>', { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('save_background'),
							onclick: 'VisualizeBackground.addBackground("' + boxId + '", "' + originBoxId + '")',
							value: t('Salvar')
						})
					)
				)
			)
		);

		return addBackgroundDiv;
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Inserir um antecedente nessa aventura')
			),
			$('<p>').append(
				t('<b>Legendas:</b>')
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s Nome:</b> nome do antecedente.'), Background.EMOJI_NAME)
				),
				$('<li>').append(
					sprintf(t('<b>%s Descrição:</b> Breve descrição do que faz e a ideia.'), Background.EMOJI_DESCRIPTION)
				)
			),
		];
	}


	// salvar pericia
	static addBackground (boxId, originBoxId = null) {

		let me = Box.getBox(boxId);

		let backgroundId = parseInt($('#' + me.createId('background_id')).val() || 0);
		let backgroundName = $('#' + me.createId('background_name')).val();
		let backgroundDescription = $('#' + me.createId('background_description')).val();

		let background = new Background({
			'name': backgroundName,
			'description': backgroundDescription,
			'isGlobal': false
		});

		// caso esteja editando
		if (backgroundId) {
			background['id'] = backgroundId;
		}

		console.log('backgroundId', backgroundId);
		console.log('background', background);

		let resultSaved = background.saveBackground();

		let saveButton = $('#' + me.createId('save_background'));

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

	// abrir visualização de detalhes da pericia
	static visualizeBackground (backgroundId, originBoxId) {

		let background = Background.getBackground(backgroundId);

		let backgroundName = background['name'];

		let windowTitle = Background.EMOJI_MAIN + ' ' + backgroundName;

		let options = {
			backgroundId: backgroundId,
			singleTon: true,
			originBoxId: originBoxId,
			windowId: VisualizeBackground.windowName + '_' + backgroundId
		};

		Box.openDialog(VisualizeBackground.windowName, windowTitle, options);
	}

}

Box.boxes[VisualizeBackground.windowName] = VisualizeBackground;
