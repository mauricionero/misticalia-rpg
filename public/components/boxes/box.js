class Box {

	static boxes = [];

	static allDialogs = [];

	constructor() {
		this.boxWidth = 'auto';
		this.boxHeight = 'auto';

		this.positionMy = 'center top';
		this.positionAt = 'center top';
		this.positionOf = '#master-table';

		this.randomId = Math.floor(Math.random() * 10000);
		this.boxId = this.createId('box_id');

		Box.keepBox(this, this.boxId);
	}

	// criar um id para usar na dialog em algum lugar
	createId (idPart) {
		return this.constructor.name.toLowerCase() + '_' + this.randomId + '_' + idPart;
	}

	// verificar se existe alguma ajuda definida na Box solicitada
	static helpDialog (boxId) {
		let me = Box.getBox(boxId);

		if (typeof me.helpInfo === 'function') {

			let dialogId = me.createId('help_dialog');

			$("#master-table").append(
				$("<div>", {
					id: dialogId,
					title: '? ' + me.title + ' ?'
				}).html(me.helpInfo()) // window[id]()
			);

			$('#'+dialogId).dialog({
				position: {
					my: 'right top',
					at: 'right top',
					of: me.positionOf
				},
				show: { effect: "fade", duration: 400 },
				close: function(event, ui)
				{
					$(this).dialog("close");
					$(this).remove();
				}
			}).css("background-color", "#eff");
		} else {
			alert(t('Sem ajuda para essa funcionalidade ainda :('));
		}
	}

	// guardar a instancia da box relacionado a um id achavel
	static keepBox (box, boxId) {
		Box.allDialogs[boxId] = box;
	}

	// resgatar a instancia de uma box relacionado a um id achavel
	static getBox (boxId) {
		return Box.allDialogs[boxId];
	}

	// abrir a dialog
	static openDialog (id, title, options = {}) {

		var dialogId = "dialog_" + id;

		// se tiver especificado um id para a dialog
		if (options['windowId']) {
			dialogId = options['windowId'];
		}

		// ja existe ?
		if ($('#' + dialogId).hasClass('ui-dialog-content')) {

			// se for janela unica, nao deixa abrir mais
			if (options['singleTon']) {
				// chamar atenção
				$('#' + dialogId).dialog("open");
				$('#' + dialogId).effect( "shake" );
				return dialogId;
			} else {
				$('#' + dialogId).effect( "fade" );
			}
		}

		var klass = new Box.boxes[id];
		klass.dialogId = dialogId;
		klass.title = title;

		var boxId = klass.boxId;

		$("#master-table").append(
			$("<div>", {
				id: dialogId,
				title: title
			}).html(klass.boxContent(options)) // window[id]()
		);

		if (typeof klass.callBackRender === 'function'){
			klass.callBackRender();
		}
		
		$(function() {
			$('#'+dialogId).dialog({
				position: {
					my: klass.positionMy,
					at: klass.positionAt,
					of: klass.positionOf
				},
				show: { effect: "fade", duration: 500 },
				width: klass.boxWidth,
				height: klass.boxHeight,
				close: function(event, ui)
				{
					$(this).dialog("close");
					$(this).remove();
				},
				create: function (event, ui) {
					if (typeof klass.helpInfo !== 'function') {
						return true;
					}

					let titleBar = $(this).parent().children('.ui-dialog-titlebar');
					titleBar.children('.ui-dialog-title').attr('style', 'width: 80%');

					let closeButton = $(this).parent().children('.ui-dialog-titlebar').children('.ui-button');

					let infoButton = $('<button>', {
						type: 'button',
						class: closeButton.attr('class'),
						style: 'padding: 1px; width: 20px; left: -11px; float: right',
						onclick: 'Box.helpDialog("' + boxId + '")',
						title: t('Info')
					});

					infoButton.removeClass('ui-dialog-titlebar-close');
					infoButton.addClass('ui-dialog-titlebar-info');

					infoButton.append(
						$('<span>', {
							class: 'ui-icon ui-icon-info'
						}),
						$('<span>', {
							class: 'ui-button-icon-space'
						}),
						t('Info')
					);

					titleBar.append(infoButton)
				}
			});
		});

		return true;
	}

}