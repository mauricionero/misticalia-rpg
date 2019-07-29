class ListEquipaments extends Box {

	static get windowName () { return 'list_equipaments' };

	boxContent (options = {}) {

		let allEquipaments = [];

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allEquipaments = Equipament.getAllEquipamentsCurrentAdventure();
		} else {
			allEquipaments = Equipament.getAllEquipaments();
		}

		var randomId = Math.floor(Math.random() * 10000);

		let listEquipamentDiv = $('<div>');

		let listEquipamentTable = $("<table>");

		// titulo das colunas na tabela
		listEquipamentTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Tipo') }).append(
					Equipament.EMOJI_TYPE
				),
				$("<th>", { title: t('Nome') }).append(
					Equipament.EMOJI_NAME
				),
				$("<th>", { title: t('Peso') }).append(
					Equipament.EMOJI_WEIGHT
				),
				$("<th>", { title: t('Detalhes') }).append(
					Equipament.EMOJI_VISUALIZE
				)
			)
		);

		allEquipaments.forEach(function (equipament) {
			
			listEquipamentTable.append(
				$("<tr>").append(
					$("<td>").append(
						Equipament.EMOJI_TYPES[equipament['typeId']],
						$("<input>", {
							type: 'hidden',
							id: ListEquipaments.windowName + '_type_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['typeId']
						})
					),
					$("<td>").append(
						equipament['name'],
						$("<input>", {
							type: 'hidden',
							id: ListEquipaments.windowName + '_name_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['name']
						})
					),
					$("<td>").append(
						Equipament.weightHuman(equipament['weight']),
						$("<input>", {
							type: 'hidden',
							id: ListEquipaments.windowName + '_weight_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['weight']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: ListEquipaments.windowName + '_visualize_' + equipament['id'] + '_' + randomId,
							onclick: 'ListEquipaments.visualizeEquipament("' + equipament['id'] + '", ' + randomId + ')',
							value: Equipament.EMOJI_VISUALIZE
						})
					)
				)
			)
		});

		listEquipamentDiv.html(listEquipamentTable);

		return listEquipamentDiv;
	}

	// abrir visualização de detalhes do equipamento
	static visualizeEquipament (equipamentId, randomId) {

		let equipamentName = $('#' + ListEquipaments.windowName + '_name_' + equipamentId + '_' + randomId).val();
		let equipamentTypeId = $('#' + ListEquipaments.windowName + '_type_' + equipamentId + '_' + randomId).val();

		// se nao estiver preenchido, eh pq provavelmente nao veio dessa dialog, buscar da localStorage
		if (equipamentName == undefined) {
			let equipament = Equipament.getEquipament(equipamentId);

			equipamentName = equipament['name'];
			equipamentTypeId = equipament['typeId'];
		}

		let windowTitle = Equipament.EMOJI_TYPES[equipamentTypeId] + ' ' + equipamentName;

		let options = {
			equipamentId: equipamentId,
			singleTon: true,
			windowId: VisualizeEquipament.windowName + '_' + equipamentId
		};

		Box.openDialog(VisualizeEquipament.windowName, windowTitle, options);
	}

}

boxes[ListEquipaments.windowName] = ListEquipaments;
