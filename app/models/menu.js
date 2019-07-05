class Menu extends RModel {

	static getMenu () {
		return [
			{
				id: 1,
				name: 'Sistema',
				emoji: '⚙️',
				action_id: '',
				class: '',
				items: [
					{
						id: 2,
						name: 'Nova aventura',
						emoji: '➕',
						action_id: 'new_adventure',
						class: 'open_box',
						items: [
						]
					},
					{
						id: 3,
						name: 'Abrir aventura',
						emoji: '📂',
						action_id: 'open_adventure',
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
				class: '',
				items: [
					{
						id: 5,
						name: 'Dados',
						emoji: '🎲',
						action_id: 'add_dice',
						class: 'open_box',
						items: [
						]
					}
				]
			},
			{
				id: 6,
				name: 'Mestre',
				emoji: '♚️',
				action_id: '',
				class: '',
				items: [
					{
						id: 7,
						name: 'Jogadores',
						emoji: '♟️',
						action_id: '',
						class: '',
						items: [
							{
								id: 8,
								name: 'Add',
								emoji: '➕',
								action_id: '',
								class: '',
								items: [
								]
							},
							{
								id: 9,
								name: 'Listar',
								single_ton: true,
								emoji: '📝',
								action_id: 'list_players',
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
						class: 'open_box',
						items: [
						]
					}
				]
			},
			{
				id: 11,
				name: 'Meu usuário',
				emoji: '👤',
				action_id: '',
				class: '',
				items: [
				]
			}
		]
	}

}
