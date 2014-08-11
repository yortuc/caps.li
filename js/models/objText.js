function objText(opt){
	
	var self = this;

	opt = opt || {};

	self.editorTemplate = "edtTmp_txt";

	self.set({
		text: opt.text || 'caps.li!',
		textAlign: 'left',
		left: opt.left || 100, 
		top: opt.top || 100 
	});

	self.attributes = {};

	// text özelliği
	objAttributeDecorator({
		obj: self,
		name: "text",
		value: opt.text || "caps.li"
	});

	// font-size
	objAttributeDecorator({
		obj: self,
		name: "fontSize",
		value: opt.fontSize || 12
	});
	
	// font-weight
	objAttributeDecorator({
		obj: self,
		name: "fontWeight",
		value: opt.fontWeight || "normal"
	});

	//color
	objAttributeDecorator({
		obj: self,
		name: "fill",
		value: opt.fill || "#000"
	});
};

objText.prototype = new fabric.Text("", capsli.objBase);