$(window).on('load', function() {

	$(".open_box").click(function() {

		var dialogId = "dialog_"+this.id;

		var klass = new boxes[this.id];

		console.log('klass', klass);

		$("#master-table").append(
			$("<div>", {
				id: dialogId,
				title: this.innerHTML
			}).html(klass.boxContent()) // window[this.id]()
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
	});

});
