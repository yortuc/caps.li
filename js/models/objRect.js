function objRect(opt){
	
	var self = this;

	opt = opt || {};

	self.editorTemplate = "edtTmp_rect";

	self.set({
		left: opt.left || 100,
		top: opt.top || 100,
		fill: opt.color || 'red',
		width: opt.width || 100,
		height: opt.height || 100
	});

	self.attributes = {};

	// text özelliği
	objAttributeDecorator({
		obj: self,
		name: "angle",
		value: opt.angle || 0,
		onChange: function(val){
			self.setAngle(val);
			capsli.canvas.renderAll();
		}
	});
};

objRect.prototype = new fabric.Rect(capsli.objBase);