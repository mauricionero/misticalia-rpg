function sprintf( format )
{
	for( var i=1; i < arguments.length; i++ ) {
		format = format.replace( /%s/, arguments[i] );
	}
	return format;
}