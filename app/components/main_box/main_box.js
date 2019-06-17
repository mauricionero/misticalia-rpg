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
				position: { my: "left", at: "left", of: window },
				show: { effect: "fade", duration: 500 },
				width: klass.boxWidth,
				height: klass.boxHeight
			});
		});
	});

});
