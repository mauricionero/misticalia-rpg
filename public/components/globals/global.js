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

// converter peso sendo recebido em gramas em algo mais legivel
function weightHuman (weight) {
	var measureUnit = 'g';

	if (! weight) {
		return '?';
	}

	if (weight >= 1000 && weight < 10000) {
		weight = Math.round(weight / 100) / 10; // 1 casa decimal
		measureUnit = 'Kg';
	} else if (weight >= 10000 && weight < 1000000) {
		weight = Math.round(weight / 1000); // sem casa decimal
		measureUnit = 'Kg';
	} else if (weight >= 1000000 && weight < 10000000) {
		weight = Math.round(weight / 100000) / 10; // 1 casa decimal
		measureUnit = 'T';
	} else if (weight >= 10000000) {
		weight = Math.round(weight / 100000); // sem casa decimal
		measureUnit = 'T';
	}

	return weight + measureUnit;
}