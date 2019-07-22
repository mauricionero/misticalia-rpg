class NewAdventure extends Box {

	static get windowName () { return 'new_adventure' };

	boxContent () {
		var randomId = Math.floor(Math.random() * 10000);

		let formNewAdventure = $("<form>", { id: NewAdventure.windowName + '_form_' + randomId });

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
							id: NewAdventure.windowName + '_name_' + randomId,
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
							id: NewAdventure.windowName + '_style_' + randomId,
							placeholder: t('Fantasia')
						})
					)
				),
				$("<tr>").append(
					$("<th>", { colspan: 2 } ).append(
						$("<input>", {
							type: 'button',
							id: NewAdventure.windowName + '_save_' + randomId,
							onclick: 'NewAdventure.saveAdventure(' + randomId + ')',
							value: t('Criar')
						})
					)
				)
			)
		);

		return formNewAdventure;
	}

	// salvar aventura
	static saveAdventure (randomId) {

		let adventureName = $('#' + NewAdventure.windowName + '_name_' + randomId).val();
		let adventureStyle = $('#' + NewAdventure.windowName + '_style_' + randomId).val();

		let newAdventure = {
			'name': adventureName,
			'style': adventureStyle
		}

		let resultSaved = Adventure.newAdventure(newAdventure);
		let saveButton = $('#' + NewAdventure.windowName + '_save_' + randomId);

		if (resultSaved) {

			saveButton.val(t('Criado!'));
			saveButton.attr('disabled','disabled');
			
		} else {

			saveButton.val(t('Erro :('));
		}
	}

}

boxes[NewAdventure.windowName] = NewAdventure;
