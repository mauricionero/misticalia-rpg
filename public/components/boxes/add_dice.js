class AddDice extends Box {

	static get windowName () { return 'add_dice' };

	boxContent () {

		let me = this;

		let boxId = me.boxId;

		return $("<div>").append(
			$("<input>", {
				id: me.createId('number'),
				type: 'number',
				min: "1",
				max: "6",
				placeholder: t('1')
			}),
			' d',
			$("<input>", {
				id: me.createId('sides'),
				type: 'number',
				min: "1",
				max: "100",
				placeholder: t('100')
			}),

			' ',
			$("<input>", {
				type: 'button',
				onclick: 'AddDice.rollTheDice("'+boxId+'")',
				value: t('Rolar')
			}),
			' ',
			$("<input>", {
				type: 'button',
				onclick: 'AddDice.resetDice("'+boxId+'")',
				value: t('Resetar')
			}),

			$("<div>", {
				id: me.createId('container'),
			})
		);

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
