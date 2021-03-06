(function($) {
     $.fn.ppcpersonalify = function(options){
		var opc=$.extend({
			direct:			false,
			ppc:			false,
			seo:			false,
			expires:		30,
			onCookieCreate:	false
		}, options );
		
		var referrer = 'direct';
		var search_string = false;
		var do_callback = false;
		
		var is = function(action){
			if(action=='ppc'){
				var params = $.fn.ppcpersonalify.getRefParams();
				if(params.q) search_string = params.q;
				if($.fn.ppcpersonalify.getRefParams(document.location.href).gclid) return true;
				if(params.adurl) return true;
				return false;
			}
			if(action=='seo'){
				if(document.referrer.search(/google/) != -1) return true;
				return false;
			}
		};
		
		if(typeof($.cookie)=='undefined'){
			console.log('jQuery Cookie plugin required');
			console.log('https://github.com/carhartl/jquery-cookie');
			return false;
		}
		
		
		if($.cookie('referrer')!=='' && $.cookie('referrer')!=null){
			referrer = $.cookie('referrer');
		} else {
			referrer = (is('ppc')?'ppc':((is('seo')?'seo':'direct')));
			do_callback = true;
		}
		$.cookie('referrer', referrer,{
			expires: opc.expires,
			path:'/'
		});
		$.cookie('search_string', search_string,{
			expires: opc.expires,
			path:'/'
		});
		if(do_callback) opc.onCookieCreate();
		
		if(opc[referrer]){
			this.html(function(){
				return opc[referrer];
			})
		}
		
    };




})(jQuery);	

(function($) {
     $.fn.ppcpersonalify.getRefParams = function(url){
		if(!url) url = document.referrer;
		var url_params = new Object();
		if(typeof(url.split('?')[1])=='string'){
			for (i in url.split('?')[1].split('&')){
				if(typeof(url.split('?')[1].split('&')[i])=='string'){
					url_params[url.split('?')[1].split('&')[i].split('=')[0]] = url.split('?')[1].split('&')[i].split('=')[1];
				}
			}
		}
		return url_params;
    };
})(jQuery);	

(function($) {
     $.fn.ppcpersonalify.clearCookies = function(){
		$.removeCookie('referrer', { path: '/' });
		$.removeCookie('search_string', { path: '/' });
	 };
})(jQuery);	