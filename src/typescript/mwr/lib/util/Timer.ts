module MWRLib
{
	export class Timer extends CustomEventDispatcher
	{
		public duration:number;
		public elapsedTime:number;
		public remainingTime:number;

		private _useInterval:Boolean;
		private _tickInterval:number;
		private _tickStartTime:number;
		private _isRunning:boolean = false;

		constructor( pDuration:number , pUseInterval:boolean = true )
		{
			super();

			this.duration = pDuration;
			this._useInterval = pUseInterval;

			this.reset();
		}

		public reset():void
		{
			clearInterval( this._tickInterval );
			this.remainingTime = this.duration;
			this.elapsedTime = 0;
		}

		public start():void
		{
			this.reset();

			this._isRunning = true;

			this._tickStartTime = new Date().getTime();

			if ( this._useInterval )
			{
				clearInterval( this._tickInterval );
				this._tickInterval = setInterval( () =>
				{
					this.tick()
				} , 10 );
			}

			this.trigger( TimerEvent.START );
		}

		public pause():void
		{
			this._isRunning = false;

			clearInterval( this._tickInterval );

			this.trigger( TimerEvent.PAUSE );
		}

		public resume():void
		{
			this.trigger( TimerEvent.RESUME );

			this._isRunning = true;

			this._tickStartTime = new Date().getTime();

			if ( this._useInterval )
			{
				clearInterval( this._tickInterval );
				this._tickInterval = setInterval( () =>
				{
					this.tick()
				} , 10 );
			}
		}

		public stop():void
		{
			clearInterval( this._tickInterval );

			this._isRunning = false;

			this.trigger( TimerEvent.STOP );
		}

		public tick( pRegisterTime:boolean = true )
		{
			if ( !this._isRunning )
				return;

			var lNow:number = new Date().getTime();

			var lTickElapsed:number = lNow - this._tickStartTime;

			if ( pRegisterTime )
			{
				this.elapsedTime += lTickElapsed;

				if ( this.duration > 0 )
				{
					this.remainingTime -= lTickElapsed;

					if ( this.remainingTime < 0 )
					{
						this.remainingTime = 0;
						this._completeHandler();
						return;
					}
				}
			}

			this._tickStartTime = lNow;

			return lTickElapsed;
		}

		public getElapsedTimeAsString( pIncludeHours , pIncludeMS ):string
		{
			var lReturnValue:string = "";

			var milliseconds:number = Math.floor( ( this.elapsedTime % 1000) / 100 );
			var seconds:number = Math.floor( (this.elapsedTime / 1000) % 60 );
			var minutes:number = Math.floor( (this.elapsedTime / (1000 * 60)) % 60 );
			var hours:number = Math.floor( (this.elapsedTime / (1000 * 60 * 60)) % 24 );

			var lUnder:boolean;

			var hoursString:string = hours.toFixed( 0 );
			if ( hours < 10 )
				hoursString = "0" + hours;

			var minutesString:string = minutes.toFixed( 0 );
			if ( minutes < 10 )
				minutesString = "0" + minutes;

			var secondsString:string = seconds.toFixed( 0 );
			if ( seconds < 10 )
				secondsString = "0" + seconds;

			if ( pIncludeHours || hours > 0 )
				lReturnValue += hoursString + ":";
			else
				lReturnValue += minutesString + ":" + secondsString;

			if ( pIncludeMS )
				lReturnValue += "." + milliseconds;


			return lReturnValue;
		}

		private _completeHandler():void
		{
			this.trigger( TimerEvent.COMPLETE );
			this.stop();
		}

	}

	export class TimerEvent
	{
		public static START:string = 'TimerEvent.START';
		public static STOP:string = 'TimerEvent.STOP';
		public static PAUSE:string = 'TimerEvent.PAUSE';
		public static RESUME:string = 'TimerEvent.RESUME';
		public static COMPLETE:string = 'TimerEvent.COMPLETE';
	}

}

