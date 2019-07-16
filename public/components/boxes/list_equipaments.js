class ListEquipaments extends Box {

	static windowName = 'list_equipaments';

	boxContent () {

		var randomId = Math.floor(Math.random() * 10000);

		let allEquipaments = Equipament.getAllEquipaments();

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
						Equipament.EMOJI_TYPES[equipament['type']],
						$("<input>", {
							type: 'hidden',
							id: ListEquipaments.windowName + '_type_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['type']
						})
					),
					$("<td>").append(
						equipament['name'],
						$("<input>", {
							type: 'hidden',
							id: ListEquipaments.windowName + '_name_' + equipament['id'] + '_' + randomId,
							readonly: 'readonly',
							value: equipament['type']
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
