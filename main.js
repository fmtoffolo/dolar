(function(){
	if (!($ = window.jQuery)) {
	    var done = false;
	    script = document.createElement( 'script' );  
	    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js';   
	    script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				mainFunction(); 
			}
		};
	    document.getElementsByTagName("head")[0].appendChild(script); 
	}else{  
    	mainFunction();  
	}  

	
  
	function mainFunction() {
		(window.myBookmarklet = function() {
			$.getJSON('http://jsonp.jit.su/?callback=?&url=http://ws.geeklab.com.ar/dolar/get-dolar-json.php', function(data){
				var impuesto = 0.35;
				var pesoOficial = parseFloat(data.libre);
				//var match = /\$[0-9]+(\.([0-9]{1,2}))?/gi;
				var match = /(us )?(\$|€)([0-9]+)(\.[0-9]{1,2})?/gi;// AGREGAR condicional
				document.body.innerHTML = document.body.innerHTML.replace(match, function(completo,moneda, simbolo, entero, decimal){
					console.log(simbolo);
					var cents = (typeof decimal === 'undefined') ? 0 : parseFloat(decimal);
					var value = parseFloat(entero) + cents;
					var pesoTarjeta = (value*pesoOficial*(1 + impuesto)).toFixed(2);
					return 'AR$' + pesoTarjeta;

				});
			})
		})();
	} 


})()