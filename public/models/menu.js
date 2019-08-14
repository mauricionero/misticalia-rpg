class Menu extends RModel {

	static getMenu () {

		// sera retornado do server, ira mudar de acordo com a role da aventura
		return [
			{
				id: 1,
				name: 'Aventuras',
				emoji: Adventure.EMOJI_MAIN,
				action_id: '',
				roles: [ Adventure.ROLE_UNDEFINED, Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
				class: '',
				items: [
					{
						id: 2,
						name: 'Nova aventura',
						single_ton: true,
						emoji: Adventure.EMOJI_ADD,
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
						emoji: Adventure.EMOJI_OPEN,
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
					},
					{
						id: 28,
						name: t('Ver perícias'),
						emoji: Expertise.EMOJI_LIST_GLOBAL,
						action_id: 'list_expertises',
						options: { filterAdventureId: false, isGlobal: true, windowId: 'list_global_expertises' },
						single_ton: true,
						roles: [ Adventure.ROLE_UNDEFINED, Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
						class: 'open_box',
						items: [
						]
					}
				]
			},
			{ // papel de mestre da aventura atual
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
						emoji: Player.EMOJI_MAIN,
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
								emoji: Player.EMOJI_LIST,
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
						id: 16,
						name: t('NPCs'),
						emoji: Player.EMOJI_NPC_MAIN,
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
								options: { filterAdventureId: true, isNPC: true, windowId: 'list_npcs' },
								single_ton: true,
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							}
						]
					},
					{
						id: 25,
						name: t('Perícias'),
						emoji: Expertise.EMOJI_MAIN,
						action_id: '',
						single_ton: true,
						roles: [ Adventure.ROLE_MASTER ],
						class: '',
						items: [
							{
								id: 26,
								name: t('Perícia'),
								emoji: '➕',
								action_id: 'visualize_expertise',
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							},
							{
								id: 27,
								name: t('Perícias da aventura'),
								emoji: Expertise.EMOJI_LIST,
								action_id: 'list_expertises',
								options: { filterAdventureId: true, windowId: 'list_expertises_adventure' },
								single_ton: true,
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
						emoji: Equipament.EMOJI_MAIN,
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
						id: 19,
						name: t('Itens'),
						emoji: Item.EMOJI_MAIN,
						action_id: '',
						single_ton: true,
						roles: [ Adventure.ROLE_MASTER ],
						class: '',
						items: [
							{
								id: 20,
								name: t('Item'),
								emoji: '➕',
								action_id: 'add_item',
								roles: [ Adventure.ROLE_MASTER ],
								class: 'open_box',
								items: [
								]
							},
							{
								id: 21,
								name: t('Listar itens'),
								emoji: Item.EMOJI_MAIN,
								action_id: 'list_items',
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
						emoji: Battle.EMOJI_MAIN,
						action_id: 'new_battle',
						options: { filterAdventureId: true },
						roles: [ Adventure.ROLE_MASTER ],
						class: 'open_box',
						items: [
						]
					}
				]
			},
			{
				id: 22,
				name: t('Anotações'),
				emoji: Notebook.EMOJI_MAIN,
				action_id: '',
				single_ton: true,
				roles: [ Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
				class: '',
				items: [
					{
						id: 23,
						name: t('Caderno'),
						emoji: Notebook.EMOJI_NEW,
						action_id: 'visualize_notebook',
						roles: [ Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
						class: 'open_box',
						items: [
						]
					},
					{
						id: 24,
						name: t('Cadernos'),
						emoji: Notebook.EMOJI_SINGLE,
						action_id: 'list_notebooks',
						options: { filterAdventureId: true },
						single_ton: true,
						roles: [ Adventure.ROLE_PLAYER, Adventure.ROLE_MASTER ],
						class: 'open_box',
						items: [
						]
					}
				]
			},
			{
				id: 11,
				name: 'Ajuda',
				emoji: 'ℹ️',
				action_id: 'global_help',
				roles: [ Adventure.ROLE_UNDEFINED ],
				class: 'open_box',
				items: [
				]
			}
		]
	}
}

RModel.models['Menu'] = Menu;
