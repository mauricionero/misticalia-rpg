$(window).on('load', function() {
	$( "#add-dice" ).click(function() {
		$( "#master-table" ).append('<div id="dialog_dice" title="Dados">hello dice</div>' );
		
		$( function() {
		  $( "#dialog_dice" ).dialog();
		} );
	});
});

