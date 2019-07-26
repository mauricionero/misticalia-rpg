class Menu extends RModel {

	static getMenu () {

		// sera retornado do server, ira mudar de acordo com a role da aventura
		return [
			{
				id: 1,
				name: 'Sistema',
				emoji: '⚙️',
				action_id: '',
				roles: [ Adventure.ROLE_UNDEFINED, Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
				class: '',
				items: [
					{
						id: 2,
						name: 'Nova aventura',
						single_ton: true,
						emoji: '➕',
						action_id: 'new_adventure',
						roles: [ Adventure.ROLE_UNDEFINED, Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
						class: 'open_box',
						items: [
						]
					},
					{
						id: 3,
						name: 'Abrir aventura',
						single_ton: true,
						emoji: '📂',
						action_id: 'open_adventure',
						roles: [ Adventure.ROLE_UNDEFINED, Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
						class: 'open_box',
						items: [
						]
					}
				]
			},
			{
				id: 4,
				name: 'Acessorios',
				emoji: '🔧',
				action_id: '',
				roles: [ Adventure.ROLE_UNDEFINED, Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
				class: '',
				items: [
					{
						id: 5,
						name: 'Dados',
						emoji: '🎲',
						action_id: 'add_dice',
						roles: [ Adventure.ROLE_UNDEFINED, Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
						class: 'open_box',
						items: [
						]
					}
				]
			},
			{ // role de mestre da aventura atual
				id: 6,
				name: '%ADVENTURE_NAME%',
				emoji: '♚️',
				action_id: '',
				roles: [ Adventure.ROLE_MASTER ],
				class: '',
				items: [
					{
						id: 7,
						name: 'Jogadores',
						emoji: '♟️',
						action_id: '',
						roles: [ Adventure.ROLE_MASTER ],
						class: '',
						items: [
							{
								id: 8,
								name: 'Jogador',
								emoji: '➕',
								action_id: 'add_player',
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							},
							{
								id: 9,
								name: 'Listar jogadores',
								single_ton: true,
								emoji: '📝',
								action_id: 'list_players',
								options: { filterAdventureId: true },
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							}
						]
					},
					{
						id: 12,
						name: t('Equipamentos'),
						emoji: '⛨',
						action_id: '',
						single_ton: true,
						roles: [ Adventure.ROLE_MASTER ],
						class: '',
						items: [
							{
								id: 14,
								name: t('Equipamento'),
								emoji: '➕',
								action_id: 'add_equipament',
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							},
							{
								id: 15,
								name: t('Listar equipamentos'),
								emoji: '⛨',
								action_id: 'list_equipaments',
								options: { filterAdventureId: true },
								single_ton: true,
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							}
						]
					},
					{
						id: 10,
						name: 'Batalha',
						emoji: '⚔️',
						action_id: 'new_battle',
						options: { filterAdventureId: true },
						roles: [ Adventure.ROLE_MASTER ],
						class: 'open_box',
						items: [
						]
					},
					{
						id: 16,
						name: t('NPCs'),
						emoji: '😐',
						action_id: '',
						single_ton: true,
						roles: [ Adventure.ROLE_MASTER ],
						class: '',
						items: [
							{
								id: 17,
								name: t('NPC'),
								emoji: '➕',
								action_id: 'add_player',
								options: { isNPC: true },
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							},
							{
								id: 18,
								name: t('Listar NPCs'),
								emoji: '👥',
								action_id: 'list_players',
								options: { filterAdventureId: true, isNPC: true },
								single_ton: true,
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							}
						]
					}
				]
			},
			{
				id: 11,
				name: 'Meu usuário',
				emoji: '👤',
				action_id: '',
				roles: [ Adventure.ROLE_UNDEFINED, Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
				class: '',
				items: [
				]
			}
		]
	}

}
