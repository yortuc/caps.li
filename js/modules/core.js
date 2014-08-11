// core.js
var capsli = capsli || {};

(function(){

	var self = {};

	self.canvas = null;

	self.height = 720;

	self.selectedObject = ko.observable();

	self.init = function(){
		self.canvas = new fabric.Canvas('canvas');
		
		self.canvas.setWidth(800);
		self.canvas.setHeight(600);

		self.canvas.backgroundColor="#fff";
		self.canvas.renderAll();

		self.canvas.on('object:selected', function(options) {
			self.selectedObject(options.target);
			console.log(self.selectedObject());
		});

		self.canvas.on('before:selection:cleared', function(data){
			self.selectedObject(null);
		});
	};

	self.setHeight = function(height){
		self.canvas.setHeight(height);
		self.canvas.renderAll();
	};

	self.addObject = function(obj){
		self.canvas.add(obj);				// add obj
		self.canvas.setActiveObject(obj); 	// make it selected
	};

	self.removeObject = function(){
		self.canvas.remove(self.selectedObject());
	};

	self.bringToFront = function(){
		self.canvas.bringToFront(self.selectedObject());
	};

	self.sendToBack = function(){
		self.canvas.sendToBack(self.selectedObject());
	};

	capsli = self;		// export module
	self.init();		// init module
})();
