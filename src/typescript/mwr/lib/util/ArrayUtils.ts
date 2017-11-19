module MWRLib
{
	export class ArrayUtils
	{

		/**
		 * Creates a map out of an array be choosing what property to key by
		 * @param {object[]} array Array that will be converted into a map
		 * @param {string} prop Name of property to key by
		 * @return {object} The mapped array. Example:
		 *     mapFromArray([{a:1,b:2}, {a:3,b:4}], 'a')
		 *     returns {1: {a:1,b:2}, 3: {a:3,b:4}}
		 */
		private static mapFromArray( array , prop )
		{
			var map = {};
			for ( var i = 0 ; i < array.length ; i++ )
			{
				map[array[i][prop]] = array[i];
			}
			return map;
		}

		/**
		 * @param {object[]} o old array of objects
		 * @param {object[]} n new array of objects
		 * @param {string} field field to compare against
		 * @param {object} comparator An object with changes
		 */
		public static getDelta( o , n , field , comparator )
		{
			console.log( 'getDelta() >> arguments: ' , arguments );

			var delta = {
				added:[] ,
				deleted:[] ,
				changed:[]
			};
			var mapO = ArrayUtils.mapFromArray( o , field );
			var mapN = ArrayUtils.mapFromArray( n , field );
			for ( var id in mapO )
			{
				if ( !mapN.hasOwnProperty( id ) )
				{
					delta.deleted.push( mapO[id] );
				}
				else if ( !comparator( mapN[id] , mapO[id] ) )
				{
					delta.changed.push( mapN[id] );
				}
			}

			for ( var id in mapN )
			{
				if ( !mapO.hasOwnProperty( id ) )
				{
					delta.added.push( mapN[id] )
				}
			}
			return delta;
		}
	}
}