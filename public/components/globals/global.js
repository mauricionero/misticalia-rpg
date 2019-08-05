function sprintf (format)
{
	for( var i=1; i < arguments.length; i++ ) {
		format = format.replace( /%s/, arguments[i] );
	}
	return format;
}

function processVisualResultInput (resultInput, resultValue) {

	resultInput.val(resultValue);

	// mudar cor conforme resultado
	// se resultado positivo
	if (resultValue > 0) {
		resultInput.addClass('positive_result');
		resultInput.removeClass('negative_result');
		resultInput.removeClass('neutral_result');

	// resultado negativo
	} else if (resultValue < 0) {
		resultInput.removeClass('positive_result');
		resultInput.addClass('negative_result');
		resultInput.removeClass('neutral_result');

	// exatamente o que precisava...
	} else {
		resultInput.removeClass('positive_result');
		resultInput.removeClass('negative_result');
		resultInput.addClass('neutral_result');
	}
}
