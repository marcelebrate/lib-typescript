module MWRLib
{
	export class ColorUtils
	{
		public static changeHue( pStartHex:string , pDegree:number ):string
		{
			var lHex:string;
			var lRGB = ColorUtils.hexToRGB( pStartHex );
			var lHSV = ColorUtils.rgbToHSV( lRGB.r , lRGB.g , lRGB.b );

			lHSV.h += (pDegree / 360);

			if ( lHSV.h > 1 )
			{
				lHSV.h -= 1;
			}
			else if ( lHSV.h < 0 )
			{
				lHSV.h += 1;
			}

			lRGB = ColorUtils.hsvToRGB( lHSV.h , lHSV.s , lHSV.v );

			return ColorUtils.rgbToHex( lRGB.r , lRGB.g , lRGB.b );
		}

		public static changeBrightness( pStartHex:string , pPercent:number ):string
		{
			var lHex;
			var lRGB = ColorUtils.hexToRGB( pStartHex );
			var lHSV = ColorUtils.rgbToHSV( lRGB.r , lRGB.g , lRGB.b );

			lHSV.v += (pPercent / 100);

			if ( lHSV.v > 1 )
			{
				lHSV.v = 1;
				lHSV.s -= (pPercent / 100);
			}
			else if ( lHSV.v < 0 )
			{
				lHSV.v = 0;
			}

			lRGB = ColorUtils.hsvToRGB( lHSV.h , lHSV.s , lHSV.v );

			return ColorUtils.rgbToHex( lRGB.r , lRGB.g , lRGB.b );
		}

		public static changeLightness( pStartHex:string , pAmount:number ):string
		{
			var lHex;
			var lRGB = ColorUtils.hexToRGB( pStartHex );
			var lHSL = ColorUtils.rgbToHSL( lRGB.r , lRGB.g , lRGB.b );
			//var lHSV = ColorUtils.rgbToHSV( lRGB.r , lRGB.g , lRGB.b );

			lHSL.l += pAmount;

			if ( lHSL.l > 100 )
			{
				lHSL.l = 100;
			}
			else if ( lHSL.l < 0 )
			{
				lHSL.l = 0;
			}

			lRGB = ColorUtils.hslToRGB( lHSL.h , lHSL.s , lHSL.l );

			return ColorUtils.rgbToHex( lRGB.r , lRGB.g , lRGB.b );
		}

		public static tintImage( pImage , pColor:string , pWidth?:number , pHeight?:number ):void
		{
			var lCanvas = ColorUtils.tintImageToCanvas( pImage , pColor , pWidth , pHeight );

			pImage.src = lCanvas.toDataURL( "image/png" );
		}

		public static tintBackgroundImage( pElement , pColor:string , pWidth?:number , pHeight?:number ):void
		{
			//	console.log( 'tintBackgroundImage() >> pElement: ' + pElement + ' // color: ' + pColor );

			// First extract background image URL
			// Source: http://stackoverflow.com/questions/8809876/can-i-get-divs-background-image-url
			var lURL:string = $( pElement ).css( 'background-image' );
			var lRegExp:RegExpExecArray = /^url\((['"]?)(.*)\1\)$/.exec( lURL );
			lURL = lRegExp ? lRegExp[2] : "";

			// Then load background image into new blank image object
			var lTempImage = new Image();
			//	lTempImage.height = pHeight;
			//	lTempImage.width = pWidth;
			lTempImage.onload = function ()
			{
				// Then tint that image
				var lCanvas = ColorUtils.tintImageToCanvas( lTempImage , pColor , pWidth , pHeight );
				// Finally, draw back into element's background
				$( pElement ).css( { backgroundImage:'url(' + lCanvas.toDataURL( 'image/png' ) + ')' } );
			};
			lTempImage.src = lURL;
		}

		public static tintImageToCanvas( pImage , pColor:string , pWidth?:number , pHeight?:number ):HTMLCanvasElement
		{
			var lCanvas:HTMLCanvasElement = document.createElement( "canvas" );
			var lContext:CanvasRenderingContext2D;

			if ( pWidth )
				$( pImage ).width( pWidth );
			if ( pHeight )
				$( pImage ).height( pHeight );

			lCanvas.width = pImage.width;
			lCanvas.height = pImage.height;
			lContext = lCanvas.getContext( "2d" ),
				lContext.drawImage( pImage , 0 , 0 , pImage.width , pImage.height );// , pImage.width , pImage.height );

			if ( pImage.width <= 0 || pImage.height <= 0 )
				return;

			var imgd = lContext.getImageData( 0 , 0 , pImage.width , pImage.height );
			var pix = imgd.data;
			var colorRGB = ColorUtils.hexToRGB( pColor );

			// Loops through all of the pixels and modifies the components.
			for ( var i = 0, n = pix.length ; i < n ; i += 4 )
			{
				pix[i] = colorRGB.r;
				pix[i + 1] = colorRGB.g;
				pix[i + 2] = colorRGB.b;
				//pix[i+3] is the transparency.
			}

			lContext.putImageData( imgd , 0 , 0 );

			return lCanvas;
		}


		/**
		 * Converts an RGB color value to HSL. Conversion formula
		 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
		 * Assumes r, g, and b are contained in the set [0, 255] and
		 * returns h, s, and l in the set [0, 1].
		 *
		 * @param   r   Number      The red color value
		 * @param   g   Number      The green color value
		 * @param   b   Number      The blue color value
		 * @return  HSL           The HSL representation
		 */
		public static rgbToHSL( r:number , g:number , b:number ):ColorHSL
		{
			r /= 255, g /= 255, b /= 255;
			var max = Math.max( r , g , b ), min = Math.min( r , g , b );
			var h, s, l = (max + min) / 2;

			if ( max == min )
			{
				h = s = 0; // achromatic
			}
			else
			{
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch ( max )
				{
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
				}
				h /= 6;
			}

			return {
				h:h ,
				s:s ,
				l:l
			};
		}

		/**
		 * Converts an HSL color value to RGB. Conversion formula
		 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
		 * Assumes h, s, and l are contained in the set [0, 1] and
		 * returns r, g, and b in the set [0, 255].
		 *
		 * @param   h   Number      The hue
		 * @param   s   Number      The saturation
		 * @param   l   Number      The lightness
		 * @return  RGB           The RGB representation
		 */
		public static hslToRGB( h:number , s:number , l:number ):ColorRGB
		{
			var r, g, b;

			if ( s == 0 )
			{
				r = g = b = l; // achromatic
			}
			else
			{

				var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				var p = 2 * l - q;
				r = ColorUtils.hueToRGB( p , q , h + 1 / 3 );
				g = ColorUtils.hueToRGB( p , q , h );
				b = ColorUtils.hueToRGB( p , q , h - 1 / 3 );
			}

			return {
				r:r * 255 ,
				g:g * 255 ,
				b:b * 255
			};
		}

		public static hueToRGB( p , q , t )
		{
			if ( t < 0 ) t += 1;
			if ( t > 1 ) t -= 1;
			if ( t < 1 / 6 ) return p + (q - p) * 6 * t;
			if ( t < 1 / 2 ) return q;
			if ( t < 2 / 3 ) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		/**
		 * Converts an RGB color value to HSV. Conversion formula
		 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
		 * Assumes r, g, and b are contained in the set [0, 255] and
		 * returns h, s, and v in the set [0, 1].
		 *
		 *
		 * @param   r   Number      The red color value
		 * @param   g   Number      The green color value
		 * @param   b   Number      The blue color value
		 * @return  HSV             The HSV representation
		 */
		public static rgbToHSV( r:number , g:number , b:number ):ColorHSV
		{
			r = r / 255;
			g = g / 255;
			b = b / 255;
			var max = Math.max( r , g , b ), min = Math.min( r , g , b );
			var h, s, v = max;

			var d = max - min;
			s = max == 0 ? 0 : d / max;

			if ( max == min )
			{
				h = 0; // achromatic
			}
			else
			{
				switch ( max )
				{
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
				}
				h /= 6;
			}

			return {
				h:h ,
				s:s ,
				v:v
			};
		}

		/**
		 * Converts an HSV color value to RGB. Conversion formula
		 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
		 * Assumes h, s, and v are contained in the set [0, 1] and
		 * returns r, g, and b in the set [0, 255].
		 *
		 * @param   h   Number      The hue
		 * @param   s   Number      The saturation
		 * @param   v   Number      The value
		 * @return  Array           The RGB representation
		 */
		public static hsvToRGB( h:number , s:number , v:number ):ColorRGB
		{
			var r, g, b;

			var i = Math.floor( h * 6 );
			var f = h * 6 - i;
			var p = v * (1 - s);
			var q = v * (1 - f * s);
			var t = v * (1 - (1 - f) * s);

			switch ( i % 6 )
			{
				case 0:
					r = v, g = t, b = p;
					break;
				case 1:
					r = q, g = v, b = p;
					break;
				case 2:
					r = p, g = v, b = t;
					break;
				case 3:
					r = p, g = q, b = v;
					break;
				case 4:
					r = t, g = p, b = v;
					break;
				case 5:
					r = v, g = p, b = q;
					break;
			}

			return {
				r:r * 255 ,
				g:g * 255 ,
				b:b * 255
			};
		}

		public static rgbToHex( r:number , g:number , b:number ):string
		{
			r = Math.floor( r );
			g = Math.floor( g );
			b = Math.floor( b );
			return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString( 16 ).slice( 1 );
		}

		public static hexToRGB( hex:string ):ColorRGB
		{
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
			return result ? {
				r:parseInt( result[1] , 16 ) ,
				g:parseInt( result[2] , 16 ) ,
				b:parseInt( result[3] , 16 )
			} : null;
		}
	}

	export class ColorRGB
	{
		r:number;
		g:number;
		b:number;
	}
	export class ColorHSL
	{
		h:number;
		s:number;
		l:number;
	}
	export class ColorHSV
	{
		h:number;
		s:number;
		v:number;
	}
}
