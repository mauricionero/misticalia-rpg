class OpenAdventure extends Box {

	static windowName = 'open_adventure';

	boxContent () {

		var randomId = Math.floor(Math.random() * 10000);

		var allAdventures = Adventure.getUserAdventures();

		let listAdventuresTable = $("<table>");

		// titulo das colunas na tabela
		listAdventuresTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Nome') }).append(
					Adventure.EMOJI_NAME
				),
				$("<th>", { title: t('Papel') }).append(
					Adventure.EMOJI_ROLE_MASTER + Adventure.EMOJI_ROLE_PLAYER
				),
				$("<th>", { title: t('Abrir') }).append(
					Adventure.EMOJI_OPEN
				)
			)
		);

		// iterar entre as aventuras
		allAdventures.forEach(function (adventure) {

			listAdventuresTable.append(
				$("<tr>").append(
					$("<td>").append(
						adventure['name'],
						$("<input>", {
							type: 'hidden',
							id: OpenAdventure.windowName + '_name_' + adventure['id'] + '_' + randomId,
							readonly: 'readonly',
							value: adventure['name']
						})
					),
					$("<td>").append(
						Adventure.EMOJI_ROLE[adventure['role']],
						$("<input>", {
							type: 'hidden',
							id: OpenAdventure.windowName + '_role_' + adventure['id'] + '_' + randomId,
							readonly: 'readonly',
							value: adventure['role']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: OpenAdventure.windowName + '_open_' + adventure['id'] + '_' + randomId,
							onclick: 'OpenAdventure.open_adventure("' + adventure['id'] + '")',
							value: Adventure.EMOJI_OPEN
						}),
					)
				)
			)
		});

		return listAdventuresTable;
	}

	static open_adventure (adventureId) {
		Adventure.setCurrentAdventureId(adventureId);

		redrawMenu();
	}

}

boxes[OpenAdventure.windowName] = OpenAdventure;
