$(window).on('load', function() {

	$(".open_box").click(function() {

		Box.openDialog(this.id, this.innerHTML);
	});

});
