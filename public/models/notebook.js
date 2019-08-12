class Notebook extends RModel {
   
	static get EMOJI_MAIN () { return '📚' };
	static get EMOJI_SINGLE () { return '📕' };
   
	static get EMOJI_NEW () { return '✚' }
	static get EMOJI_VISUALIZE () { return '📖' }
	static get EMOJI_SAVE () { return '💾' };

	static get EMOJI_TITLE () { return '🔖' }

	static richtextTranslations () {
		return {
			'title': t('Título'),
			'white': t('Branco'),
			'black': t('Preto'),
			'brown': t('Marrom'),
			'beige': t('Beige'),
			'darkBlue': t('Azul escuro'),
			'blue': t('Azul'),
			'lightBlue': t('Azul claro'),
			'darkRed': t('Vermellho escuro'),
			'red': t('Red'),
			'darkGreen': t('Verde escuro'),
			'green': t('Verde'),
			'purple': t('Roxo'),
			'darkTurquois': t('Turquesa escuro'),
			'turquois': t('Turquesa'),
			'darkOrange': t('Laranja escuro'),
			'orange': t('Laranja'),
			'yellow': t('Amarelo'),
			'imageURL': t('URL da imagem'),
			'fileURL': t('URL do arquivo'),
			'linkText': t('Linkar texto'),
			'url': t('URL'),
			'size': t('Tamanho'),
			'responsive': t('Responsivo'), // https://www.jqueryscript.net/tags.php?/Responsive/
			'text': t('Texto'),
			'openIn': t('Abrir em'),
			'sameTab': t('Mesma aba'),
			'newTab': t('Nova aba'),
			'align': t('Alinhamento'),
			'left': t('Esquerda'),
			'center': t('Centro'),
			'right': t('Direita'),
			'rows': t('Linhas'),
			'columns': t('Colunas'),
			'add': t('Adicionar'),
			'pleaseEnterURL': t('Por favor preencha uma URL'),
			'videoURLnotSupported': t('URL do video não suportado'),
			'pleaseSelectImage': t('Por favor selecione uma imagem'),
			'pleaseSelectFile': t('Por favor selecione um arquivo'),
			'bold': t('Negrito'),
			'italic': t('Itálico'),
			'underline': t('Sublinhado'),
			'alignLeft': t('Alinhar a esquerda'),
			'alignCenter': t('Alinhar centralizado'),
			'alignRight': t('Alinhar a direita'),
			'addOrderedList': t('Adicionar lista ordenada'),
			'addUnorderedList': t('Adicionar lista não ordenada'),
			'addHeading': t('Adicionar cabeçalho / título'),
			'addFont': t('Adicionar fonte'),
			'addFontColor': t('Adicionar cor da fonte'),
			'addFontSize' :t( 'Adicionar tamanho da fonte'),
			'addImage': t('Adicionar imagem'),
			'addVideo': t('Adicionar video'),
			'addFile': t('Adicionar arquivo'),
			'addURL': t('Adicionar URL'),
			'addTable': t('Adicionar tabela'),
			'removeStyles': t('Remove estilo'),
			'code': t('Mostrar código HTML'),
			'undo': t('Desfazer'),
			'redo': t('Refazer'),
			'close': t('Fechar')
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
