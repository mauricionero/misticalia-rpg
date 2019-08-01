class AddPlayer extends Box {

	static get windowName () { return 'add_player' };

	boxContent (options = {}) {

		let me = this;

		let boxId = me.boxId;

		// se eh NPC
		let isNPC = false;
		if (options['isNPC']) {
			isNPC = true;
		}

		let inputWidthBig = 120;
		let inputWidth = 36;
		let inputWidthSmall = 24;
		let inputHeight = 12;

		let addPlayerDiv = $('<div>')

		let addPlayerTable = $("<table>");

		let loginDisplay = 'show';
		let saveButtonText = t('Adicionar jogador');

		if (isNPC) {
			loginDisplay = 'none';
			saveButtonText = t('Adicionar NPC');
		}

		// titulo das colunas na tabela
		addPlayerTable.append(
			$("<tr>", { style: 'display: ' + loginDisplay } ).append(
				$("<th>").append(
					' ',
				),
				$("<th>", { title: t('Login do jogador'), colspan: 4 } ).append(
					User.EMOJI_LOGIN,
					$("<input>", {
						type: 'text',
						width: inputWidthBig,
						id: me.createId('login')
					})
				),
			),
			$("<tr>").append(
				$('<th>').append(
					$("<input>", {
						type: 'hidden',
						readonly: 'readonly',
						id: me.createId('is_npc'),
						value: isNPC
					}),
					$('<label>', { title: t('---') } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_gender',
							name: me.createId('gender'),
							value: Player.NO_GENDER_ID
						}),
						$('<span>').append(
							Player.EMOJI_GENDER
						)
					),

					' ',

					$('<label>', { title: t('Masculino') } ).append(
						$('<input>', {
							type: 'radio',
							checked: 'checked',
							class: 'radio_gender',
							name: me.createId('gender'),
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
							name: me.createId('gender'),
							value: Player.FEMALE_ID
						}),
						$('<span>').append(
							Player.EMOJI_GENDER_FEMALE
						)
					),

					' ',

					$('<label>', { title: t('Transgênero') } ).append(
						$('<input>', {
							type: 'radio',
							class: 'radio_gender',
							name: me.createId('gender'),
							value: Player.TRANS_GENDER_ID
						}),
						$('<span>').append(
							Player.EMOJI_TRANS_GENDER
						)
					),

					' &nbsp;'
				),
				$('<th>', { title: t('Nome do personagem'), colspan: 4 } ).append(
					Player.EMOJI_NAME,
					$('<input>', {
						type: 'text',
						width: inputWidthBig,
						id: me.createId('name')
					})
				)
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
				$("<th>", { title: t('Total de pontos') }).append(
					Player.EMOJI_TOTAL_POINTS
				)
			)
		);

		let allAttributes = Player.ALL_ATTRIBUTES;

		if (isNPC) {
			allAttributes = allAttributes.concat(Player.ALL_SECONDARY_ATTRIBUTES);
		}

		allAttributes.forEach(function (attribute) {
			addPlayerTable.append(
				$("<tr>").append(
					$("<td>").append(
						Player.getAttributeName(attribute)
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: me.createId('level_' + attribute),
							width: inputWidthSmall,
							height: inputHeight,
							value: Player.levelCalculator(0)
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							id: me.createId('base_points_' + attribute),
							width: inputWidth,
							height: inputHeight,
							onkeyup: 'AddPlayer.reCalculateTotalPoints("' + boxId + '", "' + attribute + '")',
							value: 0
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							readonly: 'readonly',
							id: me.createId('points_' + attribute),
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
						id: me.createId('save'),
						onclick: 'AddPlayer.addPlayer("' + boxId + '")',
						value: saveButtonText
					})
				)
			)
		);

		addPlayerDiv.append(addPlayerTable);

		return addPlayerDiv;
	}

	// recalcula o nivel e total de pontos
	static reCalculateTotalPoints (boxId, attribute) {

		let me = Box.getBox(boxId);

		let basePoints = $('#' + me.createId('base_points_' + attribute)).val() || 0;
		let temporaryModifier = 0;
		let permanentModifier = 0;

		let levelInput = $('#' + me.createId('level_' + attribute));
		let totalPointsInput = $('#' + me.createId('points_' + attribute))

		let level = Player.levelCalculator(basePoints);
		let totalPoints = Player.calculateTotalPoints(basePoints, temporaryModifier, permanentModifier);

		totalPointsInput.val(totalPoints);
		levelInput.val(level);
	}

	// adicionar jogador à aventura
	static addPlayer (boxId) {

		let me = Box.getBox(boxId);

		let playerLogin = $('#' + me.createId('login')).val();
		let playerGender = $("input[name='" + me.createId('gender') + "']:checked").val()
		let playerName = $('#' + me.createId('name')).val();
		let isNPC = $('#' + me.createId('is_npc')).val();

		isNPC = (isNPC == 'true') ? true : false;

		let newPlayer = {
			'login': playerLogin,
			'gender': playerGender,
			'name': playerName,
			'isNPC': isNPC
		}

		let allAttributes = Player.ALL_ATTRIBUTES;
		if (isNPC) {
			allAttributes = allAttributes.concat(Player.ALL_SECONDARY_ATTRIBUTES);
		}

		allAttributes.forEach(function (attribute) {
			let basePoints = parseInt($('#' + me.createId('base_points_' + attribute)).val());
			let permanentModifier = 0;
			let points = parseInt($('#' + me.createId('points_' + attribute)).val());

			newPlayer[attribute] = {
				'basePoints': basePoints,
				'permanentModifier': permanentModifier,
				'temporaryModifier': 0,
				'points': points
			}
		});

		let resultSaved = Player.savePlayer(newPlayer);

		let saveButton = $('#' + me.createId('save'));

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled','disabled');

		} else {

			saveButton.val(t('Erro :('));
		}
	}

}

Box.boxes[AddPlayer.windowName] = AddPlayer;
