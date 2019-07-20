class PlayerEquipament extends Box {

	static windowName = 'player_equipament';

	boxContent (options) {
		var randomId = Math.floor(Math.random() * 10000);

		let playerId = options['playerId'];

		let player = Player.getPlayer(playerId);

		let playerEquipaments = Player.getPlayerEquipaments();

		let inputWidth = 36;
		let inputWidthSmall = 24;
		let inputHeight = 12;

		let listPlayerEquipamentDiv = $('<div>');

		let listPlayerEquipamentItemTabs = $('<div>', {
			class: 'player_equipaments_list'
		});

		let listPlayerEquipamentTable = $("<table>");

		// titulo das colunas na tabela
		listPlayerEquipamentTable.append(
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

		playerEquipaments.forEach(function (equipament) {
			listPlayerEquipamentTable.append(
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
			);
		});

		let visualizeAllEquipamentDiv = $('<div>', {
			class: 'player_equipaments_view_all',
			id: PlayerEquipament.windowName + '_all_equipaments_' + playerId + '_' + randomId,
			style: 'display: none'
		});

		// // listar botoes para filtrar a tabela por tipos
		// Object.keys(Equipament.EMOJI_TYPES).forEach(function(key, index) {
		// 	listPlayerEquipamentItemTabs.append(
		// 		$("<input>", {
		// 			type: 'button',
		// 			id: ListEquipaments.windowName + '_equip_item_tab_' + key + '_' + randomId,
		// 			value: Equipament.EMOJI_TYPES[key]
		// 		})
		// 	);
		// });

		listPlayerEquipamentItemTabs.append(
			'<br />',
			listPlayerEquipamentTable
		);

		listPlayerEquipamentDiv.append(
			$('<a>',{
				href: 'javascript: void(0)',
				onclick: 'PlayerEquipament.toggleViewEquipaments(' + playerId + ', ' + randomId + ')'
			}).html(
				t('Ver equipamentos e itens >>')
			),
			'<br />',
			listPlayerEquipamentItemTabs,
			visualizeAllEquipamentDiv
		);

		// habilitar tabs
		$( function() {
			$( "#" + ListEquipaments.windowName + '_equip_item_' + randomId ).tabs();
		} );

		return listPlayerEquipamentDiv;
	}

	// abrir visualização dos equipamentos do player
	static visualizeEquipament (playerId) {

		console.log('playerId', playerId);

		let player = Player.getPlayer(playerId);

		let playerName = player['name'];

		let windowTitle = Equipament.EMOJI_TYPE + ' ' + playerName;

		let options = {
			playerId: playerId,
			singleTon: true,
			windowId: PlayerEquipament.windowName + '_' + playerId
		};

		Box.openDialog(PlayerEquipament.windowName, windowTitle, options);
	}

	// mostrar e esconder os equipamentos do player
	static toggleViewEquipaments (playerId, randomId) {
		$('#' + PlayerEquipament.windowName + '_all_equipaments_' + playerId + '_' + randomId).animate({'width': 'toggle'});
	}

}

boxes[PlayerEquipament.windowName] = PlayerEquipament;
