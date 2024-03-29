class ListBackgrounds extends Box {

	static get windowName () { return 'list_backgrounds' };

	boxContent (options = {}) {

		let me = this;
		
		let boxId = me.boxId;

		let isGlobal = options['isGlobal'] || false;
		this.isGlobal = isGlobal;

		// ordenar por nome
		let optionFilter = {
			'filters': {},
			'order': {
				'name': 'ASC'
			}
		}

		let allBackgrounds = [];

		// se deve filtrar por globais apenas
		if (isGlobal) {
			allBackgrounds = Background.getAllStatic(optionFilter);
		} else {
			allBackgrounds = Background.getAllBackgrounds(optionFilter);
			
			// na listagem local, se nao tem nenhuma, eh a primeira vez que entra provavelmente, salvar as globais no local
			if (allBackgrounds.length == 0) {
				Background.setup();
			}
		}
		this.optionFilter = optionFilter;

		// // se deve filtrar por aventura
		// if (options['filterAdventureId']) {
		// 	allBackgrounds = Background.getAllBackgrounds(optionFilter);
		// } else {
		// 	allBackgrounds = Background.getAllBackgrounds(optionFilter);
		// }

		let listBackgroundDiv = $('<div>', { id: me.createId('list_Background_div') } );

		return listBackgroundDiv;
	}

	// executa após printar a janela
	callBackRender () {

		let me = this;

		me.listBackgrounds();
	}

	// listar as Backgrounds dinamicamente
	listBackgrounds () {

		let me = this;
		
		let boxId = me.boxId;

		let optionFilter = this.optionFilter;

		let isGlobal = this.isGlobal;

		let listBackgroundDiv = $('#' + me.createId('list_Background_div'));

		listBackgroundDiv.html('');

		let listBackgroundTable = $('<table>');

		let allBackgrounds = [];

		// se deve filtrar por globais apenas
		if (isGlobal) {
			allBackgrounds = Background.getAllStatic(optionFilter);
		} else {
			allBackgrounds = Background.getAllBackgrounds(optionFilter);
		}

		let viewEdit = '';

		// pode editar se for local
		if (! isGlobal) {
			viewEdit = $("<th>", { title: t('Visualizar / editar') }).append(
				Background.EMOJI_VISUALIZE
			)
		}

		// titulo das colunas na tabela
		listBackgroundDiv.append(
			$('<table>').append(
				$('<tr>').append(
					$('<td>', { class: 'background_list' } ).append(
						listBackgroundTable.append(
							$('<tr>').append(
								$("<th>", { title: t('Antecedente') }).append(
									Background.EMOJI_NAME
								),

								viewEdit
							)
						)
					),
					$('<td>', {
						class: 'expertise_details',
						id: me.createId('background_details')
					})
				)
			)
		);

		// preencher as tabelas de pericias criadas anteriormente dentro das abas
		allBackgrounds.forEach(function (background) {

			let backgroundId = background['id'];

			if (! backgroundId) {
				return;
			}

			let backgroundName = background['name'];

			// pode editar se for local
			if (! isGlobal) {
				viewEdit = $('<td>').append(
					$("<input>", {
						type: 'button',
						id: me.createId('visualize_' + backgroundId),
						onclick: 'VisualizeBackground.visualizeBackground("' + backgroundId + '", "' + boxId + '")',
						value: Background.EMOJI_VISUALIZE
					})
				)
			}

			listBackgroundTable.append(
				$('<tr>', {
					class: 'click_pointer',
					onclick: 'ListBackgrounds.visualizeBackground("' + boxId + '", "' + backgroundId + '")'
				}).append(
					$('<td>', { style: 'font-weight: normal' } ).append(
						Background.EMOJI_MAIN,
						' ',
						backgroundName,
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + backgroundId),
							disabled: 'disabled',
							value: backgroundName
						})
					),

					viewEdit
				)
			)
		});
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Listar antecedentes')
			),
			$('<p>').append(
				t('Para ver os detalhes de uma antecedente, clique no nome do antecedente')
			),
			$('<p>').append(
				sprintf(t('Para editar uma antecedente, clique em %s'), Background.EMOJI_VISUALIZE)
			),
			$('<p>').append(
				t('A primeira vez que se entra na listagem das antecedentes da aventura, se não houver nenhum antecedente cadastrado, o sistema roda um setup e insere todos os antecedentes globais para facilitar. Os antecedentes globais são sugestões de antecedentes pré cadastrados. Esses antecedentes globais podem ser visualizados no menu <b>Acessórios > Listar Antecedentes</b>')
			),
			$('<p>').append(
				'<b>' + t('Legendas') + ':</b>'
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s Nome:</b> Nome dessa antecedente'), Background.EMOJI_NAME)
				)
			)
		];
	}


	// visualizar informações detalhadas da pericia
	static visualizeBackground (boxId, backgroundId) {

		let me = Box.getBox(boxId);

		let background = Background.getBackground(backgroundId);

		let backgroundDetailsTd = $('#' + me.createId('background_details'));

		backgroundDetailsTd.html('');

		backgroundDetailsTd.append(
			$('<h3>').append(
				background['name']
			),
			$('<p>').append(
				$('<b>').append(
					t('Descrição') + ': '
				),
				background['description']
			)
		);
	}

}

Box.boxes[ListBackgrounds.windowName] = ListBackgrounds;
