class ListExpertises extends Box {

	static get windowName () { return 'list_expertises' };

	boxContent (options = {}) {

		let me = this;
		
		let boxId = me.boxId;

		// filtrar se eh npc ou nao
		let optionFilter = {
			'order': {
				'attributeId': 'ASC',
				'name': 'ASC'
			}
		}

		let allExpertises = Expertise.getAllExpertises(optionFilter);

		// // se deve filtrar por aventura
		// if (options['filterAdventureId']) {
		// 	allExpertises = Expertise.getAllExpertises(optionFilter);
		// } else {
		// 	allExpertises = Expertise.getAllExpertises(optionFilter);
		// }

		let listExpertiseDiv = $('<div>');

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
					)
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

		expertiseTabs.append(
			expertiseTabsUl
		);

		// preencher as tabelas de pericias criadas anteriormente dentro das abas
		allExpertises.forEach(function (expertise) {

			let expertiseId = expertise['id'];
			let attributeId = expertise['attributeId'];
			let attributeName = Modifier.ALL_TYPE_NAMES[attributeId];
			let expertiseName = expertise['name'];

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
						expertise['name'],
						$("<input>", {
							type: 'hidden',
							id: me.createId('name_' + expertiseId),
							disabled: 'disabled',
							value: expertiseName
						})
					)
				)
			)
		});

		listExpertiseDiv.append(
			expertiseTabs
		);

		return listExpertiseDiv;
	}

	// executa após printar a janela
	callBackRender () {

		let me = this;

		let expertiseTabs = $('#' + me.createId('tabs') );
		expertiseTabs.tabs();
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Listar perícias')
			),
			sprintf(t('Para ver os detalhes de uma perícia, clique em <b>%s</b>'), Expertise.EMOJI_VISUALIZE)
		];
	}


	// visualizar informações detalhadas da pericia
	static visualizeExpertise (boxId, attributeId, expertiseId) {

		let me = Box.getBox(boxId);

		let expertise = Expertise.getExpertise(expertiseId);

		console.log('expertiseId', expertiseId);
		console.log('expertise', expertise);

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
			)
		);
	}

}

Box.boxes[ListExpertises.windowName] = ListExpertises;
