function objAttributeDecorator(e){e.fabricName=e.fabricName||e.name;var t={name:e.name,title:ko.observable(e.title),value:ko.observable(e.value),fabricName:e.fabricName,type:e.type,data:e.data||null,items:ko.observableArray(e.items||null),template:"edtTmp_"+e.type,invalid:ko.observable(false),errorMessage:ko.observable(e.errMsg)};t.value.subscribe(function(t){if(e.onChange){e.onChange(t)}else{var n={};n[e.fabricName]=t;e.obj.set(n);capsli.canvas.renderAll()}});e.obj.attributes[e.name]=t}function objRect(e){var t=this;e=e||{};t.type="rect";t.editorTemplate="edtTmp_rect";t.attributes={};objAttributeDecorator({obj:t,name:"fill",value:e.fill||"#ff0000"});objAttributeDecorator({obj:t,name:"opacity",value:e.opacity||1});t.set({left:e.left||100,top:e.top||100,fill:e.fill||"#ff0000",width:e.width||140,height:e.height||60})}function objText(e){var t=this;e=e||{};t.type="text";t.editorTemplate="edtTmp_txt";t.style={toggle:function(e){t.style[e](!t.style[e]())},bold:ko.observable(false),italic:ko.observable(false),underline:ko.observable(false),textAlign:ko.observable("left")};t.style.bold.subscribe(function(e){t.set({fontWeight:e?"bold":"normal"});capsli.canvas.renderAll()});t.style.italic.subscribe(function(e){t.set({fontStyle:e?"oblique":""});capsli.canvas.renderAll()});t.style.underline.subscribe(function(e){t.set({textDecoration:e?"underline":""});capsli.canvas.renderAll()});t.toggleTextAlign=function(e){t.style.textAlign(e);t.set({textAlign:e});capsli.canvas.renderAll()};t.attributes={};t.attributes.fonts=ko.observableArray(["arial","times new roman","verdana","helvetica","georgia","courier","comic sans ms"]);objAttributeDecorator({obj:t,name:"textAlign",value:e.textAlign||"left"});objAttributeDecorator({obj:t,name:"text",value:e.text||"caps.li"});objAttributeDecorator({obj:t,name:"fontSize",value:e.fontSize||40});objAttributeDecorator({obj:t,name:"fill",value:e.fill||"#000000"});objAttributeDecorator({obj:t,name:"fontFamily",value:e.fontFamily||"times new roman"});t.set({text:e.text||"caps.li!",textAlign:"left",originX:"center",originY:"center",lockScalingX:true,lockScalingY:true,left:e.left||capsli.canvas.getWidth()/2+100*Math.random(),top:e.top||capsli.canvas.getHeight()/2+100*Math.random(),fontSize:e.fontSize||40,fontFamily:e.fontFamily||"times new roman",fill:e.fill||"#000",textAlign:e.textAlign||"left"})}function objImg(e){var t=this;t.type="img";t.editorTemplate="edtTmp_img";t.fabricImg=e}function objCanvas(e){function n(e){e.width&&$("#main .ui-wrapper").css({width:e.width});e.height&&$("#main .ui-wrapper").css({height:e.height})}var t=new fabric.Canvas(e);t.editorTemplate="edtTmp_canvas";t.attributes={};objAttributeDecorator({obj:t,name:"backgroundColor",value:"#ffffff",onChange:function(e){t.setBackgroundColor(e);t.renderAll()}});objAttributeDecorator({obj:t,name:"width",value:800,onChange:function(e){t.setWidth(e);n({width:e});t.renderAll()}});objAttributeDecorator({obj:t,name:"height",value:600,onChange:function(e){t.setHeight(e);n({height:e});t.renderAll()}});t.fitCanvas=function(){var e=t.getObjects(),r=0,i=0,s=0,o=0,u=0,a=5e3,f=0,l=5e3;if(e.length===0){alert("içerik olmadığı için boyutlandırılamadı.");return}e.forEach(function(e){u=e.getLeft();f=e.getTop();s=u+e.getWidth();o=f+e.getHeight();if(s>r)r=s;if(o>i)i=o;if(u<a)a=u;if(f<l)l=f});e.forEach(function(e){e.setLeft(e.getLeft()-a);e.setTop(e.getTop()-l);e.setCoords()});s=r-a;o=i-l;t.setWidth(s);t.setHeight(o);n({width:s,height:o});t.renderAll()};return t}objRect.prototype=new fabric.Rect(capsli.objBase);objText.prototype=new fabric.Text("",capsli.objBase);objImg.prototype=new fabric.Image(capsli.objBase);var capsli=capsli||{};capsli.objBase={cornerSize:10,cornerColor:"black",padding:0,rotatingPointOffset:30,transparentCorners:false};var capsli=capsli||{};(function(){var e={};e.canvas=null;e.height=720;e.selectedObject=ko.observable();e.init=function(){e.canvas=objCanvas("canvas");e.canvas.setWidth(800);e.canvas.setHeight(600);e.canvas.backgroundColor="#fff";e.canvas.renderAll();e.canvas.on("object:selected",function(t){e.selectedObject(t.target);console.log(e.selectedObject())});e.canvas.on("before:selection:cleared",function(t){e.selectedObject(null)})};e.setHeight=function(t){e.canvas.setHeight(t);e.canvas.renderAll()};e.addObject=function(t){e.canvas.add(t);e.canvas.setActiveObject(t)};e.removeObject=function(){if(e.selectedObject().objects){e.selectedObject().objects.forEach(function(t){e.canvas.remove(t);e.canvas.renderAll()})}else{e.canvas.remove(e.selectedObject());e.canvas.renderAll()}};e.bringToFront=function(){e.canvas.bringToFront(e.selectedObject())};e.sendToBack=function(){e.canvas.sendToBack(e.selectedObject())};e.centerX=function(){e.canvas.centerObjectH(e.selectedObject());e.selectedObject().setCoords();e.canvas.renderAll()};e.centerY=function(){e.canvas.centerObjectV(e.selectedObject());e.selectedObject().setCoords();e.canvas.renderAll()};e.fitX=function(){e.selectedObject().set({left:0,width:e.canvas.getWidth()});e.selectedObject().setCoords();e.canvas.renderAll()};e.fitY=function(){e.selectedObject().set({top:0,height:e.canvas.getHeight()});e.selectedObject().setCoords();e.canvas.renderAll()};e.placeLeft=function(){e.selectedObject().set({left:0});e.selectedObject().setCoords();e.canvas.renderAll()};e.placeRight=function(){e.selectedObject().set({left:e.canvas.getWidth()-e.selectedObject().getWidth()});e.selectedObject().setCoords();e.canvas.renderAll()};e.placeTop=function(){e.selectedObject().set({top:0});e.selectedObject().setCoords();e.canvas.renderAll()};e.placeBottom=function(){e.selectedObject().set({top:e.canvas.getHeight()-e.selectedObject().getHeight()});e.selectedObject().setCoords();e.canvas.renderAll()};capsli=e;e.init()})();(function(){var e={};e.dlgAddImage=null;e.init=function(){$("#canvas").resizable({resize:function(e,t){var n=t.element.width(),r=t.element.height();capsli.canvas.setWidth(n);capsli.canvas.setHeight(r)}});$("btn").tooltip();$("#main").on("change","#inpFile",function(t){e.loadPhoto(t)});capsli.canvas.setWidth($("#canvas").width());capsli.canvas.setHeight($("#canvas").height())};e.addRect=function(){var e=new objRect;capsli.addObject(e)};e.addText=function(){var e=new objText({text:"caps.li!!!"});capsli.addObject(e)};e.dlgAddImage=function(){$("#dlgResimEkle").dialog("open")};e.showAddImgDialog=function(){e.dlgAddImage.dialog("open")};e.takePhotoDlg=function(){$("#dlgTakePhoto").modal("show");capsli.webCam.startCamera()};e.loadPhotoDlg=function(){$("#inpFile").click()};e.loadPhoto=function(e){var t=e.target.files;for(var n=0,r;r=t[n];n++){if(!r.type.match("image.*")){continue}var i=new FileReader;i.onload=function(e){return function(e){fabric.Image.fromURL(e.target.result,function(e){e.set("left",300).set("top",300);capsli.addObject(e)})}}(r);i.readAsDataURL(r)}};e.exportFile=function(){capsli.canvas.deactivateAllWithDispatch();capsli.canvas.renderAll();var e=capsli.canvas.toDataURL("png");var t=window.open(e,"_blank")};e.panels={capsProp:ko.observable(false),toggleCapsProp:function(){e.panels.capsProp(!e.panels.capsProp())}};capsli.ui=e;e.init()})();(function(){var e={};e.streaming=false;e.video=document.querySelector("#pht_video");e.canvas=document.querySelector("#pht_canvas");e.width=480;e.height=0;navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;e.init=function(){$("#dlgTakePhoto").on("hidden.bs.modal",function(t){e.stopCamera()})};e.startCamera=function(){navigator.getMedia({video:true,audio:false},function(t){if(navigator.mozGetUserMedia){e.video.mozSrcObject=t}else{var n=window.URL||window.webkitURL;e.video.src=n.createObjectURL(t)}e.video.play()},function(e){console.log("An error occured! "+e)});e.video.addEventListener("canplay",function(t){if(!e.streaming){e.height=e.video.videoHeight/(e.video.videoWidth/e.width);e.video.setAttribute("width",e.width);e.video.setAttribute("height",e.height);e.canvas.setAttribute("width",e.width);e.canvas.setAttribute("height",e.height);e.streaming=true}},false)};e.stopCamera=function(){e.video.pause();e.streaming=false};e.takePhoto=function(){e.canvas.width=e.width;e.canvas.height=e.height;e.canvas.getContext("2d").drawImage(e.video,0,0,e.width,e.height);var t=e.canvas.toDataURL("image/png");fabric.Image.fromURL(t,function(e){e.set("left",300).set("top",300);capsli.addObject(e)})};capsli.webCam={streaming:e.streaming,startCamera:e.startCamera,stopCamera:e.stopCamera,takePhoto:e.takePhoto};e.init()})()