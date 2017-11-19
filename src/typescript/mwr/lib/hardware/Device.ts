module MWRLib
{
	export class Device
	{
		public static vibrate( pPattern:any ):void
		{
			try
			{
				navigator['vibrate']( [700] );
			}
			catch ( pError )
			{
				console.error( 'Device.vibrate() >> ERROR: ' + pError.message );
			}
		}

		public static playSound( pSoundURL:string ):void
		{

		}

		public static setScreenBrightness( pValue:number ):void
		{

		}
	}
}