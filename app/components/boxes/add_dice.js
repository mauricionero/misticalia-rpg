class AddDice extends Box {

	boxWidth = 350;
	boxHeight = 250;

	boxContent () {

		return $("<div>").append(
			$("<input>", {
				id: 'add_dice_number',
				type: 'number',
				min: "1",
				max: "6",
				placeholder: t('1')
			}),
			' d',
			$("<input>", {
				id: 'add_dice_sides',
				type: 'number',
				min: "1",
				max: "100",
				placeholder: t('6')
			}),

			' ',
			$("<input>", {
				id: 'add_dice_roll',
				type: 'button',
				onclick: 'AddDice.rollTheDice()',
				value: t('Rolar')
			}),
			' ',
			$("<input>", {
				id: 'add_dice_reset',
				type: 'button',
				onclick: 'AddDice.resetDice()',
				value: t('Resetar')
			}),

			$("<div>", {
				id: 'add_dice_container'
			}),
		);

	}

	static rollTheDice () {
	    var i,
	        faceValue,
	        output = '',
	        diceCount = $('#add_dice_number').val() || 1,
	        diceSides = $('#add_dice_sides').val() || 6;

	    for (i = 0; i < diceCount; i++) {
	        faceValue = Math.floor(Math.random() * diceSides) + 1;

	        output = $("<div class='die_style'>", {
				id: 'add_dice_container'
			}).html(faceValue);

	    	$('#add_dice_container').append(output);
	    }

	    $('#add_dice_container').append('<br style="clear: left" />');
	}

	static resetDice () {
    	$('#add_dice_container').html('');
	}

}

boxes['add_dice'] = AddDice;
