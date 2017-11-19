module MWRLib
{
	export class Heartbeat
	{
		public static intervalDuration:number = 300;

		private static _isRunning:boolean = false;
		public static get isRunning():boolean{
			return Heartbeat._isRunning;
		}

		private static _functions:Function[] = [];

		private static _interval:number;

		public static start():void
		{
			Heartbeat._isRunning = true;

			Heartbeat._interval = setInterval( Heartbeat._intervalHandler , Heartbeat.intervalDuration );
		}

		public static stop():void
		{
			Heartbeat._isRunning = false;
			clearInterval( Heartbeat._interval );
		}

		public static addFunction( pFunction:Function ):void
		{
			Heartbeat._functions.push( pFunction );
		}

		public static removeFunction( pFunction:Function ):void
		{
			Heartbeat._functions = Heartbeat._functions.splice( Heartbeat._functions.indexOf( pFunction ) , 1 );
		}

		public static removeAllFunctions():void
		{
			Heartbeat._functions = [];
		}

		private static _intervalHandler():void
		{
			// TODO: This is a dangerous approach...if a function is removed while this loop is running, it could trigger an error
			var i:number;
			var max:number = Heartbeat._functions.length;
			for ( i = 0; i < max ; i++ )
			{
				if ( Heartbeat._functions[ i ] )
					Heartbeat._functions[ i ]();
				else
					Heartbeat._functions.splice( i , 1 );
			}
		}
	}
}