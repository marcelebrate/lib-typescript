app.filter( 'reverse' , function () {
	return function ( pItems )
	{
		return pItems.slice().reverse();
	};
} );

app.filter( 'greaterThan' , function( pProperty , pValue ){
	return function( pItems )
	{
		var lReturn = [];
		var max = pItems.length;
		for ( var i = 0 ; i < max ; i++ )
		{
			if ( pItems[i][pProperty] > pValue )
				lReturn.push( pItems[i] );
		}
		pItems = lReturn;
		return pItems;
	}
});

app.filter( 'lessThan' , function( pProperty , pValue ){
	return function( pItems )
	{
		var lReturn = [];
		var max = pItems.length;
		for ( var i = 0 ; i < max ; i++ )
		{
			if ( pItems[i][pProperty] < pValue )
				lReturn.push( pItems[i] );
		}
		pItems = lReturn;
		return pItems;
	}
});

app.filter('range', function() {
	return function(input, start, end) {
		start = parseInt(start);
		end = parseInt(end);
		var direction = (start <= end) ? 1 : -1;
		while (start != end) {
			input.push(start);
			start += direction;
		}
		return input;
	};
});
