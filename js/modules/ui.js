// ui.js
var capsli = capsli || {};

(function () {

	var self = {};

	self.dlgAddImage = null;

	self.init = function() {

		// resizable resize event
		$( "#canvas" ).resizable({
			resize: function( event, ui ) {
				var w = ui.element.width(),
					h = ui.element.height();
				
				capsli.canvas.setWidth(w);
				capsli.canvas.setHeight(h);

				// interesting structure :)
				capsli.canvas.attributes.width.fireChange = false;
				capsli.canvas.attributes.width.value(w);
				capsli.canvas.attributes.height.value(h);
				capsli.canvas.attributes.width.fireChange = true;
			}
		});

		// init tooltips
		$(".btn").tooltip();

		// file upload chnage cb
		$("#main").on("change", "#inpFile", function(e){
			self.loadPhoto(e);
		});

		// set initial canvas size
		capsli.canvas.setWidth($("#canvas").width());
		capsli.canvas.setHeight($("#canvas").height());
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

	self.showAddImgDialog = function(){
		self.dlgAddImage.dialog("open");
	};

	self.takePhotoDlg = function(){
		$("#dlgTakePhoto").modal("show");
		capsli.webCam.startCamera();
	};

	self.loadPhotoDlg = function(){
		$("#inpFile").click();
	};

	self.loadPhoto = function(evt){

		var files = evt.target.files; // FileList object

	    // Loop through the FileList and render image files as thumbnails.
	    for (var i = 0, f; f = files[i]; i++) {

			// Only process image files.
			if (!f.type.match('image.*')) {
				continue;
			}

	    	var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {

					fabric.Image.fromURL(e.target.result, function(img) {
						img.set({ 
							left: capsli.canvas.getWidth()/2,
							top: capsli.canvas.getHeight()/2
						});
						img.set(capsli.objBase);
						capsli.addObject(img);
					});

				};
			})(f);

	      // Read in the image file as a data URL.
	      reader.readAsDataURL(f);
	    }
	};

	self.exportFile = function(){

		// deactivate selected object(s)
		capsli.canvas.deactivateAllWithDispatch();
		capsli.canvas.renderAll();

		// export
		var url = capsli.canvas.toDataURL('png');
		window.open(url, '_blank');

		// put watermark
		/*
		fabric.Image.fromURL("css/images/wm2.png", function(img) {
			img.set({ 
				left: capsli.canvas.getWidth() - img.getWidth() - 10,
				top: img.getHeight()/2
			});
			capsli.addObject(img);

			// delete wm
			capsli.canvas.remove(img);
		});
		*/
	};

	self.showCapsProp = function(){
		// deactivate selected object(s)
		capsli.canvas.deactivateAllWithDispatch();
		capsli.canvas.renderAll();
	};

	self.aboutDlg = function(){
		$("#dlgAbout").modal("show");
	};

	capsli.ui = self;	// export module
	self.init();		// init module
})();