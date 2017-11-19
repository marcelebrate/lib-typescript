interface JQuery
{
	closestToPosition( property:string , position:number ):JQuery;
	scope():any;
	scrollUpdate( callback:Function ):JQuery;
	scrollStopped( callback:Function ):JQuery;
	nearest():void;
}

interface JQueryStatic
{
	closestToPosition( property:string , position:number ):JQuery;
	scope():any;
	scrollUpdate( callback:Function ):JQuery;
	scrollStopped( callback:Function ):JQuery;
}