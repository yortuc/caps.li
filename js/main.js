$(function(){
	
	var app = capsli.core;

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
});