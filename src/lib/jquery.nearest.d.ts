interface JQuery
{
	nearest( pPointObject:Point , pSelector:string , ...options:any[] ):JQuery;
	furthest( pPointObject:Point , pSelector:string , ...options:any[] ):JQuery;
	touching( pPointObject:Point , pSelector:string , ...options:any[] ):JQuery;
}

interface JQueryStatic
{
	nearest( pPointObject:Point , pSelector:string , ...options:any[] ):JQuery;
	furthest( pPointObject:Point , pSelector:string , ...options:any[] ):JQuery;
	touching( pPointObject:Point , pSelector:string , ...options:any[] ):JQuery;
}

interface Point
{
	x:number;
	y:number;
}