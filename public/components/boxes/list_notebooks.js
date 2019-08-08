class ListNotebooks extends Box {

	static get windowName () { return 'list_notebooks' };

	boxContent (options = {}) {

		let me = this;
		
		let boxId = me.boxId;

		this.options = options;

		let listNotebookDiv = $('<div>', { id: me.createId('div_notebook') } );

		return listNotebookDiv;
	}

	// executa após printar a janela
	callBackRender () {
		this.listNotebooks();
	}

	// listar os notebooks
	listNotebooks () {

		let me = this;
		
		let boxId = me.boxId;

		let options = this.options;

		let listNotebookDiv = $('#' + me.createId('div_notebook'));

		let allNotebooks = [];

		// filtrar se eh npc ou nao
		let optionFilter = {
			'order': {
				'title': 'ASC'
			}
		}

		// se deve filtrar por aventura
		if (options['filterAdventureId']) {
			allNotebooks = Notebook.getAllNotebooksCurrentAdventure(optionFilter);
		} else {
			allNotebooks = Notebook.getAllNotebooks(optionFilter);
		}

		let listNotebookTable = $("<table>");

		// titulo das colunas na tabela
		listNotebookTable.append(
			$("<tr>").append(
				$("<th>", { title: t('Título') }).append(
					Notebook.EMOJI_TITLE
				),
				$("<th>", { title: t('Detalhes') }).append(
					Notebook.EMOJI_VISUALIZE
				)
			)
		);

		allNotebooks.forEach(function (notebook) {
			
			listNotebookTable.append(
				$("<tr>").append(
					$("<td>").append(
						notebook['title'],
						$("<input>", {
							type: 'hidden',
							id: me.createId('title_' + notebook['id']),
							disabled: 'disabled',
							value: notebook['title']
						})
					),
					$("<td>").append(
						$("<input>", {
							type: 'button',
							id: me.createId('visualize_' + notebook['id']),
							onclick: 'VisualizeNotebook.visualizeNotebook("' + notebook['id'] + '", "' + boxId + '")',
							value: Notebook.EMOJI_VISUALIZE
						})
					)
				)
			)
		});

		listNotebookDiv.html(listNotebookTable);
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Listar notebookos da aventura')
			),
			sprintf(t('Para ver os modificadores de um notebooko, clique em <b>%s</b>'), Notebook.EMOJI_VISUALIZE)
		];
	}

}

Box.boxes[ListNotebooks.windowName] = ListNotebooks;
