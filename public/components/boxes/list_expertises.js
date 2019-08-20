class ListExpertises extends Box {

	static get windowName () { return 'list_expertises' };

	boxContent (options = {}) {

		let me = this;
		
		let boxId = me.boxId;

		let isGlobal = options['isGlobal'];
		this.isGlobal = isGlobal;

		// ordenar por atributo e nome
		let optionFilter = {
			'filters': {},
			'order': {
				'attributeId': 'ASC',
				'name': 'ASC'
			}
		}

		let allExpertises = [];

		// se deve filtrar por globais apenas
		if (isGlobal) {
			allExpertises = Expertise.getAllStatic(optionFilter);
		} else {
			allExpertises = Expertise.getAllExpertises(optionFilter);
			
			// na listagem local, se nao tem nenhuma, eh a primeira vez que entra provavelmente, salvar as globais no local
			if (allExpertises.length == 0) {
				Expertise.setup();
			}
		}
		this.optionFilter = optionFilter;

		// // se deve filtrar por aventura
		// if (options['filterAdventureId']) {
		// 	allExpertises = Expertise.getAllExpertises(optionFilter);
		// } else {
		// 	allExpertises = Expertise.getAllExpertises(optionFilter);
		// }

		let listExpertiseDiv = $('<div>', { id: me.createId('list_expertise_div') } );

		return listExpertiseDiv;
	}

	// executa após printar a janela
	callBackRender () {

		let me = this;

		me.listExpertises();
	}

	// listar as expertises dinamicamente
	listExpertises () {

		let me = this;
		
		let boxId = me.boxId;

		let optionFilter = this.optionFilter;

		let isGlobal = this.isGlobal;

		let listExpertiseDiv = $('#' + me.createId('list_expertise_div'));

		let allExpertises = [];

		// se deve filtrar por globais apenas
		if (isGlobal) {
			allExpertises = Expertise.getAllStatic(optionFilter);
		} else {
			allExpertises = Expertise.getAllExpertises(optionFilter);
		}

		// criar as abas de atributos e habilidades
		let expertiseTabs = $('<div>', { id: me.createId('tabs') } );
		let expertiseTabsUl = $('<ul>');

		let allAttributes = Expertise.getAllAttributes();

		// criar indice das tabs
		allAttributes.forEach(function (attribute) {

			let attributeId = Modifier.ALL_TYPE_IDS[attribute];
			let attributeName = Modifier.ALL_TYPE_NAMES[attributeId];

			expertiseTabsUl.append(
				$('<li>', { title: attributeName } ).append(
					$('<a>', { href: '#' + me.createId('tab-' + attributeId) } ).html(
						$('<b>').append(
							Modifier.EMOJI_TYPES[attributeId]
						)
					)
				)
			);
		});

		let listExpertiseTable = [];

		expertiseTabsUl.append('<br /><br />');

		let viewEdit = '';

		// pode editar se for local
		if (! isGlobal) {
			viewEdit = $("<th>", { title: t('Visualizer / editar') }).append(
				Expertise.EMOJI_VISUALIZE
			)
		}

		// criar as tabelas das tabs
		allAttributes.forEach(function (attribute) {

			let attributeId = Modifier.ALL_TYPE_IDS[attribute];
			let attributeName = Modifier.ALL_TYPE_NAMES[attributeId];

			listExpertiseTable[attributeId] = $('<table>', { id: me.createId('table_attribute_' + attributeId) } );

			// titulo das colunas na tabela
			listExpertiseTable[attributeId].append(
				$('<tr>').append(
					$("<th>", { title: t('Atributo') }).append(
						Expertise.EMOJI_ATTRIBUTE
					),
					$("<th>", { title: t('Perícia') }).append(
						Expertise.EMOJI_NAME
					),
					$("<th>", { title: t('Multiplicador') }).append(
						Expertise.EMOJI_MULTIPLIER
					),

					viewEdit
				)
			);

			expertiseTabsUl.append(
				$('<div>', { id: me.createId('tab-' + attributeId) } ).html(
					$('<table>').append(
						$('<tr>').append(
							$('<td>', { class: 'expertise_list' } ).append(
								listExpertiseTable[attributeId]
							),
							$('<td>', {
								class: 'expertise_details',
								id: me.createId('expertise_details_' + attributeId)
							})
						)
					)
				)
			);
		});

		// preencher as tabelas de pericias criadas anteriormente dentro das abas
		allExpertises.forEach(function (expertise) {

			let expertiseId = expertise['id'];

			if (! expertiseId) {
				return;
			}

			let expertiseName = expertise['name'];
			let expertiseMultiplier = expertise['multiplier'];

			let attributeId = expertise['attributeId'];

			if (! attributeId) {
				return;
			}
			let attributeName = Modifier.ALL_TYPE_NAMES[attributeId];

			// pode editar se for local
			if (! isGlobal) {
				viewEdit = $('<td>').append(
					$("<input>", {
						type: 'button',
						id: me.createId('visualize_' + expertiseId),
						onclick: 'VisualizeExpertise.visualizeExpertise("' + expertiseId + '", "' + boxId + '")',
						value: Expertise.EMOJI_VISUALIZE
					})
				)
			}

			listExpertiseTable[attributeId].append(
				$('<tr>', {
					class: 'click_pointer',
					onclick: 'ListExpertises.visualizeExpertise("' + boxId + '", "' + attributeId + '", "' + expertiseId + '")'
				}).append(
					$('<td>', { title: attributeName, style: 'font-weight: normal' } ).append(
						Modifier.EMOJI_TYPES[attributeId],
						$("<input>", {
							type: 'hidden',
							id: me.createId('attribute_id_' + expertiseId),
							disabled: 'disabled',
							value: attributeId
						})
					),
					$('<td>', { style: 'font-weight: normal' } ).append(
						expertiseName,
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + expertiseId),
							disabled: 'disabled',
							value: expertiseName
						})
					),
					$('<td>', { style: 'font-weight: normal' } ).append(
						expertiseMultiplier,
						$("<input>", {
							type: 'hidden',
							id: me.createId('multiplier_' + expertiseId),
							disabled: 'disabled',
							value: expertiseMultiplier
						})
					),

					viewEdit
				)
			)
		});

		expertiseTabs.append(
			expertiseTabsUl
		);

		listExpertiseDiv.html('');

		listExpertiseDiv.append(
			expertiseTabs
		);

		expertiseTabs.tabs();
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Listar perícias')
			),
			$('<p>').append(
				t('As perícias estão divididas em atríbutos nas abas. Deixe o mouse em cima para ver os nomes de cada atributo.')
			),
			Player.helpAttributesMeaning(),
			$('<p>').append(
				t('Para ver os detalhes de uma perícia, clique no nome da perícia')
			),
			$('<p>').append(
				sprintf(t('Para editar uma perícia, clique em %s'), Expertise.EMOJI_VISUALIZE)
			),
			$('<p>').append(
				t('A primeira vez que se entra na listagem das perícias da aventura, se não houver nenhuma perícia cadastrada, o sistema roda um setup e insere todas as perícias globais para facilitar. As perícias globais são sugestões de perícias pré cadastradas. Essas perícias globais podem ser visualizadas no menu <b>Acessórios > Listar Perícias</b>')
			),
			$('<p>').append(
				'<b>' + t('Legendas') + ':</b>'
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('<b>%s Atributo:</b> A qual atributo essa perícia pertence'), Expertise.EMOJI_ATTRIBUTE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Nome:</b> Nome dessa perícia'), Expertise.EMOJI_NAME)
				),
				$('<li>').append(
					sprintf(t('<b>%s Multiplicador:</b> O quanto irá multiplicar no atributo ao usar essa perícia. Quanto mais específico, maior o multiplicador. Normalmente entre 0,1 e 0,5'), Expertise.EMOJI_MULTIPLIER)
				)
			)
		];
	}


	// visualizar informações detalhadas da pericia
	static visualizeExpertise (boxId, attributeId, expertiseId) {

		let me = Box.getBox(boxId);

		let expertise = Expertise.getExpertise(expertiseId);

		let expertiseDetailsTd = $('#' + me.createId('expertise_details_' + attributeId));

		expertiseDetailsTd.html('');

		expertiseDetailsTd.append(
			$('<h3>').append(
				expertise['name']
			),
			$('<p>').append(
				$('<b>').append(
					t('Descrição') + ': '
				),
				expertise['description']
			),
			$('<p>').append(
				$('<b>').append(
					t('Regras') + ': '
				),
				expertise['rule']
			),
			$('<p>').append(
				$('<b>').append(
					t('Multiplicador') + ': '
				),
				expertise['multiplier']
			)
		);
	}

}

Box.boxes[ListExpertises.windowName] = ListExpertises;
