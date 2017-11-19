module MWRLib
{
	export class SimpleScreen extends CustomEventDispatcher
	{
		public id:string;
		public type:string;
		public duration:number;
		public data:any;

		// TODO: Make this private (views are currently binding to its timeRemaining property)
		public timer:Timer;

		constructor( pID:string , pType:string = ScreenTypes.DEFAULT , pDuration:number = 0 , pData:any = null )
		{
			super();

			this.id = pID;
			this.type = pType;

			// TODO: Make this a getter
			this.duration = pDuration;
			this.data = pData;

			this.timer = new Timer( pDuration );

			this._bindEvents();
		}

		private _bindEvents():void
		{
			//		this.timer.bind( TimerEvent.HOME , () => { this.timer_startHandler() } );
			//		this.timer.bind( TimerEvent.STOP , () => { this.timer_stopHandler() } );
			//		this.timer.bind( TimerEvent.PAUSE , () => { this.timer_pauseHandler() } );
			//		this.timer.bind( TimerEvent.RESUME , () => { this.timer_resumeHandler() } );
			this.timer.bind( TimerEvent.COMPLETE , () =>
			{
				this.timer_completeHandler()
			} );
		}

		private _unbindEvents():void
		{
			//		this.timer.unbind( TimerEvent.HOME , () => { this.timer_startHandler() } );
			//		this.timer.unbind( TimerEvent.STOP , () => { this.timer_stopHandler() } );
			//		this.timer.unbind( TimerEvent.PAUSE , () => { this.timer_pauseHandler() } );
			//		this.timer.unbind( TimerEvent.RESUME , () => { this.timer_resumeHandler() } );
			this.timer.unbind( TimerEvent.COMPLETE , () =>
			{
				this.timer_completeHandler()
			} );
		}

		public start():void
		{
			this.timer.start();

			this.trigger( ScreenEvent.START , { target:this } );
		}

		private pause():void
		{
			this.timer.pause();

			this.trigger( ScreenEvent.PAUSE , { target:this } );
		}

		public resume():void
		{
			this.timer.resume();

			this.trigger( ScreenEvent.RESUME , { target:this } );
		}

		public stop():void
		{
			this.timer.stop();

			this.trigger( ScreenEvent.STOP , { target:this } );
		}

		public complete():void
		{
			this.stop();

			this.trigger( ScreenEvent.COMPLETE , { target:this } );
		}

		public reset():void
		{
			this.timer.reset();
		}

		public tick():void
		{
			this.timer.tick();
		}

		private timer_completeHandler( pEvent:any = null ):void
		{
			this.complete();
		}
	}
}
