class Dice {

	static get EMOJI_DICE () { return '🎲' };

	// rolar um dado de N faces
	static rollDice (diceSides = 6, targetId = '') {
		let resultDiceRoll = Math.floor(Math.random() * diceSides) + 1;

		if (targetId) {
			$('#' + targetId).val(resultDiceRoll);
		}

		return resultDiceRoll;
	}
}
