class AddDice {

	boxContent () {

		return $("<div>").append(
			$("<input>", {
				id: 'add_dice_number',
				type: 'number',
				min: "1",
				max: "6"
			}),
			$("<input>", {
				id: 'add_dice_button',
				type: 'button',
				onclick: 'AddDice.rollTheDice()',
				value: "Roll"
			}),
			$("<div>", {
				id: 'add_dice_container',
				style: 'font-size: 6rem'
			}),
		);

	}

	static rollTheDice () {
	    var i,
	        faceValue,
	        output = '',
	        diceCount = $('#add_dice_number').val() || 1;

	    for (i = 0; i < diceCount; i++) {
	        faceValue = Math.floor(Math.random() * 6);
	        output += "&#x268" + faceValue + "; ";
	    }
	    console.log("$('#add_dice_container')", $('#add_dice_container'));
	    console.log("output", output);
	    $('#add_dice_container').html(output);
	}

}

boxes['add_dice'] = AddDice;
