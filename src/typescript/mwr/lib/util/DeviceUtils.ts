module MWRLib
{
	export class DeviceUtils
	{
		public static PLATFORM_ANDROID:string = 'android';
		public static PLATFORM_IOS:string = 'ios';
		public static PLATFORM_WINDOWS:string = 'windows';
		public static PLATFORM_MAC:string = 'macos';
		public static PLATFORM_LINUX:string = 'linux';
		public static PLATFORM_UNKNONW:string = 'unknown';



		public static getPlatform():string
		{
			var lAgent = navigator.userAgent.toLowerCase();

			if ( lAgent.indexOf('android') >= 0 )
				return DeviceUtils.PLATFORM_ANDROID;
			else if ( lAgent.indexOf('win') >= 0 )
				return DeviceUtils.PLATFORM_WINDOWS;
			else if ( lAgent.indexOf('mac') >= 0 )
				return DeviceUtils.PLATFORM_MAC;
			else if ( lAgent.indexOf('nux') >= 0 )
				return DeviceUtils.PLATFORM_LINUX;

			return DeviceUtils.PLATFORM_UNKNONW;
		}
	}
}