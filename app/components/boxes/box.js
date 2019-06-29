class Box {
	boxWidth = 300;
	boxHeight = 'auto';

	positionMy = 'center top';
	positionAt = 'center top';
	positionOf = '#master-table';


	static openDialog (id, title, options = {}) {

		var dialogId = "dialog_" + id;

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
				height: klass.boxHeight
			});
		});
	}

}