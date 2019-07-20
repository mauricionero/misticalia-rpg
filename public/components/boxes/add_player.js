class AddPlayer extends Box {

	static windowName = 'add_player';

	boxContent () {

		var randomId = Math.floor(Math.random() * 10000);

		let inputWidth = 36;
		let inputWidthSmall = 24;
		let inputHeight = 12;

		let addPlayerDiv = $('<div>')

		let addPlayerTable = $("<table>");

		// titulo das colunas na tabela
		addPlayerTable.append(
			$("<tr>").append(
				$("<th>").append(
					' '
				),
				$("<th>", { title: t('Login do jogador'), colspan: 4 } ).append(
					User.EMOJI_LOGIN,
					$("<input>", {
						type: 'text',
						id: AddPlayer.windowName + '_login_' + randomId
					})
				),
			),
			$("<tr>").append(
				$('<th>').append(
					$('<label>', { title: t('Masculino') } ).append(
						$('<input>', {
							type: 'radio',
							checked: 'checked',
							class: 'radio_gender',
							name: AddPlayer.windowName + '_gender_' + randomId,
							value: Player.MALE_ID
						}),
						$('<span>').append(
							Player.EMOJI_GENDER_MALE
						)
					),

					' ',

					$('<label>', { title: t('Feminino') } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_gender',
							name: AddPlayer.windowName + '_gender_' + randomId,
							value: Player.FEMALE_ID
						}),
						$('<span>').append(
							Player.EMOJI_GENDER_FEMALE
						)
					)
				),
				$('<th>', { title: t('Nome do personagem'), colspan: 4 } ).append(
					Player.EMOJI_NAME,
					$('<input>', {
						type: 'text',
						id: AddPlayer.windowName + '_name_' + randomId
					})
				),
			),
			$("<tr>").append(
				$("<th>", { title: t('Atributo') }).append(
					Player.EMOJI_ATTRIBUTE
				),
				$("<th>", { title: t('Nivel') }).append(
					Player.EMOJI_LEVEL
				),
				$("<th>", { title: t('Pontos') }).append(
					Player.EMOJI_POINTS
				),
				$("<th>", { title: t('Modificador permanente') }).append(
					Player.EMOJI_PERMANENT_MODIFICATOR
				),
				$("<th>", { title: t('Total de pontos') }).append(
					Player.EMOJI_TOTAL_POINTS
				)
			)
		);

		Player.ALL_ATTRIBUTES.forEach(function (attribute) {
			addPlayerTable.append(
				$("<tr>").append(
					$("<td>").append(
						Player.getAttributeName(attribute)
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: AddPlayer.windowName + '_level_' + attribute + '_' + randomId,
							width: inputWidthSmall,
							height: inputHeight,
							value: Player.levelCalculator(0)
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: AddPlayer.windowName + '_base_points_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'AddPlayer.reCalculateTotalPoints(' + randomId + ', "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: AddPlayer.windowName + '_permanent_modifier_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							readonly: 'readonly',
							onkeyup: 'AddPlayer.reCalculateTotalPoints(' + randomId + ', "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: AddPlayer.windowName + '_points_' + attribute + '_' + randomId,
							width: inputWidth,
							height: inputHeight,
							value: 0
						})
					)
				)
			);
		});

		// botao de salvar
		addPlayerTable.append(
			$("<tr>").append(
				$("<th>", { colspan: 5 } ).append(
					$("<input>", {
						type: 'button',
						id: AddPlayer.windowName + '_save_' + randomId,
						onclick: 'AddPlayer.addPlayer(' + randomId + ')',
						value: t('Adicionar jogador')
					})
				)
			)
		);

		addPlayerDiv.append(addPlayerTable);

		return addPlayerDiv;
	}

	// recalcula o nivel e total de pontos
	static reCalculateTotalPoints (randomId, attribute) {
		let basePoints = $('#' + AddPlayer.windowName + '_base_points_' + attribute + '_' + randomId).val() || 0;
		let temporaryModifier = $('#' + AddPlayer.windowName + '_temporary_modifier_' + attribute + '_' + randomId).val() || 0;
		let permanentModifier = $('#' + AddPlayer.windowName + '_permanent_modifier_' + attribute + '_' + randomId).val() || 0;

		let levelInput = $('#' + AddPlayer.windowName + '_level_' + attribute + '_' + randomId);
		let totalPointsInput = $('#' + AddPlayer.windowName + '_points_' + attribute + '_' + randomId)

		let level = Player.levelCalculator(basePoints);
		let totalPoints = parseInt(basePoints) + parseInt(temporaryModifier) + parseInt(permanentModifier);

		totalPointsInput.val(totalPoints);
		levelInput.val(level);
	}

	// adicionar jogador à aventura
	static addPlayer (randomId) {

		let playerLogin = $('#' + AddPlayer.windowName + '_login_' + randomId).val();
		let playerGender = $("input[name='" + AddPlayer.windowName + '_gender_' + randomId + "']:checked").val()
		let playerName = $('#' + AddPlayer.windowName + '_name_' + randomId).val();

		let newPlayer = {
			'login': playerLogin,
			'gender': playerGender,
			'name': playerName
		}

		Player.ALL_ATTRIBUTES.forEach(function (attribute) {
			let basePoints = $('#' + AddPlayer.windowName + '_base_points_' + attribute + '_' + randomId).val();
			let permanentModifier = $('#' + AddPlayer.windowName + '_permanent_modifier_' + attribute + '_' + randomId).val();
			let points = $('#' + AddPlayer.windowName + '_points_' + attribute + '_' + randomId).val();

			newPlayer[attribute] = {
				'basePoints': basePoints,
				'permanentModifier': permanentModifier,
				'temporaryModifier': 0,
				'points': points
			}
		});

		let resultSaved = Player.addPlayer(newPlayer);

		let saveButton = $('#' + AddPlayer.windowName + '_save_' + randomId);

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled','disabled');

		} else {

			saveButton.val(t('Erro :('));
		}
	}

}

boxes[AddPlayer.windowName] = AddPlayer;
