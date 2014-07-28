$(function(){

	var userLang = (navigator.language) ? navigator.language : navigator.userLanguage; 
 	//alert ("The language is: " + userLang);

	$("#panel").hide();

	$(".button").button();

	$("#tualYuk").slider({
		min: 300,
		max: 1600,
		step: 20,
		value: 720,
		change: function( event, ui ) {
			app.setHeight(ui.value);
		}
	});

	$("#dlgResimEkle").dialog({
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

	$("#dlgExport").dialog({
		autoOpen: false
	});

	$("#ekleYazi").on("click", function(){
		app.addText();
	});

	$("#ekleSekil").on("click", function(){
		app.addRect();
	});	

	$("#nesneSil").on("click", function(){
		app.remove();
	});	

	$("#ekleResim").on("click", function(){
		$("#dlgResimEkle").dialog("open");
	});	

	$("#tasiOne").on("click", function(){
		app.bringToFront();
	});	

	$("#tasiArkaya").on("click", function(){
		app.sendToBack();
	});	

	$('#renkSec').ColorPicker({
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

			if(app.selectedObject && app.selectedObject.type === 'rect'){
				app.selectedObject.set('fill', '#' + hex);
				app.canvas.renderAll();
			};
		}
	});

	$("#export").on("click", function(){
		var url = app.canvas.toDataURL('png');
		var win = window.open(url, '_blank');
	});

	$("#txtText").on("keyup", function(){
		console.log(app.selectedObject.type);
		var val = $(this).val();
		if(app.selectedObject && app.selectedObject.type==='text'){
			app.selectedObject.set('text', val);
			app.canvas.renderAll();
		};
	});

	var app = new App();
	app.init();
});

function App(){
	var self = this;

	self.canvas = null;

	self.height = 720;

	self.selectedObject = null;

	self.init = function(){
		self.canvas = new fabric.Canvas('canvas');
		self.canvas.setDimensions(600,700);

		self.canvas.on('object:selected', function(options) {
			console.log(options);
			self.objectSelected(options);
		});

		self.canvas.on('before:selection:cleared', function(data){
			self.selectionCleared();
		});
	};

	self.objectSelected = function(e){
		$("#panel").show();
		self.selectedObject = e.target;

		$(".editor").hide();

		if (self.selectedObject.type === 'text') {
			$("#editText").show();
		};

		if (self.selectedObject.type === 'rect') {
			$("#editShape").show();
		};
	};

	self.selectionCleared = function(){
		$("#panel").hide();
	};

	self.setHeight = function(height){
		self.canvas.setHeight(height);
		self.canvas.renderAll();
	};

	self.addRect = function(opt){

		opt = opt || {};

		var rect = new fabric.Rect({
			left: opt.left || 100,
			top: opt.top || 100,
			fill: opt.color || 'red',
			width: opt.width || 100,
			height: opt.height || 100
		});

		self.canvas.add(rect);
	};

	self.addText = function(opt){

		opt = opt || {};

		var text = new fabric.Text(
			opt.text || 'caps yap!', { 
				textAlign: 'left',
				left: opt.left || 100, 
				top: opt.top || 100 
		});

		self.canvas.add(text);
	};

	self.addImg = function(url){
		fabric.Image.fromURL(url, function(img) {
		  img.set('left', 300).set('top', 300);
		  self.canvas.add(img).bringToFront(img);       
		});
	};

	self.remove = function(){
		self.canvas.remove(self.selectedObject);
	};

	self.bringToFront = function(){
		self.canvas.bringToFront(self.selectedObject);
	};

	self.sendToBack = function(){
		self.canvas.sendToBack(self.selectedObject);
	};
}