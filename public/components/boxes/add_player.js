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
		let inputWidthMedium = 40;
		let inputWidth = 36;
		let inputWidthSmall = 24;
		let inputHeight = 12;

		let addPlayerHolder = $('<table>')

		let addPlayerTable = $("<table>");

		let loginDisplay = 'none'; // por enquanto nao mostrar nunca
		let saveButtonText = t('Adicionar jogador');

		if (isNPC) {
			loginDisplay = 'none';
			saveButtonText = t('Adicionar NPC');
		}

		let allAttributes = Player.ALL_ATTRIBUTES;

		if (isNPC) {
			allAttributes = allAttributes.concat(Player.ALL_SECONDARY_ATTRIBUTES);
		}

		let sugestedPointsPerLevel = Player.SUGESTION_POINTS_PER_ATTRIBUTE;

		let sugestedExpectedPoints = sugestedPointsPerLevel * Player.ALL_ATTRIBUTES.length;

		// titulo das colunas na tabela
		addPlayerTable.append(
			$("<tr>").append(
				$("<th>").append(
					t('Desejado')
				),
				$("<th>", { title: t('Nível do personagem'), colspan: 4 } ).append(
					Player.EMOJI_LEVEL,
					' &nbsp; ',
					t('Total')
				)
			),
			$("<tr>").append(
				$("<th>").append(
					$("<input>", {
						type: 'text',
						id: me.createId('expected_player_points'),
						width: inputWidthMedium,
						value: sugestedExpectedPoints
					}),
					$("<input>", {
						type: 'button',
						title: t('Distribuir igualmente nos atributos'),
						onclick: 'AddPlayer.distributePoints("' + boxId + '")',
						value: Player.EMOJI_DISTRIBUTE
					})
				),
				$("<th>", { colspan: 4 } ).append(
					$("<input>", {
						type: 'text',
						disabled: 'disabled',
						id: me.createId('player_level'),
						width: inputWidthSmall,
						value: Player.levelCalculator(0)
					}),
					' ',
					$("<input>", {
						type: 'text',
						id: me.createId('total_player_points'),
						width: inputWidthMedium,
						disabled: 'disabled',
						value: 0
					})
				)
			),
			$("<tr>").append(
				$("<th>").append(
					'&nbsp;'
				),
				$("<th>", { colspan: 4 } ).append(
					' '
				)
			),

			$("<tr>", { style: 'display: ' + loginDisplay } ).append(
				$("<th>").append(
					' ',
				),
				$("<th>", { title: t('Login do jogador'), colspan: 4 } ).append(
					User.EMOJI_LOGIN,
					$("<input>", {
						type: 'text',
						width: inputWidthBig,
						id: me.createId('login'),
						placeholder: t('login')
					})
				),
			),
			$("<tr>").append(
				$('<th>').append(
					$("<input>", {
						type: 'hidden',
						disabled: 'disabled',
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
					Player.EMOJI_NAME + '*',
					$('<input>', {
						type: 'text',
						width: inputWidthBig,
						id: me.createId('name'),
						placeholder: t('Nome')
					})
				)
			),
			$('<tr>'),
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

		allAttributes.forEach(function (attribute) {
			addPlayerTable.append(
				$("<tr>").append(
					$("<td>").append(
						Player.getAttributeName(attribute)
					),
					$("<td>").append(
						$("<input>", {
							type: 'text',
							disabled: 'disabled',
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
							disabled: 'disabled',
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

		let addPlayerDescriptions = $('<table>').append(
			$('<tr>').append(
				$('<th>', { title: t('Clique no manual acima da janela para mais informações') } ).append(
					Player.EMOJI_BACKGROUND,
					t('Background'),
					'<br />',
					$("<textarea>", {
						type: 'text',
						id: me.createId('background'),
						placeholder: t('História do personagem'),
						width: 300,
						height: 110
					})
				)
			),
			$('<tr>').append(
				$('<th>', { title: t('Clique no manual acima da janela para mais informações') } ).append(
					Player.EMOJI_DEFECTS,
					t('Defeitos e imperfeições'),
					'<br />',
					$("<textarea>", {
						type: 'text',
						id: me.createId('defects'),
						placeholder: t('Defeitos e imperfeições do personagem'),
						width: 300,
						height: 110
					})
				)
			),
			$('<tr>').append(
				$('<th>', { title: t('Clique no manual acima da janela para mais informações') } ).append(
					Player.EMOJI_MOTIVATIONS,
					t('Motivações'),
					'<br />',
					$("<textarea>", {
						type: 'text',
						id: me.createId('motivations'),
						placeholder: t('O que motiva esse personagem'),
						width: 300,
						height: 110
					})
				)
			)
		);

		addPlayerHolder.append(
			$('<tr>').append(
				$('<td>', { style: 'vertical-align: top' } ).append(
					addPlayerTable
				),
				$('<td>', { style: 'vertical-align: top' } ).append(
					addPlayerDescriptions
				)
			)
			
		);

		return addPlayerHolder;
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		let isNPC = $('#' + me.createId('is_npc')).val();
		isNPC = (isNPC == 'true') ? true : false;

		let playerOrNPC = (isNPC) ? t('NPC') : t('personagem');

		let complement = '';

		if (isNPC) {
			complement = t('Um NPC é um personagem controlado apenas pelo mestre, alguém que faz parte da aventura como um personagem que não será jogado por nenhum jogador senão o mestre');
		}

		return [
			$('<h3>').append(
				sprintf(t('Adicionar um novo %s à aventura'), playerOrNPC)
			),
			complement,
			$('<p>').append(
				sprintf(t('O sistema irá trazer automaticamente uma sugestão de total de pontos a serem preenchidos, a principio é sugerido começar com %s por atributo do jogador no total. Esses devem ser distribuidos entre todos os atributos.'), Player.SUGESTION_POINTS_PER_ATTRIBUTE)
			),
			$('<p>').append(
				sprintf(t('Clique em <b>%s</b> para distribuir igualmente a pontuação entre os atributos.'), Player.EMOJI_DISTRIBUTE)
			),
			$('<p>').append(
				t('Conforme preenche a pontuação, será exibido o total e o nível do personagem na direita em cima.')
			),
			$('<p>').append(
				t('<b>Legendas:</b> (basta deixar o mouse em cima de cada icone para aparecer o que significam)')
			),
			$('<ul>').append(
				// $('<li>').append(
				// 	sprintf(t('<b>%s Login do jogador</b> (ainda não implementado)'), User.EMOJI_LOGIN)
				// ),
				$('<li>').append(
					sprintf(t('<b>%s nome do personagem</b> (* obrigatório preencher)'), Player.EMOJI_NAME)
				),
				$('<li>').append(
					sprintf(t('<b>%s Atributo</b>'), Player.EMOJI_ATTRIBUTE)
				),
				$('<li>').append(
					sprintf(t('<b>%s Nível</b> desse atributo'), Player.EMOJI_LEVEL)
				),
				$('<li>').append(
					sprintf(t('<b>%s Pontuação</b> desse atributo, o "normal" para um jovem adulto gira em torno de 100'), Player.EMOJI_POINTS)
				),
				$('<li>').append(
					sprintf(t('<b>%s Total de pontos</b>, isso irá mudar ao longo da aventura. Alguns equipamentos e modificadores podem alterar isso'), Player.EMOJI_TOTAL_POINTS)
				)
			),
			Player.helpAttributesMeaning(isNPC),
			$('<p>').append(
				sprintf(t('<b>%s Background:</b> O jogador deve criar uma descrição para o seu personagem descrevendo seu background, da onde veio, parentes, onde morou, porque se mudou, o que gosta de fazer, o que não gosta. O mestre pode incentivar um bom background em troca de alguns pontos a mais'), Player.EMOJI_BACKGROUND)
			),
			$('<p>').append(
				sprintf(t('<b>%s Defeitos e imperfeições:</b> É sugerido ao mestre negociar mais pontos para o jogador distribuir extra em troca de ter algum defeito, quanto pior o defeito, mais pontos a ser dado ao jogador para distribuir extra.'), Player.EMOJI_DEFECTS)
			),
			$('<p>').append(
				sprintf(t('<b>%s Motivações:</b> É sugerido que o jogador crie algumas motivações para o seu personagem para que na aventura seja dado mais vida ao que o jogador persegue e o que o motiva a seguir, o que defende, o que gosta, o que persegue. Sempre que o jogador conseguir algo que o motiva, pode ser dado por exemplo um bônus de motivação em uma próxima rolagem de dados com a justificativa do personagem estar se sentindo mais confiante de si, ou até mesmo rolar novamente no caso de uma falha se for algo que o motivou muito. Pensar sempre em algo proporcional.'), Player.EMOJI_MOTIVATIONS)
			),
		];
	}

	// recalcula o nivel e total de pontos
	static reCalculateTotalPoints (boxId, attribute) {

		let me = Box.getBox(boxId);

		let basePoints = $('#' + me.createId('base_points_' + attribute)).val() || 0;
		let temporaryModifier = 0;
		let permanentModifier = 0;

		let levelInput = $('#' + me.createId('level_' + attribute));
		let totalPointsInput = $('#' + me.createId('points_' + attribute));

		let level = Player.levelCalculator(basePoints);
		let totalPoints = Player.calculateTotalPoints(basePoints, temporaryModifier, permanentModifier);

		totalPointsInput.val(totalPoints);
		levelInput.val(level);

		this.recalculateTotalPoints(boxId);
	}

	// adicionar jogador à aventura
	static addPlayer (boxId) {

		let me = Box.getBox(boxId);

		let playerLogin = $('#' + me.createId('login')).val();
		let playerGender = $("input[name='" + me.createId('gender') + "']:checked").val()
		let playerName = $('#' + me.createId('name')).val();
		let isNPC = $('#' + me.createId('is_npc')).val();

		let playerBackground = $('#' + me.createId('background')).val();
		let playerDefects = $('#' + me.createId('defects')).val();
		let playerMotivations = $('#' + me.createId('motivations')).val();

		isNPC = (isNPC == 'true') ? true : false;

		let newPlayer = new Player({
			'login': playerLogin,
			'gender': playerGender,
			'name': playerName,
			'isNPC': isNPC,
			'life': 100,
			'maxLife': 100,
			'background': playerBackground,
			'defects': playerDefects,
			'motivations': playerMotivations
		});

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

		let resultSaved = newPlayer.savePlayer();

		let saveButton = $('#' + me.createId('save'));

		if (resultSaved) {

			saveButton.val(t('Adicionado!'));
			saveButton.attr('disabled','disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

		} else {

			saveButton.val(t('Adicionar'));
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}

	// distribuir igualmente os pontos desejados entre os atributos
	static distributePoints (boxId) {

		let me = Box.getBox(boxId);

		let expectedPlayerPoints = parseInt($('#' + me.createId('expected_player_points')).val());
		let playerLevel = parseInt($('#' + me.createId('player_level')).val());

		let allAttributes = Player.ALL_ATTRIBUTES;

		let pointsPerLevel = Math.ceil(expectedPlayerPoints / allAttributes.length);
		let remainingpoints = expectedPlayerPoints % allAttributes.length;

		let playerTotalPoints = 0;

		allAttributes.forEach(function (attribute) {
			let basePointsInput = $('#' + me.createId('base_points_' + attribute));
			let pointsInput = $('#' + me.createId('points_' + attribute));

			let attributePoints = pointsPerLevel;

			if (remainingpoints >= 1) {
				attributePoints += 1;
				remainingpoints -= 1;
			}

			playerTotalPoints += attributePoints;

			basePointsInput.val(attributePoints);
			pointsInput.val(attributePoints);
		});

		this.recalculateTotalPoints(boxId);
	}

	// recalcular o total de pontos do jogador
	static recalculateTotalPoints (boxId) {

		let me = Box.getBox(boxId);

		let totalPlayerPointsInput = $('#' + me.createId('total_player_points'));
		let playerLevelInput = $('#' + me.createId('player_level'));

		let playerTotalPoints = 0;

		let allAttributes = Player.ALL_ATTRIBUTES;

		allAttributes.forEach(function (attribute) {

			let levelInput = $('#' + me.createId('level_' + attribute));

			let basePoints = parseInt($('#' + me.createId('base_points_' + attribute)).val());

			let level = Player.levelCalculator(basePoints);

			levelInput.val(level);

			playerTotalPoints += basePoints;
		});

		let pointsPerAttributeAvg = Math.round(playerTotalPoints / allAttributes.length);

		totalPlayerPointsInput.val(playerTotalPoints);
		playerLevelInput.val(Player.levelCalculator(pointsPerAttributeAvg));
	}
}

Box.boxes[AddPlayer.windowName] = AddPlayer;
