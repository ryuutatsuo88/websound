(function( $ ){

  var methods = {
     init : function( options ) {
		
		return this.each(function() {  
			var settings = {
				flash : function () {}
			};
			
			var defaults = {
				isTouchDevice : 'ontouchstart' in document.documentElement
			};
		
      		if ( options ) {
      			$.extend( settings, options );
      		}
			
			var $this = $(this),
				src = $this.attr("data-audio-src").split(","),
				effect = $this.attr("data-audio-effect"), 
				audio = $("<audio />");
				
			$this.addClass('websound-identifier');
			
			
			$this.canPlay = function(src) {
				var ext = src.substring(src.lastIndexOf(".")+1),
					a = document.createElement('audio');
				return (a.canPlayType && a.canPlayType('audio/' + ext)) ;
			};
			
			$this.addAudio = function(src) {
				audio.attr("src", src);
				$("body").append(audio);
				
				if (effect == "click") {
					$this.click(function () {
						audio[0].play();
					});
				} else if (effect == "over") {
					if (!defaults.isTouchDevice) {
						$this.on("mouseover", function () {
							audio[0].play();
						});
					}
				}
			};
			
      		var found = false; 	
			for (var i = 0; i <= src.length - 1; i++) {
				if (found == false) {
					if ($this.canPlay(src[i]) ) {
						found = true;
						$this.addAudio(src[i]);
					}
				}
			}
			if (found == false) {
				//flash fallback
				settings.flash($this, src, effect);
			}
      			
     	});
     }
  };   	 	

  $.fn.webSound = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.websound' );
    }    
  
  };

})( jQuery );