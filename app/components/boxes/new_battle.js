class NewBattle extends Box {

	boxWidth = 290;
	boxHeight = 210;

	boxContent () {

		var random_id = Math.floor(Math.random() * 10000);

		var allplayers = Player.getAllPlayers();

		var maxDextery = Player.getMaxDextery();

		// normalize
		console.log('maxDextery', maxDextery);

		// return $("<div>").append(
		// 	'P1',
		// 	$("<input>", {
		// 		id: 'add_dice_number_' + random_id,
		// 		type: 'number',
		// 		min: "1",
		// 		max: "6",
		// 		placeholder: t('1')
		// 	})
		// );
	}

}

boxes['new_battle'] = NewBattle;
