class Notebook extends RModel {
   
	static get EMOJI_MAIN () { return '📚' };
	static get EMOJI_SINGLE () { return '📕' };
   
	static get EMOJI_NEW () { return '✚' }
	static get EMOJI_VISUALIZE () { return '📖' }
	static get EMOJI_SAVE () { return '💾' };

	static get EMOJI_TITLE () { return '🔖' }

	static richtextTranslations () {
		return {
			'title': 'Title',
			'white': 'White',
			'black': 'Black',
			'brown': 'Brown',
			'beige': 'Beige',
			'darkBlue': 'Dark Blue',
			'blue': 'Blue',
			'lightBlue': 'Light Blue',
			'darkRed': 'Dark Red',
			'red': 'Red',
			'darkGreen': 'Dark Green',
			'green': 'Green',
			'purple': 'Purple',
			'darkTurquois': 'Dark Turquois',
			'turquois': 'Turquois',
			'darkOrange': 'Dark Orange',
			'orange': 'Orange',
			'yellow': 'Yellow',
			'imageURL': 'Image URL',
			'fileURL': 'File URL',
			'linkText': 'Link text',
			'url': 'URL',
			'size': 'Size',
			'responsive': '<a href="https://www.jqueryscript.net/tags.php?/Responsive/">Responsive</a>',
			'text': 'Text',
			'openIn': 'Open in',
			'sameTab': 'Same tab',
			'newTab': 'New tab',
			'align': 'Align',
			'left': 'Left',
			'center': 'Center',
			'right': 'Right',
			'rows': 'Rows',
			'columns': 'Columns',
			'add': 'Add',
			'pleaseEnterURL': 'Please enter an URL',
			'videoURLnotSupported': 'Video URL not supported',
			'pleaseSelectImage': 'Please select an image',
			'pleaseSelectFile': 'Please select a file',
			'bold': 'Bold',
			'italic': 'Italic',
			'underline': 'Underline',
			'alignLeft': 'Align left',
			'alignCenter': 'Align centered',
			'alignRight': 'Align right',
			'addOrderedList': 'Add ordered list',
			'addUnorderedList': 'Add unordered list',
			'addHeading': 'Add Heading/title',
			'addFont': 'Add font',
			'addFontColor': 'Add font color',
			'addFontSize' : 'Add font size',
			'addImage': 'Add image',
			'addVideo': 'Add video',
			'addFile': 'Add file',
			'addURL': 'Add URL',
			'addTable': 'Add table',
			'removeStyles': 'Remove styles',
			'code': 'Show HTML code',
			'undo': 'Undo',
			'redo': 'Redo',
			'close': 'Close'
		}
	}

	// configuracoes do campo de richtext para as anotacoes
	static richtextConfig () {
		return {
			// text formatting
			bold: true,
			italic: true,
			underline: true,

			// text alignment
			leftAlign: true,
			centerAlign: true,
			rightAlign: true,

			// lists
			ol: true,
			ul: true,

			// title
			heading: true,

			// fonts
			fonts: false,
			fontColor: true,
			fontSize: true,

			// uploads
			imageUpload: false,
			fileUpload: false,

			// link
			urls: true,

			// tables
			table: true,

			// code
			removeStyles: true,
			code: false,

			// colors
			colors: [],

			// translations
			translations: Notebook.richtextTranslations(),

			// dev settings
			useSingleQuotes: false,
			height: 0,
			heightPercentage: 0,
			id: "",
			class: "",
			useParagraph: false
		};
	}


	// retorna todos os itens da aventura atual
	static getAllNotebooksCurrentAdventure (options) {

		let allCurrentnotebooks = this.getAllFromCurrentAdventure(options);

		return allCurrentnotebooks;
	}

	// pegar anotacao
	static getAllNotebooks () {
		let notebooks = Notebook.getAll();

		return notebooks;
	}

	// retorna 1 anotacao especifica pelo id
	static getNotebook (noteId) {
		let allnotes = this.getAllNotebooks();

		return allnotes.filter(function ( note ) { return note['id'] == noteId })[0];
	}


	// salvar a anotação (editar ou criar uma nova)
	saveNote () {

		return this.save();
	}
}

RModel.models['Notebook'] = Notebook;
