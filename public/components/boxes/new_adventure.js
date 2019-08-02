class NewAdventure extends Box {

	static get windowName () { return 'new_adventure' };

	boxContent () {

		let me = this;
		
		let boxId = me.boxId;

		let formNewAdventure = $("<form>", { id: me.createId('form') });

		// titulo das colunas na tabela
		formNewAdventure.append(
			$("<table>").append(
				$("<tr>").append(
					$("<th>").append(
						Adventure.EMOJI_NAME + ' ' + t('Nome')
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('name'),
							placeholder: t('Mundo fantástico')
						})
					)
				),
				$("<tr>").append(
					$("<th>", { title: t('Estilo de mundo') }).append(
						Adventure.EMOJI_WORLD_STYLE + ' ' + t('Estilo')
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('style'),
							placeholder: t('Fantasia')
						})
					)
				),
				$("<tr>").append(
					$("<th>", { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: me.createId('save'),
							onclick: 'NewAdventure.saveAdventure("' + boxId + '")',
							value: t('Criar')
						})
					)
				)
			)
		);

		return formNewAdventure;
	}

	// salvar aventura
	static saveAdventure (boxId) {

		let me = Box.getBox(boxId);

		let adventureName = $('#' + me.createId('name')).val();
		let adventureStyle = $('#' + me.createId('style')).val();

		let newAdventure = new Adventure({
			'name': adventureName,
			'style': adventureStyle
		});

		let resultSaved = newAdventure.newAdventure();
		let saveButton = $('#' + me.createId('save'));

		if (resultSaved) {

			saveButton.val(t('Criado!'));
			saveButton.attr('disabled','disabled');
			
		} else {

			saveButton.val(t('Erro :('));
		}
	}

}

Box.boxes[NewAdventure.windowName] = NewAdventure;
