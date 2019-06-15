$(window).on('load', function() {
	$( "#add-dice" ).click(function() {
		$( "#master-table" ).append(
			$("<div>", {
				id: "dialog_dice",
				title: "Dados"
			}).html('Hello dice')
		)
		
		$( function() {
		  $( "#dialog_dice" ).dialog();
		} );
	});
});
