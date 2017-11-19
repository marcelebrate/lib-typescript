module MWRLib
{
	export class NumberUtils
	{
		public static getRandomNumber( pMax:number , pMin:number = 0 ):number
		{
			if ( pMax < pMin )
				return -1;

			return pMin + ( Math.random() * ( pMax - pMin ) );
		}

		public static getRandomInteger( pMax:number , pMin:number = 0 ):number
		{
			if ( pMax < pMin )
				return -1;

			return pMin + Math.floor( Math.random() * ( pMax - pMin + 1 ) );
		}

	}
}
