function objImg(img){
	
	var self = new fabric.Image(capsli.objBase);

	self.type = "img";
	self.editorTemplate = "edtTmp_img";


	/*
	objAttributeDecorator({
		obj: self,
		name: "fill",
		value: opt.fill || "#f00"
	});
	*/

	return self;
};