$(window).on('load', function() {

	$(".open_box").click(function() {

		var dialogId = "dialog_"+this.id;

		$("#master-table").append(
			$("<div>", {
				id: dialogId,
				title: this.innerHTML
			}).html(window[this.id]())
		);
		
		$(function() {
			$('#'+dialogId).dialog({
				position: { my: "left", at: "left", of: window },
				show: { effect: "fade", duration: 500 }
			});
		});
	});

});
