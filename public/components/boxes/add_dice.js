class AddDice extends Box {

	static get windowName () { return 'add_dice' };

	boxContent () {

		let me = this;

		let boxId = me.boxId;

		return $("<div>").append(
			$("<input>", {
				id: me.createId('number'),
				type: 'number',
				width: 36,
				min: "1",
				max: "6",
				placeholder: t('1')
			}),
			' d',
			$("<input>", {
				id: me.createId('sides'),
				type: 'number',
				width: 40,
				min: "1",
				max: "100",
				placeholder: t('100')
			}),

			' ',
			$("<input>", {
				type: 'button',
				id: me.createId('roll'),
				onclick: 'AddDice.rollTheDice("'+boxId+'")',
				value: t('Rolar')
			}),
			' ',
			$("<input>", {
				type: 'button',
				id: me.createId('reset'),
				onclick: 'AddDice.resetDice("'+boxId+'")',
				value: t('Resetar')
			}),

			$("<div>", {
				id: me.createId('container'),
			})
		);
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		let quantityInput = $('#' + me.createId('number'));
		let sidesInput = $('#' + me.createId('sides'));
		let rollInput = $('#' + me.createId('roll'));
		let resetInput = $('#' + me.createId('reset'));

		return [
			$('<h3>').append(
				t('Rolagem de dados')
			),
			$('<p>').append(
				sprintf(t('Escolha a quantidade de dados no primeiro campo, (por padrão %s) e depois a quantidade de lados do dado (por padrão %s).'), quantityInput.attr('placeHolder'), sidesInput.attr('placeHolder'))
			),
			$('<p>').append(
				sprintf(t('Aperte %s para rolar o dado ou os dados'), rollInput.val())
			),
			$('<p>').append(
				sprintf(t('Aperte %s para limpar os dados rolados'), resetInput.val())
			)
		];
	}

	static rollTheDice (boxId) {

		let me = Box.getBox(boxId);

		let i,
			faceValue,
			output = '',
			diceCount = $('#' + me.createId('number')).val() || 1,
			diceSides = $('#' + me.createId('sides')).val() || 100;

		for (i = 0; i < diceCount; i++) {
			faceValue = Dice.rollDice(diceSides);

			output = $("<div class='die_style'>", {
				id: me.createId('container')
			}).html(faceValue);

			$('#' + me.createId('container')).append(output);
		}

		$('#' + me.createId('container')).append('<br style="clear: left" />');
	}

	static resetDice (dialogId) {
		let me = Box.getBox(dialogId);

		$('#' + me.createId('container')).html('');
	}

}

Box.boxes[AddDice.windowName] = AddDice;
