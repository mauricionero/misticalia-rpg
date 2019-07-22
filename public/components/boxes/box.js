class Box {

	constructor() {
		this.boxWidth = 'auto';
		this.boxHeight = 'auto';

		this.positionMy = 'center top';
		this.positionAt = 'center top';
		this.positionOf = '#master-table';
	}

	static openDialog (id, title, options = {}) {

		var dialogId = "dialog_" + id;

		// se tiver especificado um id para a dialog
		if (options['windowId']) {
			dialogId = options['windowId'];
		}

		console.log('dialogId', dialogId);

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

		var klass = new boxes[id];

		$("#master-table").append(
			$("<div>", {
				id: dialogId,
				title: title
			}).html(klass.boxContent(options)) // window[id]()
		);
		
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
		        }
			});
		});

		return true;
	}

}