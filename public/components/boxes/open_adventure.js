class OpenAdventure extends Box {

	static get windowName () { return 'open_adventure' };

	boxContent () {

		let me = this;
		
		let boxId = me.boxId;

		var randomId = Math.floor(Math.random() * 10000);

		var allAdventures = Adventure.getUserAdventures();

		console.log('allAdventures', allAdventures);

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
							id: me.createId('name_' + adventure['id']),
							readonly: 'readonly',
							value: adventure['name']
						})
					),
					$("<td>").append(
						Adventure.EMOJI_ROLE[adventure['role']],
						$("<input>", {
							type: 'hidden',
							id: me.createId('role_' + adventure['id']),
							readonly: 'readonly',
							value: adventure['role']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('open_' + adventure['id']),
							onclick: 'OpenAdventure.open_adventure("' + adventure['id'] + '")',
							value: Adventure.EMOJI_OPEN
						})
					)
				)
			)
		});

		return listAdventuresTable;
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Abrir aventura')
			),
			$('<p>').append(
				sprintf(t('Clique em <b>%s</b> para selecionar uma <b>nova aventura</b>.'), Adventure.EMOJI_OPEN)
			),
			$('<p>').append(
				sprintf(('%s indica qual o seu papel na aventura, se %smestre ou %sjogador'), Adventure.EMOJI_ROLE_MASTER + Adventure.EMOJI_ROLE_PLAYER, Adventure.EMOJI_ROLE_MASTER, Adventure.EMOJI_ROLE_PLAYER)
			),
			$('<p>').append(
				t('Quando uma nova aventura é selecionada, um novo item no menu é criado com o nome da aventura.')
			),
			$('<p>').append(
				t('Dentro desse menu estarão tudo que for relacionado a essa aventura, como:')
			),
			$('<ul>').append(
				$('<li>').append(
					sprintf(t('%s Jogadores'), Player.EMOJI_MAIN)
				),
				$('<li>').append(
					sprintf(t('%s NPCs (personagens não jogaveis, controlados pelo mestre)'), Player.EMOJI_NPC_MAIN)
				),
				$('<li>').append(
					sprintf(t('%s Equipamentos'), Equipament.EMOJI_MAIN)
				),
				$('<li>').append(
					sprintf(t('%s Itens'), Item.EMOJI_MAIN)
				),
				$('<li>').append(
					sprintf(t('%s Batalhas'), Battle.EMOJI_MAIN)
				)
			)
		];
	}

	// abrir aventura atual e refazer o menu
	static open_adventure (adventureId) {
		Adventure.setCurrentAdventureId(adventureId);

		redrawMenu();
	}

}

Box.boxes[OpenAdventure.windowName] = OpenAdventure;
