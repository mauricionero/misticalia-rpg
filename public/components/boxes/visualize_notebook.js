class VisualizeNotebook extends Box {

	static get windowName () { return 'visualize_notebook' };

	boxContent (options = {}) {

		let me = this;

		let noteId = options['notebookId'] || null;
		this.noteId = noteId;

		let originBoxId = options['originBoxId'] || '';
		this.originBoxId = originBoxId;

		let boxId = me.boxId;

		let note = Notebook.getNotebook(noteId);

		let noteText = '';
		let noteTitle = '';

		console.log('note', note);

		if (note) {
			noteId = note['id'];
			noteTitle = note['title'];
			noteText = note['text'];
		}
		console.log('noteTitle', noteTitle);
		console.log('noteText', noteText);

		return $('<div>').append(
			$('<input>', {
				type: 'hidden',
				id: me.createId('note_id'),
				value: noteId
			}),
			$('<b>').append(
				Notebook.EMOJI_TITLE + ' ' + t('Título:') + ' '
			),
			$('<input>', {
				type: 'text',
				id: me.createId('note_title'),
				value: noteTitle,
				placeholder: t('Título')
			}),
			'<br />',
			$('<textarea>', { id: me.createId('note_richtext') } ).html(noteText),
			'<br />',
			$('<input>', {
				type: 'button',
				id: me.createId('save_note'),
				title: t('Adicionar item ao inventário desse personagem'),
				onclick: 'VisualizeNotebook.saveNote("' + boxId + '", "' + originBoxId + '")',
				value: Notebook.EMOJI_SAVE + ' ' + t('Salvar')
			})
		);
	}

	// executa após printar a janela
	callBackRender () {
		this.setRichText();
	}

	setRichText () {

		let me = this;

		$('#' + me.createId('note_richtext')).richText(Notebook.richtextConfig());
	}

	// Box padrao de ajuda
	helpInfo () {
		let me = this;

		return [
			$('<h3>').append(
				t('Inserir anotações nesse caderno')
			)
		];
	}


	// salvar anotações
	static saveNote (boxId, originBoxId = null) {

		let me = Box.getBox(boxId);

		let noteId = parseInt($('#' + me.createId('note_id')).val() || 0);
		let noteTitle = $('#' + me.createId('note_title')).val();
		let noteText = $('#' + me.createId('note_richtext')).val();

		let notebook = new Notebook({
			'title': noteTitle,
			'text': noteText
		});

		console.log('noteId', noteId);

		// caso esteja editando
		if (noteId) {
			notebook['id'] = noteId;
		}

		let resultSaved = notebook.saveNote();

		let saveButton = $('#' + me.createId('save_note'));

		if (resultSaved) {

			saveButton.val(t('Salvo'));
			saveButton.attr('disabled','disabled');
			saveButton.animate({ backgroundColor: "#3f3"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');

			// atualizar listagem da dialog que originou essa dialog
			if (originBoxId) {
				let originBox = Box.getBox(originBoxId);
				originBox.callBackRender();
			}

		} else {

			saveButton.val(t('Salvar'));
			saveButton.animate({ backgroundColor: "#f33"}, 300).animate({ backgroundColor: "none"}, 300).removeAttr('disabled');
		}
	}

	// abrir visualização de detalhes do notebook
	static visualizeNotebook (notebookId, originBoxId) {

		let notebook = Notebook.getNotebook(notebookId);

		// se nao estiver preenchido, eh pq provavelmente nao veio dessa dialog, buscar da localStorage
		if (! notebook) {
			notebook = Notebook.getNotebook(notebookId);
		}

		let notebookTitle = notebook['title'];

		let windowTitle = Notebook.EMOJI_VISUALIZE + ' ' + notebookTitle;

		let options = {
			notebookId: notebookId,
			singleTon: true,
			originBoxId: originBoxId,
			windowId: VisualizeNotebook.windowName + '_' + notebookId
		};

		Box.openDialog(VisualizeNotebook.windowName, windowTitle, options);
	}

}

Box.boxes[VisualizeNotebook.windowName] = VisualizeNotebook;
