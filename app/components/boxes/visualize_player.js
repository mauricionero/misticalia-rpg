class VisualizePlayer extends Box {

	boxWidth = 360;
	boxHeight = 220;

	static windowName = 'visualize_player';

	boxContent (options) {
		console.log('options', options);

		let parentWindowRandomId = options['randomId'];
		let playerId = options['playerId'];

		let listPlayerTable = $("<table>");

		// titulo das colunas na tabela
		listPlayerTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Atributo') }).append(
					Player.EMOJI_ATTRIBUTE
				),
				$("<th>", { title: t('Nivel') }).append(
					Player.EMOJI_LEVEL
				),
				$("<th>", { title: t('Pontos base') }).append(
					''
				),
				$("<th>", { title: t('Saldo base') }).append(
					''
				),
				$("<th>", { title: t('Modificador momentâneo') }).append(
					Player.EMOJI_TEMPORARY_MODIFICATOR
				),
				$("<th>", { title: t('Modificador permanente') }).append(
					Player.EMOJI_PERMANENT_MODIFICATOR
				),
				$("<th>", { title: t('Pontos') }).append(
					''
				),
				$("<th>", { title: t('Saldo') }).append(
					Player.EMOJI_BALANCE
				)
			)
		);

		// Player.ALL_ATTRIBUTES.forEach(function (attribute) {
		// 	listPlayerTable.append(
		// 		$("<tr>").append(
		// 			$("<td>").append(
		// 				$("<input>", {
		// 					type: 'checkbox',
		// 					id: 'new_battle_wait_' + player['id'] + '_' + randomId,
		// 					class: 'check_wait',
		// 					checked: 'checked',
		// 					value: 1
		// 				})
		// 			)
		// 		)
		// 	);
		// });

		return listPlayerTable;
	}

}

boxes[VisualizePlayer.windowName] = VisualizePlayer;
