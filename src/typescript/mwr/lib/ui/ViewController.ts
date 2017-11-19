module MWRLib
{
	export class ViewController
	{

		public currentState:string;

		public showTimeline:TimelineLite;
		public hideTimeline:TimelineLite;

		public firstTime:boolean = true;

		public resetFlag:boolean = true;

		public viewSelector:string;

		public resetOnHideCompleteFlag:boolean = false;


		public static $inject = [
			'$scope',
			'$http',
			'$location' ,
			'ModalService'
		];

		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Main.ts and specified from ng-controller attribute in index.html
		constructor(
			public $scope:any , public $http:any , public $location:any , public ModalService:any )
		{
			$scope.vc = this;
			$scope.ctrl = this;

			this.showTimeline = new TimelineLite({ paused:true , onComplete:() => this._showComplete() });
			this.hideTimeline = new TimelineLite({ paused:true , onComplete:() => this._hideComplete() });
		}

		private _jq:JQuery;
		public get jq():JQuery
		{
			// TODO: Cache this rather than constantly recall it
			return $( this.viewSelector );
		}

		public init( pSelector:string ):void
		{
			this.viewSelector = pSelector;

			this._initShowTimeline();
			this._initHideTimeline();
		}

		public reset():void
		{
			this.resetFlag = false;
			this.resetOnHideCompleteFlag = false;
		}

		public resume():void
		{
		}

		public pause():void
		{
		}

		public cycleAlternate():void
		{
			console.log( 'cycleAlternate()' );
		}

		public changeState( pState:string ):void
		{
			this.currentState = pState;
			this.$scope.$apply();
		}

		public show():void
		{
			this.jq.show();
			this.jq.trigger( 'show' );

			this.firstTime = false;

			//this.showTimeline.startTime(0);
			//this.showTimeline.time(0);
			//this.showTimeline.play();

			this.showTimeline.restart();

			if ( this.resetFlag )
				this.reset();
		}

		// @protected
		public _initShowTimeline():void
		{
			this.showTimeline.to( this.viewSelector , 0.0001 , { autoAlpha:1 });
		}

		// @protected
		public _showComplete():void
		{
			$(this.viewSelector).trigger( 'showComplete' );
		}

		public hide():void
		{
			this.jq.trigger( 'hide' );

			//this.hideTimeline.startTime(0);
			//this.hideTimeline.time(0);
			this.hideTimeline.restart();
		}

		// @protected
		public _initHideTimeline():void
		{
			this.hideTimeline.to( this.viewSelector , 0.0001 , { autoAlpha:0 });
		}

		// @protected
		public _hideComplete():void
		{
			this.jq.hide();
			this.jq.trigger( 'hideComplete' );

			if ( this.resetOnHideCompleteFlag)
				this.reset();
		}
	}
}