module MWRLib
{
	export class LocalStorage
	{
		/**
		 * Saves the specified object as a JSON-serialized string to local storage.
		 * @param pKey
		 * @param pObject
		 */
		public static save( pKey:string , pObject:any ):void
		{
			localStorage.setItem( pKey , JSON.stringify( pObject ) );
		}

		/**
		 * Loads the specified key, returning a deserialized JSON object.
		 * @param pKey
		 * @returns {any}
		 */
		public static load( pKey:string ):any
		{
			return JSON.parse( localStorage.getItem( pKey ) );
		}

		/**
		 * Removes the specified local storage key.
		 * @param pKey
		 */
		public static remove( pKey:string ):void
		{
			localStorage.removeItem( pKey );
		}

		/**
		 * Clears all local storage for the current domain/origin.
		 */
		public static clear():void
		{
			localStorage.clear();
		}
	}
}