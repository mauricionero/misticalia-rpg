class ListEquipaments extends Box {

	static get windowName () { return 'list_equipaments' };

	boxContent (options = {}) {

		let allEquipaments = [];

		console.log('options', options);
		console.log('typeof options', typeof options);
		console.log("options['filterAdventureId']", options['filterAdventureId']);

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			console.log('filtrar!');
			allEquipaments = Equipament.getAllEquipamentsCurrentAdventure();
		} else {
			console.log('nao filtrar!');
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
					)
				)
			)
		});

		listEquipamentDiv.html(listEquipamentTable);

		return listEquipamentDiv;
	}

}

boxes[ListEquipaments.windowName] = ListEquipaments;
