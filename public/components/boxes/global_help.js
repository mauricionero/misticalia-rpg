class GlobalHelp extends Box {

	static get windowName () { return 'global_help' };

	boxContent () {

		let me = this;

		let boxId = me.boxId;

		let helpButton = $('<button>', {
			type: 'button',
			class: 'ui-button',
			style: 'padding: 1px; width: 20px;'
		});

		helpButton.append(
			$('<span>', {
				class: 'ui-icon ui-icon-info'
			})
		);

		return [
			$('<p>').append(
				sprintf(t('Comece criando uma aventura no menu <b>%s Aventuras</b> > <b>%s Nova aventura</b>'), Adventure.EMOJI_MAIN, Adventure.EMOJI_ADD)
			),
			$('<p>').append(
				sprintf(t('Após criar, abra sua nova aventura criada no menu <b>%s Aventuras</b> > <b>%s Abrir aventura</b>'), Adventure.EMOJI_MAIN, Adventure.EMOJI_OPEN)
			),
			$('<p>').append(
				t('Ao abrir, perceba que um novo menu apareceu com o nome da sua aventura, dentro desse menu terão novas coisas a serem criadas para essa aventura')
			),
			$('<p>').append(
				t('Fique atento que algumas janelas possuem um botão '),
				helpButton,
				t(' em cima, ao clicar, aparecerá mais informações, clique no desta janela para ver um exemplo')
			)
		];
	}

	// Box padrao de ajuda
	helpInfo () {
		return [
			$('<h3>').append(
				t('Esse é um exemplo de janela de ajuda')
			)
		];
	}
}

Box.boxes[GlobalHelp.windowName] = GlobalHelp;
