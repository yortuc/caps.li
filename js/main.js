$(function(){
	
	var app = capsli;

	var userLang = (navigator.language) ? navigator.language : navigator.userLanguage; 

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

	ko.applyBindings(app);
});