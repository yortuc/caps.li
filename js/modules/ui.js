// ui.js

(function () {

	var self = {};

	self.init = function() {

		// center canvas
		$( window ).resize(function() {
			// self.resize();
		});

		$("#dlgAddImage").dialog({
			autoOpen: false,
			width: 500,
			buttons: [{
				text: "OK",
				click: function(){
					var url = $("#txtResim").val();
					app.addImg(url);

					$(this).dialog("close");
				}
			}]
		});

		$("#colorSelector").ColorPicker({
			color: '#ff0000',
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$('#renkSec').css('backgroundColor', '#' + hex);

				if(capsli.selectedObject()){
					capsli.selectedObject().set('fill', '#' + hex);
					capsli.canvas.renderAll();
				};
			}
		});

		$( "#canvas" ).resizable({
			resize: function( event, ui ) {
				capsli.canvas.setWidth(ui.element.width());
				capsli.canvas.setHeight(ui.element.height());
			}
		});


		//self.resize();
	};

	self.resize = function(){
		var canvas_width = capsli.canvas.getWidth(),
		 	container = $("#main").width(),
		 	margin = (container - canvas_width)/2;
		
		$(".canvas-container").css({left: margin + "px"});
	};

	self.addRect = function(){
		var obj = new objRect();
		capsli.addObject(obj);
	};

	self.addText =function(){
		var obj = new objText({text: "caps.li!!!"});
		capsli.addObject(obj);
	};

	self.dlgAddImage = function(){
		$("#dlgResimEkle").dialog("open");
	};

	self.addImg = function(url){
		fabric.Image.fromURL(url, function(img) {
		  img.set('left', 300).set('top', 300);
		  capsli.addObj(img);
		});
	};

	capsli.ui = self;	// export module
	self.init();		// init module
})();