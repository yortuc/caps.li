// core.js
var capsli = capsli || {};

(function(){

	var self = {};

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

	capsli.core = self;		// export module
	self.init();			// auto-init module
})();
