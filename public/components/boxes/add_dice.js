class AddDice extends Box {

	static get windowName () { return 'add_dice' };

	boxContent () {

		var random_id = Math.floor(Math.random() * 10000);

		return $("<div>").append(
			$("<input>", {
				id: 'add_dice_number_' + random_id,
				type: 'number',
				min: "1",
				max: "6",
				placeholder: t('1')
			}),
			' d',
			$("<input>", {
				id: 'add_dice_sides_' + random_id,
				type: 'number',
				min: "1",
				max: "100",
				placeholder: t('6')
			}),

			' ',
			$("<input>", {
				type: 'button',
				onclick: 'AddDice.rollTheDice('+random_id+')',
				value: t('Rolar')
			}),
			' ',
			$("<input>", {
				type: 'button',
				onclick: 'AddDice.resetDice('+random_id+')',
				value: t('Resetar')
			}),

			$("<div>", {
				id: 'add_dice_container_'+random_id
			}),
		);

	}

	static rollTheDice (random_id) {
		var i,
			faceValue,
			output = '',
			diceCount = $('#add_dice_number_' + random_id).val() || 1,
			diceSides = $('#add_dice_sides_' + random_id).val() || 6;

		for (i = 0; i < diceCount; i++) {
			faceValue = Math.floor(Math.random() * diceSides) + 1;

			output = $("<div class='die_style'>", {
				id: 'add_dice_container_'+random_id
			}).html(faceValue);

			$('#add_dice_container_'+random_id).append(output);
		}

		$('#add_dice_container_'+random_id).append('<br style="clear: left" />');
	}

	static resetDice (random_id) {
		$('#add_dice_container_'+random_id).html('');
	}

}

boxes['add_dice'] = AddDice;
