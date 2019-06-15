$(window).on('load', function() {
	$( "#add-dice" ).click(function() {
		$( "#master-table" ).append(
			$("<div>", {
				id: "dialog_dice",
				title: "Dados"
			})
		)
		
		$( function() {
		  $( "#dialog_dice" ).dialog();
		} );
	});
});
