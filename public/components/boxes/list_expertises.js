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

		let listExpertiseTable = $('<table>');

		// titulo das colunas na tabela
		listExpertiseTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Atributo') }).append(
					Expertise.EMOJI_ATTRIBUTE
				),
				$("<th>", { title: t('Perícia') }).append(
					Expertise.EMOJI_NAME
				)
			)
		);

		// criar as abas de atributos e habilidades
		let expertiseTabs = $('<div>', { id: me.createId('tabs') } );
		let expertiseTabsUl = $('<ul>');

		// criar indice das tabs
		Player.ALL_ATTRIBUTES.forEach(function (attribute) {

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

		expertiseTabs.append(
			expertiseTabsUl
		);

		allExpertises.forEach(function (expertise) {

			let expertiseId = expertise['id'];
			let attributeId = expertise['attributeId'];
			let attributeName = Modifier.ALL_TYPE_NAMES[attributeId];
			let expertiseName = expertise['name'];
			
			listExpertiseTable.append(
				$("<tr>").append(
					$('<td>', { title: attributeName } ).append(
						Modifier.EMOJI_TYPES[attributeId],
						$("<input>", {
							type: 'hidden',
							id: me.createId('attribute_id_' + expertiseId),
							disabled: 'disabled',
							value: attributeId
						})
					),
					$("<td>").append(
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
			expertiseTabs,
			listExpertiseTable
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

}

Box.boxes[ListExpertises.windowName] = ListExpertises;
