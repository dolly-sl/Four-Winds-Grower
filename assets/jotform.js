/*
 * Javascript EXIF Reader 0.1.2
 * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

var $jot = jQuery.noConflict();

var EXIF={};
(function(){var bDebug=false;EXIF.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",
34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",
41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"};EXIF.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",
259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",
272:"Model",305:"Software",315:"Artist",33432:"Copyright"};EXIF.GPSTags={"0":"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",
24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"};EXIF.StringValues={ExposureProgram:{"0":"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{"0":"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{"0":"Unknown",
1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{"0":"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",
7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",
71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},
SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{"0":"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{"0":"Normal process",1:"Custom process"},WhiteBalance:{"0":"Auto white balance",1:"Manual white balance"},GainControl:{"0":"None",1:"Low gain up",2:"High gain up",
3:"Low gain down",4:"High gain down"},Contrast:{"0":"Normal",1:"Soft",2:"Hard"},Saturation:{"0":"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{"0":"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{"0":"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{"0":"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}};function addEvent(oElement,strEvent,fncHandler){if(oElement.addEventListener)oElement.addEventListener(strEvent,fncHandler,false);else if(oElement.attachEvent)oElement.attachEvent("on"+
strEvent,fncHandler)}function imageHasData(oImg){return!!oImg.exifdata}function getImageData(oImg,fncCallback){BinaryAjax(oImg.src,function(oHTTP){var oEXIF=findEXIFinJPEG(oHTTP.binaryResponse);oImg.exifdata=oEXIF||{};if(fncCallback)fncCallback()})}function findEXIFinJPEG(oFile){var aMarkers=[];if(oFile.getByteAt(0)!=255||oFile.getByteAt(1)!=216)return false;var iOffset=2;var iLength=oFile.getLength();while(iOffset<iLength){if(oFile.getByteAt(iOffset)!=255){if(bDebug)console.log("Not a valid marker at offset "+
iOffset+", found: "+oFile.getByteAt(iOffset));return false}var iMarker=oFile.getByteAt(iOffset+1);if(iMarker==22400){if(bDebug)console.log("Found 0xFFE1 marker");return readEXIFData(oFile,iOffset+4,oFile.getShortAt(iOffset+2,true)-2);iOffset+=2+oFile.getShortAt(iOffset+2,true)}else if(iMarker==225){if(bDebug)console.log("Found 0xFFE1 marker");return readEXIFData(oFile,iOffset+4,oFile.getShortAt(iOffset+2,true)-2)}else iOffset+=2+oFile.getShortAt(iOffset+2,true)}}function readTags(oFile,iTIFFStart,
iDirStart,oStrings,bBigEnd){var iEntries=oFile.getShortAt(iDirStart,bBigEnd);var oTags={};for(var i=0;i<iEntries;i++){var iEntryOffset=iDirStart+i*12+2;var strTag=oStrings[oFile.getShortAt(iEntryOffset,bBigEnd)];if(!strTag&&bDebug)console.log("Unknown tag: "+oFile.getShortAt(iEntryOffset,bBigEnd));oTags[strTag]=readTagValue(oFile,iEntryOffset,iTIFFStart,iDirStart,bBigEnd)}return oTags}function readTagValue(oFile,iEntryOffset,iTIFFStart,iDirStart,bBigEnd){var iType=oFile.getShortAt(iEntryOffset+2,
bBigEnd);var iNumValues=oFile.getLongAt(iEntryOffset+4,bBigEnd);var iValueOffset=oFile.getLongAt(iEntryOffset+8,bBigEnd)+iTIFFStart;switch(iType){case 1:case 7:if(iNumValues==1)return oFile.getByteAt(iEntryOffset+8,bBigEnd);else{var iValOffset=iNumValues>4?iValueOffset:iEntryOffset+8;var aVals=[];for(var n=0;n<iNumValues;n++)aVals[n]=oFile.getByteAt(iValOffset+n);return aVals}break;case 2:var iStringOffset=iNumValues>4?iValueOffset:iEntryOffset+8;return oFile.getStringAt(iStringOffset,iNumValues-
1);break;case 3:if(iNumValues==1)return oFile.getShortAt(iEntryOffset+8,bBigEnd);else{var iValOffset=iNumValues>2?iValueOffset:iEntryOffset+8;var aVals=[];for(var n=0;n<iNumValues;n++)aVals[n]=oFile.getShortAt(iValOffset+2*n,bBigEnd);return aVals}break;case 4:if(iNumValues==1)return oFile.getLongAt(iEntryOffset+8,bBigEnd);else{var aVals=[];for(var n=0;n<iNumValues;n++)aVals[n]=oFile.getLongAt(iValueOffset+4*n,bBigEnd);return aVals}break;case 5:if(iNumValues==1)return oFile.getLongAt(iValueOffset,
bBigEnd)/oFile.getLongAt(iValueOffset+4,bBigEnd);else{var aVals=[];for(var n=0;n<iNumValues;n++)aVals[n]=oFile.getLongAt(iValueOffset+8*n,bBigEnd)/oFile.getLongAt(iValueOffset+4+8*n,bBigEnd);return aVals}break;case 9:if(iNumValues==1)return oFile.getSLongAt(iEntryOffset+8,bBigEnd);else{var aVals=[];for(var n=0;n<iNumValues;n++)aVals[n]=oFile.getSLongAt(iValueOffset+4*n,bBigEnd);return aVals}break;case 10:if(iNumValues==1)return oFile.getSLongAt(iValueOffset,bBigEnd)/oFile.getSLongAt(iValueOffset+
4,bBigEnd);else{var aVals=[];for(var n=0;n<iNumValues;n++)aVals[n]=oFile.getSLongAt(iValueOffset+8*n,bBigEnd)/oFile.getSLongAt(iValueOffset+4+8*n,bBigEnd);return aVals}break}}function readEXIFData(oFile,iStart,iLength){if(oFile.getStringAt(iStart,4)!="Exif"){if(bDebug)console.log("Not valid EXIF data! "+oFile.getStringAt(iStart,4));return false}var bBigEnd;var iTIFFOffset=iStart+6;if(oFile.getShortAt(iTIFFOffset)==18761)bBigEnd=false;else if(oFile.getShortAt(iTIFFOffset)==19789)bBigEnd=true;else{if(bDebug)console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
return false}if(oFile.getShortAt(iTIFFOffset+2,bBigEnd)!=42){if(bDebug)console.log("Not valid TIFF data! (no 0x002A)");return false}if(oFile.getLongAt(iTIFFOffset+4,bBigEnd)!=8){if(bDebug)console.log("Not valid TIFF data! (First offset not 8)",oFile.getShortAt(iTIFFOffset+4,bBigEnd));return false}var oTags=readTags(oFile,iTIFFOffset,iTIFFOffset+8,EXIF.TiffTags,bBigEnd);if(oTags.ExifIFDPointer){var oEXIFTags=readTags(oFile,iTIFFOffset,iTIFFOffset+oTags.ExifIFDPointer,EXIF.Tags,bBigEnd);for(var strTag in oEXIFTags){switch(strTag){case "LightSource":case "Flash":case "MeteringMode":case "ExposureProgram":case "SensingMethod":case "SceneCaptureType":case "SceneType":case "CustomRendered":case "WhiteBalance":case "GainControl":case "Contrast":case "Saturation":case "Sharpness":case "SubjectDistanceRange":case "FileSource":oEXIFTags[strTag]=
EXIF.StringValues[strTag][oEXIFTags[strTag]];break;case "ExifVersion":case "FlashpixVersion":oEXIFTags[strTag]=String.fromCharCode(oEXIFTags[strTag][0],oEXIFTags[strTag][1],oEXIFTags[strTag][2],oEXIFTags[strTag][3]);break;case "ComponentsConfiguration":oEXIFTags[strTag]=EXIF.StringValues.Components[oEXIFTags[strTag][0]]+EXIF.StringValues.Components[oEXIFTags[strTag][1]]+EXIF.StringValues.Components[oEXIFTags[strTag][2]]+EXIF.StringValues.Components[oEXIFTags[strTag][3]];break}oTags[strTag]=oEXIFTags[strTag]}}if(oTags.GPSInfoIFDPointer){var oGPSTags=
readTags(oFile,iTIFFOffset,iTIFFOffset+oTags.GPSInfoIFDPointer,EXIF.GPSTags,bBigEnd);for(var strTag in oGPSTags){switch(strTag){case "GPSVersionID":oGPSTags[strTag]=oGPSTags[strTag][0]+"."+oGPSTags[strTag][1]+"."+oGPSTags[strTag][2]+"."+oGPSTags[strTag][3];break}oTags[strTag]=oGPSTags[strTag]}}return oTags}EXIF.getData=function(oImg,fncCallback){if(!oImg.complete)return false;if(!imageHasData(oImg))getImageData(oImg,fncCallback);else if(fncCallback)fncCallback();return true};EXIF.getTag=function(oImg,
strTag){if(!imageHasData(oImg))return;return oImg.exifdata[strTag]};EXIF.pretty=function(oImg){if(!imageHasData(oImg))return"";var oData=oImg.exifdata;var strPretty="";for(var a in oData)if(oData.hasOwnProperty(a))if(typeof oData[a]=="object")strPretty+=a+" : ["+oData[a].length+" values]\r\n";else strPretty+=a+" : "+oData[a]+"\r\n";return strPretty};EXIF.readFromBinaryFile=function(oFile){return findEXIFinJPEG(oFile)};function loadAllImages(){var aImages=document.getElementsByTagName("img");for(var i=
0;i<aImages.length;i++)if(aImages[i].getAttribute("exif")=="true")if(!aImages[i].complete)addEvent(aImages[i],"load",function(){EXIF.getData(this)});else EXIF.getData(aImages[i])}addEvent(window,"load",loadAllImages)})();
/*
 * Binary File 0.1.5
 * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */
var BinaryFile=function(strData,iDataOffset,iDataLength){var data=strData;var dataOffset=iDataOffset||0;var dataLength=0;this.getRawData=function(){return data};if(typeof strData=="string"){dataLength=iDataLength||data.length;this.getByteAt=function(iOffset){return data.charCodeAt(iOffset+dataOffset)&255}}else if(typeof strData=="unknown"){dataLength=iDataLength||IEBinary_getLength(data);this.getByteAt=function(iOffset){return IEBinary_getByteAt(data,iOffset+dataOffset)}}this.getLength=function(){return dataLength};
this.getSByteAt=function(iOffset){var iByte=this.getByteAt(iOffset);if(iByte>127)return iByte-256;else return iByte};this.getShortAt=function(iOffset,bBigEndian){var iShort=bBigEndian?(this.getByteAt(iOffset)<<8)+this.getByteAt(iOffset+1):(this.getByteAt(iOffset+1)<<8)+this.getByteAt(iOffset);if(iShort<0)iShort+=65536;return iShort};this.getSShortAt=function(iOffset,bBigEndian){var iUShort=this.getShortAt(iOffset,bBigEndian);if(iUShort>32767)return iUShort-65536;else return iUShort};this.getLongAt=
function(iOffset,bBigEndian){var iByte1=this.getByteAt(iOffset),iByte2=this.getByteAt(iOffset+1),iByte3=this.getByteAt(iOffset+2),iByte4=this.getByteAt(iOffset+3);var iLong=bBigEndian?(((iByte1<<8)+iByte2<<8)+iByte3<<8)+iByte4:(((iByte4<<8)+iByte3<<8)+iByte2<<8)+iByte1;if(iLong<0)iLong+=4294967296;return iLong};this.getSLongAt=function(iOffset,bBigEndian){var iULong=this.getLongAt(iOffset,bBigEndian);if(iULong>2147483647)return iULong-4294967296;else return iULong};this.getStringAt=function(iOffset,
iLength){var aStr=[];for(var i=iOffset,j=0;i<iOffset+iLength;i++,j++)aStr[j]=String.fromCharCode(this.getByteAt(i));return aStr.join("")};this.getCharAt=function(iOffset){return String.fromCharCode(this.getByteAt(iOffset))};this.toBase64=function(){return window.btoa(data)};this.fromBase64=function(strBase64){data=window.atob(strBase64)}};
/*
 * ImageInfo 0.1.2 - A JavaScript library for reading image metadata.
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
 * Modded by kenma9123 to fully work and be compatible in jotform
 */
var ImageInfo = {};
(function(){var files=[];function readFileData(filename,binaryData,binaryLength,callback){var data=new BinaryFile(binaryData,0,binaryLength);var tags=readInfoFromData(data);files[filename]=tags;if(callback)callback()}function readInfoFromData(data){var offset=0;if(data.getByteAt(0)==255&&data.getByteAt(1)==216)return readJPEGInfo(data);if(data.getByteAt(0)==137&&data.getStringAt(1,3)=="PNG")return readPNGInfo(data);if(data.getStringAt(0,3)=="GIF")return readGIFInfo(data);if(data.getByteAt(0)==66&&
data.getByteAt(1)==77)return readBMPInfo(data);return{format:"UNKNOWN"}}function readPNGInfo(data){var w=data.getLongAt(16,true);var h=data.getLongAt(20,true);var bpc=data.getByteAt(24);var ct=data.getByteAt(25);var bpp=bpc;if(ct==4)bpp*=2;if(ct==2)bpp*=3;if(ct==6)bpp*=4;var alpha=data.getByteAt(25)>=4;return{format:"PNG",version:"",width:w,height:h,bpp:bpp,alpha:alpha,exif:{}}}function readGIFInfo(data){var version=data.getStringAt(3,3);var w=data.getShortAt(6);var h=data.getShortAt(8);var bpp=(data.getByteAt(10)>>
4&7)+1;return{format:"GIF",version:version,width:w,height:h,bpp:bpp,alpha:false,exif:{}}}function readJPEGInfo(data){var w=0;var h=0;var comps=0;var len=data.getLength();var offset=2;while(offset<len){var marker=data.getShortAt(offset,true);offset+=2;if(marker==65472){h=data.getShortAt(offset+3,true);w=data.getShortAt(offset+5,true);comps=data.getByteAt(offset+7,true);break}else offset+=data.getShortAt(offset,true)}var exif={};if(typeof EXIF!="undefined"&&EXIF.readFromBinaryFile)exif=EXIF.readFromBinaryFile(data);
return{format:"JPEG",version:"",width:w,height:h,bpp:comps*8,alpha:false,exif:exif}}function readBMPInfo(data){var w=data.getLongAt(18);var h=data.getLongAt(22);var bpp=data.getShortAt(28);return{format:"BMP",version:"",width:w,height:h,bpp:bpp,alpha:false,exif:{}}}ImageInfo.loadInfo=function(args,cb){if(!files[args.filename])readFileData(args.filename,args.binary,args.size,cb);else if(cb)cb()};ImageInfo.getAllFields=function(filename){if(!files[filename])return null;var tags={};for(var a in files[filename])if(files[filename].hasOwnProperty(a))tags[a]=
files[filename][a];return tags};ImageInfo.getField=function(filename,field){if(!files[filename])return null;return files[filename][field]}})();
/**
 * http://github.com/valums/file-uploader
 * 
 * Multiple file upload component with progress-bar, drag-and-drop. 
 * ï¿½ 2010 Andrew Valums ( andrew(at)valums.com ) 
 * 
 * Licensed under GNU GPL 2 or later, see license.txt.
 */    

//
// Helper functions
//

var qq = qq || {};



/**
 * Emre: to protect submit button enable/disable problem (43334)
 */
qq.disableSubmitButton = function(){
	if(document.querySelectorAll('.form-submit-button')){
        document.querySelectorAll('.form-submit-button').each(function(b){
        	//Emre: submit button problem (51335)
        	if(b.className!="form-submit-button lastDisabled"){
	        	b.disable();
	        	b.innerHTML = JotForm.texts.pleaseWait;
	            b.addClassName("disabled");
        	}
        });
	}
};

qq.enableSubmitButton = function(){
	
	var liSize = document.querySelectorAll('ul.qq-upload-list li').size() - document.querySelectorAll('ul.qq-upload-list li.qq-upload-fail').size();
	if (liSize == document.querySelectorAll('ul.qq-upload-list li.qq-upload-success').size()){
		if (document.querySelectorAll('.form-submit-button')){
			document.querySelectorAll('.form-submit-button').each(function(b){
				//Emre: submit button problem (51335)
				if (b.className!="form-submit-button lastDisabled"){
		            b.enable();
		            if (b.className.indexOf("disabled") > -1){
		            	b.removeClassName("disabled")
		            } else {
		            	b.className = "form-submit-button";
		            }
                    if (b.oldText === undefined && CardForm.layoutParams.reviewBeforeSubmit !== null) { // This should be temporary. If you are here, then ask sercan.
                        b.innerHTML = CardForm.layoutParams.reviewBeforeSubmit.reviewText;
                    } else {
    					b.innerHTML = b.oldText;
                    }
				}
	        });
		}
	}
};

/**
 * Adds all missing properties from second obj to first obj
 */ 
qq.extend = function(first, second){
    for (var prop in second){
        first[prop] = second[prop];
    }
};  

/**
 * Searches for a given element in the array, returns -1 if it is not present.
 * @param {Number} [from] The index at which to begin the search
 */
qq.indexOf = function(arr, elt, from){
    if (arr.indexOf){ return arr.indexOf(elt, from); }
    
    from = from || 0;
    var len = arr.length;    
    
    if (from < 0){ from += len;}  

    for (; from < len; from++){  
        if (from in arr && arr[from] === elt){  
            return from;
        }
    }  
    return -1;  
}; 
    
qq.getUniqueId = (function(){
    var id = 0;
    return function(){ return id++; };
})();

//
// Events

qq.attach = function(element, type, fn){
    if (element.addEventListener){
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent){
        element.attachEvent('on' + type, fn);
    }
};
qq.detach = function(element, type, fn){
    if (element.removeEventListener){
        element.removeEventListener(type, fn, false);
    } else if (element.attachEvent){
        element.detachEvent('on' + type, fn);
    }
};

qq.preventDefault = function(e){
    if (e.preventDefault){
        e.preventDefault();
    } else{
        e.returnValue = false;
    }
};

//
// Node manipulations

/**
 * Insert node a before node b.
 */
qq.insertBefore = function(a, b){
    b.parentNode.insertBefore(a, b);
};
qq.remove = function(element){
    element.parentNode.removeChild(element);
};

qq.contains = function(parent, descendant){       
    // compareposition returns false in this case
    if (parent == descendant){ return true; }
    
    if (parent.contains){
        return parent.contains(descendant);
    } else {
        return !!(descendant.compareDocumentPosition(parent) & 8);
    }
};

/**
 * Creates and returns element from html string
 * Uses innerHTML to create an element
 */
qq.toElement = (function(){
    var div = document.createElement('div');
    return function(html){
        div.innerHTML = html;
        var element = div.firstChild;
        div.removeChild(element);
        return element;
    };
})();

//
// Node properties and attributes

/**
 * Sets styles for an element.
 * Fixes opacity in IE6-8.
 */
qq.css = function(element, styles){
    if (styles.opacity !== null){
        if (typeof element.style.opacity != 'string' && typeof(element.filters) != 'undefined'){
            styles.filter = 'alpha(opacity=' + Math.round(100 * styles.opacity) + ')';
        }
    }
    qq.extend(element.style, styles);
};
qq.hasClass = function(element, name){
    var re = new RegExp('(^| )' + name + '( |$jot)');
    return re.test(element.className);
};
qq.addClass = function(element, name){
    if (!qq.hasClass(element, name)){
        element.className += ' ' + name;
    }
};
qq.removeClass = function(element, name){
    var re = new RegExp('(^| )' + name + '( |$jot)');
    element.className = element.className.replace(re, ' ').replace(/^\s+|\s+$jot/g, "");
};
qq.setText = function(element, text){
    element.innerText = text;
    element.textContent = text;
};

//
// Selecting elements

qq.children = function(element){
    var children = [],
    child = element.firstChild;

    while (child){
        if (child.nodeType == 1){
            children.push(child);
        }
        child = child.nextSibling;
    }

    return children;
};

qq.getByClass = function(element, className){
    if (element.querySelectorAll){
        return element.querySelectorAll('.' + className);
    }

    var result = [];
    var candidates = element.getElementsByTagName("*");
    var len = candidates.length;

    for (var i = 0; i < len; i++){
        if (qq.hasClass(candidates[i], className)){
            result.push(candidates[i]);
        }
    }
    return result;
};

/**
 * obj2url() takes a json-object as argument and generates
 * a querystring. pretty much like jQuery.param()
 * 
 * how to use:
 *
 *    `qq.obj2url({a:'b',c:'d'},'http://any.url/upload?otherParam=value');`
 *
 * will result in:
 *
 *    `http://any.url/upload?otherParam=value&a=b&c=d`
 *
 * @param  Object JSON-Object
 * @param  String current querystring-part
 * @return String encoded querystring
 */
qq.obj2url = function(obj, temp, prefixDone){
    var uristrings = [],
        prefix = '&',
        add = function(nextObj, i){
            var nextTemp = temp 
                ? (/\[\]$jot/.test(temp)) // prevent double-encoding
                   ? temp
                   : temp+'['+i+']'
                : i;
            if ((nextTemp != 'undefined') && (i != 'undefined')) {  
                uristrings.push(
                    (typeof nextObj === 'object') 
                        ? qq.obj2url(nextObj, nextTemp, true)
                        : (Object.prototype.toString.call(nextObj) === '[object Function]')
                            ? encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj())
                            : encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj)                                                          
                );
            }
        }, i; 

    if (!prefixDone && temp) {
      prefix = (/\?/.test(temp)) ? (/\?$jot/.test(temp)) ? '' : '&' : '?';
      uristrings.push(temp);
      uristrings.push(qq.obj2url(obj));
    } else if ((Object.prototype.toString.call(obj) === '[object Array]') && (typeof obj != 'undefined') ) {
        // we wont use a for-in-loop on an array (performance)
        for (i = 0, len = obj.length; i < len; ++i){
            add(obj[i], i);
        }
    } else if ((typeof obj != 'undefined') && (obj !== null) && (typeof obj === "object")){
        // for anything else but a scalar, we will use for-in-loop
        for (i in obj){
            add(obj[i], i);
        }
    } else {
        uristrings.push(encodeURIComponent(temp) + '=' + encodeURIComponent(obj));
    }

    return uristrings.join(prefix)
                     .replace(/^&/, '')
                     .replace(/%20/g, '+'); 
};

//
//
// Uploader Classes
//
//

qq = qq || {};
    
/**
 * Creates upload button, validates upload, but doesn't create file list or dd. 
 */
qq.FileUploaderBasic = function(o){
    this._options = {
        // set to true to see the server response
        debug: false,
        action: '/server/upload',
        params: {},
        button: null,
        multiple: true,
        maxConnections: 3,
        fileLimit: 0,
        // validation        
        allowedExtensions: [],               
        sizeLimit: 0,   
        minSizeLimit: 0,
        cancelText: 'Cancel',
        ofText: 'of',                             
        // events
        // return false to cancel submit
        onSubmit: function(id, fileName){},
        onProgress: function(id, fileName, loaded, total){},
        onComplete: function(id, fileName, responseJSON){},
        onCancel: function(id, fileName){},
        // messages                
        messages: {
            typeError: "{file} has invalid extension. Only {extensions} are allowed.",
            sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
            minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
            emptyError: "{file} is empty, please select files again without it.",
            onLeave: "The files are being uploaded, if you leave now the upload will be cancelled.",
            fileLimitError: "Only {fileLimit} file uploads allowed."
        },
        showMessage: function(message){
            alert(message);
        }               
    };
    qq.extend(this._options, o);
        
    // number of files being uploaded
    this._filesInProgress = 0;
    this._handler = this._createUploadHandler(); 
    
    if (this._options.button){ 
        this._button = this._createUploadButton(this._options.button);
    }
                        
    this._preventLeaveInProgress();         
};
   
qq.FileUploaderBasic.prototype = {
    setParams: function(params){
        this._options.params = params;
    },
    getInProgress: function(){
        return this._filesInProgress;         
    },
    _createUploadButton: function(element){
        var self = this;
        
        return new qq.UploadButton({
            element: element,
            multiple: this._options.multiple && qq.UploadHandlerXhr.isSupported(),
            onChange: function(input){
                self._onInputChange(input);
            }        
        });           
    },    
    _createUploadHandler: function(){
        var self = this,
            handlerClass;        
        
        if(qq.UploadHandlerXhr.isSupported()){           
            handlerClass = 'UploadHandlerXhr';                        
        } else {
            handlerClass = 'UploadHandlerForm';
        }

        var handler = new qq[handlerClass]({
            debug: this._options.debug,
            action: this._options.action,         
            maxConnections: this._options.maxConnections,   
            onProgress: function(id, fileName, loaded, total){                
                self._onProgress(id, fileName, loaded, total);
                self._options.onProgress(id, fileName, loaded, total);                    
            },            
            onComplete: function(id, fileName, result){
                self._onComplete(id, fileName, result);
                self._options.onComplete(id, fileName, result);
            },
            onCancel: function(id, fileName){
                self._onCancel(id, fileName);
                self._options.onCancel(id, fileName);
            }
        });

        return handler;
    },    
    _preventLeaveInProgress: function(){
        var self = this;
        
        qq.attach(window, 'beforeunload', function(e){
            if (!self._filesInProgress){return;}
            
            e = e || window.event;
            // for ie, ff
            e.returnValue = self._options.messages.onLeave;
            // for webkit
            return self._options.messages.onLeave;
        });        
    },    
    _onSubmit: function(id, fileName){
        this._filesInProgress++;  
    },
    _onProgress: function(id, fileName, loaded, total){        
    },
    _onComplete: function(id, fileName, result){
        this._filesInProgress--;                 
        if (result.error){
            this._options.showMessage(result.error);
        }             
    },
    _onCancel: function(id, fileName){
        this._filesInProgress--;        
    },
    _onInputChange: function(input){
        if (this._handler instanceof qq.UploadHandlerXhr){                
            this._uploadFileList(input.files);                   
        } else {             
            if (this._validateFile(input)){                
                this._uploadFile(input);                                    
            }                      
        }

        // ** cardform hack ** cards listens for change but targeted input is removed from DOM so cannot detect which card
        // fire a manual change event from the parent to simulate a similar affect
        var parent = input.parentElement;
        if (parent) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, true);
            parent.dispatchEvent(event);
        }
        // ** end of cardForm hack

        this._button.reset(); 
    },  
    _uploadFileList: function(files){
        var i;
        for (i=0; i<files.length; i++){
            if ( !this._validateFile(files[i], files)){
                return;
            }            
        }
        
        for (i=0; i<files.length; i++){
            this._uploadFile(files[i]);        
        }        
    },       
    _uploadFile: function(fileContainer){    
    	//Emre
    	qq.disableSubmitButton();
        var id = this._handler.add(fileContainer);
        var fileName = this._handler.getName(id);
            
        if (this._options.onSubmit(id, fileName) !== false){
            this._onSubmit(id, fileName);
            this._handler.upload(id, this._options.params);
        }
    },      
    _validateFile: function(file, files){
        var name, size;
        if (file.value){
            // it is a file input            
            // get input value and remove path to normalize
            name = file.value.replace(/.*(\/|\\)/, "");
        } else {
            // fix missing properties in Safari
            //Emre: to prevent file name problem in firefox7 (47183)
            name = file.fileName ? file.fileName : file.name; 
            //Emre: to prevent file.fileSize being undefined in Firefox 7 - fileSize cannot be "0" (48526)
            size = file.fileSize ? file.fileSize : file.size;
        }
        //Emre: name returns 'file' in IE and it cause problem when conditions are used (50566)
        if(name == 'file'){
        	return false;
        }

        if (! this._isAllowedExtension(name)){            
            this._error('typeError', name);
            return false;
            
        } else if (size === 0){            
            this._error('emptyError', name);
            return false;
                                                     
        } else if (size && this._options.sizeLimit && size > this._options.sizeLimit){            
            this._error('sizeError', name);
            return false;
                        
        } else if (size && size < this._options.minSizeLimit){
            this._error('minSizeError', name);
            return false;            
        
        } else if(this._options.fileLimit > 0 && (this._element.select('.qq-upload-list').length > 0 && this._element.select('.qq-upload-list')[0].select('li').length - this._element.select('.qq-upload-list')[0].select('li.file-deleted').length + files.length > this._options.fileLimit)) {
            this._error('fileLimitError', name);
            return false;
        }
        
        return true;                
    },
    _error: function(code, fileName){
        var message = this._options.messages[code];        
        function r(name, replacement){ message = message.replace(name, replacement); }
        
        r('{file}', this._formatFileName(fileName));        
        r('{extensions}', this._options.allowedExtensions.join(', '));
        r('{sizeLimit}', this._formatSize(this._options.sizeLimit));
        r('{minSizeLimit}', this._formatSize(this._options.minSizeLimit));
        r('{fileLimit}', this._options.fileLimit);
        
        this._options.showMessage(message);                
    },
    _formatFileName: function(name){
        if (name.length > 33){
            name = name.slice(0, 19) + '...' + name.slice(-13);    
        }
        return name;
    },
    _isAllowedExtension: function(fileName){
        var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';
        var allowed = this._options.allowedExtensions;
        
        if (!allowed.length){return true;}        
        
        for (var i=0; i<allowed.length; i++){
            if (allowed[i].toLowerCase() == ext){ return true;}    
        }
        
        return false;
    },    
    _formatSize: function(bytes){
        var i = -1;                                    
        do {
            bytes = bytes / 1024;
            i++;  
        } while (bytes > 99);
        
        return Math.max(bytes, 0.1).toFixed(1) + ['KB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];          
    }
};

qq.getUploaderTemplate = function(buttonText) {
    return '<div class="qq-uploader">' +
    '<div class="qq-upload-drop-area"><span>Drop files here to upload</span></div>' +
    '<div class="qq-upload-button {buttonStyle}">' + buttonText + '</div>' +
    '<div class="inputContainer" style="overflow: hidden; position: absolute; top: 0; right: 0"></div>' +
    '<div class="form-sub-label">{subLabel}</div>' +
    '<span style="display:none" class="multipleFileUploadLabels cancelText">{cancel}</span>' +
    '<span style="display:none" class="multipleFileUploadLabels ofText">{of}</span>' +
    '<ul class="qq-upload-list"></ul>' +
    '</div>';
}

qq.getUploadedFileTemplate = function() {
    return '<li>' +
    '<span class="qq-upload-file qq-file-uploading"></span>' +
    '<span class="qq-upload-spinner"></span>' +
    '<a class="qq-upload-cancel" href="#">{Cancel}</a>' +
    '<span class="qq-upload-size"></span>' +
    '<span class="qq-upload-failed-text">Failed</span>' +
    '<span class="qq-upload-delete">X</span>' +
    '</li>';
}

qq.getUploaderSelectors = function() {
    return {
        // used to get elements from templates
        button: 'qq-upload-button',
        drop: 'qq-upload-drop-area',
        dropActive: 'qq-upload-drop-area-active',
        list: 'qq-upload-list',
                    
        file: 'qq-upload-file',
        spinner: 'qq-upload-spinner',
        size: 'qq-upload-size',
        cancel: 'qq-upload-cancel',
        deleteItem: 'qq-upload-delete',
        
        uploading: 'qq-file-uploading',
        
        // added to list item when upload completes
        // used in css to hide progress spinner
        success: 'qq-upload-success',
        fail: 'qq-upload-fail'
    };
}

/**
 * Class that creates upload widget with drag-and-drop and file list
 * @inherits qq.FileUploaderBasic
 */
qq.FileUploader = function(o){
    // call parent constructor
    qq.FileUploaderBasic.apply(this, arguments);
    
    // additional options
    qq.extend(this._options, {
        element: null,
        // if set, will be used instead of qq-upload-list in template
        listElement: null,
        subLabel:'',
        buttonText:'',
        template: qq.getUploaderTemplate(this._options.buttonText),
        // template for one item in file list
        fileTemplate: qq.getUploadedFileTemplate(),        
        classes: qq.getUploaderSelectors()
    });
    // overwrite options with user supplied    
    qq.extend(this._options, o);   

    this._element = this._options.element;

    this._element.innerHTML = this._options.template.replace('{subLabel}', this._options.subLabel).replace('{of}', this._options.ofText).replace('{cancel}', this._options.cancelText);


    if (this._options.buttonStyle) {
        this._element.innerHTML = this._element.innerHTML.replace('{buttonStyle}', this._options.buttonStyle);
    } else {
        this._element.innerHTML = this._element.innerHTML.replace('{buttonStyle}', '');
    }
    
    this._listElement = this._options.listElement || this._find(this._element, 'list');

    this._classes = this._options.classes;
        
    this._button = this._createUploadButton(this._find(this._element, 'button'));        
    
    this._bindCancelEvent();
    this._setupDragDrop();
};

// inherit from Basic Uploader
qq.extend(qq.FileUploader.prototype, qq.FileUploaderBasic.prototype);

qq.extend(qq.FileUploader.prototype, {
    /**
     * Gets one of the elements listed in this._options.classes
     **/
    _find: function(parent, type){                                
        var element = qq.getByClass(parent, this._options.classes[type])[0];        
        if (!element){
            throw new Error('element not found ' + type);
        }
        
        return element;
    },
    _setupDragDrop: function(){
        var self = this,
            dropArea = this._find(this._element, 'drop');                        

        var dz = new qq.UploadDropZone({
            element: dropArea,
            onEnter: function(e){
                qq.addClass(dropArea, self._classes.dropActive);
                e.stopPropagation();
            },
            onLeave: function(e){
                e.stopPropagation();
            },
            onLeaveNotDescendants: function(e){
                qq.removeClass(dropArea, self._classes.dropActive);  
            },
            onDrop: function(e){
                document.querySelectorAll(".qq-upload-drop-area").each(function(drp) {
                    drp.hide();
                });
                qq.removeClass(dropArea, self._classes.dropActive);
                self._uploadFileList(e.dataTransfer.files);    
            }
        });
                
        dropArea.style.display = 'none';

        qq.attach(document, 'dragenter', function(e){
            if (!dz._isValidFileDrag(e)){ return; } 
            
            dropArea.style.display = 'block';            
        });                 
        qq.attach(document, 'dragleave', function(e){
            if (!dz._isValidFileDrag(e)){ return; }            
            
            var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
            // only fire when leaving document out
            if ( ! relatedTarget || relatedTarget.nodeName == "HTML" || relatedTarget.nodeName == "FORM"){               
                dropArea.style.display = 'none';                                            
            }

            // also fire when it triggers via mouseup or cursor leaves browser window
            // pageX and pageY always returns 0 in these conditions
            if (e.pageX === 0 && e.pageY === 0) {
                dropArea.style.display = 'none';
            }
        });  
    },
    _onSubmit: function(id, fileName){
        qq.FileUploaderBasic.prototype._onSubmit.apply(this, arguments);
        this._addToList(id, fileName);  
    },
    _onProgress: function(id, fileName, loaded, total){
        qq.FileUploaderBasic.prototype._onProgress.apply(this, arguments);

        var item = this._getItemByFileId(id);
        var size = this._find(item, 'size');
        size.style.display = 'inline';
        
        var text; 
        if (loaded != total){
            var ofText = this._listElement.up('.form-line').down(".ofText").innerText;
            text = Math.round(loaded / total * 100) + '% '+ofText+' ' + this._formatSize(total);
        } else {                                   
            text = this._formatSize(total);
        }          
        
        qq.setText(size, text);         
    },
    _onComplete: function(id, fileName, result){
        qq.FileUploaderBasic.prototype._onComplete.apply(this, arguments);

        // mark completed
        var item = this._getItemByFileId(id);                
        qq.remove(this._find(item, 'cancel'));
        qq.remove(this._find(item, 'spinner'));
        var nameEl = this._find(item, 'uploading');
        nameEl.className = "qq-upload-file";
        
        if('message' in result) {
            item.writeAttribute('actual-filename', result.message);
        }

        if (result.success){
            qq.addClass(item, this._classes.success);    
        } else {
            qq.addClass(item, this._classes.fail);
        }

        var qid = item.up('.form-line').id.split('id_')[1];
        JotForm.runConditionForId(qid);

        typeof qq.onUploadComplete === 'function' && qq.onUploadComplete(item, id, fileName, result, qid);
        //Emre
        qq.enableSubmitButton();
    },
    _addToList: function(id, fileName){
        
        var cancel =  this._listElement.up('.form-line').down(".cancelText").innerText;
        var item = qq.toElement(this._options.fileTemplate.replace(/\{Cancel\}/, cancel));
        item.qqFileId = id;

        var fileElement = this._find(item, 'file');
        qq.setText(fileElement, this._formatFileName(fileName));
        this._find(item, 'size').style.display = 'none';
        var opts = this._options;

        qq.attach(this._find(item, 'deleteItem'), 'click', function(){
            var fileToDelete = item.readAttribute('actual-filename') ? item.readAttribute('actual-filename') : fileName;
            var qid = item.up('.form-line').id.split('id_')[1]
            var failed = item.className.indexOf('fail') >= 0;
            if ('JotForm' in window) {
                var itemParent = item.parentElement;
                if(!failed) {
                    new Ajax.Jsonp(JotForm.server, {
                        parameters: {
                            action: 'removeTempUpload',
                            tempFolder: opts.params.folder,
                            field: opts.params.field,
                            fileName: fileToDelete
                        },
                        evalJSON: 'force',
                        onComplete: function(t) {
                            t = t.responseJSON || t;
                            if (t.success) {
                                $jot(item).remove();
                                JotForm.corrected(item);
                                JotForm.runConditionForId(qid);

                                typeof opts.onDelete === 'function' && opts.onDelete(opts.params.folder, opts.params.field, fileToDelete);
                                typeof qq.onDelete === 'function' && qq.onDelete(qid, opts.params.folder, opts.params.field, fileToDelete);
                            } else {
                                JotForm.errored(item, t.error);
                            }

                            // fire change event -> cardForm needs change event to validate card
                            if (itemParent) {
                                itemParent.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                        }
                    });
                } else {
                    $jot(item).remove();
                    JotForm.corrected(item);
                    JotForm.runConditionForId(qid);
                    // fire change event -> cardForm needs change event to validate card
                    if (itemParent) {
                        itemParent.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            }
        });
        this._listElement.appendChild(item);
    },
    _getItemByFileId: function(id){
        var item = this._listElement.firstChild;        
        
        // there can't be txt nodes in dynamically created list
        // and we can  use nextSibling
        while (item){            
            if (item.qqFileId == id){ return item; }            
            item = item.nextSibling;
        }          
    },
    /**
     * delegate click event for cancel link 
     **/
    _bindCancelEvent: function(){
        var self = this,
            list = this._listElement;            
        
        qq.attach(list, 'click', function(e){            
            e = e || window.event;
            var target = e.target || e.srcElement;
            
            if (qq.hasClass(target, self._classes.cancel)){                
                qq.preventDefault(e);
               
                var item = target.parentNode;
                self._handler.cancel(item.qqFileId);
                qq.remove(item);
            }
        });
    }    
});
    
qq.UploadDropZone = function(o){
    this._options = {
        element: null,  
        onEnter: function(e){},
        onLeave: function(e){},  
        // is not fired when leaving element by hovering descendants   
        onLeaveNotDescendants: function(e){},   
        onDrop: function(e){}                       
    };
    qq.extend(this._options, o); 
    
    this._element = this._options.element;
    
    this._disableDropOutside();
    this._attachEvents();   
};

qq.UploadDropZone.prototype = {
    _disableDropOutside: function(e){
        // run only once for all instances
        if (!qq.UploadDropZone.dropOutsideDisabled ){

            qq.attach(document, 'dragover', function(e){
                if (e.dataTransfer){
                    e.dataTransfer.dropEffect = 'none';
                    e.preventDefault(); 
                }           
            });
            
            qq.UploadDropZone.dropOutsideDisabled = true; 
        }        
    },
    _attachEvents: function(){
        var self = this;              
                  
        qq.attach(self._element, 'dragover', function(e){
            if (!self._isValidFileDrag(e)){ return; }
            
            var effect = e.dataTransfer.effectAllowed;
            if (effect == 'move' || effect == 'linkMove'){
                e.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)    
            } else {                    
                e.dataTransfer.dropEffect = 'copy'; // for Chrome
            }
                                                     
            e.stopPropagation();
            e.preventDefault();                                                                    
        });
        
        qq.attach(self._element, 'dragenter', function(e){
            if (!self._isValidFileDrag(e)){ return; }
                        
            self._options.onEnter(e);
        });
        
        qq.attach(self._element, 'dragleave', function(e){
            if (!self._isValidFileDrag(e)) { return; }
            
            self._options.onLeave(e);
            
            var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);                      
            // do not fire when moving a mouse over a descendant
            if (qq.contains(this, relatedTarget)) { return; }
                        
            self._options.onLeaveNotDescendants(e); 
        });
                
        qq.attach(self._element, 'drop', function(e){
            if (!self._isValidFileDrag(e)) { return; }
            
            e.preventDefault();
            self._options.onDrop(e);
        });          
    },
    _isValidFileDrag: function(e){
        var dt = e.dataTransfer,
            // do not check dt.types.contains in webkit, because it crashes safari 4            
            isWebkit = navigator.userAgent.indexOf("AppleWebKit") > -1;                        

        // dt.effectAllowed is none in Safari 5
        // dt.types.contains check is for firefox            
        return dt && dt.effectAllowed != 'none' && 
            (dt.files || (!isWebkit && dt.types.contains && dt.types.contains('Files')));
        
    }        
}; 

qq.UploadButton = function(o){
    this._options = {
        element: null,  
        // if set to true adds multiple attribute to file input      
        multiple: false,
        // name attribute of file input
        name: 'file',
        onChange: function(input){},
        hoverClass: 'qq-upload-button-hover',
        focusClass: 'qq-upload-button-focus'                       
    };
    
    qq.extend(this._options, o);
        
    this._element = this._options.element;
    
    // make button suitable container for input
    qq.css(this._element, {
        position: 'relative',
        overflow: 'hidden',
        // Make sure browse button is in the right side
        // in Internet Explorer
        direction: 'ltr'
    });   
    
    this._input = this._createInput();
};

qq.UploadButton.prototype = {
    /* returns file input element */    
    getInput: function(){
        return this._input;
    },
    /* cleans/recreates the file input */
    reset: function(){
        if (this._input.parentNode){
            qq.remove(this._input);    
        }
        
        qq.removeClass(this._element, this._options.focusClass);
        this._input = this._createInput();
    },    
    _createInput: function(){                
        var input = document.createElement("input");
        
        if (this._options.multiple){
            input.setAttribute("multiple", "multiple");
        }
                
        input.setAttribute("type", "file");
        input.setAttribute("name", this._options.name);
        
        qq.css(input, {
            position: 'absolute',
            // in Opera only 'browse' button
            // is clickable and it is located at
            // the right side of the input
            right: 0,
            top: 0,
            fontFamily: 'Arial',
            fontSize: '118px',
            margin: 0,
            padding: 0,
            cursor: 'pointer',
            opacity: 0
        });
        
        var inputContainer = this._element.up().down('.inputContainer');
        inputContainer.update(input);

        //if element is visable
        if (this._element.getWidth() === 0 && this._element.getHeight() === 0 ) {
            inputContainer.setStyle({width: "100%", height: "100%"});
        }else{
            var width = this._element.getWidth() > 200 ? this._element.getWidth() : 224;
            var height = this._element.getHeight() > 20 ? this._element.getHeight() : 45;
            inputContainer.setStyle({width: width+"px", height:  height+"px"});
        }

        var self = this;
        qq.attach(input, 'change', function(){
            self._options.onChange(input);
        });
                
        qq.attach(input, 'mouseover', function(){
            qq.addClass(self._element, self._options.hoverClass);
        });
        qq.attach(input, 'mouseout', function(){
            qq.removeClass(self._element, self._options.hoverClass);
        });
        qq.attach(input, 'focus', function(){
            qq.addClass(self._element, self._options.focusClass);
        });
        qq.attach(input, 'blur', function(){
            qq.removeClass(self._element, self._options.focusClass);
        });

        // IE and Opera, unfortunately have 2 tab stops on file input
        // which is unacceptable in our case, disable keyboard access
        if (window.attachEvent){
            // it is IE or Opera
            input.setAttribute('tabIndex', "-1");
        }

        return input;            
    }        
};

/**
 * Class for uploading files, uploading itself is handled by child classes
 */
qq.UploadHandlerAbstract = function(o){
    this._options = {
        debug: false,
        action: '/upload.php',
        // maximum number of concurrent uploads        
        maxConnections: 999,
        onProgress: function(id, fileName, loaded, total){},
        onComplete: function(id, fileName, response){},
        onCancel: function(id, fileName){}
    };
    qq.extend(this._options, o);    
    
    this._queue = [];
    // params for files in queue
    this._params = [];
};
qq.UploadHandlerAbstract.prototype = {
    log: function(str){        
        if (this._options.debug && window.console){ console.log('[uploader] ' + str); }        
    },
    /**
     * Adds file or file input to the queue
     * @returns id
     **/    
    add: function(file){},
    /**
     * Sends the file identified by id and additional query params to the server
     */
    upload: function(id, params){
        var len = this._queue.push(id);

        var copy = {};        
        qq.extend(copy, params);
        this._params[id] = copy;        
                
        // if too many active uploads, wait...
        if (len <= this._options.maxConnections){               
            this._upload(id, this._params[id]);
        }
    },
    /**
     * Cancels file upload by id
     */
    cancel: function(id){
        this._cancel(id);
        this._dequeue(id);
    },
    /**
     * Cancells all uploads
     */
    cancelAll: function(){
        for (var i=0; i<this._queue.length; i++){
            this._cancel(this._queue[i]);
        }
        this._queue = [];
    },
    /**
     * Returns name of the file identified by id
     */
    getName: function(id){},
    /**
     * Returns size of the file identified by id
     */          
    getSize: function(id){},
    /**
     * Returns id of files being uploaded or
     * waiting for their turn
     */
    getQueue: function(){
        return this._queue;
    },
    /**
     * Actual upload method
     */
    _upload: function(id){},
    /**
     * Actual cancel method
     */
    _cancel: function(id){},     
    /**
     * Removes element from queue, starts upload of next
     */
    _dequeue: function(id){
        var i = qq.indexOf(this._queue, id);
        this._queue.splice(i, 1);
                
        var max = this._options.maxConnections;
        
        if (this._queue.length >= max){
            var nextId = this._queue[max-1];
            this._upload(nextId, this._params[nextId]);
        }
    }        
};

/**
 * Class for uploading files using form and iframe
 * @inherits qq.UploadHandlerAbstract
 */
qq.UploadHandlerForm = function(o){
    qq.UploadHandlerAbstract.apply(this, arguments);
       
    this._inputs = {};
};
// @inherits qq.UploadHandlerAbstract
qq.extend(qq.UploadHandlerForm.prototype, qq.UploadHandlerAbstract.prototype);

qq.extend(qq.UploadHandlerForm.prototype, {
    add: function(fileInput){
        fileInput.setAttribute('name', 'qqfile');
        var id = 'qq-upload-handler-iframe' + qq.getUniqueId();       
        
        this._inputs[id] = fileInput;
        
        // remove file input from DOM
        if (fileInput.parentNode){
            qq.remove(fileInput);
        }
                
        return id;
    },
    getName: function(id){
        // get input value and remove path to normalize
        return this._inputs[id].value.replace(/.*(\/|\\)/, "");
    },    
    _cancel: function(id){
        this._options.onCancel(id, this.getName(id));
        
        delete this._inputs[id];        

        var iframe = document.getElementById(id);
        if (iframe){
            // to cancel request set src to something else
            // we use src="javascript:false;" because it doesn't
            // trigger ie6 prompt on https
            iframe.setAttribute('src', 'javascript:false;');

            qq.remove(iframe);
        }
    },     
    _upload: function(id, params){                        
        var input = this._inputs[id];
        
        if (!input){
            throw new Error('file with passed id was not added, or already uploaded or cancelled');
        }                

        var fileName = this.getName(id);
                
        var iframe = this._createIframe(id);
        var form = this._createForm(iframe, params);
        form.appendChild(input);
        var self = this;
        this._attachLoadEvent(iframe, function(){                                 
            self.log('iframe loaded');
            
            var response = self._getIframeContentJSON(iframe);

            self._options.onComplete(id, fileName, response);
            self._dequeue(id);
            
            delete self._inputs[id];
            // timeout added to fix busy state in FF3.6
            setTimeout(function(){
                qq.remove(iframe);
            }, 1);
        });

        form.submit();        
        qq.remove(form);        
        
        return id;
    }, 
    _attachLoadEvent: function(iframe, callback){
        qq.attach(iframe, 'load', function(){
            // when we remove iframe from dom
            // the request stops, but in IE load
            // event fires
            if (!iframe.parentNode){
                return;
            }
            try{
                // fixing Opera 10.53
                if (iframe.contentDocument &&
                    iframe.contentDocument.body &&
                    iframe.contentDocument.body.innerHTML == "false"){
                    // In Opera event is fired second time
                    // when body.innerHTML changed from false
                    // to server response approx. after 1 sec
                    // when we upload file with iframe
                    return;
                }                
            }catch(e){}

            callback();
        });
    },
    /**
     * Returns json object received by iframe from server.
     */
    _getIframeContentJSON: function(iframe){
        try{
            // iframe.contentWindow.document - for IE<7
            var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
                response;
            
            this.log("converting iframe's innerHTML to JSON");
            this.log("innerHTML = " + doc.body.innerHTML);
                            
            try {
                response = eval("(" + doc.body.innerHTML + ")");
            } catch(err){
                response = {};
            }        
        }catch(e){
            response = {success:true};
        }

        return response;
    },
    /**
     * Creates iframe with unique name
     */
    _createIframe: function(id){
        // We can't use following code as the name attribute
        // won't be properly registered in IE6, and new window
        // on form submit will open
        // var iframe = document.createElement('iframe');
        // iframe.setAttribute('name', id);

        var iframe = qq.toElement('<iframe src="javascript:false;" name="' + id + '" />');
        // src="javascript:false;" removes ie6 prompt on https

        iframe.setAttribute('id', id);

        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        return iframe;
    },
    /**
     * Creates form, that will be submitted to iframe
     */
    _createForm: function(iframe, params){
        // We can't use the following code in IE6
        // var form = document.createElement('form');
        // form.setAttribute('method', 'post');
        // form.setAttribute('enctype', 'multipart/form-data');
        // Because in this case file won't be attached to request
        var form = qq.toElement('<form method="post" enctype="multipart/form-data"></form>');

        var queryString = qq.obj2url(params, this._options.action);

        form.setAttribute('action', queryString);
        form.setAttribute('target', iframe.name);
        form.style.display = 'none';
        document.body.appendChild(form);

        return form;
    }
});

/**
 * Class for uploading files using xhr
 * @inherits qq.UploadHandlerAbstract
 */
qq.UploadHandlerXhr = function(o){
    qq.UploadHandlerAbstract.apply(this, arguments);

    this._files = [];
    this._xhrs = [];
    
    // current loaded size in bytes for each file 
    this._loaded = [];
};

// static method
qq.UploadHandlerXhr.isSupported = function(){
    var input = document.createElement('input');
    input.type = 'file';        
    
    return (
        'multiple' in input &&
        typeof File != "undefined" &&
        typeof (new XMLHttpRequest()).upload != "undefined" );       
};

// @inherits qq.UploadHandlerAbstract
qq.extend(qq.UploadHandlerXhr.prototype, qq.UploadHandlerAbstract.prototype);

qq.extend(qq.UploadHandlerXhr.prototype, {
    /**
     * Adds file to the queue
     * Returns id to use with upload, cancel
     **/    
    add: function(file){
        if (!(file instanceof File)){
            throw new Error('Passed obj in not a File (in qq.UploadHandlerXhr)');
        }
        
        typeof qq.onUploadAdd === 'function' && qq.onUploadAdd(file, this._files);
        return this._files.push(file) - 1;
    },
    getName: function(id){        
        var file = this._files[id];
        // fix missing name in Safari 4
       //Emre: to prevent file name problem in firefox7 (47183)
        var name = file.fileName !== null ? file.fileName : file.name;   
        name = name ? name : file.name; 
        return name;
        
    },
    getSize: function(id){
        var file = this._files[id];
        return file.fileSize ? file.fileSize : file.size;
    },    
    /**
     * Returns uploaded bytes for file identified by id 
     */    
    getLoaded: function(id){
        return this._loaded[id] || 0; 
    },
    /**
     * Sends the file identified by id and additional query params to the server
     * @param {Object} params name-value string pairs
     */    
    _upload: function(id, params){
        var file = this._files[id],
            name = this.getName(id),
            size = this.getSize(id);
                
        this._loaded[id] = 0;
                                
        var xhr = (this._xhrs[id] = new XMLHttpRequest());
        var self = this;
        
        xhr.upload.onprogress = function(e){
            if (e.lengthComputable){
                self._loaded[id] = e.loaded;
                self._options.onProgress(id, name, e.loaded, e.total);
            }
        };

        xhr.onreadystatechange = function(){            
            if (xhr.readyState == 4){
                self._onComplete(id, xhr);
            }
        };

        // build query string
        params = params || {};
        params.qqfile = name;
        // params.qqfileSize = size;
        var queryString = qq.obj2url(params, this._options.action);
        xhr.open("POST", queryString, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-File-Name", encodeURIComponent(name));
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.send(file);
        
    },
    _onComplete: function(id, xhr){
        // the request was aborted/cancelled
        if (!this._files[id]) { return; }
        
        var name = this.getName(id);
        var size = this.getSize(id);
        
        this._options.onProgress(id, name, size, size);
        
        if (xhr.status == 200){
            this.log("responseText = " + xhr.responseText);
            var response;

            try {
                response = eval("(" + xhr.responseText + ")");
            } catch(err){
                response = {};
            }
            this._options.onComplete(id, name, response);
                        
        } else {                   
            this._options.onComplete(id, name, {});
        }
                
        this._files[id] = null;
        this._xhrs[id] = null;    
        this._dequeue(id);                    
    },
    _cancel: function(id){
        this._options.onCancel(id, this.getName(id));
        
        this._files[id] = null;
        
        if (this._xhrs[id]){
            this._xhrs[id].abort();
            this._xhrs[id] = null;                                   
        }
        // enable submit button.
        setTimeout(function(){
        	qq.enableSubmitButton();
        }, 100);
    }
});

var Prototype={Version:'1.7',Browser:(function(){var ua=navigator.userAgent;var isOpera=Object.prototype.toString.call(window.opera)=='[object Opera]';return{IE:!!window.attachEvent&&!isOpera,IE9:('documentMode'in document)&&document.documentMode==9,IE10:('documentMode'in document)&&document.documentMode==10,Opera:isOpera,WebKit:ua.indexOf('AppleWebKit/')>-1,Gecko:ua.indexOf('Gecko')>-1&&ua.indexOf('KHTML')===-1,MobileSafari:/Apple.*Mobile/.test(ua)}})(),BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:(function(){var constructor=window.Element||window.HTMLElement;return!!(constructor&&constructor.prototype);})(),SpecificElementExtensions:(function(){if(typeof window.HTMLDivElement!=='undefined')
return true;var div=document.createElement('div'),form=document.createElement('form'),isSupported=false;if(div['__proto__']&&(div['__proto__']!==form['__proto__'])){isSupported=true;}
div=form=null;return isSupported;})()},ScriptFragment:'<script[^>]*>([\\S\\s]*?)<\/script>',JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$jot/,emptyFunction:function(){},K:function(x){return x}};if(Prototype.Browser.MobileSafari)
Prototype.BrowserFeatures.SpecificElementExtensions=false;var Abstract={};var Try={these:function(){var returnValue;for(var i=0,length=arguments.length;i<length;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}
return returnValue;}};var Class=(function(){var IS_DONTENUM_BUGGY=(function(){for(var p in{toString:1}){if(p==='toString')return false;}
return true;})();function subclass(){};function create(){var parent=null,properties=$jotA(arguments);if(Object.isFunction(properties[0]))
parent=properties.shift();function klass(){this.initialize.apply(this,arguments);}
Object.extend(klass,Class.Methods);klass.superclass=parent;klass.subclasses=[];if(parent){subclass.prototype=parent.prototype;klass.prototype=new subclass;parent.subclasses.push(klass);}
for(var i=0,length=properties.length;i<length;i++)
klass.addMethods(properties[i]);if(!klass.prototype.initialize)
klass.prototype.initialize=Prototype.emptyFunction;klass.prototype.constructor=klass;return klass;}
function addMethods(source){var ancestor=this.superclass&&this.superclass.prototype,properties=Object.keys(source);if(IS_DONTENUM_BUGGY){if(source.toString!=Object.prototype.toString)
properties.push("toString");if(source.valueOf!=Object.prototype.valueOf)
properties.push("valueOf");}
for(var i=0,length=properties.length;i<length;i++){var property=properties[i],value=source[property];if(ancestor&&Object.isFunction(value)&&value.argumentNames()[0]=="$jotsuper"){var method=value;value=(function(m){return function(){return ancestor[m].apply(this,arguments);};})(property).wrap(method);value.valueOf=method.valueOf.bind(method);value.toString=method.toString.bind(method);}
this.prototype[property]=value;}
return this;}
return{create:create,Methods:{addMethods:addMethods}};})();(function(){var _toString=Object.prototype.toString,NULL_TYPE='Null',UNDEFINED_TYPE='Undefined',BOOLEAN_TYPE='Boolean',NUMBER_TYPE='Number',STRING_TYPE='String',OBJECT_TYPE='Object',FUNCTION_CLASS='[object Function]',BOOLEAN_CLASS='[object Boolean]',NUMBER_CLASS='[object Number]',STRING_CLASS='[object String]',ARRAY_CLASS='[object Array]',DATE_CLASS='[object Date]',NATIVE_JSON_STRINGIFY_SUPPORT=window.JSON&&typeof JSON.stringify==='function'&&JSON.stringify(0)==='0'&&typeof JSON.stringify(Prototype.K)==='undefined';function Type(o){switch(o){case null:return NULL_TYPE;case(void 0):return UNDEFINED_TYPE;}
var type=typeof o;switch(type){case'boolean':return BOOLEAN_TYPE;case'number':return NUMBER_TYPE;case'string':return STRING_TYPE;}
return OBJECT_TYPE;}
function extend(destination,source){for(var property in source)
destination[property]=source[property];return destination;}
function inspect(object){try{if(isUndefined(object))return'undefined';if(object===null)return'null';return object.inspect?object.inspect():String(object);}catch(e){if(e instanceof RangeError)return'...';throw e;}}
function toJSON(value){return Str('',{'':value},[]);}
function Str(key,holder,stack){var value=holder[key],type=typeof value;if(Type(value)===OBJECT_TYPE&&typeof value.toJSON==='function'){value=value.toJSON(key);}
var _class=_toString.call(value);switch(_class){case NUMBER_CLASS:case BOOLEAN_CLASS:case STRING_CLASS:value=value.valueOf();}
switch(value){case null:return'null';case true:return'true';case false:return'false';}
type=typeof value;switch(type){case'string':return value.inspect(true);case'number':return isFinite(value)?String(value):'null';case'object':for(var i=0,length=stack.length;i<length;i++){if(stack[i]===value){throw new TypeError();}}
stack.push(value);var partial=[];if(_class===ARRAY_CLASS){for(var i=0,length=value.length;i<length;i++){var str=Str(i,value,stack);partial.push(typeof str==='undefined'?'null':str);}
partial='['+partial.join(',')+']';}else{var keys=Object.keys(value);for(var i=0,length=keys.length;i<length;i++){var key=keys[i],str=Str(key,value,stack);if(typeof str!=="undefined"){partial.push(key.inspect(true)+':'+str);}}
partial='{'+partial.join(',')+'}';}
stack.pop();return partial;}}
function stringify(object){return JSON.stringify(object);}
function toQueryString(object){return $jotH(object).toQueryString();}
function toHTML(object){return object&&object.toHTML?object.toHTML():String.interpret(object);}
function keys(object){if(Type(object)!==OBJECT_TYPE){throw new TypeError();}
var results=[];for(var property in object){if(object.hasOwnProperty(property)){results.push(property);}}
return results;}
function values(object){var results=[];for(var property in object)
results.push(object[property]);return results;}
function clone(object){return extend({},object);}
function isElement(object){return!!(object&&object.nodeType==1);}
function isArray(object){return _toString.call(object)===ARRAY_CLASS;}
var hasNativeIsArray=(typeof Array.isArray=='function')&&Array.isArray([])&&!Array.isArray({});if(hasNativeIsArray){isArray=Array.isArray;}
function isHash(object){return object instanceof Hash;}
function isFunction(object){return _toString.call(object)===FUNCTION_CLASS;}
function isString(object){return _toString.call(object)===STRING_CLASS;}
function isNumber(object){return _toString.call(object)===NUMBER_CLASS;}
function isDate(object){return _toString.call(object)===DATE_CLASS;}
function isUndefined(object){return typeof object==="undefined";}
extend(Object,{extend:extend,inspect:inspect,toJSON:NATIVE_JSON_STRINGIFY_SUPPORT?stringify:toJSON,toQueryString:toQueryString,toHTML:toHTML,keys:Object.keys||keys,values:values,clone:clone,isElement:isElement,isArray:isArray,isHash:isHash,isFunction:isFunction,isString:isString,isNumber:isNumber,isDate:isDate,isUndefined:isUndefined});})();Object.extend(Function.prototype,(function(){var slice=Array.prototype.slice;function update(array,args){var arrayLength=array.length,length=args.length;while(length--)array[arrayLength+length]=args[length];return array;}
function merge(array,args){array=slice.call(array,0);return update(array,args);}
function argumentNames(){var names=this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g,'').replace(/\s+/g,'').split(',');return names.length==1&&!names[0]?[]:names;}
function bind(context){if(arguments.length<2&&Object.isUndefined(arguments[0]))return this;var __method=this,args=slice.call(arguments,1);return function(){var a=merge(args,arguments);return __method.apply(context,a);}}
function bindAsEventListener(context){var __method=this,args=slice.call(arguments,1);return function(event){var a=update([event||window.event],args);return __method.apply(context,a);}}
function curry(){if(!arguments.length)return this;var __method=this,args=slice.call(arguments,0);return function(){var a=merge(args,arguments);return __method.apply(this,a);}}
function delay(timeout){var __method=this,args=slice.call(arguments,1);timeout=timeout*1000;return window.setTimeout(function(){return __method.apply(__method,args);},timeout);}
function defer(){var args=update([0.01],arguments);return this.delay.apply(this,args);}
function wrap(wrapper){var __method=this;return function(){var a=update([__method.bind(this)],arguments);return wrapper.apply(this,a);}}
function methodize(){if(this._methodized)return this._methodized;var __method=this;return this._methodized=function(){var a=update([this],arguments);return __method.apply(null,a);};}
return{argumentNames:argumentNames,bind:bind,bindAsEventListener:bindAsEventListener,curry:curry,delay:delay,p_defer:defer,wrap:wrap,methodize:methodize}})());(function(proto){function toISOString(){return this.getUTCFullYear()+'-'+
(this.getUTCMonth()+1).toPaddedString(2)+'-'+
this.getUTCDate().toPaddedString(2)+'T'+
this.getUTCHours().toPaddedString(2)+':'+
this.getUTCMinutes().toPaddedString(2)+':'+
this.getUTCSeconds().toPaddedString(2)+'Z';}
function toJSON(){return this.toISOString();}
if(!proto.toISOString)proto.toISOString=toISOString;if(!proto.toJSON)proto.toJSON=toJSON;})(Date.prototype);RegExp.prototype.match=RegExp.prototype.test;RegExp.escape=function(str){return String(str).replace(/([.*+?^=!:$jot{}()|[\]\/\\])/g,'\\$jot1');};var PeriodicalExecuter=Class.create({initialize:function(callback,frequency){this.callback=callback;this.frequency=frequency;this.currentlyExecuting=false;this.registerCallback();},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000);},execute:function(){this.callback(this);},stop:function(){if(!this.timer)return;clearInterval(this.timer);this.timer=null;},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;this.execute();this.currentlyExecuting=false;}catch(e){this.currentlyExecuting=false;throw e;}}}});Object.extend(String,{interpret:function(value){return value==null?'':String(value);},specialChar:{'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','\\':'\\\\'}});Object.extend(String.prototype,(function(){var NATIVE_JSON_PARSE_SUPPORT=window.JSON&&typeof JSON.parse==='function'&&JSON.parse('{"test": true}').test;function prepareReplacement(replacement){if(Object.isFunction(replacement))return replacement;var template=new Template(replacement);return function(match){return template.evaluate(match)};}
function gsub(pattern,replacement){var result='',source=this,match;replacement=prepareReplacement(replacement);if(Object.isString(pattern))
pattern=RegExp.escape(pattern);if(!(pattern.length||pattern.source)){replacement=replacement('');return replacement+source.split('').join(replacement)+replacement;}
while(source.length>0){if(match=source.match(pattern)){result+=source.slice(0,match.index);result+=String.interpret(replacement(match));source=source.slice(match.index+match[0].length);}else{result+=source,source='';}}
return result;}
function sub(pattern,replacement,count){replacement=prepareReplacement(replacement);count=Object.isUndefined(count)?1:count;return this.gsub(pattern,function(match){if(--count<0)return match[0];return replacement(match);});}
function scan(pattern,iterator){this.gsub(pattern,iterator);return String(this);}
function truncate(length,truncation){length=length||30;truncation=Object.isUndefined(truncation)?'...':truncation;return this.length>length?this.slice(0,length-truncation.length)+truncation:String(this);}
function strip(){return this.replace(/^\s+/,'').replace(/\s+$jot/,'');}
function stripTags(){return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,'');}
function stripScripts(){return this.replace(new RegExp(Prototype.ScriptFragment,'img'),'');}
function extractScripts(){var matchAll=new RegExp(Prototype.ScriptFragment,'img'),matchOne=new RegExp(Prototype.ScriptFragment,'im');return(this.match(matchAll)||[]).map(function(scriptTag){return(scriptTag.match(matchOne)||['',''])[1];});}
function evalScripts(){return this.extractScripts().map(function(script){return eval(script)});}
function escapeHTML(){return this.replace(/&/g,'&amp;').replace(/&amp;amp;/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function unescapeHTML(){return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');}
function toQueryParams(separator){var match=this.strip().match(/([^?#]*)(#.*)?$jot/);if(!match)return{};return match[1].split(separator||'&').inject({},function(hash,pair){if((pair=pair.split('='))[0]){var key=decodeURIComponent(pair.shift()),value=pair.length>1?pair.join('='):pair[0];if(value!=undefined)try{value=decodeURIComponent(value)}catch(e){value=unescape(value)}
if(key in hash){if(!Object.isArray(hash[key]))hash[key]=[hash[key]];hash[key].push(value);}
else hash[key]=value;}
return hash;});}
function toArray(){return this.split('');}
function succ(){return this.slice(0,this.length-1)+
String.fromCharCode(this.charCodeAt(this.length-1)+1);}
function times(count){return count<1?'':new Array(count+1).join(this);}
function camelize(){return this.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():'';});}
function capitalize(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase();}
function underscore(){return this.replace(/::/g,'/').replace(/([A-Z]+)([A-Z][a-z])/g,'$jot1_$jot2').replace(/([a-z\d])([A-Z])/g,'$jot1_$jot2').replace(/-/g,'_').toLowerCase();}
function dasherize(){return this.replace(/_/g,'-');}
function inspect(useDoubleQuotes){var escapedString=this.replace(/[\x00-\x1f\\]/g,function(character){if(character in String.specialChar){return String.specialChar[character];}
return'\\u00'+character.charCodeAt().toPaddedString(2,16);});if(useDoubleQuotes)return'"'+escapedString.replace(/"/g,'\\"')+'"';return"'"+escapedString.replace(/'/g,'\\\'')+"'";}
function unfilterJSON(filter){return this.replace(filter||Prototype.JSONFilter,'$jot1');}
function isJSON(){var str=this;if(str.blank())return false;str=str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@');str=str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');str=str.replace(/(?:^|:|,)(?:\s*\[)+/g,'');return(/^[\],:{}\s]*$jot/).test(str);}
function evalJSON(sanitize){var json=this.unfilterJSON(),cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;if(cx.test(json)){json=json.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
try{if(!sanitize||json.isJSON())return eval('('+json+')');}catch(e){}
throw new SyntaxError('Badly formed JSON string: '+this.inspect());}
function parseJSON(){var json=this.unfilterJSON();return JSON.parse(json);}
function include(pattern){return this.indexOf(pattern)>-1;}
function startsWith(pattern){return this.lastIndexOf(pattern,0)===0;}
function endsWith(pattern){var d=this.length-pattern.length;return d>=0&&this.indexOf(pattern,d)===d;}
function empty(){return this=='';}
function blank(){return /^\s*$jot/.test(this);}
function interpolate(object,pattern){return new Template(this,pattern).evaluate(object);}
return{gsub:gsub,sub:sub,scan:scan,truncate:truncate,strip:String.prototype.trim||strip,stripTags:stripTags,stripScripts:stripScripts,extractScripts:extractScripts,evalScripts:evalScripts,escapeHTML:escapeHTML,unescapeHTML:unescapeHTML,toQueryParams:toQueryParams,parseQuery:toQueryParams,toArray:toArray,succ:succ,times:times,camelize:camelize,capitalize:capitalize,underscore:underscore,dasherize:dasherize,inspect:inspect,unfilterJSON:unfilterJSON,isJSON:isJSON,evalJSON:NATIVE_JSON_PARSE_SUPPORT?parseJSON:evalJSON,include:include,startsWith:startsWith,endsWith:endsWith,empty:empty,blank:blank,interpolate:interpolate};})());var Template=Class.create({initialize:function(template,pattern){this.template=template.toString();this.pattern=pattern||Template.Pattern;},evaluate:function(object){if(object&&Object.isFunction(object.toTemplateReplacements))
object=object.toTemplateReplacements();return this.template.gsub(this.pattern,function(match){if(object==null)return(match[1]+'');var before=match[1]||'';if(before=='\\')return match[2];var ctx=object,expr=match[3],pattern=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$jot)/;match=pattern.exec(expr);if(match==null)return before;while(match!=null){var comp=match[1].startsWith('[')?match[2].replace(/\\\\]/g,']'):match[1];ctx=ctx[comp];if(null==ctx||''==match[3])break;expr=expr.substring('['==match[3]?match[1].length:match[0].length);match=pattern.exec(expr);}
return before+String.interpret(ctx);});}});Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;var $jotbreak={};var Enumerable=(function(){function each(iterator,context){var index=0;try{this._each(function(value){iterator.call(context,value,index++);});}catch(e){if(e!=$jotbreak)throw e;}
return this;}
function eachSlice(number,iterator,context){var index=-number,slices=[],array=this.toArray();if(number<1)return array;while((index+=number)<array.length)
slices.push(array.slice(index,index+number));return slices.collect(iterator,context);}
function all(iterator,context){iterator=iterator||Prototype.K;var result=true;this.each(function(value,index){result=result&&!!iterator.call(context,value,index);if(!result)throw $jotbreak;});return result;}
function any(iterator,context){iterator=iterator||Prototype.K;var result=false;this.each(function(value,index){if(result=!!iterator.call(context,value,index))
throw $jotbreak;});return result;}
function collect(iterator,context){iterator=iterator||Prototype.K;var results=[];this.each(function(value,index){results.push(iterator.call(context,value,index));});return results;}
function detect(iterator,context){var result;this.each(function(value,index){if(iterator.call(context,value,index)){result=value;throw $jotbreak;}});return result;}
function findAll(iterator,context){var results=[];this.each(function(value,index){if(iterator.call(context,value,index))
results.push(value);});return results;}
function grep(filter,iterator,context){iterator=iterator||Prototype.K;var results=[];if(Object.isString(filter))
filter=new RegExp(RegExp.escape(filter));this.each(function(value,index){if(filter.match(value))
results.push(iterator.call(context,value,index));});return results;}
function include(object){if(Object.isFunction(this.indexOf))
if(this.indexOf(object)!=-1)return true;var found=false;this.each(function(value){if(value==object){found=true;throw $jotbreak;}});return found;}
function inGroupsOf(number,fillWith){fillWith=Object.isUndefined(fillWith)?null:fillWith;return this.eachSlice(number,function(slice){while(slice.length<number)slice.push(fillWith);return slice;});}
function inject(memo,iterator,context){this.each(function(value,index){memo=iterator.call(context,memo,value,index);});return memo;}
function invoke(method){var args=$jotA(arguments).slice(1);return this.map(function(value){return value[method].apply(value,args);});}
function max(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value>=result)
result=value;});return result;}
function min(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value<result)
result=value;});return result;}
function partition(iterator,context){iterator=iterator||Prototype.K;var trues=[],falses=[];this.each(function(value,index){(iterator.call(context,value,index)?trues:falses).push(value);});return[trues,falses];}
function pluck(property){var results=[];this.each(function(value){results.push(value[property]);});return results;}
function reject(iterator,context){var results=[];this.each(function(value,index){if(!iterator.call(context,value,index))
results.push(value);});return results;}
function sortBy(iterator,context){return this.map(function(value,index){return{value:value,criteria:iterator.call(context,value,index)};}).sort(function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0;}).pluck('value');}
function toArray(){return this.map();}
function zip(){var iterator=Prototype.K,args=$jotA(arguments);if(Object.isFunction(args.last()))
iterator=args.pop();var collections=[this].concat(args).map($jotA);return this.map(function(value,index){return iterator(collections.pluck(index));});}
function size(){return this.toArray().length;}
function inspect(){return'#<Enumerable:'+this.toArray().inspect()+'>';}
return{each:each,eachSlice:eachSlice,all:all,every:all,any:any,some:any,collect:collect,map:collect,detect:detect,findAll:findAll,select:findAll,filter:findAll,grep:grep,include:include,member:include,inGroupsOf:inGroupsOf,inject:inject,invoke:invoke,max:max,min:min,partition:partition,pluck:pluck,reject:reject,sortBy:sortBy,toArray:toArray,entries:toArray,zip:zip,size:size,inspect:inspect,find:detect};})();function $jotA(iterable){if(!iterable)return[];if('toArray'in Object(iterable))return iterable.toArray();var length=iterable.length||0,results=new Array(length);while(length--)results[length]=iterable[length];return results;}
function $jotw(string){if(!Object.isString(string))return[];string=string.strip();return string?string.split(/\s+/):[];}
Array.from=$jotA;(function(){var arrayProto=Array.prototype,slice=arrayProto.slice,_each=arrayProto.forEach;function each(iterator,context){for(var i=0,length=this.length>>>0;i<length;i++){if(i in this)iterator.call(context,this[i],i,this);}}
if(!_each)_each=each;function clear(){this.length=0;return this;}
function first(){return this[0];}
function last(){return this[this.length-1];}
function compact(){return this.select(function(value){return value!=null;});}
function flatten(){return this.inject([],function(array,value){if(Object.isArray(value))
return array.concat(value.flatten());array.push(value);return array;});}
function without(){var values=slice.call(arguments,0);return this.select(function(value){return!values.include(value);});}
function reverse(inline){return(inline===false?this.toArray():this)._reverse();}
function uniq(sorted){return this.inject([],function(array,value,index){if(0==index||(sorted?array.last()!=value:!array.include(value)))
array.push(value);return array;});}
function intersect(array){return this.uniq().findAll(function(item){return array.indexOf(item)!==-1;});}
function clone(){return slice.call(this,0);}
function size(){return this.length;}
function inspect(){return'['+this.map(Object.inspect).join(', ')+']';}
function indexOf(item,i){if(this==null)throw new TypeError();var array=Object(this),length=array.length>>>0;if(length===0)return-1;i=Number(i);if(isNaN(i)){i=0;}else if(i!==0&&isFinite(i)){i=(i>0?1:-1)*Math.floor(Math.abs(i));}
if(i>length)return-1;var k=i>=0?i:Math.max(length-Math.abs(i),0);for(;k<length;k++)
if(k in array&&array[k]===item)return k;return-1;}
function lastIndexOf(item,i){if(this==null)throw new TypeError();var array=Object(this),length=array.length>>>0;if(length===0)return-1;if(!Object.isUndefined(i)){i=Number(i);if(isNaN(i)){i=0;}else if(i!==0&&isFinite(i)){i=(i>0?1:-1)*Math.floor(Math.abs(i));}}else{i=length;}
var k=i>=0?Math.min(i,length-1):length-Math.abs(i);for(;k>=0;k--)
if(k in array&&array[k]===item)return k;return-1;}
function concat(_){var array=[],items=slice.call(arguments,0),item,n=0;items.unshift(this);for(var i=0,length=items.length;i<length;i++){item=items[i];if(Object.isArray(item)&&!('callee'in item)){for(var j=0,arrayLength=item.length;j<arrayLength;j++){if(j in item)array[n]=item[j];n++;}}else{array[n++]=item;}}
array.length=n;return array;}
function wrapNative(method){return function(){if(arguments.length===0){return method.call(this,Prototype.K);}else if(arguments[0]===undefined){var args=slice.call(arguments,1);args.unshift(Prototype.K);return method.apply(this,args);}else{return method.apply(this,arguments);}};}
function map(iterator){if(this==null)throw new TypeError();iterator=iterator||Prototype.K;var object=Object(this);var results=[],context=arguments[1],n=0;for(var i=0,length=object.length>>>0;i<length;i++){if(i in object){results[n]=iterator.call(context,object[i],i,object);}
n++;}
results.length=n;return results;}
if(arrayProto.map){map=wrapNative(Array.prototype.map);}
function filter(iterator){if(this==null||!Object.isFunction(iterator))
throw new TypeError();var object=Object(this);var results=[],context=arguments[1],value;for(var i=0,length=object.length>>>0;i<length;i++){if(i in object){value=object[i];if(iterator.call(context,value,i,object)){results.push(value);}}}
return results;}
if(arrayProto.filter){filter=Array.prototype.filter;}
function some(iterator){if(this==null)throw new TypeError();iterator=iterator||Prototype.K;var context=arguments[1];var object=Object(this);for(var i=0,length=object.length>>>0;i<length;i++){if(i in object&&iterator.call(context,object[i],i,object)){return true;}}
return false;}
if(arrayProto.some){some=wrapNative(Array.prototype.some);}
function every(iterator){if(this==null)throw new TypeError();iterator=iterator||Prototype.K;var context=arguments[1];var object=Object(this);for(var i=0,length=object.length>>>0;i<length;i++){if(i in object&&!iterator.call(context,object[i],i,object)){return false;}}
return true;}
if(arrayProto.every){every=wrapNative(Array.prototype.every);}
Object.extend(arrayProto,Enumerable);if(arrayProto.entries===Enumerable.entries){delete arrayProto.entries;}
if(!arrayProto._reverse)
arrayProto._reverse=arrayProto.reverse;Object.extend(arrayProto,{_each:_each,map:map,collect:map,select:filter,filter:filter,findAll:filter,some:some,any:some,every:every,all:every,clear:clear,first:first,last:last,compact:compact,flatten:flatten,without:without,reverse:reverse,uniq:uniq,intersect:intersect,clone:clone,toArray:clone,size:size,inspect:inspect});var CONCAT_ARGUMENTS_BUGGY=(function(){return[].concat(arguments)[0][0]!==1;})(1,2);if(CONCAT_ARGUMENTS_BUGGY)arrayProto.concat=concat;if(!arrayProto.indexOf)arrayProto.indexOf=indexOf;if(!arrayProto.lastIndexOf)arrayProto.lastIndexOf=lastIndexOf;})();function $jotH(object){return new Hash(object);};var Hash=Class.create(Enumerable,(function(){function initialize(object){this._object=Object.isHash(object)?object.toObject():Object.clone(object);}
function _each(iterator){for(var key in this._object){var value=this._object[key],pair=[key,value];pair.key=key;pair.value=value;iterator(pair);}}
function set(key,value){return this._object[key]=value;}
function get(key){if(this._object[key]!==Object.prototype[key])
return this._object[key];}
function unset(key){var value=this._object[key];delete this._object[key];return value;}
function toObject(){return Object.clone(this._object);}
function keys(){return this.pluck('key');}
function values(){return this.pluck('value');}
function index(value){var match=this.detect(function(pair){return pair.value===value;});return match&&match.key;}
function merge(object){return this.clone().update(object);}
function update(object){return new Hash(object).inject(this,function(result,pair){result.set(pair.key,pair.value);return result;});}
function toQueryPair(key,value){if(Object.isUndefined(value))return key;return key+'='+encodeURIComponent(String.interpret(value));}
function toQueryString(){return this.inject([],function(results,pair){var key=encodeURIComponent(pair.key),values=pair.value;if(values&&typeof values=='object'){if(Object.isArray(values)){var queryValues=[];for(var i=0,len=values.length,value;i<len;i++){value=values[i];queryValues.push(toQueryPair(key,value));}
return results.concat(queryValues);}}else results.push(toQueryPair(key,values));return results;}).join('&');}
function inspect(){return'#<Hash:{'+this.map(function(pair){return pair.map(Object.inspect).join(': ');}).join(', ')+'}>';}
function clone(){return new Hash(this);}
return{initialize:initialize,_each:_each,set:set,get:get,unset:unset,toObject:toObject,toTemplateReplacements:toObject,keys:keys,values:values,index:index,merge:merge,update:update,toQueryString:toQueryString,inspect:inspect,toJSON:toObject,clone:clone};})());Hash.from=$jotH;Object.extend(Number.prototype,(function(){function toColorPart(){return this.toPaddedString(2,16);}
function succ(){return this+1;}
function times(iterator,context){$jotR(0,this,true).each(iterator,context);return this;}
function toPaddedString(length,radix){var string=this.toString(radix||10);return'0'.times(length-string.length)+string;}
function abs(){return Math.abs(this);}
function round(){return Math.round(this);}
function ceil(){return Math.ceil(this);}
function floor(){return Math.floor(this);}
return{toColorPart:toColorPart,succ:succ,times:times,toPaddedString:toPaddedString,abs:abs,round:round,ceil:ceil,floor:floor};})());function $jotR(start,end,exclusive){return new ObjectRange(start,end,exclusive);}
var ObjectRange=Class.create(Enumerable,(function(){function initialize(start,end,exclusive){this.start=start;this.end=end;this.exclusive=exclusive;}
function _each(iterator){var value=this.start;while(this.include(value)){iterator(value);value=value.succ();}}
function include(value){if(value<this.start)
return false;if(this.exclusive)
return value<this.end;return value<=this.end;}
return{initialize:initialize,_each:_each,include:include};})());var Ajax={getTransport:function(){return Try.these(function(){return new XMLHttpRequest()},function(){return new ActiveXObject('Msxml2.XMLHTTP')},function(){return new ActiveXObject('Microsoft.XMLHTTP')})||false;},activeRequestCount:0};Ajax.Responders={responders:[],_each:function(iterator){this.responders._each(iterator);},register:function(responder){if(!this.include(responder))
this.responders.push(responder);},unregister:function(responder){this.responders=this.responders.without(responder);},dispatch:function(callback,request,transport,json){this.each(function(responder){if(Object.isFunction(responder[callback])){try{responder[callback].apply(responder,[request,transport,json]);}catch(e){}}});}};Object.extend(Ajax.Responders,Enumerable);Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++},onComplete:function(){Ajax.activeRequestCount--}});Ajax.Base=Class.create({initialize:function(options){this.options={method:'post',asynchronous:true,contentType:'application/x-www-form-urlencoded',encoding:'UTF-8',parameters:'',evalJSON:true,evalJS:true};Object.extend(this.options,options||{});this.options.method=this.options.method.toLowerCase();if(Object.isHash(this.options.parameters))
this.options.parameters=this.options.parameters.toObject();}});Ajax.Request=Class.create(Ajax.Base,{_complete:false,initialize:function($jotsuper,url,options){$jotsuper(options);this.transport=Ajax.getTransport();this.request(url);},request:function(url){this.url=url;this.method=this.options.method;var params=Object.isString(this.options.parameters)?this.options.parameters:Object.toQueryString(this.options.parameters);if(!['get','post'].include(this.method)){params+=(params?'&':'')+"_method="+this.method;this.method='post';}
if(params&&this.method==='get'){this.url+=(this.url.include('?')?'&':'?')+params;}
this.parameters=params.toQueryParams();try{var response=new Ajax.Response(this);if(this.options.onCreate)this.options.onCreate(response);Ajax.Responders.dispatch('onCreate',this,response);this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);if(this.options.asynchronous)this.respondToReadyState.bind(this).p_defer(1);this.transport.onreadystatechange=this.onStateChange.bind(this);this.setRequestHeaders();this.body=this.method=='post'?(this.options.postBody||params):null;this.transport.send(this.body);if(!this.options.asynchronous&&this.transport.overrideMimeType)
this.onStateChange();}
catch(e){this.dispatchException(e);}},onStateChange:function(){var readyState=this.transport.readyState;if(readyState>1&&!((readyState==4)&&this._complete))
this.respondToReadyState(this.transport.readyState);},setRequestHeaders:function(){var headers={'X-Requested-With':'XMLHttpRequest','X-Prototype-Version':Prototype.Version,'Accept':'text/javascript, text/html, application/xml, text/xml, */*'};if(this.method=='post'){headers['Content-type']=this.options.contentType+
(this.options.encoding?'; charset='+this.options.encoding:'');if(this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005)
headers['Connection']='close';}
if(typeof this.options.requestHeaders=='object'){var extras=this.options.requestHeaders;if(Object.isFunction(extras.push))
for(var i=0,length=extras.length;i<length;i+=2)
headers[extras[i]]=extras[i+1];else
$jotH(extras).each(function(pair){headers[pair.key]=pair.value});}
for(var name in headers)
this.transport.setRequestHeader(name,headers[name]);},success:function(){var status=this.getStatus();return!status||(status>=200&&status<300)||status==304;},getStatus:function(){try{if(this.transport.status===1223)return 204;return this.transport.status||0;}catch(e){return 0}},respondToReadyState:function(readyState){var state=Ajax.Request.Events[readyState],response=new Ajax.Response(this);if(state=='Complete'){try{this._complete=true;(this.options['on'+response.status]||this.options['on'+(this.success()?'Success':'Failure')]||Prototype.emptyFunction)(response,response.headerJSON);}catch(e){this.dispatchException(e);}
var contentType=response.getHeader('Content-type');if(this.options.evalJS=='force'||(this.options.evalJS&&this.isSameOrigin()&&contentType&&contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$jot/i)))
this.evalResponse();}
try{(this.options['on'+state]||Prototype.emptyFunction)(response,response.headerJSON);Ajax.Responders.dispatch('on'+state,this,response,response.headerJSON);}catch(e){this.dispatchException(e);}
if(state=='Complete'){this.transport.onreadystatechange=Prototype.emptyFunction;}},isSameOrigin:function(){var m=this.url.match(/^\s*https?:\/\/[^\/]*/);return!m||(m[0]=='#{protocol}//#{domain}#{port}'.interpolate({protocol:location.protocol,domain:document.domain,port:location.port?':'+location.port:''}));},getHeader:function(name){try{return this.transport.getResponseHeader(name)||null;}catch(e){return null;}},evalResponse:function(){try{return eval((this.transport.responseText||'').unfilterJSON());}catch(e){this.dispatchException(e);}},dispatchException:function(exception){(this.options.onException||Prototype.emptyFunction)(this,exception);Ajax.Responders.dispatch('onException',this,exception);}});Ajax.Request.Events=['Uninitialized','Loading','Loaded','Interactive','Complete'];Ajax.Response=Class.create({initialize:function(request){this.request=request;var transport=this.transport=request.transport,readyState=this.readyState=transport.readyState;if((readyState>2&&!Prototype.Browser.IE)||readyState==4){this.status=this.getStatus();this.statusText=this.getStatusText();this.responseText=String.interpret(transport.responseText);this.headerJSON=this._getHeaderJSON();}
if(readyState==4){var xml=transport.responseXML;this.responseXML=Object.isUndefined(xml)?null:xml;this.responseJSON=this._getResponseJSON();}},status:0,statusText:'',getStatus:Ajax.Request.prototype.getStatus,getStatusText:function(){try{return this.transport.statusText||'';}catch(e){return''}},getHeader:Ajax.Request.prototype.getHeader,getAllHeaders:function(){try{return this.getAllResponseHeaders();}catch(e){return null}},getResponseHeader:function(name){return this.transport.getResponseHeader(name);},getAllResponseHeaders:function(){return this.transport.getAllResponseHeaders();},_getHeaderJSON:function(){var json=this.getHeader('X-JSON');if(!json)return null;json=decodeURIComponent(escape(json));try{return json.evalJSON(this.request.options.sanitizeJSON||!this.request.isSameOrigin());}catch(e){this.request.dispatchException(e);}},_getResponseJSON:function(){var options=this.request.options;if(!options.evalJSON||(options.evalJSON!='force'&&!(this.getHeader('Content-type')||'').include('application/json'))||this.responseText.blank())
return null;try{return this.responseText.evalJSON(options.sanitizeJSON||!this.request.isSameOrigin());}catch(e){this.request.dispatchException(e);}}});Ajax.Updater=Class.create(Ajax.Request,{initialize:function($jotsuper,container,url,options){this.container={success:(container.success||container),failure:(container.failure||(container.success?null:container))};options=Object.clone(options);var onComplete=options.onComplete;options.onComplete=(function(response,json){this.updateContent(response.responseText);if(Object.isFunction(onComplete))onComplete(response,json);}).bind(this);$jotsuper(url,options);},updateContent:function(responseText){var receiver=this.container[this.success()?'success':'failure'],options=this.options;if(!options.evalScripts)responseText=responseText.stripScripts();if(receiver=$jot(receiver)){if(options.insertion){if(Object.isString(options.insertion)){var insertion={};insertion[options.insertion]=responseText;receiver.insert(insertion);}
else options.insertion(receiver,responseText);}
else receiver.update(responseText);}}});Ajax.PeriodicalUpdater=Class.create(Ajax.Base,{initialize:function($jotsuper,container,url,options){$jotsuper(options);this.onComplete=this.options.onComplete;this.frequency=(this.options.frequency||2);this.decay=(this.options.decay||1);this.updater={};this.container=container;this.url=url;this.start();},start:function(){this.options.onComplete=this.updateComplete.bind(this);this.onTimerEvent();},stop:function(){this.updater.options.onComplete=undefined;clearTimeout(this.timer);(this.onComplete||Prototype.emptyFunction).apply(this,arguments);},updateComplete:function(response){if(this.options.decay){this.decay=(response.responseText==this.lastText?this.decay*this.options.decay:1);this.lastText=response.responseText;}
this.timer=this.onTimerEvent.bind(this).delay(this.decay*this.frequency);},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options);}});function $jot(element){if(arguments.length>1){for(var i=0,elements=[],length=arguments.length;i<length;i++)
elements.push($jot(arguments[i]));return elements;}
if(Object.isString(element))
element=document.getElementById(element);return Element.extend(element);}
if(Prototype.BrowserFeatures.XPath){document._getElementsByXPath=function(expression,parentElement){var results=[];var query=document.evaluate(expression,$jot(parentElement)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(var i=0,length=query.snapshotLength;i<length;i++)
results.push(Element.extend(query.snapshotItem(i)));return results;};}
if(!Node)var Node={};if(!Node.ELEMENT_NODE){Object.extend(Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12});}
(function(global){function shouldUseCache(tagName,attributes){if(tagName==='select')return false;if('type'in attributes)return false;return true;}
var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX=(function(){try{var el=document.createElement('<input name="x">');return el.tagName.toLowerCase()==='input'&&el.name==='x';}
catch(err){return false;}})();var element=global.Element;global.Element=function(tagName,attributes){attributes=attributes||{};tagName=tagName.toLowerCase();var cache=Element.cache;if(HAS_EXTENDED_CREATE_ELEMENT_SYNTAX&&attributes.name){tagName='<'+tagName+' name="'+attributes.name+'">';delete attributes.name;return Element.writeAttribute(document.createElement(tagName),attributes);}
if(!cache[tagName])cache[tagName]=Element.extend(document.createElement(tagName));var node=shouldUseCache(tagName,attributes)?cache[tagName].cloneNode(false):document.createElement(tagName);return Element.writeAttribute(node,attributes);};Object.extend(global.Element,element||{});if(element)global.Element.prototype=element.prototype;})(this);Element.idCounter=1;Element.cache={};Element._purgeElement=function(element){var uid=element._prototypeUID;if(uid){Element.stopObserving(element);element._prototypeUID=void 0;delete Element.Storage[uid];}}
Element.Methods={visible:function(element){return $jot(element).style.display!='none';},toggle:function(element){element=$jot(element);Element[Element.visible(element)?'hide':'show'](element);return element;},hide:function(element){element=$jot(element);element.style.display='none';return element;},show:function(element){element=$jot(element);element.style.display='';return element;},remove:function(element){element=$jot(element);element.parentNode.removeChild(element);return element;},update:(function(){var SELECT_ELEMENT_INNERHTML_BUGGY=(function(){var el=document.createElement("select"),isBuggy=true;el.innerHTML="<option value=\"test\">test</option>";if(el.options&&el.options[0]){isBuggy=el.options[0].nodeName.toUpperCase()!=="OPTION";}
el=null;return isBuggy;})();var TABLE_ELEMENT_INNERHTML_BUGGY=(function(){try{var el=document.createElement("table");if(el&&el.tBodies){el.innerHTML="<tbody><tr><td>test</td></tr></tbody>";var isBuggy=typeof el.tBodies[0]=="undefined";el=null;return isBuggy;}}catch(e){return true;}})();var LINK_ELEMENT_INNERHTML_BUGGY=(function(){try{var el=document.createElement('div');el.innerHTML="<link>";var isBuggy=(el.childNodes.length===0);el=null;return isBuggy;}catch(e){return true;}})();var ANY_INNERHTML_BUGGY=SELECT_ELEMENT_INNERHTML_BUGGY||TABLE_ELEMENT_INNERHTML_BUGGY||LINK_ELEMENT_INNERHTML_BUGGY;var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING=(function(){var s=document.createElement("script"),isBuggy=false;try{s.appendChild(document.createTextNode(""));isBuggy=!s.firstChild||s.firstChild&&s.firstChild.nodeType!==3;}catch(e){isBuggy=true;}
s=null;return isBuggy;})();function update(element,content){element=$jot(element);var purgeElement=Element._purgeElement;var descendants=element.getElementsByTagName('*'),i=descendants.length;while(i--)purgeElement(descendants[i]);if(content&&content.toElement)
content=content.toElement();if(Object.isElement(content))
return element.update().insert(content);content=Object.toHTML(content);var tagName=element.tagName.toUpperCase();if(tagName==='SCRIPT'&&SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING){element.text=content;return element;}
if(ANY_INNERHTML_BUGGY){if(tagName in Element._insertionTranslations.tags){while(element.firstChild){element.removeChild(element.firstChild);}
Element._getContentFromAnonymousElement(tagName,content.stripScripts()).each(function(node){element.appendChild(node)});}else if(LINK_ELEMENT_INNERHTML_BUGGY&&Object.isString(content)&&content.indexOf('<link')>-1){while(element.firstChild){element.removeChild(element.firstChild);}
var nodes=Element._getContentFromAnonymousElement(tagName,content.stripScripts(),true);nodes.each(function(node){element.appendChild(node)});}
else{element.innerHTML=content.stripScripts();}}
else{element.innerHTML=content.stripScripts();}
content.evalScripts.bind(content).p_defer();return element;}
return update;})(),replace:function(element,content){element=$jot(element);if(content&&content.toElement)content=content.toElement();else if(!Object.isElement(content)){content=Object.toHTML(content);var range=element.ownerDocument.createRange();range.selectNode(element);content.evalScripts.bind(content).p_defer();content=range.createContextualFragment(content.stripScripts());}
element.parentNode.replaceChild(content,element);return element;},insert:function(element,insertions){element=$jot(element);if(Object.isString(insertions)||Object.isNumber(insertions)||Object.isElement(insertions)||(insertions&&(insertions.toElement||insertions.toHTML)))
insertions={bottom:insertions};var content,insert,tagName,childNodes;for(var position in insertions){content=insertions[position];position=position.toLowerCase();insert=Element._insertionTranslations[position];if(content&&content.toElement)content=content.toElement();if(Object.isElement(content)){insert(element,content);continue;}
content=Object.toHTML(content);tagName=((position=='before'||position=='after')?element.parentNode:element).tagName.toUpperCase();childNodes=Element._getContentFromAnonymousElement(tagName,content.stripScripts());if(position=='top'||position=='after')childNodes.reverse();childNodes.each(insert.curry(element));content.evalScripts.bind(content).p_defer();}
return element;},wrap:function(element,wrapper,attributes){element=$jot(element);if(Object.isElement(wrapper))
$jot(wrapper).writeAttribute(attributes||{});else if(Object.isString(wrapper))wrapper=new Element(wrapper,attributes);else wrapper=new Element('div',wrapper);if(element.parentNode)
element.parentNode.replaceChild(wrapper,element);wrapper.appendChild(element);return wrapper;},inspect:function(element){element=$jot(element);var result='<'+element.tagName.toLowerCase();$jotH({'id':'id','className':'class'}).each(function(pair){var property=pair.first(),attribute=pair.last(),value=(element[property]||'').toString();if(value)result+=' '+attribute+'='+value.inspect(true);});return result+'>';},recursivelyCollect:function(element,property,maximumLength){element=$jot(element);maximumLength=maximumLength||-1;var elements=[];while(element=element[property]){if(element.nodeType==1)
elements.push(Element.extend(element));if(elements.length==maximumLength)
break;}
return elements;},ancestors:function(element){return Element.recursivelyCollect(element,'parentNode');},descendants:function(element){return Element.select(element,"*");},firstDescendant:function(element){element=$jot(element).firstChild;while(element&&element.nodeType!=1)element=element.nextSibling;return $jot(element);},immediateDescendants:function(element){var results=[],child=$jot(element).firstChild;while(child){if(child.nodeType===1){results.push(Element.extend(child));}
child=child.nextSibling;}
return results;},previousSiblings:function(element,maximumLength){return Element.recursivelyCollect(element,'previousSibling');},nextSiblings:function(element){return Element.recursivelyCollect(element,'nextSibling');},siblings:function(element){element=$jot(element);return Element.previousSiblings(element).reverse().concat(Element.nextSiblings(element));},match:function(element,selector){element=$jot(element);if(Object.isString(selector))
return Prototype.Selector.match(element,selector);return selector.match(element);},up:function(element,expression,index){element=$jot(element);if(arguments.length==1)return $jot(element.parentNode);var ancestors=Element.ancestors(element);return Object.isNumber(expression)?ancestors[expression]:Prototype.Selector.find(ancestors,expression,index);},down:function(element,expression,index){element=$jot(element);if(arguments.length==1)return Element.firstDescendant(element);return Object.isNumber(expression)?Element.descendants(element)[expression]:Element.select(element,expression)[index||0];},previous:function(element,expression,index){element=$jot(element);if(Object.isNumber(expression))index=expression,expression=false;if(!Object.isNumber(index))index=0;if(expression){return Prototype.Selector.find(element.previousSiblings(),expression,index);}else{return element.recursivelyCollect("previousSibling",index+1)[index];}},next:function(element,expression,index){element=$jot(element);if(Object.isNumber(expression))index=expression,expression=false;if(!Object.isNumber(index))index=0;if(expression){return Prototype.Selector.find(element.nextSiblings(),expression,index);}else{var maximumLength=Object.isNumber(index)?index+1:1;return element.recursivelyCollect("nextSibling",index+1)[index];}},select:function(element){element=$jot(element);var expressions=Array.prototype.slice.call(arguments,1).join(', ');return Prototype.Selector.select(expressions,element);},adjacent:function(element){element=$jot(element);var expressions=Array.prototype.slice.call(arguments,1).join(', ');return Prototype.Selector.select(expressions,element.parentNode).without(element);},identify:function(element){element=$jot(element);var id=Element.readAttribute(element,'id');if(id)return id;do{id='anonymous_element_'+Element.idCounter++}while($jot(id));Element.writeAttribute(element,'id',id);return id;},readAttribute:function(element,name){element=$jot(element);if(Prototype.Browser.IE){var t=Element._attributeTranslations.read;if(t.values[name])return t.values[name](element,name);if(t.names[name])name=t.names[name];if(name.include(':')){return(!element.attributes||!element.attributes[name])?null:element.attributes[name].value;}}
return element.getAttribute(name);},writeAttribute:function(element,name,value){element=$jot(element);var attributes={},t=Element._attributeTranslations.write;if(typeof name=='object')attributes=name;else attributes[name]=Object.isUndefined(value)?true:value;for(var attr in attributes){name=t.names[attr]||attr;value=attributes[attr];if(t.values[attr])name=t.values[attr](element,value);if(value===false||value===null)
element.removeAttribute(name);else if(value===true)
element.setAttribute(name,name);else element.setAttribute(name,value);}
return element;},getHeight:function(element){return Element.getDimensions(element).height;},getWidth:function(element){return Element.getDimensions(element).width;},classNames:function(element){return new Element.ClassNames(element);},hasClassName:function(element,className){if(!(element=$jot(element)))return;var elementClassName=element.className;return(elementClassName.length>0&&(elementClassName==className||new RegExp("(^|\\s)"+className+"(\\s|$jot)").test(elementClassName)));},addClassName:function(element,className){if(!(element=$jot(element)))return;if(!Element.hasClassName(element,className))
element.className+=(element.className?' ':'')+className;return element;},removeClassName:function(element,className){if(!(element=$jot(element)))return;element.className=element.className.replace(new RegExp("(^|\\s+)"+className+"(\\s+|$jot)"),' ').strip();return element;},toggleClassName:function(element,className){if(!(element=$jot(element)))return;return Element[Element.hasClassName(element,className)?'removeClassName':'addClassName'](element,className);},cleanWhitespace:function(element){element=$jot(element);var node=element.firstChild;while(node){var nextNode=node.nextSibling;if(node.nodeType==3&&!/\S/.test(node.nodeValue))
element.removeChild(node);node=nextNode;}
return element;},empty:function(element){return $jot(element).innerHTML.blank();},descendantOf:function(element,ancestor){element=$jot(element),ancestor=$jot(ancestor);if(element.compareDocumentPosition)
return(element.compareDocumentPosition(ancestor)&8)===8;if(ancestor.contains)
return ancestor.contains(element)&&ancestor!==element;while(element=element.parentNode)
if(element==ancestor)return true;return false;},scrollTo:function(element){element=$jot(element);var pos=Element.cumulativeOffset(element);window.scrollTo(pos[0],pos[1]);return element;},getStyle:function(element,style){element=$jot(element);style=style=='float'?'cssFloat':style.camelize();var value=element.style[style];if(!value||value=='auto'){var css=document.defaultView.getComputedStyle(element,null);value=css?css[style]:null;}
if(style=='opacity')return value?parseFloat(value):1.0;return value=='auto'?null:value;},getOpacity:function(element){return $jot(element).getStyle('opacity');},setStyle:function(element,styles){element=$jot(element);var elementStyle=element.style,match;if(Object.isString(styles)){element.style.cssText+=';'+styles;return styles.include('opacity')?element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]):element;}
for(var property in styles)
if(property=='opacity')element.setOpacity(styles[property]);else
elementStyle[(property=='float'||property=='cssFloat')?(Object.isUndefined(elementStyle.styleFloat)?'cssFloat':'styleFloat'):property]=styles[property];return element;},setOpacity:function(element,value){element=$jot(element);element.style.opacity=(value==1||value==='')?'':(value<0.00001)?0:value;return element;},makePositioned:function(element){element=$jot(element);var pos=Element.getStyle(element,'position');if(pos=='static'||!pos){element._madePositioned=true;element.style.position='relative';if(Prototype.Browser.Opera){element.style.top=0;element.style.left=0;}}
return element;},undoPositioned:function(element){element=$jot(element);if(element._madePositioned){element._madePositioned=undefined;element.style.position=element.style.top=element.style.left=element.style.bottom=element.style.right='';}
return element;},makeClipping:function(element){element=$jot(element);if(element._overflow)return element;element._overflow=Element.getStyle(element,'overflow')||'auto';if(element._overflow!=='hidden')
element.style.overflow='hidden';return element;},undoClipping:function(element){element=$jot(element);if(!element._overflow)return element;element.style.overflow=element._overflow=='auto'?'':element._overflow;element._overflow=null;return element;},clonePosition:function(element,source){var options=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});source=$jot(source);var p=Element.viewportOffset(source),delta=[0,0],parent=null;element=$jot(element);if(Element.getStyle(element,'position')=='absolute'){parent=Element.getOffsetParent(element);delta=Element.viewportOffset(parent);}
if(parent==document.body){delta[0]-=document.body.offsetLeft;delta[1]-=document.body.offsetTop;}
if(options.setLeft)element.style.left=(p[0]-delta[0]+options.offsetLeft)+'px';if(options.setTop)element.style.top=(p[1]-delta[1]+options.offsetTop)+'px';if(options.setWidth)element.style.width=source.offsetWidth+'px';if(options.setHeight)element.style.height=source.offsetHeight+'px';return element;}};Object.extend(Element.Methods,{getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});Element._attributeTranslations={write:{names:{className:'class',htmlFor:'for'},values:{}}};if(Prototype.Browser.Opera){Element.Methods.getStyle=Element.Methods.getStyle.wrap(function(proceed,element,style){switch(style){case'height':case'width':if(!Element.visible(element))return null;var dim=parseInt(proceed(element,style),10);if(dim!==element['offset'+style.capitalize()])
return dim+'px';var properties;if(style==='height'){properties=['border-top-width','padding-top','padding-bottom','border-bottom-width'];}
else{properties=['border-left-width','padding-left','padding-right','border-right-width'];}
return properties.inject(dim,function(memo,property){var val=proceed(element,property);return val===null?memo:memo-parseInt(val,10);})+'px';default:return proceed(element,style);}});Element.Methods.readAttribute=Element.Methods.readAttribute.wrap(function(proceed,element,attribute){if(attribute==='title')return element.title;return proceed(element,attribute);});}
else if(Prototype.Browser.IE){Element.Methods.getStyle=function(element,style){element=$jot(element);style=(style=='float'||style=='cssFloat')?'styleFloat':style.camelize();var value=element.style[style];if(!value&&element.currentStyle)value=element.currentStyle[style];if(style=='opacity'){if(value=(element.getStyle('filter')||'').match(/alpha\(opacity=(.*)\)/))
if(value[1])return parseFloat(value[1])/100;return 1.0;}
if(value=='auto'){if((style=='width'||style=='height')&&(element.getStyle('display')!='none'))
return element['offset'+style.capitalize()]+'px';return null;}
return value;};Element.Methods.setOpacity=function(element,value){function stripAlpha(filter){return filter.replace(/alpha\([^\)]*\)/gi,'');}
element=$jot(element);var currentStyle=element.currentStyle;if((currentStyle&&!currentStyle.hasLayout)||(!currentStyle&&element.style.zoom=='normal'))
element.style.zoom=1;var filter=element.getStyle('filter'),style=element.style;if(value==1||value===''){(filter=stripAlpha(filter))?style.filter=filter:style.removeAttribute('filter');return element;}else if(value<0.00001)value=0;style.filter=stripAlpha(filter)+'alpha(opacity='+(value*100)+')';return element;};Element._attributeTranslations=(function(){var classProp='className',forProp='for',el=document.createElement('div');el.setAttribute(classProp,'x');if(el.className!=='x'){el.setAttribute('class','x');if(el.className==='x'){classProp='class';}}
el=null;el=document.createElement('label');el.setAttribute(forProp,'x');if(el.htmlFor!=='x'){el.setAttribute('htmlFor','x');if(el.htmlFor==='x'){forProp='htmlFor';}}
el=null;return{read:{names:{'class':classProp,'className':classProp,'for':forProp,'htmlFor':forProp},values:{_getAttr:function(element,attribute){return element.getAttribute(attribute);},_getAttr2:function(element,attribute){return element.getAttribute(attribute,2);},_getAttrNode:function(element,attribute){var node=element.getAttributeNode(attribute);return node?node.value:"";},_getEv:(function(){var el=document.createElement('div'),f;el.onclick=Prototype.emptyFunction;var value=el.getAttribute('onclick');if(String(value).indexOf('{')>-1){f=function(element,attribute){attribute=element.getAttribute(attribute);if(!attribute)return null;attribute=attribute.toString();attribute=attribute.split('{')[1];attribute=attribute.split('}')[0];return attribute.strip();};}
else if(value===''){f=function(element,attribute){attribute=element.getAttribute(attribute);if(!attribute)return null;return attribute.strip();};}
el=null;return f;})(),_flag:function(element,attribute){return $jot(element).hasAttribute(attribute)?attribute:null;},style:function(element){return element.style.cssText.toLowerCase();},title:function(element){return element.title;}}}}})();Element._attributeTranslations.write={names:Object.extend({cellpadding:'cellPadding',cellspacing:'cellSpacing'},Element._attributeTranslations.read.names),values:{checked:function(element,value){element.checked=!!value;},style:function(element,value){element.style.cssText=value?value:'';}}};Element._attributeTranslations.has={};$jotw('colSpan rowSpan vAlign dateTime accessKey tabIndex '+'encType maxLength readOnly longDesc frameBorder').each(function(attr){Element._attributeTranslations.write.names[attr.toLowerCase()]=attr;Element._attributeTranslations.has[attr.toLowerCase()]=attr;});(function(v){Object.extend(v,{href:v._getAttr2,src:v._getAttr2,type:v._getAttr,action:v._getAttrNode,disabled:v._flag,checked:v._flag,readonly:v._flag,multiple:v._flag,onload:v._getEv,onunload:v._getEv,onclick:v._getEv,ondblclick:v._getEv,onmousedown:v._getEv,onmouseup:v._getEv,onmouseover:v._getEv,onmousemove:v._getEv,onmouseout:v._getEv,onfocus:v._getEv,onblur:v._getEv,onkeypress:v._getEv,onkeydown:v._getEv,onkeyup:v._getEv,onsubmit:v._getEv,onreset:v._getEv,onselect:v._getEv,onchange:v._getEv});})(Element._attributeTranslations.read.values);if(Prototype.BrowserFeatures.ElementExtensions){(function(){function _descendants(element){var nodes=element.getElementsByTagName('*'),results=[];for(var i=0,node;node=nodes[i];i++)
if(node.tagName!=="!")
results.push(node);return results;}
Element.Methods.down=function(element,expression,index){element=$jot(element);if(arguments.length==1)return element.firstDescendant();return Object.isNumber(expression)?_descendants(element)[expression]:Element.select(element,expression)[index||0];}})();}}
else if(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent)){Element.Methods.setOpacity=function(element,value){element=$jot(element);element.style.opacity=(value==1)?0.999999:(value==='')?'':(value<0.00001)?0:value;return element;};}
else if(Prototype.Browser.WebKit){Element.Methods.setOpacity=function(element,value){element=$jot(element);element.style.opacity=(value==1||value==='')?'':(value<0.00001)?0:value;if(value==1)
if(element.tagName.toUpperCase()=='IMG'&&element.width){element.width++;element.width--;}else try{var n=document.createTextNode(' ');element.appendChild(n);element.removeChild(n);}catch(e){}
return element;};}
if('outerHTML'in document.documentElement){Element.Methods.replace=function(element,content){element=$jot(element);if(content&&content.toElement)content=content.toElement();if(Object.isElement(content)){element.parentNode.replaceChild(content,element);return element;}
content=Object.toHTML(content);var parent=element.parentNode,tagName=parent.tagName.toUpperCase();if(Element._insertionTranslations.tags[tagName]){var nextSibling=element.next(),fragments=Element._getContentFromAnonymousElement(tagName,content.stripScripts());parent.removeChild(element);if(nextSibling)
fragments.each(function(node){parent.insertBefore(node,nextSibling)});else
fragments.each(function(node){parent.appendChild(node)});}
else element.outerHTML=content.stripScripts();content.evalScripts.bind(content).p_defer();return element;};}
Element._returnOffset=function(l,t){var result=[l,t];result.left=l;result.top=t;return result;};Element._getContentFromAnonymousElement=function(tagName,html,force){var div=new Element('div'),t=Element._insertionTranslations.tags[tagName];var workaround=false;if(t)workaround=true;else if(force){workaround=true;t=['','',0];}
if(workaround){div.innerHTML='&nbsp;'+t[0]+html+t[1];div.removeChild(div.firstChild);for(var i=t[2];i--;){div=div.firstChild;}}
else{div.innerHTML=html;}
return $jotA(div.childNodes);};Element._insertionTranslations={before:function(element,node){element.parentNode.insertBefore(node,element);},top:function(element,node){element.insertBefore(node,element.firstChild);},bottom:function(element,node){element.appendChild(node);},after:function(element,node){element.parentNode.insertBefore(node,element.nextSibling);},tags:{TABLE:['<table>','</table>',1],TBODY:['<table><tbody>','</tbody></table>',2],TR:['<table><tbody><tr>','</tr></tbody></table>',3],TD:['<table><tbody><tr><td>','</td></tr></tbody></table>',4],SELECT:['<select>','</select>',1]}};(function(){var tags=Element._insertionTranslations.tags;Object.extend(tags,{THEAD:tags.TBODY,TFOOT:tags.TBODY,TH:tags.TD});})();Element.Methods.Simulated={hasAttribute:function(element,attribute){attribute=Element._attributeTranslations.has[attribute]||attribute;var node=$jot(element).getAttributeNode(attribute);return!!(node&&node.specified);}};Element.Methods.ByTag={};Object.extend(Element,Element.Methods);(function(div){if(!Prototype.BrowserFeatures.ElementExtensions&&div['__proto__']){window.HTMLElement={};window.HTMLElement.prototype=div['__proto__'];Prototype.BrowserFeatures.ElementExtensions=true;}
div=null;})(document.createElement('div'));Element.extend=(function(){function checkDeficiency(tagName){if(typeof window.Element!='undefined'){var proto=window.Element.prototype;if(proto){var id='_'+(Math.random()+'').slice(2),el=document.createElement(tagName);proto[id]='x';var isBuggy=(el[id]!=='x');delete proto[id];el=null;return isBuggy;}}
return false;}
function extendElementWith(element,methods){for(var property in methods){var value=methods[property];if(Object.isFunction(value)&&!(property in element))
element[property]=value.methodize();}}
var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY=checkDeficiency('object');if(Prototype.BrowserFeatures.SpecificElementExtensions){if(HTMLOBJECTELEMENT_PROTOTYPE_BUGGY){return function(element){if(element&&typeof element._extendedByPrototype=='undefined'){var t=element.tagName;if(t&&(/^(?:object|applet|embed)$jot/i.test(t))){extendElementWith(element,Element.Methods);extendElementWith(element,Element.Methods.Simulated);extendElementWith(element,Element.Methods.ByTag[t.toUpperCase()]);}}
return element;}}
return Prototype.K;}
var Methods={},ByTag=Element.Methods.ByTag;var extend=Object.extend(function(element){if(!element||typeof element._extendedByPrototype!='undefined'||element.nodeType!=1||element==window)return element;var methods=Object.clone(Methods),tagName=element.tagName.toUpperCase();if(ByTag[tagName])Object.extend(methods,ByTag[tagName]);extendElementWith(element,methods);element._extendedByPrototype=Prototype.emptyFunction;return element;},{refresh:function(){if(!Prototype.BrowserFeatures.ElementExtensions){Object.extend(Methods,Element.Methods);Object.extend(Methods,Element.Methods.Simulated);}}});extend.refresh();return extend;})();if(document.documentElement.hasAttribute){Element.hasAttribute=function(element,attribute){return element.hasAttribute(attribute);};}
else{Element.hasAttribute=Element.Methods.Simulated.hasAttribute;}
Element.addMethods=function(methods){var F=Prototype.BrowserFeatures,T=Element.Methods.ByTag;if(!methods){Object.extend(Form,Form.Methods);Object.extend(Form.Element,Form.Element.Methods);Object.extend(Element.Methods.ByTag,{"FORM":Object.clone(Form.Methods),"INPUT":Object.clone(Form.Element.Methods),"SELECT":Object.clone(Form.Element.Methods),"TEXTAREA":Object.clone(Form.Element.Methods),"BUTTON":Object.clone(Form.Element.Methods)});}
if(arguments.length==2){var tagName=methods;methods=arguments[1];}
if(!tagName)Object.extend(Element.Methods,methods||{});else{if(Object.isArray(tagName))tagName.each(extend);else extend(tagName);}
function extend(tagName){tagName=tagName.toUpperCase();if(!Element.Methods.ByTag[tagName])
Element.Methods.ByTag[tagName]={};Object.extend(Element.Methods.ByTag[tagName],methods);}
function copy(methods,destination,onlyIfAbsent){onlyIfAbsent=onlyIfAbsent||false;for(var property in methods){var value=methods[property];if(!Object.isFunction(value))continue;if(!onlyIfAbsent||!(property in destination))
destination[property]=value.methodize();}}
function findDOMClass(tagName){var klass;var trans={"OPTGROUP":"OptGroup","TEXTAREA":"TextArea","P":"Paragraph","FIELDSET":"FieldSet","UL":"UList","OL":"OList","DL":"DList","DIR":"Directory","H1":"Heading","H2":"Heading","H3":"Heading","H4":"Heading","H5":"Heading","H6":"Heading","Q":"Quote","INS":"Mod","DEL":"Mod","A":"Anchor","IMG":"Image","CAPTION":"TableCaption","COL":"TableCol","COLGROUP":"TableCol","THEAD":"TableSection","TFOOT":"TableSection","TBODY":"TableSection","TR":"TableRow","TH":"TableCell","TD":"TableCell","FRAMESET":"FrameSet","IFRAME":"IFrame"};if(trans[tagName])klass='HTML'+trans[tagName]+'Element';if(window[klass])return window[klass];klass='HTML'+tagName+'Element';if(window[klass])return window[klass];klass='HTML'+tagName.capitalize()+'Element';if(window[klass])return window[klass];var element=document.createElement(tagName),proto=element['__proto__']||element.constructor.prototype;element=null;return proto;}
var elementPrototype=window.HTMLElement?HTMLElement.prototype:Element.prototype;if(F.ElementExtensions){copy(Element.Methods,elementPrototype);copy(Element.Methods.Simulated,elementPrototype,true);}
if(F.SpecificElementExtensions){for(var tag in Element.Methods.ByTag){var klass=findDOMClass(tag);if(Object.isUndefined(klass))continue;copy(T[tag],klass.prototype);}}
Object.extend(Element,Element.Methods);delete Element.ByTag;if(Element.extend.refresh)Element.extend.refresh();Element.cache={};};document.viewport={getDimensions:function(){return{width:this.getWidth(),height:this.getHeight()};},getScrollOffsets:function(){return Element._returnOffset(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop);}};(function(viewport){var B=Prototype.Browser,doc=document,element,property={};function getRootElement(){if(B.WebKit&&!doc.evaluate)
return document;if(B.Opera&&window.parseFloat(window.opera.version())<9.5)
return document.body;return document.documentElement;}
function define(D){if(!element)element=getRootElement();property[D]='client'+D;viewport['get'+D]=function(){return element[property[D]]};return viewport['get'+D]();}
viewport.getWidth=define.curry('Width');viewport.getHeight=define.curry('Height');})(document.viewport);Element.Storage={UID:1};Element.addMethods({getStorage:function(element){if(!(element=$jot(element)))return;var uid;if(element===window){uid=0;}else{if(typeof element._prototypeUID==="undefined")
element._prototypeUID=Element.Storage.UID++;uid=element._prototypeUID;}
if(!Element.Storage[uid])
Element.Storage[uid]=$jotH();return Element.Storage[uid];},store:function(element,key,value){if(!(element=$jot(element)))return;if(arguments.length===2){Element.getStorage(element).update(key);}else{Element.getStorage(element).set(key,value);}
return element;},retrieve:function(element,key,defaultValue){if(!(element=$jot(element)))return;var hash=Element.getStorage(element),value=hash.get(key);if(Object.isUndefined(value)){hash.set(key,defaultValue);value=defaultValue;}
return value;},clone:function(element,deep){if(!(element=$jot(element)))return;var clone=element.cloneNode(deep);clone._prototypeUID=void 0;if(deep){var descendants=Element.select(clone,'*'),i=descendants.length;while(i--){descendants[i]._prototypeUID=void 0;}}
return Element.extend(clone);},purge:function(element){if(!(element=$jot(element)))return;var purgeElement=Element._purgeElement;purgeElement(element);var descendants=element.getElementsByTagName('*'),i=descendants.length;while(i--)purgeElement(descendants[i]);return null;}});(function(){function toDecimal(pctString){var match=pctString.match(/^(\d+)%?$jot/i);if(!match)return null;return(Number(match[1])/100);}
function getPixelValue(value,property,context){var element=null;if(Object.isElement(value)){element=value;value=element.getStyle(property);}
if(value===null){return null;}
if((/^(?:-)?\d+(\.\d+)?(px)?$jot/i).test(value)){return window.parseFloat(value);}
var isPercentage=value.include('%'),isViewport=(context===document.viewport);if(/\d/.test(value)&&element&&element.runtimeStyle&&!(isPercentage&&isViewport)){var style=element.style.left,rStyle=element.runtimeStyle.left;element.runtimeStyle.left=element.currentStyle.left;element.style.left=value||0;value=element.style.pixelLeft;element.style.left=style;element.runtimeStyle.left=rStyle;return value;}
if(element&&isPercentage){context=context||element.parentNode;var decimal=toDecimal(value);var whole=null;var position=element.getStyle('position');var isHorizontal=property.include('left')||property.include('right')||property.include('width');var isVertical=property.include('top')||property.include('bottom')||property.include('height');if(context===document.viewport){if(isHorizontal){whole=document.viewport.getWidth();}else if(isVertical){whole=document.viewport.getHeight();}}else{if(isHorizontal){whole=$jot(context).measure('width');}else if(isVertical){whole=$jot(context).measure('height');}}
return(whole===null)?0:whole*decimal;}
return 0;}
function toCSSPixels(number){if(Object.isString(number)&&number.endsWith('px')){return number;}
return number+'px';}
function isDisplayed(element){var originalElement=element;while(element&&element.parentNode){var display=element.getStyle('display');if(display==='none'){return false;}
element=$jot(element.parentNode);}
return true;}
var hasLayout=Prototype.K;if('currentStyle'in document.documentElement){hasLayout=function(element){if(!element.currentStyle.hasLayout){element.style.zoom=1;}
return element;};}
function cssNameFor(key){if(key.include('border'))key=key+'-width';return key.camelize();}
Element.Layout=Class.create(Hash,{initialize:function($jotsuper,element,preCompute){$jotsuper();this.element=$jot(element);Element.Layout.PROPERTIES.each(function(property){this._set(property,null);},this);if(preCompute){this._preComputing=true;this._begin();Element.Layout.PROPERTIES.each(this._compute,this);this._end();this._preComputing=false;}},_set:function(property,value){return Hash.prototype.set.call(this,property,value);},set:function(property,value){throw"Properties of Element.Layout are read-only.";},get:function($jotsuper,property){var value=$jotsuper(property);return value===null?this._compute(property):value;},_begin:function(){if(this._prepared)return;var element=this.element;if(isDisplayed(element)){this._prepared=true;return;}
var originalStyles={position:element.style.position||'',width:element.style.width||'',visibility:element.style.visibility||'',display:element.style.display||''};element.store('prototype_original_styles',originalStyles);var position=element.getStyle('position'),width=element.getStyle('width');if(width==="0px"||width===null){element.style.display='block';width=element.getStyle('width');}
var context=(position==='fixed')?document.viewport:element.parentNode;element.setStyle({position:'absolute',visibility:'hidden',display:'block'});var positionedWidth=element.getStyle('width');var newWidth;if(width&&(positionedWidth===width)){newWidth=getPixelValue(element,'width',context);}else if(position==='absolute'||position==='fixed'){newWidth=getPixelValue(element,'width',context);}else{var parent=element.parentNode,pLayout=$jot(parent).getLayout();newWidth=pLayout.get('width')-
this.get('margin-left')-
this.get('border-left')-
this.get('padding-left')-
this.get('padding-right')-
this.get('border-right')-
this.get('margin-right');}
element.setStyle({width:newWidth+'px'});this._prepared=true;},_end:function(){var element=this.element;var originalStyles=element.retrieve('prototype_original_styles');element.store('prototype_original_styles',null);element.setStyle(originalStyles);this._prepared=false;},_compute:function(property){var COMPUTATIONS=Element.Layout.COMPUTATIONS;if(!(property in COMPUTATIONS)){throw"Property not found.";}
return this._set(property,COMPUTATIONS[property].call(this,this.element));},toObject:function(){var args=$jotA(arguments);var keys=(args.length===0)?Element.Layout.PROPERTIES:args.join(' ').split(' ');var obj={};keys.each(function(key){if(!Element.Layout.PROPERTIES.include(key))return;var value=this.get(key);if(value!=null)obj[key]=value;},this);return obj;},toHash:function(){var obj=this.toObject.apply(this,arguments);return new Hash(obj);},toCSS:function(){var args=$jotA(arguments);var keys=(args.length===0)?Element.Layout.PROPERTIES:args.join(' ').split(' ');var css={};keys.each(function(key){if(!Element.Layout.PROPERTIES.include(key))return;if(Element.Layout.COMPOSITE_PROPERTIES.include(key))return;var value=this.get(key);if(value!=null)css[cssNameFor(key)]=value+'px';},this);return css;},inspect:function(){return"#<Element.Layout>";}});Object.extend(Element.Layout,{PROPERTIES:$jotw('height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height cumulative-left cumulative-top'),COMPOSITE_PROPERTIES:$jotw('padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'),COMPUTATIONS:{'height':function(element){if(!this._preComputing)this._begin();var bHeight=this.get('border-box-height');if(bHeight<=0){if(!this._preComputing)this._end();return 0;}
var bTop=this.get('border-top'),bBottom=this.get('border-bottom');var pTop=this.get('padding-top'),pBottom=this.get('padding-bottom');if(!this._preComputing)this._end();return bHeight-bTop-bBottom-pTop-pBottom;},'width':function(element){if(!this._preComputing)this._begin();var bWidth=this.get('border-box-width');if(bWidth<=0){if(!this._preComputing)this._end();return 0;}
var bLeft=this.get('border-left'),bRight=this.get('border-right');var pLeft=this.get('padding-left'),pRight=this.get('padding-right');if(!this._preComputing)this._end();return bWidth-bLeft-bRight-pLeft-pRight;},'padding-box-height':function(element){var height=this.get('height'),pTop=this.get('padding-top'),pBottom=this.get('padding-bottom');return height+pTop+pBottom;},'padding-box-width':function(element){var width=this.get('width'),pLeft=this.get('padding-left'),pRight=this.get('padding-right');return width+pLeft+pRight;},'border-box-height':function(element){if(!this._preComputing)this._begin();var height=element.offsetHeight;if(!this._preComputing)this._end();return height;},'cumulative-left':function(element){return element.cumulativeOffset().left;},'cumulative-top':function(element){return element.cumulativeOffset().top;},'border-box-width':function(element){if(!this._preComputing)this._begin();var width=element.offsetWidth;if(!this._preComputing)this._end();return width;},'margin-box-height':function(element){var bHeight=this.get('border-box-height'),mTop=this.get('margin-top'),mBottom=this.get('margin-bottom');if(bHeight<=0)return 0;return bHeight+mTop+mBottom;},'margin-box-width':function(element){var bWidth=this.get('border-box-width'),mLeft=this.get('margin-left'),mRight=this.get('margin-right');if(bWidth<=0)return 0;return bWidth+mLeft+mRight;},'top':function(element){var offset=element.positionedOffset();return offset.top;},'bottom':function(element){var offset=element.positionedOffset(),parent=element.getOffsetParent(),pHeight=parent.measure('height');var mHeight=this.get('border-box-height');return pHeight-mHeight-offset.top;},'left':function(element){var offset=element.positionedOffset();return offset.left;},'right':function(element){var offset=element.positionedOffset(),parent=element.getOffsetParent(),pWidth=parent.measure('width');var mWidth=this.get('border-box-width');return pWidth-mWidth-offset.left;},'padding-top':function(element){return getPixelValue(element,'paddingTop');},'padding-bottom':function(element){return getPixelValue(element,'paddingBottom');},'padding-left':function(element){return getPixelValue(element,'paddingLeft');},'padding-right':function(element){return getPixelValue(element,'paddingRight');},'border-top':function(element){return getPixelValue(element,'borderTopWidth');},'border-bottom':function(element){return getPixelValue(element,'borderBottomWidth');},'border-left':function(element){return getPixelValue(element,'borderLeftWidth');},'border-right':function(element){return getPixelValue(element,'borderRightWidth');},'margin-top':function(element){return getPixelValue(element,'marginTop');},'margin-bottom':function(element){return getPixelValue(element,'marginBottom');},'margin-left':function(element){return getPixelValue(element,'marginLeft');},'margin-right':function(element){return getPixelValue(element,'marginRight');}}});if('getBoundingClientRect'in document.documentElement){Object.extend(Element.Layout.COMPUTATIONS,{'right':function(element){var parent=hasLayout(element.getOffsetParent());var rect=element.getBoundingClientRect(),pRect=parent.getBoundingClientRect();return(pRect.right-rect.right).round();},'bottom':function(element){var parent=hasLayout(element.getOffsetParent());var rect=element.getBoundingClientRect(),pRect=parent.getBoundingClientRect();return(pRect.bottom-rect.bottom).round();}});}
Element.Offset=Class.create({initialize:function(left,top){this.left=left.round();this.top=top.round();this[0]=this.left;this[1]=this.top;},relativeTo:function(offset){return new Element.Offset(this.left-offset.left,this.top-offset.top);},inspect:function(){return"#<Element.Offset left: #{left} top: #{top}>".interpolate(this);},toString:function(){return"[#{left}, #{top}]".interpolate(this);},toArray:function(){return[this.left,this.top];}});function getLayout(element,preCompute){return new Element.Layout(element,preCompute);}
function measure(element,property){return $jot(element).getLayout().get(property);}
function getDimensions(element){element=$jot(element);var display=Element.getStyle(element,'display');if(display&&display!=='none'){return{width:element.offsetWidth,height:element.offsetHeight};}
var style=element.style;var originalStyles={visibility:style.visibility,position:style.position,display:style.display};var newStyles={visibility:'hidden',display:'block'};if(originalStyles.position!=='fixed')
newStyles.position='absolute';Element.setStyle(element,newStyles);var dimensions={width:element.offsetWidth,height:element.offsetHeight};Element.setStyle(element,originalStyles);return dimensions;}
function getOffsetParent(element){element=$jot(element);if(isDocument(element)||isDetached(element)||isBody(element)||isHtml(element))
return $jot(document.body);var isInline=(Element.getStyle(element,'display')==='inline');if(!isInline&&element.offsetParent)return $jot(element.offsetParent);while((element=element.parentNode)&&element!==document.body){if(Element.getStyle(element,'position')!=='static'){return isHtml(element)?$jot(document.body):$jot(element);}}
return $jot(document.body);}
function cumulativeOffset(element){element=$jot(element);var valueT=0,valueL=0;if(element.parentNode){do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;}while(element);}
return new Element.Offset(valueL,valueT);}
function positionedOffset(element){element=$jot(element);var layout=element.getLayout();var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;if(element){if(isBody(element))break;var p=Element.getStyle(element,'position');if(p!=='static')break;}}while(element);valueL-=layout.get('margin-top');valueT-=layout.get('margin-left');return new Element.Offset(valueL,valueT);}
function cumulativeScrollOffset(element){var valueT=0,valueL=0;if(isBody(element)&&navigator.userAgent.indexOf('Chrome/32')>-1){element=document.documentElement};do{valueT+=element.scrollTop||0;valueL+=element.scrollLeft||0;element=element.parentNode;}while(element);return new Element.Offset(valueL,valueT);}
function viewportOffset(forElement){element=$jot(element);var valueT=0,valueL=0,docBody=document.body;var element=forElement;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;if(element.offsetParent==docBody&&Element.getStyle(element,'position')=='absolute')break;}while(element=element.offsetParent);element=forElement;do{if(element!=docBody){valueT-=element.scrollTop||0;valueL-=element.scrollLeft||0;}}while(element=element.parentNode);return new Element.Offset(valueL,valueT);}
function absolutize(element){element=$jot(element);if(Element.getStyle(element,'position')==='absolute'){return element;}
var offsetParent=getOffsetParent(element);var eOffset=element.viewportOffset(),pOffset=offsetParent.viewportOffset();var offset=eOffset.relativeTo(pOffset);var layout=element.getLayout();element.store('prototype_absolutize_original_styles',{left:element.getStyle('left'),top:element.getStyle('top'),width:element.getStyle('width'),height:element.getStyle('height')});element.setStyle({position:'absolute',top:offset.top+'px',left:offset.left+'px',width:layout.get('width')+'px',height:layout.get('height')+'px'});return element;}
function relativize(element){element=$jot(element);if(Element.getStyle(element,'position')==='relative'){return element;}
var originalStyles=element.retrieve('prototype_absolutize_original_styles');if(originalStyles)element.setStyle(originalStyles);return element;}
if(Prototype.Browser.IE){getOffsetParent=getOffsetParent.wrap(function(proceed,element){element=$jot(element);if(isDocument(element)||isDetached(element)||isBody(element)||isHtml(element))
return $jot(document.body);var position=element.getStyle('position');if(position!=='static')return proceed(element);element.setStyle({position:'relative'});var value=proceed(element);element.setStyle({position:position});return value;});positionedOffset=positionedOffset.wrap(function(proceed,element){element=$jot(element);if(!element.parentNode)return new Element.Offset(0,0);var position=element.getStyle('position');if(position!=='static')return proceed(element);var offsetParent=element.getOffsetParent();if(offsetParent&&offsetParent.getStyle('position')==='fixed')
hasLayout(offsetParent);element.setStyle({position:'relative'});var value=proceed(element);element.setStyle({position:position});return value;});}else if(Prototype.Browser.Webkit){cumulativeOffset=function(element){element=$jot(element);var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;if(element.offsetParent==document.body)
if(Element.getStyle(element,'position')=='absolute')break;element=element.offsetParent;}while(element);return new Element.Offset(valueL,valueT);};}
Element.addMethods({getLayout:getLayout,measure:measure,getDimensions:getDimensions,getOffsetParent:getOffsetParent,cumulativeOffset:cumulativeOffset,positionedOffset:positionedOffset,cumulativeScrollOffset:cumulativeScrollOffset,viewportOffset:viewportOffset,absolutize:absolutize,relativize:relativize});function isBody(element){return element.nodeName.toUpperCase()==='BODY';}
function isHtml(element){return element.nodeName.toUpperCase()==='HTML';}
function isDocument(element){return element.nodeType===Node.DOCUMENT_NODE;}
function isDetached(element){return element!==document.body&&!Element.descendantOf(element,document.body);}
if('getBoundingClientRect'in document.documentElement){Element.addMethods({viewportOffset:function(element){element=$jot(element);if(isDetached(element))return new Element.Offset(0,0);var rect=element.getBoundingClientRect(),docEl=document.documentElement;return new Element.Offset(rect.left-docEl.clientLeft,rect.top-docEl.clientTop);}});}})();window.document.querySelectorAll=function(){var expression=$jotA(arguments).join(', ');return Prototype.Selector.select(expression,document);};Prototype.Selector=(function(){function select(){throw new Error('Method "Prototype.Selector.select" must be defined.');}
function match(){throw new Error('Method "Prototype.Selector.match" must be defined.');}
function find(elements,expression,index){index=index||0;var match=Prototype.Selector.match,length=elements.length,matchIndex=0,i;for(i=0;i<length;i++){if(match(elements[i],expression)&&index==matchIndex++){return Element.extend(elements[i]);}}}
function extendElements(elements){for(var i=0,length=elements.length;i<length;i++){Element.extend(elements[i]);}
return elements;}
var K=Prototype.K;return{select:select,match:match,find:find,extendElements:(Element.extend===K)?K:extendElements,extendElement:Element.extend};})();Prototype._original_property=window.Sizzle;
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0;});var Sizzle=function(selector,context,results,seed){results=results||[];var origContext=context=context||document;if(context.nodeType!==1&&context.nodeType!==9){return[];}
if(!selector||typeof selector!=="string"){return results;}
var parts=[],m,set,checkSet,check,mode,extra,prune=true,contextXML=isXML(context),soFar=selector;while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}
if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector])
selector+=parts.shift();set=posProcess(selector,set);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}
if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}
while(parts.length){var cur=parts.pop(),pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}
if(pop==null){pop=context;}
Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}
if(!checkSet){checkSet=set;}
if(!checkSet){throw"Syntax error, unrecognized expression: "+(cur||selector);}
if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else if(context&&context.nodeType===1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}
if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}
return results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}
return results;};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.find=function(expr,context,isXML){var set,match;if(!expr){return[];}
for(var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}
if(!set){set=context.getElementsByTagName("*");}
return{set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.match[type].exec(expr))!=null){var filter=Expr.filter[type],found,item;anyFound=false;if(curLoop==result){result=[];}
if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else if(match===true){continue;}}
if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else if(pass){result.push(item);anyFound=true;}}}}
if(found!==undefined){if(!inplace){curLoop=result;}
expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}
break;}}}
if(expr==old){if(anyFound==null){throw"Syntax error, unrecognized expression: "+expr;}else{break;}}
old=expr;}
return curLoop;};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$jot)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");}},relative:{"+":function(checkSet,part,isXML){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag&&!isXML){part=part.toUpperCase();}
for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}
checkSet[i]=isPartStrNotTag||elem&&elem.nodeName===part?elem||false:elem===part;}}
if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},">":function(checkSet,part,isXML){var isPartStr=typeof part==="string";if(isPartStr&&!/\W/.test(part)){part=isXML?part:part.toUpperCase();for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName===part?parent:false;}}}else{for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}
if(isPartStr){Sizzle.filter(part,checkSet,true);}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}
checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}
checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?[m]:[];}},NAME:function(match,context,isXML){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}
return ret.length===0?null:ret;}},TAG:function(match,context){return context.getElementsByTagName(match[1]);}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";if(isXML){return match;}
for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").indexOf(match)>=0)){if(!inplace)
result.push(elem);}else if(inplace){curLoop[i]=false;}}}
return false;},ID:function(match){return match[1].replace(/\\/g,"");},TAG:function(match,curLoop){for(var i=0;curLoop[i]===false;i++){}
return curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase();},CHILD:function(match){if(match[1]=="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}
match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}
if(match[2]==="~="){match[4]=" "+match[4]+" ";}
return match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}
return false;}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}
return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected===true;},parent:function(elem){return!!elem.firstChild;},empty:function(elem){return!elem.firstChild;},has:function(elem,i,match){return!!Sizzle(match[3],elem).length;},header:function(elem){return /h\d/i.test(elem.nodeName);},text:function(elem){return"text"===elem.type;},radio:function(elem){return"radio"===elem.type;},checkbox:function(elem){return"checkbox"===elem.type;},file:function(elem){return"file"===elem.type;},password:function(elem){return"password"===elem.type;},submit:function(elem){return"submit"===elem.type;},image:function(elem){return"image"===elem.type;},reset:function(elem){return"reset"===elem.type;},button:function(elem){return"button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON";},input:function(elem){return /input|select|textarea|button/i.test(elem.nodeName);}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0==i;},eq:function(elem,i,match){return match[3]-0==i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else if(name==="contains"){return(elem.textContent||elem.innerText||"").indexOf(match[3])>=0;}else if(name==="not"){var not=match[3];for(var i=0,l=not.length;i<l;i++){if(not[i]===elem){return false;}}
return true;}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case'only':case'first':while((node=node.previousSibling)){if(node.nodeType===1)return false;}
if(type=='first')return true;node=elem;case'last':while((node=node.nextSibling)){if(node.nodeType===1)return false;}
return true;case'nth':var first=match[2],last=match[3];if(first==1&&last==0){return true;}
var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}
parent.sizcache=doneName;}
var diff=elem.nodeIndex-last;if(first==0){return diff==0;}else{return(diff%first==0&&diff/first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName===match;},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!=check:type==="^="?value.indexOf(check)===0:type==="$jot="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS;for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source);}
var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}
return array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0);}catch(e){makeArray=function(array,results){var ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var i=0,l=array.length;i<l;i++){ret.push(array[i]);}}else{for(var i=0;array[i];i++){ret.push(array[i]);}}}
return ret;};}
var sortOrder;if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true;}
return 0;}
var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(ret===0){hasDuplicate=true;}
return ret;};}else if("sourceIndex"in document.documentElement){sortOrder=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true;}
return 0;}
var ret=a.sourceIndex-b.sourceIndex;if(ret===0){hasDuplicate=true;}
return ret;};}else if(document.createRange){sortOrder=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true;}
return 0;}
var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();aRange.setStart(a,0);aRange.setEnd(a,0);bRange.setStart(b,0);bRange.setEnd(b,0);var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);if(ret===0){hasDuplicate=true;}
return ret;};}
(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();form.innerHTML="<a name='"+id+"'/>";var root=document.documentElement;root.insertBefore(form,root.firstChild);if(!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}
root.removeChild(form);root=form=null;})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}
results=tmp;}
return results;};}
div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}
div=null;})();if(document.querySelectorAll)(function(){var oldSizzle=Sizzle,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}
Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra);}catch(e){}}
return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop];}
div=null;})();if(document.getElementsByClassName&&document.documentElement.getElementsByClassName)(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(div.getElementsByClassName("e").length===0)
return;div.lastChild.className="e";if(div.getElementsByClassName("e").length===1)
return;Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};div=null;})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}
elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}
if(elem.nodeName===cur){match=elem;break;}
elem=elem[dir];}
checkSet[i]=match;}}}
function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}
elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i;}
if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else if(Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}
elem=elem[dir];}
checkSet[i]=match;}}}
var contains=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16;}:function(a,b){return a!==b&&(a.contains?a.contains(b):true);};var isXML=function(elem){return elem.nodeType===9&&elem.documentElement.nodeName!=="HTML"||!!elem.ownerDocument&&elem.ownerDocument.documentElement.nodeName!=="HTML";};var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}
selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);}
return Sizzle.filter(later,tmpSet);};window.Sizzle=Sizzle;})();;(function(engine){var extendElements=Prototype.Selector.extendElements;function select(selector,scope){return extendElements(engine(selector,scope||document));}
function match(element,selector){return engine.matches(selector,[element]).length==1;}
Prototype.Selector.engine=engine;Prototype.Selector.select=select;Prototype.Selector.match=match;})(Sizzle);window.Sizzle=Prototype._original_property;delete Prototype._original_property;var Form={reset:function(form){form=$jot(form);form.reset();return form;},serializeElements:function(elements,options){if(typeof options!='object')options={hash:!!options};else if(Object.isUndefined(options.hash))options.hash=true;var key,value,submitted=false,submit=options.submit,accumulator,initial;if(options.hash){initial={};accumulator=function(result,key,value){if(key in result){if(!Object.isArray(result[key]))result[key]=[result[key]];result[key].push(value);}else result[key]=value;return result;};}else{initial='';accumulator=function(result,key,value){return result+(result?'&':'')+encodeURIComponent(key)+'='+encodeURIComponent(value);}}
return elements.inject(initial,function(result,element){if(!element.disabled&&element.name){key=element.name;value=$jot(element).getValue();if(value!=null&&element.type!='file'&&(element.type!='submit'||(!submitted&&submit!==false&&(!submit||key==submit)&&(submitted=true)))){result=accumulator(result,key,value);}}
return result;});}};Form.Methods={serialize:function(form,options){return Form.serializeElements(Form.getElements(form),options);},getElements:function(form){var elements=$jot(form).getElementsByTagName('*'),element,arr=[],serializers=Form.Element.Serializers;for(var i=0;element=elements[i];i++){arr.push(element);}
return arr.inject([],function(elements,child){if(serializers[child.tagName.toLowerCase()])
elements.push(Element.extend(child));return elements;})},getInputs:function(form,typeName,name){form=$jot(form);var inputs=form.getElementsByTagName('input');if(!typeName&&!name)return $jotA(inputs).map(Element.extend);for(var i=0,matchingInputs=[],length=inputs.length;i<length;i++){var input=inputs[i];if((typeName&&input.type!=typeName)||(name&&input.name!=name))
continue;matchingInputs.push(Element.extend(input));}
return matchingInputs;},disable:function(form){form=$jot(form);Form.getElements(form).invoke('disable');return form;},enable:function(form){form=$jot(form);Form.getElements(form).invoke('enable');return form;},findFirstElement:function(form){var elements=$jot(form).getElements().findAll(function(element){return'hidden'!=element.type&&!element.disabled;});var firstByIndex=elements.findAll(function(element){return element.hasAttribute('tabIndex')&&element.tabIndex>=0;}).sortBy(function(element){return element.tabIndex}).first();return firstByIndex?firstByIndex:elements.find(function(element){return /^(?:input|select|textarea)$jot/i.test(element.tagName);});},focusFirstElement:function(form){form=$jot(form);var element=form.findFirstElement();if(element)element.activate();return form;},request:function(form,options){form=$jot(form),options=Object.clone(options||{});var params=options.parameters,action=form.readAttribute('action')||'';if(action.blank())action=window.location.href;options.parameters=form.serialize(true);if(params){if(Object.isString(params))params=params.toQueryParams();Object.extend(options.parameters,params);}
if(form.hasAttribute('method')&&!options.method)
options.method=form.method;return new Ajax.Request(action,options);}};Form.Element={focus:function(element){$jot(element).focus();return element;},select:function(element){$jot(element).select();return element;}};Form.Element.Methods={serialize:function(element){element=$jot(element);if(!element.disabled&&element.name){var value=element.getValue();if(value!=undefined){var pair={};pair[element.name]=value;return Object.toQueryString(pair);}}
return'';},getValue:function(element){element=$jot(element);var method=element.tagName.toLowerCase();return Form.Element.Serializers[method](element);},setValue:function(element,value){element=$jot(element);var method=element.tagName.toLowerCase();Form.Element.Serializers[method](element,value);return element;},clear:function(element){$jot(element).value='';return element;},present:function(element){return $jot(element).value!='';},activate:function(element){element=$jot(element);try{element.focus();if(element.select&&(element.tagName.toLowerCase()!='input'||!(/^(?:button|reset|submit)$jot/i.test(element.type))))
element.select();}catch(e){}
return element;},disable:function(element){element=$jot(element);element.disabled=true;return element;},enable:function(element){element=$jot(element);element.disabled=false;return element;}};var Field=Form.Element;var $jotF=Form.Element.Methods.getValue;Form.Element.Serializers=(function(){function input(element,value){switch(element.type.toLowerCase()){case'checkbox':case'radio':return inputSelector(element,value);default:return valueSelector(element,value);}}
function inputSelector(element,value){if(Object.isUndefined(value))
return element.checked?element.value:null;else element.checked=!!value;}
function valueSelector(element,value){if(Object.isUndefined(value))return element.value;else element.value=value;}
function select(element,value){if(Object.isUndefined(value))
return(element.type==='select-one'?selectOne:selectMany)(element);var opt,currentValue,single=!Object.isArray(value);for(var i=0,length=element.length;i<length;i++){opt=element.options[i];currentValue=this.optionValue(opt);if(single){if(currentValue==value){opt.selected=true;return;}}
else opt.selected=value.include(currentValue);}}
function selectOne(element){var index=element.selectedIndex;return index>=0?optionValue(element.options[index]):null;}
function selectMany(element){var values,length=element.length;if(!length)return null;for(var i=0,values=[];i<length;i++){var opt=element.options[i];if(opt.selected)values.push(optionValue(opt));}
return values;}
function optionValue(opt){return Element.hasAttribute(opt,'value')?opt.value:opt.text;}
return{input:input,inputSelector:inputSelector,textarea:valueSelector,select:select,selectOne:selectOne,selectMany:selectMany,optionValue:optionValue,button:valueSelector};})();Abstract.TimedObserver=Class.create(PeriodicalExecuter,{initialize:function($jotsuper,element,frequency,callback){$jotsuper(callback,frequency);this.element=$jot(element);this.lastValue=this.getValue();},execute:function(){var value=this.getValue();if(Object.isString(this.lastValue)&&Object.isString(value)?this.lastValue!=value:String(this.lastValue)!=String(value)){this.callback(this.element,value);this.lastValue=value;}}});Form.Element.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.Element.getValue(this.element);}});Form.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.serialize(this.element);}});Abstract.EventObserver=Class.create({initialize:function(element,callback){this.element=$jot(element);this.callback=callback;this.lastValue=this.getValue();if(this.element.tagName.toLowerCase()=='form')
this.registerFormCallbacks();else
this.registerCallback(this.element);},onElementEvent:function(){var value=this.getValue();if(this.lastValue!=value){this.callback(this.element,value);this.lastValue=value;}},registerFormCallbacks:function(){Form.getElements(this.element).each(this.registerCallback,this);},registerCallback:function(element){if(element.type){switch(element.type.toLowerCase()){case'checkbox':case'radio':Event.observe(element,'click',this.onElementEvent.bind(this));break;default:Event.observe(element,'change',this.onElementEvent.bind(this));break;}}}});Form.Element.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.Element.getValue(this.element);}});Form.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.serialize(this.element);}});(function(){var Event={KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{}};var docEl=document.documentElement;var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED='onmouseenter'in docEl&&'onmouseleave'in docEl;var isIELegacyEvent=function(event){return false;};if(window.attachEvent){if(window.addEventListener){isIELegacyEvent=function(event){return!(event instanceof window.Event);};}else{isIELegacyEvent=function(event){return true;};}}
var _isButton;function _isButtonForDOMEvents(event,code){return event.which?(event.which===code+1):(event.button===code);}
var legacyButtonMap={0:1,1:4,2:2};function _isButtonForLegacyEvents(event,code){return event.button===legacyButtonMap[code];}
function _isButtonForWebKit(event,code){switch(code){case 0:return event.which==1&&!event.metaKey;case 1:return event.which==2||(event.which==1&&event.metaKey);case 2:return event.which==3;default:return false;}}
if(window.attachEvent){if(!window.addEventListener){_isButton=_isButtonForLegacyEvents;}else{_isButton=function(event,code){return isIELegacyEvent(event)?_isButtonForLegacyEvents(event,code):_isButtonForDOMEvents(event,code);}}}else if(Prototype.Browser.WebKit){_isButton=_isButtonForWebKit;}else{_isButton=_isButtonForDOMEvents;}
function isLeftClick(event){return _isButton(event,0)}
function isMiddleClick(event){return _isButton(event,1)}
function isRightClick(event){return _isButton(event,2)}
function element(event){event=Event.extend(event);var node=event.target,type=event.type,currentTarget=event.currentTarget;if(currentTarget&&currentTarget.tagName){if(type==='load'||type==='error'||(type==='click'&&currentTarget.tagName.toLowerCase()==='input'&&currentTarget.type==='radio'))
node=currentTarget;}
if(node.nodeType==Node.TEXT_NODE)
node=node.parentNode;return Element.extend(node);}
function findElement(event,expression){var element=Event.element(event);if(!expression)return element;while(element){if(Object.isElement(element)&&Prototype.Selector.match(element,expression)){return Element.extend(element);}
element=element.parentNode;}}
function pointer(event){return{x:pointerX(event),y:pointerY(event)};}
function pointerX(event){var docElement=document.documentElement,body=document.body||{scrollLeft:0};if(('createTouch'in document)&&event.touches){if(event.touches[0]){return event.touches[0].pageX;}
else{return event.pageX;}}
return event.pageX||(event.clientX+
(docElement.scrollLeft||body.scrollLeft)-
(docElement.clientLeft||0));}
function pointerY(event){var docElement=document.documentElement,body=document.body||{scrollTop:0};if(('createTouch'in document)&&event.touches){if(event.touches[0]){return event.touches[0].pageY;}
else{return event.pageY;}}
return event.pageY||(event.clientY+
(docElement.scrollTop||body.scrollTop)-
(docElement.clientTop||0));}
function stop(event){Event.extend(event);event.preventDefault();event.stopPropagation();event.stopped=true;}
Event.Methods={isLeftClick:isLeftClick,isMiddleClick:isMiddleClick,isRightClick:isRightClick,element:element,findElement:findElement,pointer:pointer,pointerX:pointerX,pointerY:pointerY,stop:stop};var methods=Object.keys(Event.Methods).inject({},function(m,name){m[name]=Event.Methods[name].methodize();return m;});if(window.attachEvent){function _relatedTarget(event){var element;switch(event.type){case'mouseover':case'mouseenter':element=event.fromElement;break;case'mouseout':case'mouseleave':element=event.toElement;break;default:return null;}
return Element.extend(element);}
var additionalMethods={stopPropagation:function(){this.cancelBubble=true},preventDefault:function(){this.returnValue=false},inspect:function(){return'[object Event]'}};Event.extend=function(event,element){if(!event)return false;if(!isIELegacyEvent(event))return event;if(event._extendedByPrototype)return event;event._extendedByPrototype=Prototype.emptyFunction;var pointer=Event.pointer(event);Object.extend(event,{target:event.srcElement||element,relatedTarget:_relatedTarget(event),pageX:pointer.x,pageY:pointer.y});Object.extend(event,methods);Object.extend(event,additionalMethods);return event;};}else{Event.extend=Prototype.K;}
if(window.addEventListener){Event.prototype=window.Event.prototype||document.createEvent('HTMLEvents').__proto__;Object.extend(Event.prototype,methods);}
function _createResponder(element,eventName,handler){var registry=Element.retrieve(element,'prototype_event_registry');if(Object.isUndefined(registry)){CACHE.push(element);registry=Element.retrieve(element,'prototype_event_registry',$jotH());}
var respondersForEvent;try{respondersForEvent=registry.get(eventName);}catch(e){return false;}
if(Object.isUndefined(respondersForEvent)){respondersForEvent=[];registry.set(eventName,respondersForEvent);}
if(respondersForEvent.pluck('handler').include(handler))return false;var responder;if(eventName.include(":")){responder=function(event){if(Object.isUndefined(event.eventName))
return false;if(event.eventName!==eventName)
return false;Event.extend(event,element);if(handler)handler.call(element,event);};}else{if(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED&&(eventName==="mouseenter"||eventName==="mouseleave")){if(eventName==="mouseenter"||eventName==="mouseleave"){responder=function(event){Event.extend(event,element);var parent=event.relatedTarget;while(parent&&parent!==element){try{parent=parent.parentNode;}
catch(e){parent=element;}}
if(parent===element)return;handler.call(element,event);};}}else{responder=function(event){Event.extend(event,element);handler.call(element,event);};}}
responder.handler=handler;respondersForEvent.push(responder);return responder;}
function _destroyCache(){for(var i=0,length=CACHE.length;i<length;i++){Event.stopObserving(CACHE[i]);CACHE[i]=null;}}
var CACHE=[];if(Prototype.Browser.IE)
window.attachEvent('onunload',_destroyCache);if(Prototype.Browser.WebKit)
window.addEventListener('unload',Prototype.emptyFunction,false);var _getDOMEventName=Prototype.K,translations={mouseenter:"mouseover",mouseleave:"mouseout"};if(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED){_getDOMEventName=function(eventName){return(translations[eventName]||eventName);};}
function observe(element,eventName,handler){element=$jot(element);var responder=_createResponder(element,eventName,handler);if(!responder)return element;if(eventName.include(':')){if(element.addEventListener)
element.addEventListener("dataavailable",responder,false);else{element.attachEvent("ondataavailable",responder);element.attachEvent("onlosecapture",responder);}}else{var actualEventName=_getDOMEventName(eventName);if(element.addEventListener)
element.addEventListener(actualEventName,responder,false);else
element.attachEvent("on"+actualEventName,responder);}
return element;}
function stopObserving(element,eventName,handler){element=$jot(element);var registry=Element.retrieve(element,'prototype_event_registry');if(!registry)return element;if(!eventName){try{registry.each(function(pair){var eventName=pair.key;stopObserving(element,eventName);});return element;}catch(err){return element;}}
var responders=registry.get(eventName);if(!responders)return element;if(!handler){responders.each(function(r){stopObserving(element,eventName,r.handler);});return element;}
var i=responders.length,responder;while(i--){if(responders[i].handler===handler){responder=responders[i];break;}}
if(!responder)return element;if(eventName.include(':')){if(element.removeEventListener)
element.removeEventListener("dataavailable",responder,false);else{element.detachEvent("ondataavailable",responder);element.detachEvent("onlosecapture",responder);}}else{var actualEventName=_getDOMEventName(eventName);if(element.removeEventListener)
element.removeEventListener(actualEventName,responder,false);else
element.detachEvent('on'+actualEventName,responder);}
registry.set(eventName,responders.without(responder));return element;}
function fire(element,eventName,memo,bubble){element=$jot(element);if(Object.isUndefined(bubble))
bubble=true;if(element==document&&document.createEvent&&!element.dispatchEvent)
element=document.documentElement;var event;if(document.createEvent){event=document.createEvent('HTMLEvents');event.initEvent('dataavailable',bubble,true);}else{event=document.createEventObject();event.eventType=bubble?'ondataavailable':'onlosecapture';}
event.eventName=eventName;event.memo=memo||{};if(document.createEvent)
element.dispatchEvent(event);else
element.fireEvent(event.eventType,event);return Event.extend(event);}
Event.Handler=Class.create({initialize:function(element,eventName,selector,callback){this.element=$jot(element);this.eventName=eventName;this.selector=selector;this.callback=callback;this.handler=this.handleEvent.bind(this);},start:function(){Event.observe(this.element,this.eventName,this.handler);return this;},stop:function(){Event.stopObserving(this.element,this.eventName,this.handler);return this;},handleEvent:function(event){var element=Event.findElement(event,this.selector);if(element)this.callback.call(this.element,event,element);}});function on(element,eventName,selector,callback){element=$jot(element);if(Object.isFunction(selector)&&Object.isUndefined(callback)){callback=selector,selector=null;}
return new Event.Handler(element,eventName,selector,callback).start();}
Object.extend(Event,Event.Methods);Object.extend(Event,{fire:fire,observe:observe,stopObserving:stopObserving,on:on});Element.addMethods({fire:fire,observe:observe,stopObserving:stopObserving,on:on});Object.extend(document,{fire:fire.methodize(),observe:observe.methodize(),stopObserving:stopObserving.methodize(),on:on.methodize(),loaded:false});if(window.Event)Object.extend(window.Event,Event);else window.Event=Event;})();(function(){var timer;function fireContentLoadedEvent(){if(document.loaded)return;if(timer)window.clearTimeout(timer);document.loaded=true;document.fire('dom:loaded');}
function checkReadyState(){if(document.readyState==='complete'){document.stopObserving('readystatechange',checkReadyState);fireContentLoadedEvent();}}
function pollDoScroll(){try{document.documentElement.doScroll('left');}
catch(e){timer=pollDoScroll.p_defer();return;}
fireContentLoadedEvent();}
if(document.addEventListener){document.addEventListener('DOMContentLoaded',fireContentLoadedEvent,false);}else{document.observe('readystatechange',checkReadyState);if(window==top)
timer=pollDoScroll.p_defer();}
Event.observe(window,'load',fireContentLoadedEvent);})();Element.addMethods();Hash.toQueryString=Object.toQueryString;var Toggle={display:Element.toggle};Element.Methods.childOf=Element.Methods.descendantOf;var Insertion={Before:function(element,content){return Element.insert(element,{before:content});},Top:function(element,content){return Element.insert(element,{top:content});},Bottom:function(element,content){return Element.insert(element,{bottom:content});},After:function(element,content){return Element.insert(element,{after:content});}};var $jotcontinue=new Error('"throw $jotcontinue" is deprecated, use "return" instead');var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;},within:function(element,x,y){if(this.includeScrollOffsets)
return this.withinIncludingScrolloffsets(element,x,y);this.xcomp=x;this.ycomp=y;this.offset=Element.cumulativeOffset(element);return(y>=this.offset[1]&&y<this.offset[1]+element.offsetHeight&&x>=this.offset[0]&&x<this.offset[0]+element.offsetWidth);},withinIncludingScrolloffsets:function(element,x,y){var offsetcache=Element.cumulativeScrollOffset(element);this.xcomp=x+offsetcache[0]-this.deltaX;this.ycomp=y+offsetcache[1]-this.deltaY;this.offset=Element.cumulativeOffset(element);return(this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+element.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+element.offsetWidth);},overlap:function(mode,element){if(!mode)return 0;if(mode=='vertical')
return((this.offset[1]+element.offsetHeight)-this.ycomp)/element.offsetHeight;if(mode=='horizontal')
return((this.offset[0]+element.offsetWidth)-this.xcomp)/element.offsetWidth;},cumulativeOffset:Element.Methods.cumulativeOffset,positionedOffset:Element.Methods.positionedOffset,absolutize:function(element){Position.prepare();return Element.absolutize(element);},relativize:function(element){Position.prepare();return Element.relativize(element);},realOffset:Element.Methods.cumulativeScrollOffset,offsetParent:Element.Methods.getOffsetParent,page:Element.Methods.viewportOffset,clone:function(source,target,options){options=options||{};return Element.clonePosition(target,source,options);}};if(!document.getElementsByClassName)document.getElementsByClassName=function(instanceMethods){function iter(name){return name.blank()?null:"[contains(concat(' ', @class, ' '), ' "+name+" ')]";}
instanceMethods.getElementsByClassName=Prototype.BrowserFeatures.XPath?function(element,className){className=className.toString().strip();var cond=/\s/.test(className)?$jotw(className).map(iter).join(''):iter(className);return cond?document._getElementsByXPath('.//*'+cond,element):[];}:function(element,className){className=className.toString().strip();var elements=[],classNames=(/\s/.test(className)?$jotw(className):null);if(!classNames&&!className)return elements;var nodes=$jot(element).getElementsByTagName('*');className=' '+className+' ';for(var i=0,child,cn;child=nodes[i];i++){if(child.className&&(cn=' '+child.className+' ')&&(cn.include(className)||(classNames&&classNames.all(function(name){return!name.toString().blank()&&cn.include(' '+name+' ');}))))
elements.push(Element.extend(child));}
return elements;};return function(className,parentElement){return $jot(parentElement||document.body).getElementsByClassName(className);};}(Element.Methods);Element.ClassNames=Class.create();Element.ClassNames.prototype={initialize:function(element){this.element=$jot(element);},_each:function(iterator){this.element.className.split(/\s+/).select(function(name){return name.length>0;})._each(iterator);},set:function(className){this.element.className=className;},add:function(classNameToAdd){if(this.include(classNameToAdd))return;this.set($jotA(this).concat(classNameToAdd).join(' '));},remove:function(classNameToRemove){if(!this.include(classNameToRemove))return;this.set($jotA(this).without(classNameToRemove).join(' '));},toString:function(){return $jotA(this).join(' ');}};Object.extend(Element.ClassNames.prototype,Enumerable);(function(){window.Selector=Class.create({initialize:function(expression){this.expression=expression.strip();},findElements:function(rootElement){return Prototype.Selector.select(this.expression,rootElement);},match:function(element){return Prototype.Selector.match(element,this.expression);},toString:function(){return this.expression;},inspect:function(){return"#<Selector: "+this.expression+">";}});Object.extend(Selector,{matchElements:function(elements,expression){var match=Prototype.Selector.match,results=[];for(var i=0,length=elements.length;i<length;i++){var element=elements[i];if(match(element,expression)){results.push(Element.extend(element));}}
return results;},findElement:function(elements,expression,index){index=index||0;var matchIndex=0,element;for(var i=0,length=elements.length;i<length;i++){element=elements[i];if(Prototype.Selector.match(element,expression)&&index===matchIndex++){return Element.extend(element);}}},findChildElements:function(element,expressions){var selector=expressions.toArray().join(', ');return Prototype.Selector.select(selector,element||document);}});})();
if(window.console===undefined){if(!window.console||!console.firebug){(function(m,i){window.console={};var e=function(){};while(i--){window.console[m[i]]=e;}})('log debug info warn error assert dir dirxml trace group groupEnd time timeEnd profile profileEnd count'.split(' '),16);}
window.console.error=function(e){throw(e);};}
window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();if(window.Prototype===undefined){throw("Error:prototype.js is required by protoplus.js. Go to prototypejs.org and download lates version.");}
Protoplus={Version:"0.9.9",exec:function(code){return eval(code);},REFIDCOUNT:100,references:{},getIEVersion:function(){var rv=-1;if(navigator.appName=='Microsoft Internet Explorer')
{var ua=navigator.userAgent;var re=new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");if(re.exec(ua)!==null){rv=parseFloat(RegExp.$jot1);}}
return rv;},Transitions:{linear:function(x){return x;},sineIn:function(x){return 1-Math.cos(x*Math.PI/2);},sineOut:function(x){return Math.sin(x*Math.PI/2);},sineInOut:function(x){return 0.5-Math.cos(x*Math.PI)/2;},backIn:function(b){var a=1.70158;return(b)*b*((a+1)*b-a);},backOut:function(b){var a=1.70158;return(b=b-1)*b*((a+1)*b+a)+1;},backInOut:function(b){var a=1.70158;if((b/=0.5)<1){return 0.5*(b*b*(((a*=(1.525))+1)*b-a));}return 0.5*((b-=2)*b*(((a*=(1.525))+1)*b+a)+2);},cubicIn:function(x){return Math.pow(x,3);},cubicOut:function(x){return 1+Math.pow(x-1,3);},cubicInOut:function(x){return x<0.5?4*Math.pow(x,3):1+4*Math.pow(x-1,3);},quadIn:function(x){return Math.pow(x,2);},quadOut:function(x){return 1-Math.pow(x-1,2);},quadInOut:function(x){return x<0.5?2*Math.pow(x,2):1-2*Math.pow(x-1,2);},quartIn:function(x){return Math.pow(x,4);},quartOut:function(x){return 1-Math.pow(x-1,4);},quartInOut:function(x){return x<0.5?8*Math.pow(x,4):1-8*Math.pow(x-1,4);},quintIn:function(x){return Math.pow(x,5);},quintOut:function(x){return 1+Math.pow(x-1,5);},quintInOut:function(x){return x<0.5?16*Math.pow(x,5):1+16*Math.pow(x-1,5);},circIn:function(x){return 1-Math.sqrt(1-Math.pow(x,2));},circOut:function(x){return Math.sqrt(1-Math.pow(x-1,2));},circInOut:function(x){return x<0.5?0.5-Math.sqrt(1-Math.pow(2*x,2))*0.5:0.5+Math.sqrt(1-Math.pow(2*x-2,2))*0.5;},expoIn:function(x){return Math.pow(2,10*(x-1));},expoOut:function(x){return 1-Math.pow(2,-10*x);},expoInOut:function(x){x=2*x-1;return x<0?Math.pow(2,10*x)/2:1-Math.pow(2,-10*x)/2;},swingFrom:function(b){var a=1.70158;return b*b*((a+1)*b-a);},swingTo:function(b){var a=1.70158;return(b-=1)*b*((a+1)*b+a)+1;},swingFromTo:function(b){var a=1.70158;return((b/=0.5)<1)?0.5*(b*b*(((a*=(1.525))+1)*b-a)):0.5*((b-=2)*b*(((a*=(1.525))+1)*b+a)+2);},easeFrom:function(a){return Math.pow(a,4);},easeTo:function(a){return Math.pow(a,0.25);},easeFromTo:function(a){if((a/=0.5)<1){return 0.5*Math.pow(a,4);}return-0.5*((a-=2)*Math.pow(a,3)-2);},pulse:function(x,n){if(!n){n=1;}return 0.5-Math.cos(x*n*2*Math.PI)/2;},wobble:function(x,n){if(!n){n=3;}return 0.5-Math.cos((2*n-1)*x*x*Math.PI)/2;},elastic:function(x,e){var a;if(!e){a=30;}else{e=Math.round(Math.max(1,Math.min(10,e)));a=(11-e)*5;}return 1-Math.cos(x*8*Math.PI)/(a*x+1)*(1-x);},bounce:function(x,n){n=n?Math.round(n):4;var c=3-Math.pow(2,2-n);var m=-1,d=0,i=0;while(m/c<x){d=Math.pow(2,1-i++);m+=d;}if(m-d>0){x-=((m-d)+d/2)/c;}return c*c*Math.pow(x,2)+(1-Math.pow(0.25,i-1));},bouncePast:function(a){if(a<(1/2.75)){return(7.5625*a*a);}else{if(a<(2/2.75)){return 2-(7.5625*(a-=(1.5/2.75))*a+0.75);}else{if(a<(2.5/2.75)){return 2-(7.5625*(a-=(2.25/2.75))*a+0.9375);}else{return 2-(7.5625*(a-=(2.625/2.75))*a+0.984375);}}}}},Colors:{colorNames:{"Black":"#000000","MidnightBlue":"#191970","Navy":"#000080","DarkBlue":"#00008B","MediumBlue":"#0000CD","Blue":"#0000FF","DodgerBlue":"#1E90FF","RoyalBlue":"#4169E1","SlateBlue":"#6A5ACD","SteelBlue":"#4682B4","CornflowerBlue":"#6495ED","Teal":"#008080","DarkCyan":"#008B8B","MediumSlateBlue":"#7B68EE","CadetBlue":"#5F9EA0","DeepSkyBlue":"#00BFFF","DarkTurquoise":"#00CED1","MediumAquaMarine":"#66CDAA","MediumTurquoise":"#48D1CC","Turquoise":"#40E0D0","LightSkyBlue":"#87CEFA","SkyBlue":"#87CEEB","Aqua":"#00FFFF","Cyan":"#00FFFF","Aquamarine":"#7FFFD4","PaleTurquoise":"#AFEEEE","PowderBlue":"#B0E0E6","LightBlue":"#ADD8E6","LightSteelBlue":"#B0C4DE","Salmon":"#FA8072","LightSalmon":"#FFA07A","Coral":"#FF7F50","Brown":"#A52A2A","Sienna":"#A0522D","Tomato":"#FF6347","Maroon":"#800000","DarkRed":"#8B0000","Red":"#FF0000","OrangeRed":"#FF4500","Darkorange":"#FF8C00","DarkGoldenRod":"#B8860B","GoldenRod":"#DAA520","Orange":"#FFA500","Gold":"#FFD700","Yellow":"#FFFF00","LemonChiffon":"#FFFACD","LightGoldenRodYellow":"#FAFAD2","LightYellow":"#FFFFE0","DarkOliveGreen":"#556B2F","DarkSeaGreen":"#8FBC8F","DarkGreen":"#006400","MediumSeaGreen":"#3CB371","DarkKhaki":"#BDB76B","Green":"#008000","Olive":"#808000","OliveDrab":"#6B8E23","ForestGreen":"#228B22","LawnGreen":"#7CFC00","Lime":"#00FF00","YellowGreen":"#9ACD32","LimeGreen":"#32CD32","Chartreuse":"#7FFF00","GreenYellow":"#ADFF2F","LightSeaGreen":"#20B2AA","SeaGreen":"#2E8B57","SandyBrown":"#F4A460","DarkSlateGray":"#2F4F4F","DimGray":"#696969","Gray":"#808080","SlateGray":"#708090","LightSlateGray":"#778899","DarkGray":"#A9A9A9","Silver":"#C0C0C0","Indigo":"#4B0082","Purple":"#800080","DarkMagenta":"#8B008B","BlueViolet":"#8A2BE2","DarkOrchid":"#9932CC","DarkViolet":"#9400D3","DarkSlateBlue":"#483D8B","MediumPurple":"#9370D8","MediumOrchid":"#BA55D3","Fuchsia":"#FF00FF","Magenta":"#FF00FF","Orchid":"#DA70D6","Violet":"#EE82EE","DeepPink":"#FF1493","Pink":"#FFC0CB","MistyRose":"#FFE4E1","LightPink":"#FFB6C1","Plum":"#DDA0DD","HotPink":"#FF69B4","SpringGreen":"#00FF7F","MediumSpringGreen":"#00FA9A","LightGreen":"#90EE90","PaleGreen":"#98FB98","RosyBrown":"#BC8F8F","MediumVioletRed":"#C71585","IndianRed":"#CD5C5C","SaddleBrown":"#8B4513","Peru":"#CD853F","Chocolate":"#D2691E","Tan":"#D2B48C","LightGrey":"#D3D3D3","PaleVioletRed":"#D87093","Thistle":"#D8BFD8","Crimson":"#DC143C","FireBrick":"#B22222","Gainsboro":"#DCDCDC","BurlyWood":"#DEB887","LightCoral":"#F08080","DarkSalmon":"#E9967A","Lavender":"#E6E6FA","LavenderBlush":"#FFF0F5","SeaShell":"#FFF5EE","Linen":"#FAF0E6","Khaki":"#F0E68C","PaleGoldenRod":"#EEE8AA","Wheat":"#F5DEB3","NavajoWhite":"#FFDEAD","Moccasin":"#FFE4B5","PeachPuff":"#FFDAB9","Bisque":"#FFE4C4","BlanchedAlmond":"#FFEBCD","AntiqueWhite":"#FAEBD7","PapayaWhip":"#FFEFD5","Beige":"#F5F5DC","OldLace":"#FDF5E6","Cornsilk":"#FFF8DC","Ivory":"#FFFFF0","FloralWhite":"#FFFAF0","HoneyDew":"#F0FFF0","WhiteSmoke":"#F5F5F5","AliceBlue":"#F0F8FF","LightCyan":"#E0FFFF","GhostWhite":"#F8F8FF","MintCream":"#F5FFFA","Azure":"#F0FFFF","Snow":"#FFFAFA","White":"#FFFFFF"},getPalette:function(){var generated={};var cr=['00','44','77','99','BB','EE','FF'];var i=0;for(var r=0;r<cr.length;r++){for(var g=0;g<cr.length;g++){for(var b=0;b<cr.length;b++){generated[(i++)+"_"]='#'+cr[r]+cr[g]+cr[b];}}}
return generated;},getRGBarray:function(color){if(typeof color=="string"){if(color.indexOf("rgb")>-1){color=color.replace(/rgb\(|\).*?$jot/g,"").split(/,\s*/,3);}else{color=color.replace("#","");if(color.length==3){color=color.replace(/(.)/g,function(n){return parseInt(n+n,16)+", ";}).replace(/,\s*$jot/,"").split(/,\s+/);}else{color=color.replace(/(..)/g,function(n){return parseInt(n,16)+", ";}).replace(/,\s*$jot/,"").split(/,\s+/);}}}
for(var x=0;x<color.length;x++){color[x]=Number(color[x]);}
return color;},rgbToHex:function(){var ret=[];var ret2=[];for(var i=0;i<arguments.length;i++){ret.push((arguments[i]<16?"0":"")+Math.round(arguments[i]).toString(16));}
return"#"+ret.join('').toUpperCase();},hexToRgb:function(str){str=str.replace("#","");var ret=[];if(str.length==3){str.replace(/(.)/g,function(str){ret.push(parseInt(str+str,16));});}else{str.replace(/(..)/g,function(str){ret.push(parseInt(str,16));});}
return ret;},invert:function(hex){var rgb=Protoplus.Colors.hexToRgb(hex);return Protoplus.Colors.rgbToHex(255-rgb[0],255-rgb[1],255-rgb[2]);}},Profiler:{stimes:{},start:function(title){Protoplus.Profiler.stimes[title]=(new Date()).getTime();},end:function(title,ret){var res=(((new Date()).getTime()-Protoplus.Profiler.stimes[title])/1000).toFixed(3);if(ret){return res;}
msg=title+' took '+res;if('console'in window){console.log(msg);}}}};Object.extend(Hash.prototype,{debug:function(opts){opts=opts?opts:{};node=this._object;text=opts.text?opts.text+"\n":"";for(var e in node){if(typeof node[e]=="function"&&!opts.showFunctions){continue;}
if(opts.skipBlanks&&(node[e]===""||node[e]===undefined)){continue;}
var stophere=confirm(text+e+" => "+node[e]);if(stophere){return node[e];}}}});Object.extend(Object,{deepClone:function(obj){if(typeof obj!=='object'||obj===null){return obj;}
var clone=Object.isArray(obj)?[]:{};for(var i in obj){var node=obj[i];if(typeof node=='object'){if(Object.isArray(node)){clone[i]=[];for(var j=0;j<node.length;j++){if(typeof node[j]!='object'){clone[i].push(node[j]);}else{clone[i].push(this.deepClone(node[j]));}}}else{clone[i]=this.deepClone(node);}}else{clone[i]=node;}}
return clone;},isBoolean:function(bool){return(bool===true||bool===false);},isRegExp:function(obj){return!!(obj&&obj.test&&obj.exec&&(obj.ignoreCase||obj.ignoreCase===false));}});Object.extend(String.prototype,{cleanJSON:function(){return this.replace(/(\"?)(\:|\,)\s+(\"?)/g,'$jot1$jot2$jot3');},shorten:function(length,closure){length=length?length:"30";closure=closure?closure:"...";var sh=this.substr(0,length);sh+=(this.length>length)?closure:"";return sh;},squeeze:function(length){length=length?length:"30";var join="...";if((length-join.length)>=this.length){return this;}
var l=Math.floor((length-join.length)/2);var start=this.substr(0,l+1);var end=this.substr(-(l),l);return start+join+end;},printf:function(){var args=arguments;var word=this.toString(),i=0;return word.replace(/(\%(\w))/gim,function(word,match,tag,count){var s=args[i]!==undefined?args[i]:'';i++;switch(tag){case"f":return parseFloat(s).toFixed(2);case"d":return parseInt(s,10);case"x":return s.toString(16);case"X":return s.toString(16).toUpperCase();case"s":return s;default:return match;}});},sanitize:function(){var str=this;return(str+'').replace(/[\\"']/g,'\\$jot&').replace(/\u0000/g,'\\0');},nl2br:function(is_xhtml){var str=this;var breakTag=(is_xhtml||typeof is_xhtml==='undefined')?'<br />':'<br>';return(str+'').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,'$jot1'+breakTag+'');},stripslashes:function(){var str=this;return(str+'').replace(/\\(.?)/g,function(s,n1){switch(n1){case'\\':return'\\';case'0':return'\u0000';case'':return'';default:return n1;}});},turkishToUpper:function(){var string=this;var letters={"i":"Ä°","ÅŸ":"Åž","ÄŸ":"Äž","Ã¼":"Ãœ","Ã¶":"Ã–","Ã§":"Ã‡","Ä±":"I"};string=string.replace(/([iÄ±ÅŸÄŸÃ¼Ã§Ã¶])+/g,function(letter){return letters[letter];});return string.toUpperCase();},turkishToLower:function(){var string=this;var letters={"Ä°":"i","I":"Ä±","Åž":"ÅŸ","Äž":"ÄŸ","Ãœ":"Ã¼","Ã–":"Ã¶","Ã‡":"Ã§"};string=string.replace(/([Ä°IÅžÄžÃœÃ‡Ã–])+/g,function(letter){return letters[letter];});return string.toLowerCase();},toCamelCase:function(){var str=this;newStr=str.replace(/\s+/g,'_');strArr=newStr.split('_');if(strArr.length===0){return newStr;}
newStr="";for(var i=0;i<strArr.length;i++){newStr+=strArr[i][0].toUpperCase();newStr+=strArr[i].substr(1);}
return newStr;},fixUTF:function(){var lowerCase={"a":"00E1:0103:01CE:00E2:00E4:0227:1EA1:0201:00E0:1EA3:0203:0101:0105:1D8F:1E9A:00E5:1E01:2C65:00E3:0251:1D90","b":"1E03:1E05:0253:1E07:1D6C:1D80:0180:0183","c":"0107:010D:00E7:0109:0255:010B:0188:023C","d":"010F:1E11:1E13:0221:1E0B:1E0D:0257:1E0F:1D6D:1D81:0111:0256:018C","e":"00E9:0115:011B:0229:00EA:1E19:00EB:0117:1EB9:0205:00E8:1EBB:0207:0113:2C78:0119:1D92:0247:1EBD:1E1B","f":"1E1F:0192:1D6E:1D82","g":"01F5:011F:01E7:0123:011D:0121:0260:1E21:1D83:01E5","h":"1E2B:021F:1E29:0125:2C68:1E27:1E23:1E25:0266:1E96:0127","i":"0131:00ED:012D:01D0:00EE:00EF:1ECB:0209:00EC:1EC9:020B:012B:012F:1D96:0268:0129:1E2D","j":"01F0:0135:029D:0249","k":"1E31:01E9:0137:2C6A:A743:1E33:0199:1E35:1D84:A741","l":"013A:019A:026C:013E:013C:1E3D:0234:1E37:2C61:A749:1E3B:0140:026B:1D85:026D:0142:0269:1D7C","m":"1E3F:1E41:1E43:0271:1D6F:1D86","n":"0144:0148:0146:1E4B:0235:1E45:1E47:01F9:0272:1E49:019E:1D70:1D87:0273:00F1","o":"00F3:014F:01D2:00F4:00F6:022F:1ECD:0151:020D:00F2:1ECF:01A1:020F:A74B:A74D:2C7A:014D:01EB:00F8:00F5","p":"1E55:1E57:A753:01A5:1D71:1D88:A755:1D7D:A751","q":"A759:02A0:024B:A757","r":"0155:0159:0157:1E59:1E5B:0211:027E:0213:1E5F:027C:1D72:1D89:024D:027D","s":"015B:0161:015F:015D:0219:1E61:1E63:0282:1D74:1D8A:023F","t":"0165:0163:1E71:021B:0236:1E97:2C66:1E6B:1E6D:01AD:1E6F:1D75:01AB:0288:0167","u":"00FA:016D:01D4:00FB:1E77:00FC:1E73:1EE5:0171:0215:00F9:1EE7:01B0:0217:016B:0173:1D99:016F:0169:1E75:1D1C:1D7E","v":"2C74:A75F:1E7F:028B:1D8C:2C71:1E7D","w":"1E83:0175:1E85:1E87:1E89:1E81:2C73:1E98","x":"1E8D:1E8B:1D8D","y":"00FD:0177:00FF:1E8F:1EF5:1EF3:01B4:1EF7:1EFF:0233:1E99:024F:1EF9","z":"017A:017E:1E91:0291:2C6C:017C:1E93:0225:1E95:1D76:1D8E:0290:01B6:0240","ae":"00E6:01FD:01E3","dz":"01F3:01C6","3":"0292:01EF:0293:1D9A:01BA:01B7:01EE"};var upperCase={"A":"00C1:0102:01CD:00C2:00C4:0226:1EA0:0200:00C0:1EA2:0202:0100:0104:00C5:1E00:023A:00C3","B":"1E02:1E04:0181:1E06:0243:0182","C":"0106:010C:00C7:0108:010A:0187:023B","D":"010E:1E10:1E12:1E0A:1E0C:018A:1E0E:0110:018B","E":"00C9:0114:011A:0228:00CA:1E18:00CB:0116:1EB8:0204:00C8:1EBA:0206:0112:0118:0246:1EBC:1E1A","F":"1E1E:0191","G":"01F4:011E:01E6:0122:011C:0120:0193:1E20:01E4:0262:029B","H":"1E2A:021E:1E28:0124:2C67:1E26:1E22:1E24:0126","I":"00CD:012C:01CF:00CE:00CF:0130:1ECA:0208:00CC:1EC8:020A:012A:012E:0197:0128:1E2C:026A:1D7B","J":"0134:0248","K":"1E30:01E8:0136:2C69:A742:1E32:0198:1E34:A740","L":"0139:023D:013D:013B:1E3C:1E36:2C60:A748:1E3A:013F:2C62:0141:029F:1D0C","M":"1E3E:1E40:1E42:2C6E","N":"0143:0147:0145:1E4A:1E44:1E46:01F8:019D:1E48:0220:00D1","O":"00D3:014E:01D1:00D4:00D6:022E:1ECC:0150:020C:00D2:1ECE:01A0:020E:A74A:A74C:014C:019F:01EA:00D8:00D5","P":"1E54:1E56:A752:01A4:A754:2C63:A750","Q":"A758:A756","R":"0154:0158:0156:1E58:1E5A:0210:0212:1E5E:024C:2C64","S":"015A:0160:015E:015C:0218:1E60:1E62","T":"0164:0162:1E70:021A:023E:1E6A:1E6C:01AC:1E6E:01AE:0166","U":"00DA:016C:01D3:00DB:1E76:00DC:1E72:1EE4:0170:0214:00D9:1EE6:01AF:0216:016A:0172:016E:0168:1E74","V":"A75E:1E7E:01B2:1E7C","W":"1E82:0174:1E84:1E86:1E88:1E80:2C72","X":"1E8C:1E8A","Y":"00DD:0176:0178:1E8E:1EF4:1EF2:01B3:1EF6:1EFE:0232:024E:1EF8","Z":"0179:017D:1E90:2C6B:017B:1E92:0224:1E94:01B5","AE":"00C6:01FC:01E2","DZ":"01F1:01C4"};var str=this.toString();for(var lk in lowerCase){var lvalue='\\u'+lowerCase[lk].split(':').join('|\\u');str=str.replace(new RegExp(lvalue,'gm'),lk);}
for(var uk in upperCase){var uvalue='\\u'+upperCase[uk].split(':').join('|\\u');str=str.replace(new RegExp(uvalue,'gm'),uk);}
return str;},ucFirst:function(){return this.charAt(0).toUpperCase()+this.substr(1,this.length+1);}});var __result=document.URL.toQueryParams();Object.extend(document,{createCSS:function(selector,declaration){var id="style-"+selector.replace(/\W/gim,'');if($jot(id)){$jot(id).remove();}
var ua=navigator.userAgent.toLowerCase();var isIE=(/msie/.test(ua))&&!(/opera/.test(ua))&&(/win/.test(ua));var style_node=document.createElement("style");style_node.id=id;style_node.setAttribute("type","text/css");style_node.setAttribute("media","screen");if(!isIE){style_node.appendChild(document.createTextNode(selector+" {"+declaration+"}"));}
document.getElementsByTagName("head")[0].appendChild(style_node);if(isIE&&document.styleSheets&&document.styleSheets.length>0){var last_style_node=document.styleSheets[document.styleSheets.length-1];if(typeof(last_style_node.addRule)=="object"){last_style_node.addRule(selector,declaration);}}},selectRadioOption:function(options,value){options.each(function(ele){if(ele.value===value)
{ele.checked=true;}});},preloadImages:function(images){var args=arguments;if(Object.isArray(images)){args=images;}
var i=0;for(i=0,images=[];(src=args[i]);i++){images.push(new Image());images.last().src=src;}},readRadioOption:function(options){for(var i=0;i<options.length;i++){var ele=options[i];if(ele.checked===true)
{return ele.value;}}
return false;},getEvent:function(ev){if(!ev){ev=window.event;}
if(!ev.keyCode&&ev.keyCode!==0){ev.keyCode=ev.which;}
return ev;},parameters:__result,get:__result,ready:function(func){document.observe("dom:loaded",func);},getUnderneathElement:function(e){var pointX=(Prototype.Browser.WebKit)?Event.pointerX(e):e.clientX;var pointY=(Prototype.Browser.WebKit)?Event.pointerY(e):e.clientY;return document.elementFromPoint(pointX,pointY);},createCookie:function(name,value,days,path){path=path?path:"/";var expires="";if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires=";expires="+date.toGMTString();}
document.cookie=name+"="+escape(value)+expires+";path="+path;},readCookie:function(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1,c.length);}
if(c.indexOf(nameEQ)===0){return decodeURIComponent(c.substring(nameEQ.length,c.length));}}
return null;},eraseCookie:function(name){document.createCookie(name,"",-1);},storeJsonCookie:function(name,value,days){var val=Object.toJSON(value).cleanJSON();document.createCookie(name,val,days);},readJsonCookie:function(name){if(document.readCookie(name)){return document.readCookie(name).toString().evalJSON();}else{return{};}},getClientDimensions:function(){var head=document.body.parentNode;return{height:head.scrollHeight,width:head.scrollWidth};},keyboardMap:function(map){document.keyMap=map;var shortcut={'all_shortcuts':{},'add':function(shortcut_combination,callback,opt){var default_options={'type':'keydown','propagate':false,'disable_in_input':false,'target':document,'keycode':false};if(!opt){opt=default_options;}else{for(var dfo in default_options){if(typeof opt[dfo]=='undefined'){opt[dfo]=default_options[dfo];}}}var ele=opt.target;if(typeof opt.target=='string'){ele=document.getElementById(opt.target);}var ths=this;shortcut_combination=shortcut_combination.toLowerCase();var func=function(e){e=e||window.event;if(opt.disable_in_input){var element;if(e.target){element=e.target;}else if(e.srcElement){element=e.srcElement;}if(element.nodeType==3){element=element.parentNode;}if(element.tagName=='INPUT'||element.tagName=='TEXTAREA'||element.readAttribute('contenteditable')||document._onedit){return;}}if(e.keyCode){code=e.keyCode;}else if(e.which){code=e.which;}var character=String.fromCharCode(code).toLowerCase();if(code==188){character=",";}if(code==190){character=".";}var keys=shortcut_combination.split("+");var kp=0;var shift_nums={"`":"~","1":"!","2":"@","3":"#","4":"$jot","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"};var special_keys={'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123};var modifiers={shift:{wanted:false,pressed:false},ctrl:{wanted:false,pressed:false},alt:{wanted:false,pressed:false},meta:{wanted:false,pressed:false}};if(e.ctrlKey){modifiers.ctrl.pressed=true;}if(e.shiftKey){modifiers.shift.pressed=true;}if(e.altKey){modifiers.alt.pressed=true;}if(e.metaKey){modifiers.meta.pressed=true;}for(var i=0;i<keys.length;i++){k=keys[i];if(k=='ctrl'||k=='control'){kp++;modifiers.ctrl.wanted=true;}else if(k=='shift'){kp++;modifiers.shift.wanted=true;}else if(k=='alt'){kp++;modifiers.alt.wanted=true;}else if(k=='meta'){kp++;modifiers.meta.wanted=true;}else if(k.length>1){if(special_keys[k]==code){kp++;}}else if(opt.keycode){if(opt.keycode==code){kp++;}}else{if(character==k){kp++;}else{if(shift_nums[character]&&e.shiftKey){character=shift_nums[character];if(character==k){kp++;}}}}}if(kp==keys.length&&modifiers.ctrl.pressed==modifiers.ctrl.wanted&&modifiers.shift.pressed==modifiers.shift.wanted&&modifiers.alt.pressed==modifiers.alt.wanted&&modifiers.meta.pressed==modifiers.meta.wanted){callback(e);if(!opt.propagate){e.cancelBubble=true;e.returnValue=false;if(e.stopPropagation){e.stopPropagation();e.preventDefault();}return false;}}};this.all_shortcuts[shortcut_combination]={'callback':func,'target':ele,'event':opt.type};if(ele.addEventListener){ele.addEventListener(opt.type,func,false);}else if(ele.attachEvent){ele.attachEvent('on'+opt.type,func);}else{ele['on'+opt.type]=func;}},'remove':function(shortcut_combination){shortcut_combination=shortcut_combination.toLowerCase();var binding=this.all_shortcuts[shortcut_combination];delete(this.all_shortcuts[shortcut_combination]);if(!binding){return;}var type=binding.event;var ele=binding.target;var callback=binding.callback;if(ele.detachEvent){ele.detachEvent('on'+type,callback);}else if(ele.removeEventListener){ele.removeEventListener(type,callback,false);}else{ele['on'+type]=false;}}};$jotH(map).each(function(pair){var key=pair.key;var opts=pair.value;shortcut.add(key,opts.handler,{disable_in_input:opts.disableOnInputs});});},checkDocType:function(){if(document.doctype===null){return false;}
var publicId=document.doctype.publicId.toLowerCase();return(publicId.indexOf("html 4")>0)||(publicId.indexOf("xhtml")>0);}});Object.extend(Event,{mousewheel:Prototype.Browser.Gecko?'DOMMouseScroll':'mousewheel',wheel:function(event){var delta=0;if(!event){event=window.event;}
if(event.wheelDelta){delta=event.wheelDelta/120;if(window.opera){delta=-delta;}}else if(event.detail){delta=-event.detail/3;}
return Math.round(delta);},isInput:function(e){var element;if(e.target){element=e.target;}else if(e.srcElement){element=e.srcElement;}
if(element.nodeType==3){element=element.parentNode;}
if(element.tagName=='INPUT'||element.tagName=='TEXTAREA'){return true;}
return false;},isRightClick:function(event){var _isButton;if(Prototype.Browser.IE){var buttonMap={0:1,1:4,2:2};_isButton=function(event,code){return event.button===buttonMap[code];};}else if(Prototype.Browser.WebKit){_isButton=function(event,code){switch(code){case 0:return event.which==1&&!event.metaKey;case 1:return event.which==1&&event.metaKey;case 2:return event.which==3&&!event.metaKey;default:return false;}};}else{_isButton=function(event,code){return event.which?(event.which===code+1):(event.button===code);};}
return _isButton(event,2);}});Protoplus.utils={cloneElem:function(element){if(Prototype.Browser.IE){var div=document.createElement('div');div.innerHTML=element.outerHTML;return $jot(div.firstChild);}
return element.cloneNode(true);},openInNewTab:function(element,link){element.observe('mouseover',function(e){if(!element.tabLink){var a=new Element('a',{href:link,target:'_blank'}).insert('&nbsp;&nbsp;');a.setStyle('opacity:0; z-index:100000; height:5px; width:5px; position:absolute; top:'+(Event.pointerY(e)-2.5)+'px;left:'+(Event.pointerX(e)-2.5)+'px');a.observe('click',function(){element.tabLinked=false;a.remove();});$jot(document.body).insert(a);element.tabLink=a;element.observe('mousemove',function(e){element.tabLink.setStyle('top:'+(Event.pointerY(e)-2.5)+'px;left:'+(Event.pointerX(e)-2.5)+'px');});}});return element;},hasFixedContainer:function(element){var result=false;element.ancestors().each(function(el){if(result){return;}
if(el.style.position=="fixed"){result=true;}});return result;},getCurrentStyle:function(element,name){if(element.style[name]){return element.style[name];}else if(element.currentStyle){return element.currentStyle[name];}
else if(document.defaultView&&document.defaultView.getComputedStyle){name=name.replace(/([A-Z])/g,"-$jot1");name=name.toLowerCase();s=document.defaultView.getComputedStyle(element,"");return s&&s.getPropertyValue(name);}else{return null;}},isOverflow:function(element){if(element.resized){element.hideHandlers();}
var curOverflow=element.style.overflow;if(!curOverflow||curOverflow==="visible"){element.style.overflow="hidden";}
var leftOverflowing=element.clientWidth<element.scrollWidth;var topOverflowing=element.clientHeight<element.scrollHeight;var isOverflowing=leftOverflowing||topOverflowing;element.style.overflow=curOverflow;if(element.resized){element.showHandlers();}
return isOverflowing?{top:topOverflowing?element.scrollHeight:false,left:leftOverflowing?element.scrollWidth:false,both:leftOverflowing&&topOverflowing}:false;},setUnselectable:function(target){if(typeof target.style.MozUserSelect!="undefined"&&target.className=="form-section-closed"){target.style.MozUserSelect="normal";}
else if(typeof target.onselectstart!="undefined"){target.onselectstart=function(){return false;};}
else if(typeof target.style.MozUserSelect!="undefined"){target.style.MozUserSelect="none";}
else{target.onmousedown=function(){return false;};}
target.__oldCursor=target.style.cursor;target.style.cursor='default';return target;},setSelectable:function(target){if(typeof target.onselectstart!="undefined"){target.onselectstart=document.createElement("div").onselectstart;}
else if(typeof target.style.MozUserSelect!="undefined"){target.style.MozUserSelect=document.createElement("div").style.MozUserSelect;}
else{target.onmousedown="";}
if(target.__oldCursor){target.style.cursor=target.__oldCursor;}else{target.style.cursor='';}
return target;},selectText:function(element){var r1="";if(document.selection){r1=document.body.createTextRange();r1.moveToElementText(element);r1.setEndPoint("EndToEnd",r1);r1.moveStart('character',4);r1.moveEnd('character',8);r1.select();}
else{s=window.getSelection();r1=document.createRange();r1.setStartBefore(element);r1.setEndAfter(element);s.addRange(r1);}
return element;},hover:function(elem,over,out){$jot(elem).observe("mouseover",function(evt){if(typeof over=="function"){if(elem.innerHTML){if(elem.descendants().include(evt.relatedTarget)){return true;}}
over(elem,evt);}else if(typeof over=="string"){$jot(elem).addClassName(over);}});$jot(elem).observe("mouseout",function(evt){if(typeof out=="function"){if(elem.innerHTML){if(elem.descendants().include(evt.relatedTarget)){return true;}}
out(elem,evt);}else if(typeof over=="string"){$jot(elem).removeClassName(over);}});return elem;},mouseEnter:function(elem,over,out){$jot(elem).observe("mouseenter",function(evt){if(typeof over=="function"){over(elem,evt);}else if(typeof over=="string"){$jot(elem).addClassName(over);}});$jot(elem).observe("mouseleave",function(evt){if(typeof out=="function"){out(elem,evt);}else if(typeof over=="string"){$jot(elem).removeClassName(over);}});return elem;},setScroll:function(element,amounts){if(amounts.x!==undefined){element.scrollLeft=amounts.x;}
if(amounts.y!==undefined){element.scrollTop=amounts.y;}},scrollInto:function(element,options){options=Object.extend({offset:[100,100],direction:'bottom'},options||{});element=$jot(element);var pos=Element.cumulativeOffset(element);var vp=document.viewport.getDimensions();var ed=Element.getDimensions(element);switch(options.direction){case'bottom':if(pos[1]+options.offset[1]>=vp.height+window.scrollY){window.scrollTo(window.scrollX,(pos[1]+options.offset[1])-vp.height);}else if(window.scrollY!==0&&(pos[1]+options.offset[1]<=Math.abs(vp.height-window.scrollY))){window.scrollTo(window.scrollX,(pos[1]+options.offset[1])-vp.height);}
break;case"top":var height=element.getHeight();if(window.scrollY!==0&&pos[1]<=window.scrollY+options.offset[1]){window.scrollTo(window.scrollX,pos[1]-options.offset[1]);}else if(window.scrollY!==0&&(pos[1]+options.offset[1]<=Math.abs(vp.height-window.scrollY))){window.scrollTo(window.scrollX,pos[1]-options.offset[1]);}
break;}
return element;},getScroll:function(element){return{x:parseFloat(element.scrollLeft),y:parseFloat(element.scrollTop)};},setText:function(element,value){element.innerHTML=value;return element;},putValue:function(element,value){if(element.clearHint){element.clearHint();}
element.value=value;return element;},resetUpload:function(element){if(Prototype.Browser.IE){var p=element.parentNode;var c=element.cloneNode(true);p.replaceChild(c,element);return c;}
element.value='';return element;},run:function(element,event){if(event.include(':')){element.fire(event);}else{var evt;var disabled=element.hasClassName('form-dropdown')&&element.disabled?!!(element.enable()):false;if(document.createEventObject&&!Prototype.Browser.IE9&&!Prototype.Browser.IE10){evt=document.createEventObject();element.fireEvent('on'+event,evt);}else{evt=document.createEvent("HTMLEvents");evt.initEvent(event,true,true);if(disabled){setTimeout(function(){element.dispatchEvent(evt);element.disable();},0);}else{element.dispatchEvent(evt);}}}
return element;},setCSSBorderRadius:function(element,value){return element.setStyle({MozBorderRadius:value,borderRadius:value,'-webkit-border-radius':value});},getSelected:function(element){if(!element.options){if(element.innerHTML){return element.innerHTML;}
else{return element.value;}}
var selected=element.selectedIndex>=0?element.options[element.selectedIndex]:element;return selected;},selectOption:function(element,val){if(!val){return element;}
var match_found=false;$jotA(element.options).each(function(option){if(Object.isRegExp(val)&&(val.test(option.value))){option.selected=true;throw $jotbreak;}
if(val==option.value){option.selected=true;match_found=true;}});if(match_found==false){$jotA(element.options).each(function(option){if(Object.isRegExp(val)&&(val.test(option.text))){option.selected=true;throw $jotbreak;}
if(val==option.text){option.selected=true;}});}
element.run('change');return element;},stopAnimation:function(element){element.__stopAnimation=true;return element;},shift:function(element,options){options=Object.extend({duration:1,onEnd:Prototype.K,onStart:Prototype.K,onStep:Prototype.K,onCreate:Prototype.K,delay:0,link:'cancel',transparentColor:'#ffffff',remove:false,easingCustom:false,propertyEasings:{},easing:Protoplus.Transitions.sineOut},options||{});if(!element.queue){element.queue=[];}
options.onCreate(element,options);if(options.link=="ignore"&&element.timer){return element;}else if((options.link=="chain"||options.link=="queue")&&element.timer){element.queue.push(options);return element;}
if(element.timer){clearInterval(element.timer);}
if(element.delayTime){clearTimeout(element.delayTime);}
if(typeof options.easing=='string'){if(options.easing in Protoplus.Transitions){options.easing=Protoplus.Transitions[options.easing];}else{options.easing=Protoplus.Transitions.sineOut;}}else if(typeof options.easing=='object'){options.propertyEasings=options.easing;options.easing=Protoplus.Transitions.sineOut;}else if(typeof options.easing!='function'){options.easing=Protoplus.Transitions.sineOut;}
options.duration*=1000;options.delay*=1000;element.timer=false;var properties={},begin,end,init=function(){begin=new Date().getTime();end=begin+options.duration;options.onStart(element);};for(var x in options){if(!["duration","onStart","onStep","transparentColor","onEnd","onCreate","remove","easing","link","delay","easingCustom","propertyEasings"].include(x)&&options[x]!==false){properties[x]=options[x];}}
var unitRex=/\d+([a-zA-Z%]+)$jot/;for(var i in properties){var okey=i,oval=properties[i];var to,from,key,unit,s=[],easing=options.easing;if(["scrollX","scrollLeft","scrollY","scrollTop"].include(okey)){to=parseFloat(oval);key=(okey=="scrollX")?"scrollLeft":(okey=="scrollY")?"scrollTop":okey;if(element.tagName=="BODY"){from=(okey=="scrollX"||okey=="scrollLeft")?window.scrollX:window.scrollY;}else{from=(okey=="scrollX"||okey=="scrollLeft")?element.scrollLeft:element.scrollTop;}
unit='';}else if(okey=="rotate"){to=parseFloat(oval);key="-webkit-transform";from=Element.getStyle(element,'-webkit-transform')?parseInt(Element.getStyle(element,'-webkit-transform').replace(/rotate\(|\)/gim,""),10):0;unit='deg';}else if(["background","color","borderColor","backgroundColor"].include(okey)){if(oval=='transparent'){oval=options.transparentColor;}
to=Protoplus.Colors.hexToRgb(oval);key=okey=="background"?"backgroundColor":okey;var bgcolor=Element.getStyle(element,key);if(!bgcolor||bgcolor=='transparent'){bgcolor=options.transparentColor;}
from=Protoplus.Colors.getRGBarray(bgcolor);unit='';}else if(okey=="opacity"){to=(typeof oval=="string")?parseInt(oval,10):oval;key=okey;from=Element.getStyle(element,okey);unit='';from=parseFloat(from);}else{to=(typeof oval=="string")?parseInt(oval,10):oval;key=okey;from=Element.getStyle(element,okey.replace("-webkit-","").replace("-moz-",""))||"0px";unit=okey=='opacity'?'':(unitRex.test(from))?from.match(unitRex)[1]:'px';from=parseFloat(from);}
if(okey in options.propertyEasings){easing=Protoplus.Transitions[options.propertyEasings[okey]];}
if(!to&&to!==0){try{s[key]=oval;element.style[key]=oval;}catch(e){}}else{properties[okey]={key:key,to:to,from:from,unit:unit,easing:easing};}}
var fn=function(ease,option,arr){var val=0;if(arr!==false){return Math.round(option.from[arr]+ease*(option.to[arr]-option.from[arr]));}
return(option.from+ease*(option.to-option.from));};element.__stopAnimation=false;var step=function(){var time=new Date().getTime(),okey,oval,rgb;if(element.__stopAnimation===true){clearInterval(element.timer);element.timer=false;element.__stopAnimation=false;return;}
if(time>=end){clearInterval(element.timer);element.timer=false;var valTo=(options.easing=="pulse"||options.easing==Protoplus.Transitions.pulse)?"from":"to";for(okey in properties){oval=properties[okey];if(["scrollX","scrollLeft","scrollY","scrollTop"].include(okey)){if(element.tagName.toUpperCase()=="BODY"){if(oval.key=="scrollLeft"){window.scrollTo(oval[valTo],window.scrollY);}else{window.scrollTo(window.scrollX,oval[valTo]);}}else{element[oval.key]=oval[valTo]+oval.unit;}}else if(["background","color","borderColor","backgroundColor"].include(okey)){element.style[oval.key]='rgb('+oval[valTo].join(', ')+")";}else if(okey=="opacity"){Element.setOpacity(element,oval[valTo]);}else if(okey=="rotate"){element.style[okey]="rotate("+oval[valTo]+oval.unit+")";}else{element.style[okey]=oval[valTo]+oval.unit;}}
if(options.onEnd){options.onEnd(element);}
if(options.remove){element.remove();}
if(element.queue.length>0){var que=element.queue.splice(0,1);element.shift(que[0]);}
return element;}
if(options.onStep){options.onStep(element);}
for(okey in properties){oval=properties[okey];if(oval.key=="scrollLeft"||oval.key=="scrollTop"){if(element.tagName.toUpperCase()=="BODY"){var scroll=parseInt(fn(oval.easing((time-begin)/options.duration,options.easingCustom),oval,false),10)+oval.unit;if(oval.key=="scrollLeft"){window.scrollTo(scroll,window.scrollY);}else{window.scrollTo(window.scrollX,scroll);}}else{element[oval.key]=parseInt(fn(oval.easing((time-begin)/options.duration,options.easingCustom),oval,false),10)+oval.unit;}}else if(okey=="background"||okey=="color"||okey=="borderColor"||okey=="backgroundColor"){rgb=[];for(var x=0;x<3;x++){rgb[x]=fn(oval.easing((time-begin)/options.duration,options.easingCustom),oval,x);}
element.style[oval.key]='rgb('+rgb.join(', ')+')';}else if(okey=="opacity"){Element.setOpacity(element,fn(oval.easing((time-begin)/options.duration,options.easingCustom),oval,false));}else if(okey=="rotate"){element.style[oval.key]="rotate("+fn(oval.easing((time-begin)/options.duration,options.easingCustom),oval,false)+oval.unit+")";}else{element.style[okey]=fn(oval.easing((time-begin)/options.duration,options.easingCustom),oval,false)+oval.unit;}}};if(options.delay){element.delayTime=setTimeout(function(){init();element.timer=setInterval(step,10);},options.delay);}else{init();element.timer=setInterval(step,10);}
return element;},fade:function(element,options){options=Object.extend({duration:0.5,onEnd:function(e){e.setStyle({display:"none"});},onStart:Prototype.K,opacity:0},options||{});element.shift(options);},appear:function(element,options){options=Object.extend({duration:0.5,onEnd:Prototype.K,onStart:Prototype.K,opacity:1},options||{});element.setStyle({opacity:0,display:"block"});element.shift(options);},disable:function(element){element=$jot(element);element.disabled=true;return element;},enable:function(element){element=$jot(element);element.disabled=false;return element;},setReference:function(element,name,reference){if(!element.REFID){element.REFID=Protoplus.REFIDCOUNT++;}
if(!Protoplus.references[element.REFID]){Protoplus.references[element.REFID]={};}
Protoplus.references[element.REFID][name]=$jot(reference);return element;},getReference:function(element,name){if(!element.REFID){return false;}
return Protoplus.references[element.REFID][name];},remove:function(element){if(element.REFID){delete Protoplus.references[element.REFID];}
if(element.parentNode){element.parentNode.removeChild(element);}
return element;}};(function(emile,container){var parseEl=document.createElement('div'),props=('backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth '+'borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize '+'fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight '+'maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft '+'paddingRight paddingTop right textIndent top width wordSpacing zIndex').split(' ');function interpolate(source,target,pos){return(source+(target-source)*pos).toFixed(3);}
function s(str,p,c){return str.substr(p,c||1);}
function color(source,target,pos){var i=2,j=3,c,tmp,v=[],r=[];j=3;c=arguments[i-1];while(i--){if(s(c,0)=='r'){c=c.match(/\d+/g);while(j--){v.push(~~c[j]);}}else{if(c.length==4){c='#'+s(c,1)+s(c,1)+s(c,2)+s(c,2)+s(c,3)+s(c,3);}
while(j--){v.push(parseInt(s(c,1+j*2,2),16));}}
j=3;c=arguments[i-1];}
while(j--){tmp=~~(v[j+3]+(v[j]-v[j+3])*pos);r.push(tmp<0?0:tmp>255?255:tmp);}
return'rgb('+r.join(',')+')';}
function parse(prop){var p=parseFloat(prop),q=prop.replace(/^[\-\d\.]+/,'');return isNaN(p)?{v:q,f:color,u:''}:{v:p,f:interpolate,u:q};}
function normalize(style){var css,rules={},i=props.length,v;parseEl.innerHTML='<div style="'+style+'"></div>';css=parseEl.childNodes[0].style;while(i--){v=css[props[i]];if(v){rules[props[i]]=parse(v);}}
return rules;}
container[emile]=function(el,style,opts){el=typeof el=='string'?document.getElementById(el):el;opts=opts||{};var target=normalize(style),comp=el.currentStyle?el.currentStyle:getComputedStyle(el,null),prop,current={},start=+new Date(),dur=opts.duration||200,finish=start+dur,interval,easing=opts.easing||function(pos){return(-Math.cos(pos*Math.PI)/2)+0.5;};for(prop in target){current[prop]=parse(comp[prop]);}
interval=setInterval(function(){var time=+new Date(),pos=time>finish?1:(time-start)/dur;for(var prop in target){el.style[prop]=target[prop].f(current[prop].v,target[prop].v,easing(pos))+target[prop].u;}
if(time>finish){clearInterval(interval);if(opts.after){opts.after();}}},10);};})('emile',Protoplus.utils);Element.addMethods(Protoplus.utils);Event.observe(window,'unload',function(){Protoplus=null;});Ajax=Object.extend(Ajax,{Jsonp:function(url,options){this.options=Object.extend({method:'post',timeout:60,parameters:'',force:false,onComplete:Prototype.K,onSuccess:Prototype.K,onFail:Prototype.K},options||{});var parameterString=url.match(/\?/)?'&':'?';this.response=false;var callback_id=new Date().getTime();Ajax["callback_"+callback_id]=function(response){this.response=response;}.bind(this);this.callback=Ajax.callback;if(typeof this.options.parameters=="string"){parameterString+=this.options.parameters;}else{$jotH(this.options.parameters).each(function(p){parameterString+=p.key+'='+encodeURIComponent(p.value)+'&';});}
var matches=/^(\w+:)?\/\/([^\/?#]+)/.exec(url);var sameDomain=(matches&&(matches[1]&&matches[1]!=location.protocol||matches[2]!=location.host));if(!sameDomain&&this.options.force===false){return new Ajax.Request(url,this.options);}
this.url=url+parameterString+'callbackName=Ajax.callback_'+callback_id+'&nocache='+new Date().getTime();this.script=new Element('script',{type:'text/javascript',src:this.url});var errored=false;this.onError=function(e,b,c){errored=true;this.options.onComplete({success:false,error:e||"Not Found"});this.options.onFail({success:false,error:e||"Not Found",args:[e,b,c]});this.script.remove();window.onerror=null;this.response=false;}.bind(this);this.onLoad=function(e){if(errored){return;}
clearTimeout(timer);this.script.onreadystatechange=null;this.script.onload=null;var res=this.script;this.script.remove();window.onerror=null;if(this.response){setTimeout(function(){this.options.onComplete({responseJSON:this.response});this.options.onSuccess({responseJSON:this.response});}.bind(this),20);}else{this.onError({error:'Callback error'});}}.bind(this);this.readyState=function(e){var rs=this.script.readyState;if(rs=='loaded'||rs=='complete'){this.onLoad();}}.bind(this);var timer=setTimeout(this.onError,this.options.timeout*1000);this.script.onreadystatechange=this.readyState;this.script.onload=this.onLoad;window.onerror=function(e,b,c){clearTimeout(timer);this.onError(e,b,c);return true;}.bind(this);document.querySelectorAll('head')[0].appendChild(this.script);return this;}});var _alert=window.alert;if(!location.pathname.match(/^\/answers\/.+/)){window.alert=function(){var args=arguments;var i=1;var first=args[0];if(typeof first=="object"){$jotH(first).debug();return first;}else if(typeof first=="string"){var msg=first.replace(/(\%s)/gim,function(e){return args[i++]||"";});_alert(msg);return true;}
_alert(first);};}
var rand=function(min,max){return Math.floor(Math.random()*(max-min))+min;};if("__protoinit"in window){document.ready(function(e){$jotA(__protoinit).each(function(f){f(e);});});}
(function(){if(Prototype.Browser.WebKit){var FIX_WEBKIT_FOCUS=function(e){if(e.target&&e.target.focus){e.target.focus();}};document.addEventListener('DOMNodeInserted',function(e){if(e.target.tagName==='BUTTON'||(e.target.tagName==='INPUT'&&e.target.type!=='text')){e.target.observe('click',FIX_WEBKIT_FOCUS);}},false);document.observe('dom:loaded',function(){document.querySelectorAll('button, input:not([type="text"])').invoke('observe','click',FIX_WEBKIT_FOCUS);});}})();;if(window.Protoplus===undefined){throw("Error: ProtoPlus is required by ProtoPlus-UI.js");}
Object.extend(document,{getViewPortDimensions:function(){var height;var width;if(typeof window.innerWidth!='undefined')
{width=window.innerWidth;height=window.innerHeight;}else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!==0){width=document.documentElement.clientWidth;height=document.documentElement.clientHeight;}else{width=document.getElementsByTagName('body')[0].clientWidth;height=document.getElementsByTagName('body')[0].clientHeight;}
return{height:height,width:width};},stopTooltips:function(){document.stopTooltip=true;document.querySelectorAll(".pp_tooltip_").each(function(t){t.remove();});return true;},startTooltips:function(){document.stopTooltip=false;}});Protoplus.ui={isVisible:function(element){element=$jot(element);if(!element.parentNode){return false;}
if(element&&element.tagName=="BODY"){return true;}
if(element.style.display=="none"||element.style.visibility=="hidden"){return false;}
return Protoplus.ui.isVisible(element.parentNode);},setDraggable:function(element,options){options=Object.extend({dragClass:"",handler:false,dragFromOriginal:false,onStart:Prototype.K,changeClone:Prototype.K,onDrag:Prototype.K,onDragEnd:Prototype.K,onEnd:Prototype.K,dragEffect:false,revert:false,clone:false,snap:false,cursor:"move",offset:false,constraint:false,constrainLeft:false,constrainRight:false,constrainTop:false,constrainBottom:false,constrainOffset:false,constrainViewport:false,constrainParent:false,dynamic:true},options||{});if(options.snap&&(typeof options.snap=="number"||typeof options.snap=="string")){options.snap=[options.snap,options.snap];}
var mouseUp="mouseup",mouseDown="mousedown",mouseMove="mousemove";if(options.constrainOffset){if(options.constrainOffset.length==4){options.constrainTop=options.constrainTop?options.constrainTop:options.constrainOffset[0];options.constrainRight=options.constrainRight?options.constrainRight:options.constrainOffset[1];options.constrainBottom=options.constrainBottom?options.constrainBottom:options.constrainOffset[2];options.constrainLeft=options.constrainLeft?options.constrainLeft:options.constrainOffset[3];}}
var handler;var stopDragTimer=false;var drag=function(e){Event.stop(e);if(mouseMove=="touchmove"){e=e.touches[0];}
if(options.onDrag(drag_element,handler,e)===false){return;}
var top=startY+(Number(Event.pointerY(e)-mouseY));var left=startX+(Number(Event.pointerX(e)-mouseX));if(options.offset){top=options.offset[1]+Event.pointerY(e);left=options.offset[0]+Event.pointerX(e);}
if(options.snap){top=(top/options.snap[1]).round()*options.snap[1];left=(left/options.snap[0]).round()*options.snap[0];}
top=(options.constrainBottom!==false&&top>=options.constrainBottom)?options.constrainBottom:top;top=(options.constrainTop!==false&&top<=options.constrainTop)?options.constrainTop:top;left=(options.constrainRight!==false&&left>=options.constrainRight)?options.constrainRight:left;left=(options.constrainLeft!==false&&left<=options.constrainLeft)?options.constrainLeft:left;if(options.constraint=="vertical"){drag_element.setStyle({top:top+"px"});}else if(options.constraint=="horizontal"){drag_element.setStyle({left:left+"px"});}else{drag_element.setStyle({top:top+"px",left:left+"px"});}
if(stopDragTimer){clearTimeout(stopDragTimer);}
options.onDrag(drag_element,handler,e);stopDragTimer=setTimeout(function(){options.onDragEnd(drag_element,handler,e);},50);};var mouseup=function(ev){Event.stop(ev);if(mouseUp=="touchend"){ev=e.touches[0];}
if(options.dynamic!==true){document.temp.setStyle({top:element.getStyle('top'),left:element.getStyle('left')});element.parentNode.replaceChild(document.temp,element);document.temp.oldZIndex=element.oldZIndex;element=document.temp;}
if(options.onEnd(drag_element,handler,ev)!==false){if(element.oldZIndex){drag_element.setStyle({zIndex:element.oldZIndex});}else{drag_element.setStyle({zIndex:''});}
if(options.revert){if(options.revert===true){options.revert={easing:"sineIn",duration:0.5};}
options.revert=Object.extend({left:drag_element.startX,top:drag_element.startY,opacity:1,duration:0.5,easing:'sineIn'},options.revert||{});drag_element.shift(options.revert);drag_element.startX=false;drag_element.startY=false;}else{if(options.dragEffect){drag_element.shift({opacity:1,duration:0.2});}}}
element.__dragging=false;drag_element.removeClassName(options.dragClass);handler.setSelectable();drag_element.setSelectable();$jot(document.body).setSelectable();document.stopObserving(mouseMove,drag);document.stopObserving(mouseUp,mouseup);};if(options.handler){if(typeof options.handler=="string"){handler=(options.handler.startsWith("."))?element.descendants().find(function(h){return h.className==options.handler.replace(/^\./,"");}):$jot(options.handler);}else{handler=$jot(options.handler);}}else{handler=element;}
handler.setStyle({cursor:options.cursor});handler.observe(mouseDown,function(e){Event.stop(e);var evt=e;if(mouseDown=="touchstart"){e=e.touches[0];}
element.__dragging=true;if(document.stopDrag){return true;}
if(options.dragFromOriginal&&e.target!=handler){return false;}
var vdim=false,voff=false;if(options.constrainElement){voff=(Prototype.Browser.IE)?{top:0,left:0}:$jot(options.constrainElement).cumulativeOffset();vdim=$jot(options.constrainElement).getDimensions();}
if(options.constrainParent){if($jot(element.parentNode).getStyle('position')=="relative"||$jot(element.parentNode).getStyle('position')=="absolute"){voff={top:0,left:0};}else{voff=(Prototype.Browser.IE)?{top:0,left:0}:$jot(element.parentNode).cumulativeOffset();}
vdim=$jot(element.parentNode).getDimensions();}
if(options.constrainViewport){voff=$jot(document.body).cumulativeScrollOffset();vdim=document.viewport.getDimensions();}
if(vdim){vdim.height+=voff.top;vdim.width+=voff.left;options.constrainTop=voff.top+1;options.constrainBottom=vdim.height-(element.getHeight()+3);options.constrainRight=vdim.width-(element.getWidth()+3);options.constrainLeft=voff.left+1;}
var temp_div;if(options.dynamic!==true){try{document.temp=element;temp_div=new Element('div').setStyle({height:element.getHeight()+"px",width:element.getWidth()+"px",border:'1px dashed black',top:element.getStyle('top')||0,left:element.getStyle('left')||0,zIndex:element.getStyle('zIndex')||0,position:element.getStyle('position'),background:'#f5f5f5',opacity:0.3});}catch(err){}
element.parentNode.replaceChild(temp_div,element);element=temp_div;}
if(["relative","absolute"].include($jot(element.parentNode).getStyle('position'))){startX=element.getStyle("left")?parseInt(element.getStyle("left"),10):element.offsetLeft;startY=element.getStyle("top")?parseInt(element.getStyle("top"),10):element.offsetTop;}else{var eloff=element.cumulativeOffset();startX=eloff.left;startY=eloff.top;}
mouseX=Number(Event.pointerX(e));mouseY=Number(Event.pointerY(e));if(options.clone){drag_element=options.changeClone(element.cloneNode({deep:true}),startX,startY);$jot(document.body).insert(drag_element);}else{drag_element=element;}
options.onStart(drag_element,handler,e);drag_element.addClassName(options.dragClass);element.oldZIndex=element.getStyle("z-index")||0;if(options.dragEffect){drag_element.shift({opacity:0.7,duration:0.2});}
drag_element.setStyle({position:"absolute",zIndex:99998});if(options.revert&&!drag_element.startX&&!drag_element.startY){drag_element.startX=startX;drag_element.startY=startY;}
drag_element.setUnselectable();handler.setUnselectable();$jot(document.body).setUnselectable();document.observe(mouseMove,drag);document.observe(mouseUp,mouseup);});return element;},tooltip:function(element,text,options){element=$jot(element);if('Prototip'in window){options=Object.extend({delay:0.01},options||{});var T=new Tip(element,text,options);return element;}
if(typeof text!="string"){return element;}
options=Object.extend({className:false,fixed:false,opacity:1,title:false,width:200,height:100,offset:false,zIndex:100000,delay:false,duration:false,fadeIn:false,fadeOut:false,shadow:false},options||{});text=(options.title)?"<b>"+options.title+"</b><br>"+text:text;element.hover(function(el,evt){var vpd=document.viewport.getDimensions();var getBoxLocation=function(e){var offTop=options.offset.top?options.offset.top:15;var offLeft=options.offset.left?options.offset.left:15;var top=(Event.pointerY(e)+offTop);var left=(Event.pointerX(e)+offLeft);var dim=tooldiv.getDimensions();if(left+dim.width>(vpd.width-20)){left-=dim.width+20+offLeft;}
if(top+dim.height>(vpd.height-20)){top-=dim.height+offTop;}
return{top:top,left:left};};if(document.stopTooltip){document.querySelectorAll(".pp_tooltip_").each(function(t){t.remove();});return true;}
outer=new Element("div",{className:'pp_tooltip_'}).setStyle({opacity:options.opacity,position:"absolute",zIndex:options.zIndex});if(options.className){tooldiv=new Element("div",{className:options.className}).setStyle({position:"relative",top:"0px",left:"0px",zIndex:10}).update(text);}else{tooldiv=new Element("div").setStyle({padding:"4px",background:"#eee",width:(options.width=="auto"?"auto":options.width+"px"),border:"1px solid #333",position:"absolute",top:"0px",left:"0px",zIndex:10}).update(text);tooldiv.setCSSBorderRadius('5px');}
if(options.shadow){shadTop=options.shadow.top?parseInt(options.shadow.top,10):4;shadLeft=options.shadow.left?parseInt(options.shadow.left,10):4;shadBack=options.shadow.back?options.shadow.back:"#000";shadOp=options.shadow.opacity?options.shadow.opacity:0.2;if(options.className){shadow=new Element("div",{className:options.className||""}).setStyle({position:"absolute",borderColor:"#000",color:"#000",top:shadTop+"px",left:shadLeft+"px",zIndex:9,background:shadBack,opacity:shadOp});shadow.update(text);}else{shadow=new Element("div",{className:options.className||""}).setStyle({padding:"4px",border:"1px solid black",color:"#000",width:options.width+"px",position:"absolute",top:shadTop+"px",left:shadLeft+"px",zIndex:9,background:shadBack,opacity:shadOp});shadow.setCSSBorderRadius('5px');shadow.update(text);}
outer.appendChild(shadow);}
outer.appendChild(tooldiv);var makeItAppear=function(){if(options.fixed){var fixTop=options.fixed.top?parseInt(options.fixed.top,10):element.getHeight();var fixLeft=options.fixed.left?parseInt(options.fixed.left,10):element.getWidth()-50;outer.setStyle({top:fixTop+"px",left:fixLeft+"px"});}else{element.observe("mousemove",function(e){if(document.stopTooltip){document.querySelectorAll(".pp_tooltip_").each(function(t){t.remove();});return true;}
var loc=getBoxLocation(e);outer.setStyle({top:loc.top+"px",left:loc.left+"px"});});}};outer.delay=setTimeout(function(){if(options.fadeIn){document.body.appendChild(outer);var fl=getBoxLocation(evt);outer.setStyle({opacity:0,top:fl.top+"px",left:fl.left+"px"});dur=options.fadeIn.duration?options.fadeIn.duration:1;outer.appear({duration:dur,onEnd:makeItAppear()});}else{document.body.appendChild(outer);var l=getBoxLocation(evt);outer.setStyle({top:l.top+"px",left:l.left+"px"});setTimeout(makeItAppear,100);}
if(options.duration){outer.duration=setTimeout(function(){if(options.fadeOut){dur=options.fadeOut.duration?options.fadeOut.duration:1;outer.fade({duration:dur,onEnd:function(){if(outer.parentNode){outer.remove();}}});}else{if(outer.parentNode){outer.remove();}}},options.duration*1000||0);}},options.delay*1000||0);},function(){if(document.stopTooltip){document.querySelectorAll(".pp_tooltip_").each(function(t){t.remove();});return true;}
if(outer){clearTimeout(outer.delay);clearTimeout(outer.duration);}
if(options.fadeOut){dur=options.fadeOut.duration?options.fadeOut.duration:0.2;outer.fade({duration:dur,onEnd:function(){if(outer.parentNode){outer.remove();}}});}else{if(outer.parentNode){outer.remove();}}});return element;},rating:function(element,options){element=$jot(element);options=Object.extend({imagePath:"stars.png",onRate:Prototype.K,resetButtonImage:false,resetButtonTitle:'Cancel Your Rating',resetButton:true,inputClassName:'',titles:[],disable:false,disabled:element.getAttribute("disabled")?element.getAttribute("disabled"):false,stars:element.getAttribute("stars")?element.getAttribute("stars"):5,name:element.getAttribute("name")?element.getAttribute("name"):"rating",value:element.getAttribute("value")?element.getAttribute("value"):0,cleanFirst:false},options||{});if(element.converted){return element;}
element.converted=true;element.addClassName('form-star-rating');var image={blank:"0px 0px",over:"-16px 0px",clicked:"-32px 0px",half:"-48px 0px"};var hidden=new Element("input",{type:"hidden",name:options.name,className:options.inputClassName});var stardivs=$jotA([]);element.disabled=(options.disabled=="true"||options.disabled===true)?true:false;element.setStyle({display:'inline-block',width:((parseInt(options.stars,10)+(options.resetButton?1:0))*20)+"px",cursor:options.disabled?"default":"pointer"});element.setUnselectable();if(options.cleanFirst){element.update();}
var setStar=function(i){var elval=i;i=i||0;var desc=$jotA(element.descendants());desc.each(function(e){e.setStyle({backgroundPosition:image.blank}).removeClassName("rated");});desc.each(function(e,c){if(c<i){e.setStyle({backgroundPosition:image.clicked}).addClassName("rated");}});hidden.value=i||"";if(options.disable){element.disabled=true;element.setStyle({cursor:"default"});}
element.value=elval;options.onRate(element,options.name,i);element.run('keyup');hidden.run('change');if(options.resetButton){cross[(i===0)?"hide":"show"]();}};element.setRating=setStar;$jotA($jotR(1,options.stars)).each(function(i){var star=new Element("div").setStyle({height:"16px",width:"16px",margin:"0.5px",cssFloat:"left",backgroundImage:"url("+options.imagePath+")"});star.observe("mouseover",function(){if(!element.disabled){var desc=$jotA(element.descendants());desc.each(function(e,c){if(c<i){e.setStyle({backgroundPosition:e.hasClassName("rated")?image.clicked:image.over});}});}}).observe("click",function(){if(!element.disabled){setStar(i);}});if(options.titles&&options.titles[i-1]){star.title=options.titles[i-1];}
stardivs.push(star);});if(!options.disabled){element.observe("mouseout",function(){element.descendants().each(function(e){e.setStyle({backgroundPosition:e.hasClassName("rated")?image.clicked:image.blank});});});}
if(options.resetButton){var cross=new Element("div").setStyle({height:"16px",width:"16px",margin:"0.5px",cssFloat:"left",color:'#999',fontSize:'12px',textAlign:'center'});if(options.resetButtonImage){cross.insert(new Element('img',{src:options.resetButtonImage,align:'absmiddle'}));}else{cross.insert(' x ');}
cross.title=options.resetButtonTitle;cross.hide();cross.observe('click',function(){setStar(undefined);});stardivs.push(cross);}
stardivs.each(function(star){element.insert(star);});element.insert(hidden);if(options.value>0){element.descendants().each(function(e,c){c++;if(c<=options.value){e.setStyle({backgroundPosition:image.clicked}).addClassName("rated");}
if(options.value>c-1&&options.value<c){e.setStyle({backgroundPosition:image.half}).addClassName("rated");}});hidden.value=options.value;}
return element;},slider:function(element,options){element=$jot(element);options=Object.extend({width:100,onUpdate:Prototype.K,maxValue:100,value:0,buttonBack:'url("../images/ball.png") no-repeat scroll 0px 0px transparent'},options||{});if("JotForm"in window&&"url"in JotForm){options.buttonBack='url("'+JotForm.url+'images/ball.png") no-repeat scroll 0px 0px transparent';}
var valueToPixel=function(value){var val=(value*100/options.maxValue)*barWidth/100;val=val<3?3:val;return Math.round(val);};var sliderOut=new Element('div',{tabindex:1});var sliderBar=new Element('div');var sliderButton=new Element('div',{id:new Date().getTime()});var sliderTable=new Element('table',{cellpadding:0,cellspacing:1,border:0,width:options.width,className:element.className});var tbody=new Element('tbody');var tr=new Element('tr');var tr2=new Element('tr');var sliderTD=new Element('td',{colspan:3});var startTD=new Element('td',{align:'center',width:20}).insert('0');var statTD=new Element('td',{align:'center',width:options.width-40}).insert(options.value).setStyle('font-weight:bold');var endTD=new Element('td',{align:'center',width:20}).insert(options.maxValue);var barWidth=options.width-18;var defaultValue=options.value;options.value=valueToPixel(options.value);var moveLEFT=function(amount){var l=parseInt(sliderButton.getStyle('left'),10)-amount;l=(l<=3)?3:l;sliderButton.setStyle({left:l+"px"});updateValue(l);};var moveRIGTH=function(amount){var l=parseInt(sliderButton.getStyle('left'),10)+amount;l=(l>=barWidth)?barWidth:l;sliderButton.setStyle({left:l+"px"});updateValue(l);};var sliderKeys=function(e){e=document.getEvent(e);if(e.keyCode==37){moveLEFT(5);}else if(e.keyCode==39){moveRIGTH(5);}};var sliderWheel=function(e){if(!sliderOut.__hasFocus){return true;}
e.stop();sliderOut.focus();var w=Event.wheel(e);if(w>0){moveRIGTH(5);}else if(w<0){moveLEFT(5);}};var updateValue=function(pos){var total=barWidth;if(parseInt(pos,10)<=3){element.value=0;}else{var a=Math.round((parseInt(pos,10)*options.maxValue)/total);element.value=parseInt(a,10);}
sliderOut.value=element.value===0?"":element.value;sliderTable.value=sliderOut.value;options.onUpdate(element.value);statTD.innerHTML=element.value;element.run('keyup');return element.value;};sliderOut.setStyle({width:options.width+'px',position:'relative',overflow:'hidden',outline:'none'});sliderBar.setStyle({border:'1px solid #999',background:'#eee',margin:'8px',overflow:'hidden',height:'3px'}).setCSSBorderRadius('4px');sliderButton.setStyle({position:'absolute',height:'13px',width:'13px',background:options.buttonBack,overflow:'hidden',border:'1px solid transparent',top:'3px',left:options.value+'px'}).setCSSBorderRadius('8px');startTD.setStyle({fontFamily:'Verdana',fontSize:'9px'});statTD.setStyle({fontFamily:'Verdana',fontSize:'9px'});endTD.setStyle({fontFamily:'Verdana',fontSize:'9px'});sliderOut.insert(sliderBar).insert(sliderButton);sliderTable.insert(tbody.insert(tr).insert(tr2));sliderTD.insert(sliderOut);tr.insert(sliderTD);tr2.insert(startTD).insert(statTD).insert(endTD);sliderButton.setDraggable({constraint:'horizontal',dragEffect:false,cursor:'default',constrainLeft:3,constrainRight:barWidth,onDrag:function(i){updateValue(i.getStyle('left'));}});sliderOut.observe('focus',function(){sliderOut.__hasFocus=true;sliderOut.setStyle({borderColor:'#333'});}).observe('blur',function(){sliderOut.__hasFocus=false;sliderOut.setStyle({borderColor:'#ccc'});});sliderOut.observe('keypress',sliderKeys).observe(Event.mousewheel,sliderWheel);sliderOut.observe('click',function(e){if(e.target.id==sliderButton.id){return false;}
var l=(Event.pointerX(e)-sliderBar.cumulativeOffset().left);l=l<3?3:l;l=l>barWidth?barWidth:l;sliderButton.shift({left:l,duration:0.5});updateValue(l);});var hidden=new Element('input',{type:'hidden',className:'form-slider',name:element.name,value:defaultValue,id:element.id});element.parentNode.replaceChild(hidden,element);element=hidden;$jot(hidden.parentNode).insert(sliderTable.setUnselectable());hidden.setSliderValue=function(val){var v=valueToPixel(val);sliderButton.shift({left:v,duration:0.5});updateValue(v);};return hidden;},spinner:function(element,options){element=$jot(element);options=Object.extend({width:60,cssFloat:false,allowNegative:false,addAmount:1,maxValue:false,minValue:false,readonly:false,value:false,size:5,imgPath:'images/',onChange:Prototype.K},options||{});element.size=options.size;if(options.value===false){element.value=parseFloat(element.value)||'0';}else{element.value=options.value;}
if(options.minValue)
{if(parseFloat(element.value)<parseFloat(options.minValue))
{element.value=options.minValue;}}
else if(!options.allowNegative&&parseFloat(element.value)<0)
{element.value='0';}
element.writeAttribute('autocomplete','off');var buttonStyles={height:'10px',cursor:'default',textAlign:'center',width:'7px',fontSize:'9px',paddingLeft:'4px',paddingRight:'2px',border:'1px solid #ccc',background:'#f5f5f5'};var spinnerContainer=new Element('div',{tabindex:'1'});if(options.cssFloat){spinnerContainer.setStyle({cssFloat:options.cssFloat,marginRight:'5px'});}
spinnerContainer.setStyle({width:options.width+"px"});var spinnerTable,tbody,tr,tr2,inputTD,upTD,downTD;spinnerTable=new Element('table',{className:'form-spinner',cellpadding:0,cellspacing:0,border:0,height:20,width:options.width});tbody=new Element('tbody').insert(tr=new Element('tr'));spinnerContainer.insert(spinnerTable);spinnerTable.insert(tbody);element.parentNode.replaceChild(spinnerContainer,element);tr.insert(inputTD=new Element('td',{className:'form-spinner-input-td',rowspan:2}).insert(element)).insert(upTD=new Element('td',{className:'form-spinner-up'}).insert(new Element('img',{src:options.imgPath+'bullet_arrow_up.png',align:'right',alt:'up arrow'})));tbody.insert(tr2=new Element('tr').insert(downTD=new Element('td',{className:'form-spinner-down'}).insert(new Element('img',{src:options.imgPath+'bullet_arrow_down.png',align:'right',alt:'down arrow'}))));spinnerTable.setStyle({border:'1px solid #ccc',borderCollapse:'collapse',background:'#fff'});upTD.setStyle(buttonStyles);downTD.setStyle(buttonStyles);inputTD.setStyle({paddingRight:'2px'});element.setStyle({height:'100%',width:'100%',border:'none',padding:'0px',fontSize:'14px',textAlign:'right',outline:'none'});var numberUP=function(e){if(element.hasAttribute("disabled")){return;}
if(!parseFloat(element.value)){element.value=0;}
if(options.maxValue&&Number(element.value)>=Number(options.maxValue)){return;}
var elementValueDP=parseInt(element.value)===parseFloat(element.value)?0:(element.value+'').split('.')[1].length;var addAmountDP=parseFloat(options.addAmount)===parseInt(options.addAmount)?0:(options.addAmount+'').split('.')[1].length;var decimalPoints=elementValueDP>addAmountDP?elementValueDP:addAmountDP;element.value=(parseFloat(element.value)+parseFloat(options.addAmount)).toFixed(decimalPoints);options.onChange(element.value);};var numberDOWN=function(e){if(element.hasAttribute("disabled")){return;}
if(!parseFloat(element.value)){element.value=0;}
var elementValueDP=parseInt(element.value)===parseFloat(element.value)?0:(element.value+'').split('.')[1].length;var addAmountDP=parseFloat(options.addAmount)===parseInt(options.addAmount)?0:(options.addAmount+'').split('.')[1].length;var decimalPoints=elementValueDP>addAmountDP?elementValueDP:addAmountDP;var newValue=(parseFloat(element.value)-parseFloat(options.addAmount)).toFixed(decimalPoints);if(options.minValue){if(Number(newValue)<Number(options.minValue)){return;}}
else if(!options.allowNegative&&newValue<0){return;}
element.value=newValue;options.onChange(element.value);};var spinnerKeys=function(e,mode){if(e.target.tagName=="INPUT"&&mode==2){return;}
e=document.getEvent(e);if(e.keyCode==38){numberUP(e);e.stop();}else if(e.keyCode==40){numberDOWN(e);e.stop();}};upTD.observe('click',function(e){numberUP(e);element.run('keyup');}).setUnselectable();downTD.observe('click',function(e){numberDOWN(e);element.run('keyup');}).setUnselectable();element.observe(Prototype.Browser.Gecko?'keypress':'keydown',function(e){spinnerKeys(e,1);});spinnerContainer.observe(Prototype.Browser.Gecko?'keypress':'keydown',function(e){spinnerKeys(e,2);});if(options.readonly){element.writeAttribute('readonly',"readonly");}
element.observe('change',function(){options.onChange(element.value);});return element;},miniLabel:function(element,label,options){options=Object.extend({position:'bottom',color:'#666',size:9,text:'',nobr:false},options||{});element.wrap('span');span=$jot(element.parentNode);span.setStyle({whiteSpace:'nowrap',cssFloat:'left',marginRight:'5px'});var labelStyle={paddingLeft:'1px',fontSize:options.size+"px",color:options.color,cursor:'default'};var labelClick=function(){element.focus();};var br='<br>';if(options.nobr){br='';}
if(options.position=="top"){element.insert({before:new Element('span').setText(label+br).setStyle(labelStyle).observe('click',labelClick)}).insert({after:options.text});}else{element.insert({after:new Element('span').setText(br+label).setStyle(labelStyle).observe('click',labelClick)}).insert({after:options.text});}
return span;},hint:function(element,value,options){element=$jot(element);if("placeholder"in element){element.writeAttribute('placeholder',value);return element;}
if(element.type=='number'){element.value="0";return element;}
if(element.removeHint){return element.hintClear();}
options=Object.extend({hintColor:'#bbb'},options||{});var color=element.getStyle('color')||'#000';if(element.value===''){element.setStyle({color:options.hintColor});element.value=value;element.hinted=true;}
var focus=function(){if(element.value==value){element.value="";element.setStyle({color:color}).hinted=false;}else if(element.readAttribute("masked")=="true"){element.setStyle({color:color}).hinted=false;}};var blur=function(){setTimeout(function(){if(element.value===""){element.value=value;element.setStyle({color:options.hintColor}).hinted=true;}},element.readAttribute("masked")=="true"?10:0);};if(element.readAttribute("masked")=="true"){element.observe('mouseleave',blur);}
var submit=function(){if(element.value==value){element.value="";element.hinted=false;}};element.observe('focus',focus);element.observe('blur',blur);if(element.form){$jot(element.form).observe('submit',submit);}
element.runHint=blur;element.clearHint=function(){element.value="";element.setStyle({color:color}).hinted=false;};element.hintClear=function(){element.value=value;element.setStyle({color:options.hintColor}).hinted=true;return element;};element.removeHint=function(){element.setStyle({color:color});if(element.value==value){element.value="";}
element.hintClear=undefined;element.hinted=undefined;element.removeHint=undefined;element.stopObserving('focus',focus);element.stopObserving('blur',blur);if(element.form){$jot(element.form).stopObserving('submit',submit);}
return element;};return element;}};Element.addMethods(Protoplus.ui);;var JotForm={url:"//www.jotform.com/",server:"//www.jotform.com/server.php",conditions:{},calculations:{},condValues:{},progressBar:false,forms:[],saveForm:false,imageFiles:["png","jpg","jpeg","ico","tiff","bmp","gif","apng","jp2","jfif"],autoCompletes:{},defaultValues:{},debug:false,highlightInputs:true,noJump:false,initializing:true,lastFocus:false,payment:false,fieldsToPreserve:[],saving:false,loadingPendingSubmission:false,sessionID:null,submissionToken:null,submissionID:null,texts:{confirmEmail:'E-mail does not match',pleaseWait:'Please wait...',confirmClearForm:'Are you sure you want to clear the form',lessThan:'Your score should be less than or equal to',incompleteFields:'There are incomplete required fields. Please complete them.',required:'This field is required.',requireOne:'At least one field required.',requireEveryRow:'Every row is required.',requireEveryCell:'Every cell is required.',email:'Enter a valid e-mail address',alphabetic:'This field can only contain letters',numeric:'This field can only contain numeric values',alphanumeric:'This field can only contain letters and numbers.',cyrillic:'This field can only contain cyrillic characters',url:'This field can only contain a valid URL',currency:'This field can only contain currency values.',fillMask:'Field value must fill mask.',uploadExtensions:'You can only upload following files:',noUploadExtensions:'File has no extension file type (e.g. .txt, .png, .jpeg)',uploadFilesize:'File size cannot be bigger than:',uploadFilesizemin:'File size cannot be smaller than:',gradingScoreError:'Score total should only be less than or equal to',inputCarretErrorA:'Input should not be less than the minimum value:',inputCarretErrorB:'Input should not be greater than the maximum value:',maxDigitsError:'The maximum digits allowed is',freeEmailError:'Free email accounts are not allowed',minSelectionsError:'The minimum required number of selections is ',maxSelectionsError:'The maximum number of selections allowed is ',pastDatesDisallowed:'Date must not be in the past.',dateLimited:'This date is unavailable.',dateInvalid:'This date is not valid. The date format is {format}',dateInvalidSeparate:'This date is not valid. Enter a valid {element}.',multipleFileUploads_typeError:'{file} has invalid extension. Only {extensions} are allowed.',multipleFileUploads_sizeError:'{file} is too large, maximum file size is {sizeLimit}.',multipleFileUploads_minSizeError:'{file} is too small, minimum file size is {minSizeLimit}.',multipleFileUploads_emptyError:'{file} is empty, please select files again without it.',multipleFileUploads_uploadFailed:'File upload failed, please remove it and upload the file again.',multipleFileUploads_onLeave:'The files are being uploaded, if you leave now the upload will be cancelled.',multipleFileUploads_fileLimitError:'Only {fileLimit} file uploads allowed.',generalError:'There are errors on the form. Please fix them before continuing.',generalPageError:'There are errors on this page. Please fix them before continuing.',wordLimitError:'Too many words. The limit is',wordMinLimitError:'Too few words.  The minimum is',characterLimitError:'Too many Characters.  The limit is',characterMinLimitError:'Too few characters. The minimum is',ccInvalidNumber:'Credit Card Number is invalid.',ccInvalidCVC:'CVC number is invalid.',ccInvalidExpireDate:'Expire date is invalid.',ccMissingDetails:'Please fill up the credit card details.',ccMissingProduct:'Please select at least one product.',ccMissingDonation:'Please enter numeric values for donation amount.',disallowDecimals:'Please enter a whole number.',ccDonationMinLimitError:'Minimum amount is {minAmount} {currency}'},paymentTexts:{couponApply:'Apply',couponChange:'Change',couponEnter:'Enter Coupon',couponExpired:'Coupon is expired. Please try another one.',couponInvalid:'Coupon is invalid. Please try another one.',couponValid:'Coupon is valid.',couponBlank:'Please enter a coupon.',shippingShipping:'Shipping',totalTotal:'Total',totalSubtotal:'Subtotal',taxTax:'Tax'},paymentFields:['control_stripe','control_paymill','control_payment','control_paypal','control_paypalexpress','control_paypalpro','control_clickbank','control_2co','control_googleco','control_worldpay','control_onebip','control_authnet','control_dwolla','control_braintree','control_square','control_boxpayment','control_eway'],isEncrypted:false,tempUploadFolderInjected:false,encryptAll:function(e,callback){e.stop();var ignoredFields=['control_captcha','control_paypal','control_stripe','control_2co','control_paypalexpress','control_authnet','control_paypalpro','control_paymill','control_braintree','control_dwolla','control_payment','control_square','control_boxpayment','control_eway','control_bluepay','control_worldpay','control_firstdata','control_payjunction','control_worldpayus','control_wepay','control_chargify','control_cardconnect','control_echeck','control_bluesnap'];var sendAsHiddenField=["control_number","control_spinner","control_email","control_dropdown","control_datetime","control_matrix","control_birthdate","control_time","control_scale",];var selfSubmitFields=["control_stripe","control_braintree","control_square","control_eway","control_bluepay","control_wepay"];var submitFormAfterEncrypt=true;var alreadyEncrypted=[];document.querySelectorAll('.form-textbox, .form-textarea, .form-radio, .form-checkbox, .form-dropdown, .form-number-input').each(function(field){var fieldLine=field.up('li');if(!fieldLine){return;}
var fieldType=fieldLine.readAttribute('data-type');var fieldId=field.id.replace(/[^_]+_(\d+)(.+)?/,'$jot1');var encryptedFieldName=field.name;if(selfSubmitFields.indexOf(fieldType)>-1&&JotForm.paymentTotal>0){submitFormAfterEncrypt=false;}
if(ignoredFields.indexOf(fieldType)!==-1){return;}
if(['form-checkbox','form-radio'].include(field.className)){if(!field.checked){return;}
encryptedFieldName=field.name+'_'+field.id.replace(/.+_([0-9]+$jot)/,'$jot1');}
if(fieldType=='control_matrix'&&['checkbox','radio'].include(field.type)){return;}
if(alreadyEncrypted.indexOf(encryptedFieldName)!==-1&&(!field.up().hasClassName('form-matrix-values')&&!field.up(1).hasClassName('form-matrix-values'))||field.value===undefined||(field.value.length>300&&field.value.indexOf('==')==field.value.length-2))
{return;}
var isUniqueField=JotForm.uniqueField&&JotForm.uniqueField==field.id.replace(/\w+_(\d+)(.+)?/,'$jot1');if(JotForm.fieldsToPreserve.indexOf(fieldId)>-1||isUniqueField){var name=field.name.replace(/(\w+)(\[\w+\])?/,"$jot1_unencrypted$jot2");JotForm.forms[0].insert(new Element('input',{type:'hidden',name:name}).putValue(field.value));}
var encryptedAnswer=JotEncrypted.encrypt(field.value);alreadyEncrypted.push(encryptedFieldName);if(fieldType=="control_textarea"){var allFields=document.querySelectorAll('[name="'+field.name+'"]');for(x=0;x<allFields.length;x++){allFields[x].value=encryptedAnswer;}
return;}
if(sendAsHiddenField.indexOf(fieldType)!==-1||field.tagName=="SELECT"){if(fieldType=="control_scale"&&!field.checked){alreadyEncrypted=alreadyEncrypted.filter(function(enc){return enc!==field.name});return;}
var form=document.querySelectorAll('.jotform-form')[0];form.insert(new Element('input',{type:'hidden',name:field.name}).putValue(encryptedAnswer));if(fieldType=='control_matrix'){field.name="";}
return;}
if(field.getAttribute('data-masked')){var maskValue=field.getAttribute('maskvalue');JotForm.setQuestionMasking(field,'',maskValue,true);}
field.value=encryptedAnswer;});callback(submitFormAfterEncrypt);},getServerURL:function(){var form=document.querySelectorAll('.jotform-form')[0];var action;var origin=window.location.origin||(window.location.protocol+'//'+window.location.hostname);if(form){if(origin.include('.jotform.pro')){this.server=origin+"/server.php";this.url=origin;return;}
if((action=form.readAttribute('action'))){if(action.include('submit.php')||action.include('server.php')){var n=!action.include('server.php')?"submit":"server";this.server=action.replace(n+'.php','server.php');this.url=action.replace(n+'.php','');}else{var d=action.replace(/\/submit\/.*?$jot/,'/');if(action.include('pci.jotform.com')){d=d.replace('pci.','submit.');}
this.server=d+'server.php';this.url=d;}}}},alterTexts:function(newTexts,payment){if(payment&&!!newTexts){Object.extend(this.paymentTexts,newTexts);this.changePaymentStrings(newTexts);}else{Object.extend(this.texts,newTexts||{});}},ie:function(){var undef,v=3,div=document.createElement('div'),all=div.getElementsByTagName('i');while(div.innerHTML='<!--[if gt IE '+(++v)+']><i></i><![endif]-->',all[0]);return v>4?v:undef;},createConsole:function(){var consoleFunc=['log','info','warn','error'];$jotA(consoleFunc).each(function(c){this[c]=function(){if(JotForm.debug){if('console'in window){try{console[c].apply(this,arguments);}catch(e){if(typeof arguments[0]=="string"){console.log(c.toUpperCase()+": "+$jotA(arguments).join(', '));}else{if(Prototype.Browser.IE){alert(c+": "+arguments[0]);}else{console[c](arguments[0]);}}}}}};}.bind(this));if(JotForm.debug){JotForm.debugOptions=document.readJsonCookie('debug_options');}},init:function(callback){var ready=function(){try{this.populateGet();if(document.get.debug=="1"){this.debug=true;}
this.createConsole();this.getServerURL();this.checkJSON();if(callback){callback();}
if(window.location.href.indexOf("/edit/")!==-1){document.get.sid=window.location.href.split("/").last();this.editMode();}
if((document.get.mode=="edit"||document.get.mode=="inlineEdit"||document.get.mode=='submissionToPDF')&&document.get.sid){this.editMode();}
this.noJump=("nojump"in document.get);this.uniqueID=this.uniqid();this.sessionID=('session'in document.get)&&(document.get.session.length>0)?document.get.session:false;this.submissionToken=('stoken'in document.get)&&(document.get.stoken.length>0)?document.get.stoken:false;this.submissionID=('sid'in document.get)&&(document.get.sid.length>0)?document.get.sid:false;this.handleSavedForm();this.setTitle();this.setHTMLClass();this.getDefaults();if(this.noJump){window.parent.postMessage("removeIframeOnloadAttr",'*');}
if(document.querySelectorAll('input[name="simple_fpc"]').length>0){this.payment=document.querySelectorAll('input[name="simple_fpc"]')[0].getAttribute('data-payment_type');}
if(!!document.querySelectorAll('.form-product-custom_price').length){this.handleSubscriptionPrice();}
if(this.payment==="paypalpro"){this.handlePaypalPro();}
if(this.payment==="braintree"){this.handleBraintree();}
if(this.payment==="square"){this.handleSquare();}
if(this.payment==="authnet"){this.handleAuthNet();}
if(this.payment==="paypalexpress"){this.handlePaypalExpress();}
if($jot('coupon-button')){this.handleCoupon();}
if(document.querySelectorAll('.paypal-button').length>0&&$jot('use_paypal_button')){this.handlePaypalButtons();}
this.handleFormCollapse();this.handlePages();this.checkEmbed();if(document.querySelectorAll('.form-product-has-subproducts').length>0){this.handlePaymentSubProducts();}
if(window.parent&&window.parent!=window){var queryString=document.referrer&&document.referrer.split('?')[1]||'';if(queryString.indexOf('disableSmartEmbed')>-1){document.querySelectorAll('.isSmartEmbed').each(function(el){el.removeClassName('isSmartEmbed');});}
this.handleIFrameHeight();if(!!document.querySelectorAll('li[data-type="control_captcha"]').length){var captchaInterval=setInterval(function(){if($jot('recaptcha_challenge_image')){clearInterval(captchaInterval);JotForm.handleIFrameHeight();}},500);}}else{document.querySelectorAll('.isSmartEmbed').each(function(el){el.removeClassName('isSmartEmbed');});}
Element.prototype.triggerEvent=function(eventName){var disabled=this.hasClassName('form-dropdown')&&this.disabled?!!(this.enable()):false;if(document.createEvent){var evt=document.createEvent('HTMLEvents');evt.initEvent(eventName,true,true);this.dispatchEvent(evt);}else if(this.fireEvent){this.fireEvent('on'+eventName);}
if(disabled){this.disable();}}
this.jumpToPage();this.highLightLines();this.setButtonActions();this.initGradingInputs();this.initSpinnerInputs();this.initNumberInputs();this.setConditionEvents();this.setCalculationEvents();this.runAllCalculations();this.setCalculationResultReadOnly();this.prePopulations();this.handleAutoCompletes();this.handleTextareaLimits();this.handleDateTimeChecks();this.handleOtherOptions();this.setFocusEvents();this.disableAcceptonChrome();this.handleScreenshot();$jotA(document.forms).each(function(form){if(form.name=="form_"+form.id||form.name=="q_form_"+form.id){this.forms.push(form);}}.bind(this));var hasCaptcha=document.querySelectorAll('div[id^=recaptcha_input]').length;if(!hasCaptcha||document.querySelectorAll('*[class*="validate"]').length>hasCaptcha){this.validator();}
this.fixIESubmitURL();this.disableHTML5FormValidation();if($jot('progressBar')){this.setupProgressBar();}
if(document.querySelectorAll('input[id*="_donation"]').length>0){this.handleDonationAmount();}
if(getQuerystring('nosubmit')){document.querySelectorAll('.form-submit-button').each(function(b){b.disable();});}
if(getQuerystring('displayAllSections')){var sections=document.querySelectorAll('.form-section');sections.each(function(section){section.setStyle({display:'block'});});}
if(!!navigator.userAgent.match(/iPhone|iPad/g)){window.onpageshow=function(e){if(e.persisted){JotForm.enableButtons();}}}
var isPreview=getQuerystring('preview');isPreview=isPreview?isPreview==='true':false;if(isPreview){this.handlePreview(getQuerystring('filled')==='true');}else if(this.initializing){this.track();}
this.additionalActionsFormEmbedded();if(JotForm.showJotFormLogo){if(window.FORM_MODE&&window.FORM_MODE=='cardform')return;var formAll=document.querySelectorAll('.form-all')[0];if(formAll){var _formID=document.querySelectorAll('input[name="formID"]')[0].value;var colorScheme='orange';var primaryTextColor='#f38632';var secondaryTextColor='#aaa';var primaryImgSrc='//cdn.jotfor.ms/img/jot-logo-orange.png?v3';var primaryBgColor='#fff';if(colorScheme==='white'){primaryTextColor='#fff';secondaryTextColor='#fff';primaryImgSrc='//cdn.jotfor.ms/img/jot-logo-white.png?v2';primaryBgColor='#f38632';}
var bannerWrapper=document.createElement('div');bannerWrapper.className='jotform-ad'
bannerWrapper.style.overflow='hidden';bannerWrapper.style.borderTop='1px solid #eee';bannerWrapper.style.padding='0 18px';bannerWrapper.style.textDecoration='none';bannerWrapper.style.fontFamily='"Lucida Grande", "Lucida Sans", "Lucida Sans Unicode", sans-serif';bannerWrapper.style.fontSize='12px';bannerWrapper.style.color=secondaryTextColor
bannerWrapper.style.background=primaryBgColor;var bannerImgLink=document.createElement('a');bannerImgLink.href='https://www.jotform.com/?utm_source=formfooter&utm_medium=banner&utm_term='+_formID+'&utm_content=form_footer_banner&utm_campaign=form_footer_signup_hp';bannerImgLink.target='_blank';bannerImgLink.setText('Powered by');bannerImgLink.style.lineHeight='48px';bannerImgLink.style.float='left';bannerImgLink.style.textDecoration='none';var bannerImg=document.createElement('img');bannerImg.src=primaryImgSrc;bannerImg.alt='JotForm';bannerImg.style.height='23px';bannerImg.style.width='100px';bannerImg.style.marginLeft='3px';bannerImg.style.marginTop='-1px';bannerImg.style.display='inline-block';bannerImg.style.verticalAlign='middle';bannerImg.style.border='none';bannerImgLink.appendChild(bannerImg);bannerTextLink=document.createElement('a');bannerTextLink.target='_blank';bannerTextLink.href='https://www.jotform.com/signup?utm_source=formfooter&utm_medium=banner&utm_term='+_formID+'&utm_content=form_footer_text&utm_campaign=form_footer_signup';bannerTextLink.style.float='right';bannerTextLink.style.color=primaryTextColor;bannerTextLink.style.lineHeight='48px';bannerTextLink.setText('Create your own form today!');bannerWrapper.appendChild(bannerImgLink);bannerWrapper.appendChild(bannerTextLink);formAll.appendChild(bannerWrapper);}}
var constructFooterPowered=function(){var _form=document.querySelectorAll('.jotform-form')[0];var _formID=_form.getAttribute('id');var footerHeightMask=document.createElement('div');footerHeightMask.className='formFooter-heightMask';var footer=document.createElement('div');footer.className='formFooter';var logoLink=document.createElement('a');logoLink.href='https://www.jotform.com/signup?utm_source=formfooter&utm_medium=banner&utm_term='+_formID+'&utm_content=jotform_logo&utm_campaign=powered_by_jotform_signup';logoLink.target='_blank';logoLink.className='formFooter-logoLink';var footerLogo=document.createElement('img');footerLogo.className='formFooter-logo';footerLogo.src='https://cdn.jotfor.ms/assets/img/logo/logo-new@1x.png';footerLogo.style.height='44px';footerLogo.alt='';var footerRightSide=document.createElement('div');footerRightSide.className='formFooter-rightSide';var footerText=document.createElement('span');footerText.className='formFooter-text';footerText.innerText="Now create your own JotForm - It's free!";var footerButton=document.createElement('a');footerButton.className='formFooter-button';footerButton.href='https://www.jotform.com/signup?utm_source=formfooter&utm_medium=banner&utm_term='+_formID+'&utm_content=jotform_button&utm_campaign=powered_by_jotform_signup';footerButton.target='_blank';footerButton.innerText='Create your own JotForm';logoLink.appendChild(footerLogo);footerRightSide.appendChild(footerText);footerRightSide.appendChild(footerButton);footer.appendChild(logoLink);footer.appendChild(footerRightSide);document.body.appendChild(footerHeightMask);document.body.appendChild(footer);}
var constructSubmitBanner=function(){var button=document.querySelector('.form-submit-button');if(button!==null){var _form=document.querySelectorAll('.jotform-form')[0];var _formID=_form.getAttribute('id');var buttonWrapper=button.parentNode;var banner=document.createElement('a');banner.target='_blank';banner.href='https://www.jotform.com/?utm_source=powered_by_jotform&utm_medium=banner&utm_term='+_formID+'&utm_content=powered_by_jotform_text&utm_campaign=powered_by_jotform_signup_hp';banner.setText('Powered by JotForm');banner.style.display='inline-block';banner.style.textDecoration='none';var fontColor='#000000';var fontFamily='';var sampleLabel=document.querySelector('.form-label');if(sampleLabel!==null){fontColor=getComputedStyle(document.querySelector('.form-label')).color;fontFamily=getComputedStyle(document.querySelector('.form-label')).fontFamily;}
banner.style.opacity=0.8;banner.style.webkitFontSmoothing='antialiased';banner.style.color=fontColor;banner.style.fontFamily=fontFamily;banner.style.fontSize='11px';banner.className='jf-branding';var brEl=document.createElement('br');buttonWrapper.appendChild(brEl);buttonWrapper.appendChild(banner);if(getComputedStyle(buttonWrapper).textAlign!=='center'){var linkDimensions=banner.getBoundingClientRect();var buttonDimensions=button.getBoundingClientRect();var mr=Math.abs((linkDimensions.width-buttonDimensions.width)/2);if(linkDimensions.width>buttonDimensions.width){banner.style.marginLeft='-'+mr+'px';}else{banner.style.marginLeft=mr+'px';}}}}
if(JotForm.showJotFormPowered=="old_footer"){constructSubmitBanner();}}catch(err){JotForm.error(err);}
this.initializing=false;}.bind(this);if(document.readyState=='complete'||(this.jsForm&&(document.readyState===undefined||document.readyState==='interactive'))){ready();}else{document.ready(ready);}},iframeRezizeTimeout:null,iframeHeightCaller:function(){if(window.parent&&window.parent!=window){clearTimeout(this.iframeRezizeTimeout);this.iframeRezizeTimeout=setTimeout((function(){this.handleIFrameHeight();}).bind(this),50);}},handleIFrameHeight:function(){var form=document.querySelectorAll('.jotform-form').length>0?document.querySelectorAll('.jotform-form')[0]:document.querySelectorAll('body')[0];var height=Math.max(form.getHeight(),form.scrollHeight,form.offsetHeight);height=(document.title==='Please Complete')?300:height;if(window.FORM_MODE==='cardform'){$jot(document.body).addClassName('isEmbed');var nextHeight=0;var hasWelcome=$jot(document.body).hasClassName('welcomeMode');var welcomeModeHeight=0;if(hasWelcome){var welcomeModeWrapper=document.querySelectorAll('.welcomeMode .jfWelcome-wrapper');if(welcomeModeWrapper.length>0){welcomeModeHeight=welcomeModeWrapper[0].getHeight();var additionalPadding=100;welcomeModeHeight=welcomeModeHeight+additionalPadding;}}
var welcomeDescriptionHeight=0;var welcomeModeWrapper=document.querySelectorAll('.welcomeMode');if(welcomeModeWrapper.length>0&&window.innerWidth>768){welcomeDescriptionHeight=60;}
var formModeWrapperHeight=welcomeDescriptionHeight;var formModeWrapper=document.querySelectorAll('.jfWelcome-header');if(formModeWrapper.length>0){formModeWrapperHeight+=(formModeWrapper[0]).getHeight();}
var maxQFieldsHeight=0;document.querySelectorAll('.jfQuestion-fields').each(function(field){maxQFieldsHeight=Math.max(field.getHeight(),maxQFieldsHeight);});var maxCardHeight=0;document.querySelectorAll('.jfCard').forEach(function(card){var children=card.getElementsBySelector('.jfQuestion-label, .jfQuestion-description');var childrenHeight=0;children.forEach(function(child){childrenHeight=childrenHeight+child.getHeight();});return Math.max(maxCardHeight,childrenHeight);},0);var jfCard=document.querySelector('jfCard');if(jfCard){var emInPx=jfCard.getStyle("fontSize").slice(0,-2);var approxSpacingsInEm=8.725;var spacingsInPx=emInPx*approxSpacingsInEm;var formHeight=(((formModeWrapperHeight*2)+maxCardHeight)+spacingsInPx)*(50/29);}
var isSmartEmbed=$jot(document.body).hasClassName('isSmartEmbed');if(isSmartEmbed){try{var formFrame=window.parent.document.querySelector('[id="'+form.id+'"], [id="JotFormIFrame-'+form.id+'"]');if(formFrame&&formFrame.hasAttribute('data-frameHeight')){height=formFrame.getAttribute('data-frameHeight');}else{height=464;}}catch(e){height=464;}}else{height=640;}}
if("console"in window){if("log"in console&&JotForm.debug){console.log('Debug : setting height to ',height,' from iframe');}}
window.parent.postMessage('setHeight:'+height+':'+form.id,'*');},removeCover:function(){document.querySelectorAll('.form-cover-wrapper').each(function(el){el.remove();});document.querySelectorAll('.form-all').each(function(el){el.removeClassName('top-cover').removeClassName('left-cover').removeClassName('right-cover');});},fixIESubmitURL:function(){try{if(this.ie()<=8&&navigator.appVersion.indexOf('NT 5.')){$jotA(this.forms).each(function(form){if(form.action.include("s://submit.")){form.action=form.action.replace(/\/\/submit\..*?\//,"//secure.jotform.com/");}});}}catch(e){}},screenshot:false,passive:false,onprogress:false,compact:false,imageSaved:false,handleScreenshot:function(){var $jotthis=this;setTimeout(function(){document.querySelectorAll('.form-screen-button').each(function(button){if(window.parent&&window.parent.JotformFeedbackManager){$jotthis.getContainer(button).show();button.observe('click',function(){$jotthis.passive=false;try{$jotthis.takeScreenShot(button.id.replace('button_',''));}catch(e){console.error(e);}});setTimeout(function(){$jotthis.passive=!window.parent.wishboxInstantLoad;$jotthis.takeScreenShot(button.id.replace('button_',''));},0);}});},300);},getCharset:function(doc){if(!doc){doc=document;}
return doc.characterSet||doc.defaultCharset||doc.charset||'UTF-8';},bytesToSize:function(bytes,precision){var sizes=['B','KB','MB','GB','TB'];var posttxt=0;if(bytes==0)return'n/a';if(bytes<1024){return Number(bytes)+" "+sizes[posttxt];}
while(bytes>=1024){posttxt++;bytes=bytes/1024;}
return bytes.toFixed(precision||2)+" "+sizes[posttxt];},disableHTML5FormValidation:function(){document.querySelectorAll("form").each(function(f){f.setAttribute("novalidate",true);});},takeScreenShot:function(id){var p=window.parent;var pleaseWait='<div id="js_loading" '+'style="position:fixed; z-index:10000000; text-align:center; '+'background:#333; border-radius:5px; top: 20px; right: 20px; '+'padding:10px; box-shadow:0 0 5 rgba(0,0,0,0.5);">'+'<img src="'+this.url+'images/loader-black.gif" />'+'<div style="font-family:verdana; font-size:12px;color:#fff;">'+'Please Wait'+'</div></div>';if(this.onprogress){p.$jotjot(pleaseWait).appendTo('body');return;}
if(p.wishboxCompactLoad){this.compact=true;}
if(this.screenshot){if(this.compact){p.$jotjot('.jt-dimmer').hide();}else{p.$jotjot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').hide();}
p.jotformScreenshotURL=this.screenshot.data;this.injectEditor(this.screenshot.data,this.screenshot.shotURL);return;}
this.scuniq=JotForm.uniqid();this.scID=id;var f=JotForm.getForm($jot('button_'+this.scID));this.sformID=f.formID.value;this.onprogress=true;var $jotthis=this;this.wishboxServer='https://screenshots.jotform.com/wishbox-server.php';var form=new Element('form',{action:this.wishboxServer,target:'screen_frame',id:'screen_form',method:'post',"accept-charset":'utf-8'}).hide();var doc='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" >';p.$jotjot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').hide();p.$jotjot('.hide-on-screenshot, .hide-on-screenshot *').css({'visibility':'hidden'});var parentSource=p.document.getElementsByTagName('html')[0].innerHTML;parentSource=parentSource.replace(/(<noscript\b[^>]*>.*?<\/noscript>)+/gim,'');parentSource=parentSource.replace(/(<noscript\b[^>]*>(\s+.*\s+)+)+<\/noscript>/gim,'');p.$jotjot('.hide-on-screenshot, .hide-on-screenshot *').css({'visibility':'visible'});parentSource=parentSource.replace(/(\<\/head\>)/gim,"<style>body,html{ min-height: 800px; }</style>$jot1");var ie=$jotthis.ie();if(ie!==undefined&&ie<9){parentSource=parentSource.replace(/(\<\/head\>)/gim,"<style>*{ border-radius:0 !important; text-shadow:none !important; box-shadow:none !important; }</style>$jot1");}
if(this.passive){p.$jotjot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').show();}else{p.$jotjot('.jotform-feedback-link').show();p.$jotjot(pleaseWait).appendTo('body');}
var html=new Element('textarea',{name:'html'});var nozip=this.getCharset(p.document).toLowerCase()!=='utf-8';if(nozip){html.value=encodeURIComponent(doc+parentSource+"</html>");form.insert(new Element('input',{type:'hidden',name:'nozip'}).putValue("1"));}else{form.insert(new Element('input',{type:'hidden',name:'nozip'}).putValue("0"));html.value=encodeURIComponent(p.$jotjot.jSEND((doc+parentSource+"</html>")));}
var charset=new Element('input',{type:'hidden',name:'charset'}).putValue(this.getCharset(p.document));var height=new Element('input',{type:'hidden',name:'height'}).putValue(parseFloat(p.$jotjot(p).height()));var scrollTop=new Element('input',{type:'hidden',name:'scrollTop'}).putValue(p.$jotjot(p).scrollTop());var url=new Element('input',{type:'hidden',name:'url'}).putValue(p.location.href);var uid=new Element('input',{type:'hidden',name:'uniqID'}).putValue(this.scuniq);var fid=new Element('input',{type:'hidden',name:'formID'}).putValue(this.sformID);var action=new Element('input',{type:'hidden',name:'action'}).putValue("getScreenshot");var iframe=new Element('iframe',{name:'screen_frame',id:'screen_frame_id'}).hide();iframe.observe('load',function(){$jotthis.checkScreenShot();});if(p.wishboxInstantLoad&&(ie===undefined||ie>8)){this.injectEditor(false,false);}
form.insert(html).insert(height).insert(scrollTop).insert(action).insert(uid).insert(url).insert(fid).insert(charset);$jot(document.body).insert(form).insert(iframe);form.submit();},checkJSON:function(){if(typeof JSON!=='object'){var script=document.createElement('script');script.type="text/javascript";script.src="/js/vendor/json2.js";$jot(document.body).appendChild(script);}},checkScreenShot:function(){var $jotthis=this;var p=window.parent;var count=10;p.$jotjot.getJSON('https://screenshots.jotform.com/queue/'+this.scuniq+'?callback=?',function(data){if(data.success===true){p.$jotjot.getJSON(data.dataURL+'?callback=?',function(res){if($jotthis.passive===false){p.jotformScreenshotURL=res.data;$jotthis.injectEditor(res.data,res.shotURL);}
$jotthis.screenshot=res;$jotthis.onprogress=false;$jot('screen_form')&&$jot('screen_form').remove();$jot('screen_frame_id')&&$jot('screen_frame_id').remove();});}else{if((data.status=='waiting'||data.status=='working')&&--count){setTimeout(function(){$jotthis.checkScreenShot();},1000);}else{alert('We are under heavy load right now. Please try again later.');p.$jotjot('.jt-dimmer, .jotform-feedback-link').show();p.$jotjot('.jt-feedback').show('slow');}}});},injectEditor:function(data,url){if(this.injected){return;}
this.injected=true;var $jotthis=this;var p=window.parent;p.$jotjot('#js_loading').remove();p.$jotjot.getJSON(this.server+'?callback=?',{action:'getScreenEditorTemplate',compact:this.compact},function(res){var iff='<iframe allowtransparency="true" id="wishbox-frame" src="" '+'frameborder="0" style="display:none;border:none;display:block; ';if(!$jotthis.compact){iff+='position:fixed;top:0;width:100%;height:100%;left:0;z-index:100000000;';}else{iff+=('position:absolute;left:0;top:10px;height:'+(p.$jotjot(p).height()-120)+'px;width:'+((p.$jotjot(p).width()-100)-p.$jotjot('#js-form-content').width())+'px;');}
iff+='" scrolling="no"></iframe>';var editorFrame;p.iframeWidth=((p.$jotjot(p).width()-100)-p.$jotjot('#js-form-content').width());p.iframeHeight=(p.$jotjot(p).height()-120);if($jotthis.compact){editorFrame=p.$jotjot(iff).insertBefore('#js-form-content');}else{editorFrame=p.$jotjot(iff).appendTo('body');}
if($jotthis.compact){p.$jotjot('#js-form-content').css({'float':'right'});}
var ie=$jotthis.ie();if(ie!==undefined&&ie<9){editorFrame.attr('src','https://screenshots.jotform.com/opt/templates/screen_editor.html?shot='+url+'&uniq='+$jotthis.scuniq);var b=p.$jotjot('<button style="color:#fff;font-size:14px;background:#F59202;border:1px solid #Fa98a2;font-weight:bold;position:fixed;top:5px;right:40px;width:100px;z-index:100000001;">Close Editor</button>').appendTo('body');b.click(function(){p.$jotjot.getJSON('https://screenshots.jotform.com/wishbox-server.php?callback=?',{action:'getImage',uniqID:$jotthis.scuniq},function(res){if(!res.success){if(confirm('You haven\'t save your edits. Are you sure you want to close the editor?')){closeFrame();b.remove();}}else{closeFrame();b.remove();putImageOnForm(res.data,res.shotURL);}});});}else{var e=editorFrame[0];var frameDocument=(e.contentWindow)?e.contentWindow:(e.contentDocument.document)?e.contentDocument.document:e.contentDocument;frameDocument.document.open();frameDocument.document.write(res.template);setTimeout(function(){frameDocument.document.close();},200);p.jotformScreenshotURL=data;}
var closeFrame=function(){if($jotthis.compact){editorFrame.remove();p.$jotjot('#js-form-content').css('width','100%');}else{editorFrame.hide('slow',function(){editorFrame.remove();});}
$jotthis.injected=false;p.$jotjot('.jt-dimmer, .jotform-feedback-link').show();p.$jotjot('.jt-feedback').show('slow');};var putImageOnForm=function(image,url){$jot('screen_'+$jotthis.scID).update('<img width="100%" align="center" src="'+(url?url:image)+'" />');$jot('data_'+$jotthis.scID).value=image;$jot('screen_'+$jotthis.scID).up().show();};p.JotformCancelEditor=function(){closeFrame();};p.JotformFinishEditing=function(image){closeFrame();putImageOnForm(image);$jotthis.imageSaved=true;if($jotthis.compact){setTimeout(function(){$jot(document).fire('image:loaded');},100);}};});},populateGet:function(){try{if('FrameBuilder'in window.parent&&"get"in window.parent.FrameBuilder&&window.parent.FrameBuilder.get!=[]){var outVals={};var getVals=window.parent.FrameBuilder.get;$jotH(getVals).each(function(pair){if(typeof pair[1]==='object'){for(prop in pair[1]){outVals[pair[0]+"["+prop+"]"]=pair[1][prop];}}else{outVals[pair[0]]=pair[1];}});document.get=Object.extend(document.get,outVals);}}catch(e){}},uniqid:function(prefix,more_entropy){if(typeof prefix=='undefined'){prefix="";}
var retId;var formatSeed=function(seed,reqWidth){seed=parseInt(seed,10).toString(16);if(reqWidth<seed.length){return seed.slice(seed.length-reqWidth);}
if(reqWidth>seed.length){return Array(1+(reqWidth-seed.length)).join('0')+seed;}
return seed;};if(!this.php_js){this.php_js={};}
if(!this.php_js.uniqidSeed){this.php_js.uniqidSeed=Math.floor(Math.random()*0x75bcd15);}
this.php_js.uniqidSeed++;retId=prefix;retId+=formatSeed(parseInt(new Date().getTime()/1000,10),8);retId+=formatSeed(this.php_js.uniqidSeed,5);if(more_entropy){retId+=(Math.random()*10).toFixed(8).toString();}
return retId;},initMultipleUploads:function(){var self=this;document.querySelectorAll('.form-upload-multiple').each(function(file){var parent=file.up('div');var f=JotForm.getForm(file);var formID=f.formID.value;var uniq=formID+"_"+JotForm.uniqueID;parent.addClassName('validate[multipleUpload]');var className=file.className;if(className.include("validate[required]")){if(parent.className.indexOf("validate[required]")===-1){parent.addClassName("validate[required]");}
parent.validateInput=function(){if(!JotForm.isVisible(parent)){JotForm.corrected(parent);return true;}
var fileList=parent.select('.qq-upload-list li');if(fileList.length<1){if(parent.match('[class*=validate[required]]')){JotForm.corrected(parent);return JotForm.errored(parent,JotForm.texts.required);}else{JotForm.corrected(parent);return true;}}else{var status=true;fileList.each(function(elem){if(elem.getAttribute('class').indexOf('fail')>=0){status=false;}});if(status){JotForm.corrected(parent);return true;}else{JotForm.errored(parent,JotForm.texts.multipleFileUploads_uploadFailed);return false;}}};}else{parent.validateInput=function(){var fileList=parent.select('.qq-upload-list li');var status=true;fileList.each(function(elem){if(elem.getAttribute('class').indexOf('fail')>=0){status=false;}});if(status){JotForm.corrected(parent);return true;}else{JotForm.errored(parent,JotForm.texts.multipleFileUploads_uploadFailed);return false;}};}
if(!this.tempUploadFolderInjected){var hidden=new Element('input',{type:'hidden',name:'temp_upload_folder'}).setValue(uniq);f.insert({top:hidden});this.tempUploadFolderInjected=true;}
var exts=(file.readAttribute('data-file-accept')||file.readAttribute('file-accept')||"").strip();exts=(exts!=='*')?exts.split(', '):[];var n,subLabel="";if((n=file.next())&&n.hasClassName('form-sub-label')){subLabel=n.innerHTML;}
var m,buttonText,cancelText,ofText;if(m=file.previous('.qq-uploader-buttonText-value')){buttonText=m.innerHTML;}
if(!buttonText){buttonText="Upload a File";}
if(m=parent.next(".cancelText")){cancelText=m.innerText;}
if(m=parent.next(".ofText")){ofText=m.innerText;}
var classNames=file.className.split(' ');var buttonStyle='';$jotA(classNames).each(function(className){if(className.indexOf('form-submit-button-')===0){buttonStyle=className;}});var uploader=new qq.FileUploader({debug:JotForm.debug,element:parent,action:JotForm.server,subLabel:subLabel,buttonText:buttonText,buttonStyle:buttonStyle,fileLimit:file.readAttribute('data-file-limit')||file.readAttribute('file-limit'),sizeLimit:parseInt((file.readAttribute('data-file-maxsize')||file.readAttribute('file-maxsize')),10)*1024,minSizeLimit:parseInt((file.readAttribute('data-file-minsize')||file.readAttribute('file-minsize')),10)*1024,allowedExtensions:exts,cancelText:cancelText,ofText:ofText,messages:{typeError:self.texts.multipleFileUploads_typeError,sizeError:self.texts.multipleFileUploads_sizeError,minSizeError:self.texts.multipleFileUploads_minSizeError,emptyError:self.texts.multipleFileUploads_emptyError,onLeave:self.texts.multipleFileUploads_onLeave,fileLimitError:self.texts.multipleFileUploads_fileLimitError},onComplete:function(id,filename,response){if(response.success){var qFolder=file.name.replace('[]','');var uploadHiddenID=[uniq,qFolder,filename].join('_');var uploadHidden=$jot(uploadHiddenID);if(!uploadHidden){uploadHidden=new Element('input',{id:uploadHiddenID,type:'hidden',name:'temp_upload['+qFolder+'][]'});f.insert({top:uploadHidden});}
uploadHidden.setValue(filename);parent.value='uploaded';JotForm.corrected(parent);}},onDelete:function(folder,field,filename){var id=[folder,field,filename].join('_');$jot(id).remove();},showMessage:function(message){JotForm.corrected(parent);JotForm.errored(parent,message);setTimeout(function(){JotForm.corrected(parent);},3000);},params:{action:'multipleUpload',field:file.name.replace('[]',''),origin:window.location.origin||(window.location.protocol+'//'+window.location.hostname),folder:uniq}});});},initNewMultipleUploads:function(){var self=this;document.querySelectorAll('.form-upload-multiple-new').each(function(file){var parent=file.up('div');var f=JotForm.getForm(file);var formID=f.formID.value;var uniq=formID+"_"+JotForm.uniqueID;var className=file.className;if(className.include("validate[required]")){if(parent.className.indexOf("validate[required]")===-1){parent.addClassName("validate[required]");}
parent.validateInput=function(){if(!JotForm.isVisible(parent)){JotForm.corrected(parent);return true;}
if(parent.select('.new-file-list li').length<1){JotForm.errored(parent,JotForm.texts.required);return false;}else{JotForm.corrected(parent);return true;}};}
if(!this.tempUploadFolderInjected){var hidden=new Element('input',{type:'hidden',name:'temp_upload_folder'}).setValue(uniq);f.insert({top:hidden});this.tempUploadFolderInjected=true;window.setFolder();}
var exts=(file.readAttribute('data-file-accept')||file.readAttribute('file-accept')||"").strip();exts=(exts!=='*')?exts.split(', '):[];var n,subLabel="";if((n=file.next())&&n.hasClassName('form-sub-label')){subLabel=n.innerHTML;}
var m,buttonText;if(m=file.previous('.qq-uploader-buttonText-value')){buttonText=m.innerHTML;}
if(!buttonText){buttonText="Upload a File";}});},hiddenSubmit:function(frm){if(JotForm.currentSection){JotForm.currentSection.select('.form-pagebreak')[0].insert(new Element('div',{className:'form-saving-indicator'}).setStyle('float:right;padding:21px 12px 10px').update('<img src="'+JotForm.url+'images/ajax-loader.gif" align="absmiddle" /> Saving...'));}
setTimeout(function(){JotForm.saving=true;JotForm.disableButtons();},10);if(!$jot('hidden_submit_form')){var iframe=new Element('iframe',{name:'hidden_submit',id:'hidden_submit_form'}).hide();iframe.observe('load',function(){JotForm.makeUploadChecks();document.querySelectorAll('.form-saving-indicator').invoke('remove');JotForm.saving=false;JotForm.enableButtons();});$jot(document.body).insert(iframe);}
document.querySelectorAll('.form-radio-other,.form-checkbox-other').each(function(el){if(!el.checked&&JotForm.getOptionOtherInput(el)){JotForm.getOptionOtherInput(el).disable();}});document.querySelectorAll('.custom-hint-group').each(function(elem){elem.hideCustomPlaceHolder();});if($jot('current_page')){$jot('current_page').value=JotForm.currentSection.pagesIndex;}
frm.writeAttribute('target','hidden_submit');frm.insert({top:new Element('input',{type:'hidden',name:'hidden_submission',id:'hidden_submission'}).putValue("1")});var isCardForm=window.FORM_MODE=='cardform';if(isCardForm){frm.insert({top:new Element('input',{type:'hidden',name:'continueLater',id:'continueLater'}).putValue("1")});}
frm.submit();frm.writeAttribute('target','');if(isCardForm){$jot('continueLater').remove();}
$jot('hidden_submission').remove();document.querySelectorAll('.custom-hint-group').each(function(elem){elem.showCustomPlaceHolder();});document.querySelectorAll('.form-radio-other,.form-checkbox-other').each(function(el){if(!el.checked&&JotForm.getOptionOtherInput(el)){JotForm.getOptionOtherInput(el).enable();}});},makeUploadChecks:function(){var formIDField=document.querySelectorAll('input[name="formID"]')[0];var parameters={action:'getSavedUploadResults',formID:formIDField.value,sessionID:this.sessionID};if(this.submissionID){parameters.submissionID=this.submissionID;}
if(this.submissionToken){parameters.submissionToken=this.submissionToken;}
var a=new Ajax.Jsonp(JotForm.server,{parameters:parameters,evalJSON:'force',onComplete:function(t){var res=t.responseJSON;if(res&&res.success){if(res.submissionID&&!$jot('submission_id')){if(!JotForm.submissionID){JotForm.setSubmissionID(res.submissionID);}
formIDField.insert({after:new Element('input',{type:'hidden',name:'submission_id',id:'submission_id'}).putValue(res.submissionID)});}
if(window.FORM_MODE!=='cardform'){JotForm.editMode(res,true);}}}});},handleSavedForm:function(){if(!JotForm.sessionID){return;}
JotForm.saveForm=true;var isCardForm=window.FORM_MODE=='cardform';var formIDField=document.querySelectorAll('input[name="formID"]')[0];var sessionIDField=document.getElementById('session');if(!sessionIDField){formIDField.insert({after:new Element('input',{type:'hidden',name:'session_id',id:"session"}).putValue(JotForm.sessionID)});}
if(!isCardForm){formIDField.insert({after:new Element('input',{type:'hidden',id:'current_page',name:'current_page'}).putValue(0)});}
JotForm.loadingPendingSubmission=true;var parameters={action:'getSavedSubmissionResults',formID:formIDField.value,sessionID:this.sessionID,URLparams:window.location.href};if(this.submissionID){parameters.submissionID=this.submissionID;}
if(this.submissionToken){parameters.submissionToken=this.submissionToken;}
var a=new Ajax.Jsonp(JotForm.url+'/server.php',{parameters:parameters,evalJSON:'force',onComplete:function(t){var res=t.responseJSON;if(res.success){if(res.submissionID){if(!$jot('submission_id')){formIDField.insert({after:new Element('input',{type:'hidden',name:'submission_id',id:'submission_id'}).putValue(res.submissionID)});if(!JotForm.submissionID){JotForm.setSubmissionID(res.submissionID);}}
try{JotForm.editMode(res);}catch(e){JotForm.loadingPendingSubmission=false;console.error(e);}
JotForm.openInitially=res.currentPage-1;}}
JotForm.loadingPendingSubmission=false;}});},setSubmissionID:function(submissionID){this.submissionID=submissionID;},setTitle:function(){if(document.title=="Form"){var head;if((head=document.querySelectorAll('.form-header')[0])){try{document.title=head.innerHTML.stripTags().strip();document.title=document.title.unescapeHTML();}catch(e){document.title=head.innerHTML;}}}},setHTMLClass:function(){var ie=this.ie();if(ie){document.querySelectorAll('html')[0].addClassName('ie-'+ie);}},setFocusEvents:function(){document.querySelectorAll('.form-radio, .form-checkbox').each(function(input){input.observe('mousedown',function(){JotForm.lastFocus=input;})});document.querySelectorAll('.form-textbox, .form-password, .form-textarea, .form-upload, .form-dropdown').each(function(input){input.observe('focus',function(){JotForm.lastFocus=input;});});},disableAcceptonChrome:function(){if(!Prototype.Browser.WebKit){return;}
document.querySelectorAll('.form-upload').each(function(input){if(input.hasAttribute('accept')){var r=input.readAttribute('accept');input.writeAttribute('accept','');input.writeAttribute('data-file-accept',r);input.writeAttribute('file-accept',r);}});},populateBrowserInfo:function(id){var userAgent='navigator'in window&&'userAgent'in navigator&&navigator.userAgent.toLowerCase()||'';var vendor='navigator'in window&&'vendor'in navigator&&navigator.vendor.toLowerCase()||'';var appVersion='navigator'in window&&'appVersion'in navigator&&navigator.appVersion.toLowerCase()||'';var is={chrome:function(){return /chrome|chromium/i.test(userAgent)&&/google inc/.test(vendor)},firefox:function(){return /firefox/i.test(userAgent)},ie:function(){return /msie/i.test(userAgent)||"ActiveXObject"in window||/edge\//i.test(userAgent)},safari:function(){return /safari/i.test(userAgent)&&/apple computer/i.test(vendor)},operabrowser:function(){return userAgent.indexOf("Opera")>-1},iphone:function(){return /iphone/i.test(userAgent)||/iphone/i.test(appVersion)},ipad:function(){return /ipad/i.test(userAgent)||/ipad/i.test(appVersion)},ios:function(){return is.iphone()||is.ipad()},android:function(){return /android/i.test(userAgent)},androidPhone:function(){return is.android()&&/mobile/i.test(userAgent)},androidTablet:function(){return is.android()&&!is.androidPhone()},blackberry:function(){return /blackberry/i.test(userAgent)||/BB10/i.test(userAgent)},linux:function(){return /linux/i.test(appVersion)},mac:function(){return /mac/i.test(appVersion)},windows:function(){return /win/i.test(appVersion)},windowsPhone:function(){return is.windows()&&/phone/i.test(userAgent)},windowsTablet:function(){return is.windows()&&!is.windowsPhone()&&/touch/i.test(userAgent)},mobile:function(){return is.iphone()||is.androidPhone()||is.blackberry()||is.windowsPhone();},tablet:function(){return is.ipad()||is.androidTablet()||is.windowsTablet()},desktop:function(){return!is.mobile()&&!is.tablet()}};function OS(){if(is.android())return"Android";else if(is.windows())return"Windows";else if(is.blackberry())return"Blackberry";else if(is.linux())return"Linux";else if(is.ios())return"iOS";else if(is.mac()&&!is.ios())return"MacOS";return"Unknown OS";}
function device(){if(is.mobile()){if(is.windowsPhone()||is.androidPhone()||is.blackberry())return"Mobile";else if(is.ios())return"iPhone";}
else if(is.tablet()){if(is.windowsTablet()||is.androidTablet())return"Tablet";else if(is.ios())return"iPad";}
else if(is.desktop())return"Desktop";return"Unknown Device";}
function browser(){if(is.ie())return"Internet Explorer";else if(is.firefox())return"Firefox";else if(is.chrome())return"Chrome";else if(is.safari())return"Safari";else if(is.operabrowser())return"Opera";return"Unknown Browser";}
var offset=new Date().getTimezoneOffset();var sign=(offset<0)?"+":"";var timeZone='GMT '+sign+-(offset/60);var lang=navigator.language||navigator.browserLanguage||navigator.userLanguage;var val=['BROWSER: '+browser(),'OS: '+OS(),'DEVICE: '+device(),'LANGUAGE: '+lang,'RESOLUTION: '+screen.width+"*"+screen.height,'TIMEZONE: '+timeZone,'USER AGENT: '+navigator.userAgent].join('\n');setTimeout(function(){if($jot(id).getValue().length>0){val=[$jot(id).getValue(),val].join('\n');}
$jot(id).setValue(val);},20);},displayTimeRangeDuration:function(id){var displayDuration=function(){if($jot('input_'+id+'_hourSelectRange')){var sHour=$jot('input_'+id+'_hourSelect').value;var sMin=$jot('input_'+id+'_minuteSelect').value;var sAMPM=$jot('input_'+id+'_ampm')?$jot('input_'+id+'_ampm').value:'no';var eHour=$jot('input_'+id+'_hourSelectRange').value;var eMin=$jot('input_'+id+'_minuteSelectRange').value;var eAMPM=$jot('input_'+id+'_ampmRange')?$jot('input_'+id+'_ampmRange').value:'no';var lab=$jot('input_'+id+'_ampmRange')?'_ampmRange':'_dummy';var durationLabel=document.querySelectorAll('label[for=input_'+id+lab+']').first();if(window.FORM_MODE==='cardform'){if(lab=='_ampmRange'){durationLabel=document.querySelectorAll('div[for=input_'+id+lab+']').first();}else{durationLabel=document.querySelectorAll('#input_'+id+lab).first();}}
if(sHour.length>0&&sMin.length>0&&eHour.length>0&&eMin.length>0){if(sAMPM=='PM'&&sHour!=12)sHour=parseInt(sHour)+12;if(sAMPM=='AM'&&sHour==12)sHour=0;if(eAMPM=='PM'&&eHour!=12)eHour=parseInt(eHour)+12;if(eAMPM=='AM'&&eHour==12)eHour=0;var start=new Date(0,0,0,sHour,sMin,0);var end=new Date(0,0,0,eHour,eMin,0);var diff=end.getTime()-start.getTime();if(diff<0){end=new Date(0,0,1,eHour,eMin,0);diff=end.getTime()-start.getTime();}
var hours=Math.floor(diff/1000/60/60);diff-=hours*1000*60*60;var min=Math.floor(diff/1000/60);if(min<10)min='0'+min;durationLabel.update('<b>Total '+hours+':'+min+'</b>');durationLabel.setStyle({'color':'black'});document.querySelectorAll('input[id=duration_'+id+'_ampmRange][type="hidden"]').first().setValue(hours+':'+min);}else{durationLabel.update('&nbsp');}}};$jot('input_'+id+'_hourSelect').observe('change',displayDuration);$jot('input_'+id+'_minuteSelect').observe('change',displayDuration);$jot('input_'+id+'_hourSelectRange').observe('change',displayDuration);$jot('input_'+id+'_minuteSelectRange').observe('change',displayDuration);if($jot('input_'+id+'_ampm')&&$jot('input_'+id+'_ampmRange')){$jot('input_'+id+'_ampm').observe('change',displayDuration);$jot('input_'+id+'_ampmRange').observe('change',displayDuration);}
displayDuration();},displayLocalTime:function(hh,ii,ampm){if($jot(hh)&&!$jot(hh).hasClassName('noDefault')){var date=new Date();var hour=date.getHours();var currentAmpm="";var twentyFour=true;if($jot(ampm)){twentyFour=false;currentAmpm=(hour>11)?'PM':'AM';hour=(hour>12)?hour-12:hour;hour=(hour==0)?12:hour;}
var min=date.getMinutes();var step=Number($jot(ii).options[2].value)-Number($jot(ii).options[1].value);min=Math.round(min/step)*step;min=this.addZeros(min,2);if(min>=60){min="00";hour++;if(twentyFour){if(hour==24)hour=0;}else{if(currentAmpm=='AM'&&hour==12)currentAmpm='PM';else if(currentAmpm=='PM'&&hour==12)currentAmpm='AM';else if(hour==13)hour=1;}}
if(hour<10&&$jot(hh).options[1].value.length>1){hour='0'+hour;}
$jot(hh).value=hour;$jot(ii).value=min;if($jot(hh+'Range')){$jot(hh+'Range').value=hour;$jot(ii+'Range').value=min;}
if($jot(ampm)){if(currentAmpm=='PM'){if($jot(ampm).select('option[value="PM"]').length>0)$jot(ampm).value='PM';if($jot(ampm+'Range')&&$jot(ampm+'Range').select('option[value="PM"]').length>0)$jot(ampm+'Range').value='PM';}else{if($jot(ampm).select('option[value="AM"]').length>0)$jot(ampm).value='AM';if($jot(ampm+'Range')&&$jot(ampm+'Range').select('option[value="AM"]').length>0)$jot(ampm+'Range').value='AM';}}}},displayDynamicDate:function(id,dynamic){var offset=parseInt(dynamic.split('today')[1])||0;var dynamicDate=new Date();dynamicDate.setDate(dynamicDate.getDate()+offset);JotForm.formatDate({date:dynamicDate,dateField:$jot("id_"+id)});},dateLimits:{},setCalendar:function(id,startOnMonday,limits,parent){try{JotForm.dateLimits[id]=limits;var field=$jot('id_'+id);var calendar=Calendar.setup({triggerElement:"input_"+id+"_pick",dateField:"year_"+id,parentElement:parent,closeHandler:function(){JotForm.calendarClose.apply(this,arguments);},selectHandler:function(){JotForm.formatDate.apply(this,arguments);},startOnMonday:startOnMonday,limits:limits});field.observe('keyup',function(){field.fire('date:changed');});var clearDate=function(){$jot("month_"+id).value=$jot("day_"+id).value=$jot("year_"+id).value="";}
var invalidDate=function(invalidDate,calendar){invalidDate.addClassName("invalidDate");clearDate();}
if($jot('lite_mode_'+id)){$jot('lite_mode_'+id).dateChanged=function(e,calendar){var lite_mode=e.currentTarget;var seperator=lite_mode.readAttribute('seperator')||lite_mode.readAttribute('data-seperator');var format=(lite_mode.readAttribute('format')||lite_mode.readAttribute('data-format')).toLowerCase();lite_mode.removeClassName("invalidDate");if(lite_mode.value===""){field.fire('date:changed');return clearDate();}
if(lite_mode.value.length==((seperator.length*2)+format.length)){var _yIn=format.indexOf("yy");var _mIn=format.indexOf("mm");var _dIn=format.indexOf("dd");var _sorter=new Array(_yIn,_mIn,_dIn);_sorter=_sorter.sort();var _sortIndex={year:_sorter.indexOf(_yIn),month:_sorter.indexOf(_mIn),day:_sorter.indexOf(_dIn)}
var year=parseInt(lite_mode.value.split(seperator)[_sortIndex.year]);var month=parseInt(lite_mode.value.split(seperator)[_sortIndex.month])-1;var day=parseInt(lite_mode.value.split(seperator)[_sortIndex.day]);var _tempDate=new Date(year,month,day);if(!_tempDate||!_tempDate.getDate()){invalidDate(lite_mode,calendar);}else{calendar.date=_tempDate;calendar.selectHandler(calendar);}}else{invalidDate(lite_mode,calendar);}
if(lite_mode.hasClassName("invalidDate")){JotForm.errored(lite_mode,'Enter a valid date');field.addClassName('form-line-error');field.addClassName('form-datetime-validation-error');}}
$jot('lite_mode_'+id).observe('keyup',function(e){e.stopPropagation();e.currentTarget.dateChanged(e,calendar);return false;});$jot('lite_mode_'+id).observe('blur',function(e){e.stopPropagation();e.currentTarget.dateChanged(e,calendar);e.currentTarget.setAttribute("date-val",calendar.date.getTime());return false;});}
if(!parent){var openCalendar=function(){var ele=this;setTimeout(function(){calendar.showAtElement(ele);},50);};if($jot('input_'+id+'_pick').hasClassName('showAutoCalendar')){var _selectors=[('#day_'+id),('#month_'+id),('#year_'+id),('#lite_mode_'+id)];document.querySelectorAll(_selectors.join(',')).each(function(elem){elem.observe('focus',openCalendar);elem.observe('click',openCalendar);});}
$jot("year_"+id).observe("blur",function(){calendar.hide();});}}catch(e){JotForm.error(e);}},currentDateReadonly:function(){},calendarClose:function(calendar){var calendarFields=document.querySelectorAll('input[id*="'+calendar.dateField.id.match(/_[0-9]+/)[0]+'"]');var validations=calendar.dateField.className.replace(/.*validate\[(.*)\].*/,'$jot1').split(/\s*,\s*/);var incomplete=calendarFields.any(function(c){return c.value.empty()});if((validations.include("required")||validations.include("disallowPast"))&&incomplete){calendar.dateField.validateInput();}
if(validations.include("required")&&!incomplete){JotForm.corrected($jot('id_'+calendar.id));}
calendar.hide();},getDefaults:function(){document.querySelectorAll('.form-textbox, .form-dropdown, .form-textarea').each(function(input){if(input.hinted||input.value===""){return;}
JotForm.defaultValues[input.id]=input.value;});document.querySelectorAll('.form-radio, .form-checkbox').each(function(input){if(!input.checked){return;}
JotForm.defaultValues[input.id]=input.value;});},handleOtherOptions:function(){document.querySelectorAll('.form-radio-other-input, .form-checkbox-other-input').each(function(inp){inp.hint(inp.getAttribute('data-otherhint')||'Other');});document.querySelectorAll('.form-radio, .form-checkbox').each(function(input){var id=input.id.replace(/input_(\d+)_\d+/gim,'$jot1');if(id.match('other_')){id=input.id.replace(/other_(\d+)/,'$jot1');}
if($jot('other_'+id)){var other=$jot('other_'+id);var other_input=$jot('input_'+id);var otherOption=input.type==='radio'?input:other;other_input.observe('keyup',function(){other.value=other_input.value;});other_input.observe('click',function(e){$jot('other_'+id).checked=true;setTimeout(function(){$jot('other_'+id).checked=true;});other_input.value=other_input.value===other_input.getAttribute('data-otherhint')?'':other_input.value;});otherOption.observe('click',function(){if(other.checked){other_input.select();}else{if(other_input.hintClear){other_input.hintClear();}}});}});},shuffleOptions:function(id){var type=JotForm.calculationType(id);if(type==="radio"||type==="checkbox"){try{var options=$jot("id_"+id).select('.form-'+type+'-item');var length=$jot("id_"+id).down('.form-'+type+'-other-input')?options.length-1:options.length;for(var i=0;i<length-1;i++){var toSwap=$jot("id_"+id).select('.form-'+type+'-item')[i];var randy=Math.floor(Math.random()*length);var swappedOut=options[randy].replace(toSwap);var insertAfter=$jot("id_"+id).select('.form-'+type+'-item')[i].next()?$jot("id_"+id).select('.form-'+type+'-item')[i].next():$jot("id_"+id).select('.form-'+type+'-item')[i];insertAfter.insert({after:swappedOut});}
if($jot("id_"+id).down('.form-multiple-column')){var columnCount=$jot("id_"+id).down('.form-multiple-column').readAttribute("data-columncount");$jot("id_"+id).select('.form-'+type+'-item').each(function(item,i){item.setStyle({'clear':(i%columnCount==0)?'left':'none'});});}}catch(e){console.log(e);}}else if(type==="select"){try{var clone=$jot('input_'+id).clone(true);$jot('input_'+id).update("");var length=clone.length;$jot('input_'+id).insert(clone[0].clone(true));for(var i=1;i<length;i++){var randy=Math.floor(Math.random()*(clone.length-1))+1;$jot('input_'+id).insert(clone[randy].clone(true));clone[randy].remove();}}catch(e){console.log(e);}}else if(type==="matrix"){try{var rows=$jot("id_"+id).select('tr');var len=rows.length
for(var i=1;i<len;i++){var randy=Math.floor(Math.random()*(len-1))+1;var swappedOut=rows[randy].replace(rows[i]);var insertAfter=rows[i].next()?rows[i].next():rows[i];insertAfter.insert({after:swappedOut});}}catch(e){console.log(e);}}},handleDateTimeChecks:function(){try{document.querySelectorAll('[name$jot=\[month\]]').each(function(monthElement){var isBirthdate=monthElement.type!=="tel"&&monthElement.type!=="text";var questionId=isBirthdate?monthElement.id.replace(new RegExp('.*?([0-9]+).*','gim'),'$jot1'):monthElement.id.split('month_').last();var dateElement=$jot('id_'+questionId);if(!dateElement)
return;var dayElement=dateElement.down('[id*=day]');var yearElement=dateElement.down('[id*=year]');var hourElement=dateElement.select('#hour_'+questionId).first();var minElement=dateElement.select('#min_'+questionId).first();var ampmElement=dateElement.select('#ampm_'+questionId).first();monthElement.dateTimeCheck=function(e){var erroredElement=null;var ignoreBirthdate=isBirthdate&&(monthElement.value===""||dayElement.value===""||yearElement.value==="");if(!ignoreBirthdate&&(monthElement.value!=""||dayElement.value!=""||yearElement.value!="")){var month=isBirthdate?monthElement.selectedIndex:monthElement.value;month=parseInt(month,10);var day=+dayElement.value;var year=+yearElement.value;if(isNaN(year)||year<1){erroredElement=yearElement;}else if(isNaN(month)||month<1||month>12){erroredElement=monthElement;}else if((isNaN(day)||day<1)){erroredElement=dayElement;}else{switch(month){case 2:if((year%4==0)?day>29:day>28){erroredElement=dayElement;}
break;case 4:case 6:case 9:case 11:if(day>30){erroredElement=dayElement;}
break;default:if(day>31){erroredElement=dayElement;}
break;}}}
var isTargetActive=e&&e.target&&e.target===document.activeElement;if(window.FORM_MODE==='cardform'){isTargetActive=monthElement.up('.jfCard-question')===document.activeElement.up('.jfCard-question');}
if(!erroredElement&&hourElement&&minElement&&(hourElement.value!=""||minElement.value!="")&&!isTargetActive)
{var hour=(hourElement.value.strip()=='')?-1:+hourElement.value;var min=(minElement.value.strip()=='')?-1:+minElement.value;if(isNaN(hour)||(ampmElement?(hour<0||hour>12):(hour<0||hour>23))){erroredElement=hourElement;}else if(isNaN(min)||min<0||min>59){erroredElement=minElement;}}
var active=document.activeElement;if(erroredElement&&active!=yearElement&&active!=monthElement&&active!=dayElement){if(erroredElement===hourElement||erroredElement===minElement){erroredElement.errored=false;JotForm.errored(erroredElement,'Enter a valid time');}else{erroredElement.errored=false;var errorTxt=JotForm.texts.dateInvalidSeparate.replace('{element}',erroredElement.id.replace("_"+questionId,""))
JotForm.errored(erroredElement,errorTxt);}
dateElement.addClassName('form-line-error');dateElement.addClassName('form-datetime-validation-error');return false;}else{JotForm.corrected(monthElement);JotForm.corrected(dayElement);JotForm.corrected(yearElement);if(hourElement&&minElement){JotForm.corrected(hourElement);JotForm.corrected(minElement);}
dateElement.removeClassName('form-line-error');dateElement.removeClassName('form-datetime-validation-error');}
return true;};if(hourElement&&minElement){hourElement.observe('change',function(e){monthElement.dateTimeCheck(e)});minElement.observe('change',function(e){monthElement.dateTimeCheck(e)});}});}catch(e){console.error(e);}},handleTextareaLimits:function(){document.querySelectorAll('.form-textarea-limit-indicator span').each(function(el){var inpID=el.id.split('-')[0];if(!$jot(inpID)){return;}
var minimum=el.readAttribute('data-minimum');var limit=el.readAttribute('data-limit');var input=$jot(inpID);var count;var countText=function(firstRun){if(input.value===""||input.hasClassName('form-custom-hint')){$jot(el.parentNode).removeClassName('form-textarea-limit-indicator-error');el.update("0/"+(minimum>-1?minimum:limit));return JotForm.corrected(el);}
var contents;if(input.hasClassName("form-textarea")&&input.up('div').down('.nicEdit-main')){contents=input.value.stripTags().replace(/&nbsp;/g,' ');}else{contents=input.value;}
var cleaned_contents=contents.replace(/<.[^<>]*?>/g,' ').replace(/&nbsp;|&#160;/gi,' ');$jot(el.parentNode).removeClassName('form-textarea-limit-indicator-error');JotForm.corrected(el.up('.form-line').down('textarea'));var limitByType=function(type){var limitType=type=="min"?el.readAttribute('data-typeminimum'):el.readAttribute('type');if(limitType=='Words'){count=$jotA(cleaned_contents.split(/\s+/)).without("").length;}else if(limitType=='Letters'){count=cleaned_contents.length;}
var limiting=false;if(((type=="min"&&count<minimum)||(type=="max"&&count>limit))&&!(firstRun===true)){$jot(el.parentNode).addClassName('form-textarea-limit-indicator-error');var minMax=type=="min"?"Min":"";var lim=type=="min"?minimum:limit;var lettersWords=limitType==="Words"?"word":"character";var msg=JotForm.texts[lettersWords+minMax+"LimitError"]+" "+lim;JotForm.errored(el.up('.form-line').down('textarea'),msg+'.');limiting=true;}
el.update(count+"/"+((minimum&&count<minimum&&type=="min")||limit==-1?minimum:limit));return limiting;}
var runMax=true;if(minimum&&minimum>0){runMax=!limitByType("min")}
if(limit&&limit>0&&runMax){limitByType("max");}};countText(true);input.observe('change',countText);input.observe('focus',countText);input.observe('keyup',countText);if(input.hasClassName("form-textarea")&&input.up('div').down('.nicEdit-main')){var cEditable=input.up('div').down('.nicEdit-main');var runCount=function(){input.value=cEditable.innerHTML;countText();};cEditable.observe('keyup',runCount);cEditable.observe('blur',function(){setTimeout(runCount,0);});}});},handleAutoCompletes:function(){$jotH(JotForm.autoCompletes).each(function(pair){var el=$jot(pair.key);el.writeAttribute('autocomplete','off');var parent=$jot(el.parentNode);var pairs=pair.value.split(/\r\n|\r|\n|\|/g);var values=$jotA(pairs);var lastValue;var selectCount=0;var liHeight=0;var list=new Element('div',{className:'form-autocomplete-list'}).setStyle({listStyle:'none',listStylePosition:'outside',position:'absolute',zIndex:'10000'}).hide();var render=function(){var isCardForm=window.FORM_MODE==='cardform';if(isCardForm){var ebcr=el.getBoundingClientRect();var top=((ebcr.top+ebcr.height))-5+'px';var left=(ebcr.left)+'px';var width=(ebcr.width<1?100:ebcr.width)+'px';list.setStyle({top:top,left:left,width:width});list.show();}else{var dims=el.getDimensions();var offs=el.cumulativeOffset();list.setStyle({top:((dims.height+offs[1]))+'px',left:offs[0]+'px',width:((dims.width<1?100:dims.width)-2)+'px'});list.show();}};$jot(document.body).insert(list);list.close=function(){list.update();list.hide();selectCount=0;};el.observe('blur',function(){list.close();});el.observe('keyup',function(e){var word=el.value;if(lastValue==word){return;}
lastValue=word;list.update();if(!word){list.close();return;}
var fuzzy=el.readAttribute('data-fuzzySearch')=='Yes';var matches;if(fuzzy){matches=values.collect(function(v){if(v.toLowerCase().include(word.toLowerCase())){return v;}}).compact();}else{matches=values.collect(function(v){if(v.toLowerCase().indexOf(word.toLowerCase())==0){return v;}}).compact();}
var maxMatches=el.readAttribute('data-maxMatches');if(maxMatches>0)matches=matches.slice(0,maxMatches);if(matches.length>0){matches.each(function(match){var li=new Element('li',{className:'form-autocomplete-list-item'});var val=match;li.val=val;try{val=match.replace(new RegExp('('+word+')','gim'),'<b>$jot1</b>');}
catch(e){JotForm.error(e);}
li.insert(val);li.onmousedown=function(){el.value=JotForm.decodeHtmlEntities(match);list.close();};list.insert(li);});render();liHeight=liHeight||$jot(list.firstChild).getHeight()+(parseInt($jot(list.firstChild).getStyle('padding'),10)||0)+(parseInt($jot(list.firstChild).getStyle('margin'),10)||0);list.setStyle({height:(liHeight*((matches.length>9)?10:matches.length)+4)+'px',overflow:'auto'});}else{list.close();}});el.observe('keydown',function(e){var selected;if(!list.visible()||!list.firstChild){return;}
selected=list.select('.form-autocomplete-list-item-selected')[0];if(selected){selected.removeClassName('form-autocomplete-list-item-selected');}
switch(e.keyCode){case Event.KEY_UP:if(selected&&selected.previousSibling){$jot(selected.previousSibling).addClassName('form-autocomplete-list-item-selected');}else{$jot(list.lastChild).addClassName('form-autocomplete-list-item-selected');}
if(selectCount<=1){if(selected&&selected.previousSibling){$jot(selected.previousSibling).scrollIntoView(true);selectCount=0;}else{$jot(list.lastChild).scrollIntoView(false);selectCount=10;}}else{selectCount--;}
break;case Event.KEY_DOWN:if(selected&&selected.nextSibling){$jot(selected.nextSibling).addClassName('form-autocomplete-list-item-selected');}else{$jot(list.firstChild).addClassName('form-autocomplete-list-item-selected');}
if(selectCount>=9){if(selected&&selected.nextSibling){$jot(selected.nextSibling).scrollIntoView(false);selectCount=10;}else{$jot(list.firstChild).scrollIntoView(true);selectCount=0;}}else{selectCount++;}
break;case Event.KEY_ESC:list.close();break;case Event.KEY_TAB:case Event.KEY_RETURN:if(selected){el.value=selected.val;lastValue=el.value;}
list.close();if(e.keyCode==Event.KEY_RETURN){e.stop();}
break;default:return;}});});},decodeHtmlEntities:function(str){var textarea=document.createElement('textarea');textarea.innerHTML=str;return textarea.value;},getFileExtension:function(filename){return(/[.]/.exec(filename))?(/[^.]+$jot/.exec(filename))[0]:undefined;},prePopulations:function(){$jotH(document.get).each(function(pair){var stricterMatch=pair.key.length<3?true:false;var n=stricterMatch?'[name$jot="_'+pair.key+'"]':'[name*="_'+pair.key+'"]';var strict='[name$jot="_'+pair.key+'"]';var input;input=document.querySelectorAll('.form-star-rating'+n)[0];if(input){input.setRating(parseInt(pair.value));return;}
input=document.querySelectorAll('.form-slider'+n)[0];if(input){input.setSliderValue(parseInt(pair.value));return;}
if(pair.key=="coupon-input"&&$jot('coupon-input')){$jot('coupon-input').setValue(pair.value);$jot('coupon-button').triggerEvent('click');$jot(window).scrollTo(0,0);return;}
input=document.querySelectorAll('.form-textbox%s, .form-dropdown%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim,strict))[0];if(!input){input=document.querySelectorAll('.form-textbox%s, .form-dropdown%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim,n))[0];}
if(!input&&pair.key.indexOf("[")>0){var name=pair.key.substr(0,pair.key.lastIndexOf('['));if(name.length>0&&document.querySelectorAll("select[name*="+name+"], input[name*="+name+"]").length>0){var index=pair.key.substr(pair.key.lastIndexOf('[')+1).replace("]","");if(document.querySelectorAll("select[name*="+name+"], input[name*="+name+"]").length>index){var type=document.querySelectorAll("select[name*="+name+"]").length>0?"select":document.querySelectorAll("input[name*="+name+"]")[index].type;switch(type){case"select":document.querySelectorAll("select[name*="+name+"]")[index].value=pair.value.replace(/\+/g,' ');break;case"text":case"tel":case"number":document.querySelectorAll("input[name*="+name+"]")[index].value=pair.value.replace(/\+/g,' ');break;case"radio":case"checkbox":try{if((pair.value=="true"||pair.value==1)&&document.querySelectorAll("input[name*="+name+"]")[index]&&!(document.querySelectorAll("input[name*="+name+"]").first().up('.form-line').readAttribute('data-type')==='control_matrix'&&name.indexOf('[')<0)){document.querySelectorAll("input[name*="+name+"]")[index].click();}}catch(e){console.log(e);}
break;}}}}
if(input&&input.readAttribute('data-type')=='input-grading'){var grades=pair.value.split(',');var stub=input.id.substr(0,input.id.lastIndexOf('_')+1);for(var i=0;i<grades.length;i++){if($jot(stub+i))$jot(stub+i).value=grades[i];}}else if(input&&(input.hasClassName('form-checkbox-other-input')||input.hasClassName('form-radio-other-input'))){if(n.indexOf('[other]')>-1){input.value=pair.value.replace(/\+/g,' ');JotForm.defaultValues[input.id]=input.value;}else{try{var valuesArray=input.up('.form-line').readAttribute('data-type')==="control_checkbox"?pair.value.split(','):[pair.value];for(var i=0;i<valuesArray.length;i++){var normalInputWithValue=input.up('.form-input').select('input[type="radio"], input[type="checkbox"]').any(function(inp){return valuesArray[i]===inp.value;});if(!normalInputWithValue){input.value=valuesArray[i];valuesArray[i]="other";}}
pair.value=valuesArray.join(",");}catch(e){console.error(e);}}}else if(input&&input.hasClassName("form-textarea")&&input.up('div').down('.nicEdit-main')){input.up('div').down('.nicEdit-main').update(pair.value.replace(/\+/g,' '));}else if(input&&input.hasClassName("form-dropdown")){var val=pair.value.replace(/\+/g,' ');var arr=input.readAttribute("multiple")?val.split(","):[val];var options=input.select('option');input.value=arr;$jotA(options).each(function(option){option.writeAttribute("selected",arr.include(option.value)?"selected":false);});}else if(input){input.value=pair.value.replace(/\{\+\}/g,'{plusSign}').replace(/\+/g,' ').replace(/\{plusSign\}/g,'+');if(document.referrer.match(/jotform/)){input.value=pair.value;}
JotForm.defaultValues[input.id]=input.value;}
try{var formLine=input?input.up('.form-line'):false;if(formLine&&formLine.readAttribute('data-type')=="control_datetime"&&formLine.down('input[id*="lite_mode_"]')){if(formLine.down('input[id*="year_"]').value!=""&&formLine.down('input[id*="month_"]').value!=""&&formLine.down('input[id*="day_"]').value!=""){JotForm.formatDate({date:new Date(formLine.down('input[id*="year_"]').value,formLine.down('input[id*="month_"]').value-1,formLine.down('input[id*="day_"]').value),dateField:formLine});}}}catch(e){console.log(e);}
document.querySelectorAll('.form-textbox%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim,n)).each(function(input){input.triggerEvent('keyup');});document.querySelectorAll('.form-dropdown%s'.replace(/\%s/gim,n)).each(function(input){input.triggerEvent('change');});document.querySelectorAll('.form-checkbox%s, .form-radio%s'.replace(/\%s/gim,n)).each(function(input){var disabled=input.disabled?!!(input.enable()):false;var value=pair.value.replace(/\{\+\}/g,'{plusSign}').replace(/\+/g,' ').replace(/\{plusSign\}/g,'+');if(value==input.value||$jotA(value.split(',')).include(input.value)||$jotA(value.split('<br>')).include(input.value)){if(!input.checked){if(disabled){setTimeout(function(){input.click();},0);}else{input.click();}}}else if($jotA(pair.value.split(',')).include('other')){if((input.name.indexOf('[other]')>-1)||(input.id&&input.id.indexOf('other_')>-1)){input.click();}}
if(disabled)setTimeout(function(){input.disable();});});if(input&&input.hasClassName('form-textarea')&&input.hasClassName('form-custom-hint')&&input.hasContent){input.removeClassName('form-custom-hint');}});},resetForm:function(frm){var hiddens=$jot(frm).select('input[type="hidden"]');hiddens.each(function(h){h.__defaultValue=h.value;});$jot(frm).reset();hiddens.each(function(h){h.value=h.__defaultValue;});return frm;},editMode:function(data,noreset,skipField){var preLink="";if(!JotForm.debug){if(this.url.search("https")==-1){preLink="http://cdn.jotfor.ms/";}else{preLink="https://cdn.jotfor.ms/";}}
if(!window.editModeFunction){var self=this;this.loadScript(preLink+'/js/form.edit.mode.js?v_'+(new Date()).getTime(),function(){self.editMode=editModeFunction;self.editMode(data,noreset,skipField);});}else{self.editMode(data,noreset,skipField);}},isEditMode:function(){if(window.FORM_MODE==='cardform'){return(typeof window.editModeFunction!=='undefined')&&CardForm.layoutParams.isEditMode;}
return(typeof window.editModeFunction!=='undefined');},setConditions:function(conditions){conditions.reverse();JotForm.conditions=conditions;conditions.each(function(condition){condition.action=[].concat(condition.action);});},setCalculations:function(calculations){if(!JotForm.calculations||Object.keys(JotForm.calculations).length===0){JotForm.calculations=calculations;}else{Object.values(calculations).forEach(function(calculation){JotForm.calculations.push(calculation);});}},prepareCalculationsOnTheFly:function(questions){var questions_by_name=[];function transpose(a){return a[0].map(function(val,c){return a.map(function(r){return r[c];});});}
if(questions.length>0){if(Object.keys(JotForm.calculations).length<=0){JotForm.calculations=[];}
questions.forEach(function(question){if(question){questions_by_name[question.name]=question.qid;}});questions.forEach(function(question){if(question){var value='';switch(question.type){case'control_textbox':value=question.text;break;default:value=question.text;}
var regex=/\{([^\}]*)\}/gim;for(var questions=[];result=regex.exec(value);questions.push(result));if(questions.length>0){questions=transpose(questions);questions[1].forEach(function(question_name){JotForm.calculations.push({decimalPlaces:"2",defaultValue:"",equation:"{"+questions_by_name[question_name]+"}",ignoreHiddenFields:"",insertAsText:"1",isLabel:question.type==="control_text"?"":"1",newCalculationType:"1",operands:questions_by_name[question_name],readOnly:"",replaceText:question_name,resultField:question.qid,showBeforeInput:"",tagReplacement:"1",useCommasForDecimals:""});});}}});}},runConditionForId:function(id){$jotH(JotForm.fieldConditions).each(function(pair){var conds=pair.value.conditions;$jotA(conds).each(function(cond){$jotA(cond.terms).each(function(term){if(term.field===id){JotForm.checkCondition(cond);}});});});},otherConditionTrue:function(field,visibility){visibility=visibility.replace(/multiple/,"");var otherConditionTrue=false;$jotH(JotForm.fieldConditions).each(function(pair){var conds=pair.value.conditions;$jotA(conds).each(function(cond){$jotA(cond.action).each(function(action){if(action.fields){action.fields.each(function(multiField){if(multiField===field&&action.visibility&&action.visibility.toLowerCase().replace(/multiple/,"")===visibility&&action.hasOwnProperty('currentlyTrue')&&action.currentlyTrue){otherConditionTrue=true;return;}});}
if(action.field===field&&action.visibility&&action.visibility.toLowerCase()===visibility&&action.hasOwnProperty('currentlyTrue')&&action.currentlyTrue){otherConditionTrue=true;}});});});return otherConditionTrue;},showField:function(field,multiple){if(JotForm.otherConditionTrue(field,'hide'))return;var element=null;var idField=$jot('id_'+field);var cidField=$jot('cid_'+field);var sectionField=$jot('section_'+field);if(sectionField&&cidField){element=sectionField;}else if(cidField&&!idField){element=cidField;}else{element=idField;}
if(!element){var productField=document.querySelectorAll('input[name*="q'+field+'"][type="hidden"]');if(productField.length>0){productField[0].setAttribute('selected',true);}
return element;}
var wasHidden=element.hasClassName('form-field-hidden')||element.hasClassName('always-hidden');element.removeClassName('form-field-hidden');element.removeClassName('always-hidden');if(!(element.hasClassName("form-section")||element.hasClassName("form-section-closed"))&&element.down(".always-hidden")){element.down(".always-hidden").removeClassName('always-hidden');}
if(JotForm.paymentFields.indexOf(element.getAttribute('data-type'))>-1&&$jot('hiddenPaymentField')){$jot('hiddenPaymentField').remove();}
if(sectionField){if(element.hasClassName('form-section-closed')){if(element.select('.form-collapse-table')[0].hasClassName('form-collapse-hidden')){element.removeClassName('form-section-closed');element.addClassName('form-section');element.setStyle({height:"auto",overflow:"hidden"});}else{element.setStyle({overflow:"hidden"});}}else{element.setStyle({height:"auto",overflow:"hidden"});}}
if(JotForm.getInputType(field)==='html'&&$jot('text_'+field).innerHTML.match(/google.*maps/gi)){$jot('text_'+field).innerHTML=$jot('text_'+field).innerHTML;}
var elemShown=element.show();if(JotForm.getInputType(field)==='widget'){JotForm.showWidget(field);}else if(JotForm.getInputType(field)==='signature'){JotForm.showAndResizeESignature(field);}
if(JotForm.getInputType(field)==='collapse'){if(sectionField&&!element.hasClassName('form-section-closed')){element.select('li.form-line').each(function(node,i){var id=node.id.split('_')[1];if(JotForm.getInputType(id)==='widget'){JotForm.showWidget(id);}else if(JotForm.getInputType(id)==='signature'){JotForm.showAndResizeESignature(id);}});}}
if(window.FORM_MODE=='cardform'&&wasHidden&&($jot('id_'+field)&&$jot('id_'+field).readAttribute('data-type')=='control_matrix')){JotForm.setMatrixLayout(field,false);}
if(JotForm.donationField&&element.down('[data-component="paymentDonation"][data-custom-amount-field]')){JotForm.updateDonationAmount();}
return elemShown;},showWidget:function(id){var referrer=document.getElementById("customFieldFrame_"+id)?document.getElementById("customFieldFrame_"+id).src:false;if(referrer){var frame=(navigator.userAgent.indexOf("Firefox")!=-1)?getIframeWindow(window.frames["customFieldFrame_"+id]):window.frames["customFieldFrame_"+id];if(frame){XD.postMessage(JSON.stringify({type:"show",qid:id}),referrer,frame);if(typeof window.JCFServerCommon!=='undefined'){if(JotForm.isVisible(JotForm.getSection($jot("id_"+id)))&&JotForm.isVisible($jot("id_"+id))){if(window.JCFServerCommon.frames.hasOwnProperty(id)){window.JCFServerCommon.frames[id].sendReadyMessage(id);}}}}}},reloadWidget:function(id){var referrer=document.getElementById("customFieldFrame_"+id)?document.getElementById("customFieldFrame_"+id).src:false;if(referrer){var frame=(navigator.userAgent.indexOf("Firefox")!=-1)?getIframeWindow(window.frames["customFieldFrame_"+id]):window.frames["customFieldFrame_"+id];if(frame){XD.postMessage(JSON.stringify({type:"reload",qid:id}),referrer,frame);}}},showAndResizeESignature:function(id){var element=$jot('id_'+id);if(element&&JotForm.isVisible(element)&&element.select('.pad').length>0){element.select('.pad').first().fire('on:sigresize');}},hideField:function(field,multiple,dontClear){if(JotForm.otherConditionTrue(field,'show'))return;var idPrefix='id_';if($jot('cid_'+field)&&!$jot('id_'+field)){idPrefix='cid_';}
if($jot('cid_'+field)&&$jot('section_'+field)){idPrefix='section_';}
var element=$jot(idPrefix+field);if(element){element.addClassName('form-field-hidden');if(JotForm.paymentFields.indexOf(element.getAttribute('data-type'))>-1&&!$jot('hiddenPaymentField')){document.querySelectorAll('form')[0].insert(new Element('input',{type:'hidden',name:'hiddenPaymentField',id:'hiddenPaymentField',value:1,}));}
if(JotForm.clearFieldOnHide=="enable"&&!dontClear&&!JotForm.ignoreInsertionCondition){try{JotForm.clearField(field);}catch(e){console.log(e);}}
if(element.style.setProperty){element.style.setProperty('display','none','important');}else{element.hide();}
if(JotForm.donationField&&element.down('[data-component="paymentDonation"][data-custom-amount-field]')){JotForm.updateDonationAmount(0);}
JotForm.corrected(element);return element;}
var productField=document.querySelectorAll('input[name*="q'+field+'"][type="hidden"]');if(productField.length>0){productField[0].setAttribute('selected',false);}},clearField:function(field,subfield,dontTrigger){var type=JotForm.calculationType(field);if(!type)return;var defaultValue="input_"+field in JotForm.defaultValues?JotForm.defaultValues["input_"+field]:"";if(type=="collapse"){$jot("section_"+field).select(".form-line").each(function(el){var id=el.id.replace("id_","");JotForm.clearField(id);});return;}
if(type==="matrix"&&subfield&&$jot(subfield)){$jot(subfield).value="";if(!dontTrigger&&$jot(subfield).triggerEvent){$jot(subfield).triggerEvent('keyup');}}else if(type==="matrix"){$jot('id_'+field).select('input[type="text"], input[type="tel"]').each(function(el){el.value=(el.id in JotForm.defaultValues)?JotForm.defaultValues[el.id]:"";});$jot("id_"+field).select('input[type="radio"], input[type="checkbox"]').each(function(input){if(input.id in JotForm.defaultValues){input.checked=true;}else{input.checked=false;}});$jot('id_'+field).select('select').each(function(el){if(el.id in JotForm.defaultValues){el.value=JotForm.defaultValues[el.id];}else{el.selectedIndex=0;}});if($jot('id_'+field).select('input, select').length===0)return;var firstField=$jot('id_'+field).select('input, select').first();if(firstField&&firstField.triggerEvent){var eventType;if(firstField.nodeName.toLowerCase()==='input'){if(firstField.type==="checkbox"||firstField.type==="radio"){firstField.up().triggerEvent('click');}else{firstField.triggerEvent('keyup');}}else{firstField.triggerEvent('change');}}}else if(["address","combined","datetime","time"].include(type)){$jot('id_'+field).select('input').each(function(el){el.value=(el.id in JotForm.defaultValues)?JotForm.defaultValues[el.id]:"";});$jot('id_'+field).select('select').each(function(el){if(el.id in JotForm.defaultValues){el.value=JotForm.defaultValues[el.id];}else{el.selectedIndex=0;}});var triggerMe=$jot('input_'+field)?$jot('input_'+field):$jot('id_'+field).select('input').first();if(triggerMe&&triggerMe.triggerEvent){triggerMe.triggerEvent('keyup');}
if($jot('input_'+field+'_full')&&$jot('input_'+field+'_full').readAttribute("data-masked")=="true"){JotForm.setQuestionMasking("#input_"+field+"_full","textMasking",$jot('input_'+field+'_full').readAttribute("maskValue"));}}else if(["braintree","stripe","paypalpro","authnet"].include(type)){$jot('id_'+field).select('input[type="text"], .form-address-country').each(function(el){el.value=(el.id in JotForm.defaultValues)?JotForm.defaultValues[el.id]:"";});}else if(type==="html"){try{$jot('id_'+field).select(".replaceTag").each(function(span){var def=span.readAttribute("default");span.update(def);});}catch(e){console.log(e);}}else if(type=="textarea"){$jot('input_'+field).value=defaultValue;if($jot('input_'+field).triggerEvent&&!dontTrigger)$jot('input_'+field).triggerEvent("keyup");if($jot('input_'+field).showCustomPlaceHolder){$jot('input_'+field).showCustomPlaceHolder();}
var richArea=$jot("id_"+field).down('.nicEdit-main');if(richArea){richArea.innerHTML=defaultValue;if($jot('input_'+field).hasClassName('custom-hint-group')&&!$jot('input_'+field).hasContent){richArea.setStyle({'color':'#babbc0'});}}}else{if(type=="checkbox"||type=="radio"){$jot("id_"+field).select('input[type="radio"], input[type="checkbox"]').each(function(input){if(input.id in JotForm.defaultValues){input.checked=true;}else{input.checked=false;}});if($jot('id_'+field).triggerEvent&&!dontTrigger)$jot('id_'+field).triggerEvent('click');}else if(type=="select"){if($jot('input_'+field)){$jot('input_'+field).value=defaultValue;if($jot('input_'+field).triggerEvent&&!dontTrigger)$jot('input_'+field).triggerEvent('change');}else{$jot("id_"+field).select('select').each(function(element){element.value='';if(element.triggerEvent&&!dontTrigger)element.triggerEvent('change');});}}else if($jot('input_'+field)){$jot('input_'+field).value=defaultValue;if($jot('input_'+field).triggerEvent&&!dontTrigger){if(type=="widget"){var widgetEl=$jot('input_'+field);widgetEl.fire('widget:clear',{qid:parseInt(widgetEl.id.split('_')[1])});widgetEl.triggerEvent('change');}else{$jot('input_'+field).triggerEvent('keyup');}}
if(defaultValue===""&&$jot('input_'+field).hintClear){$jot('input_'+field).hintClear();}
if($jot('input_'+field).readAttribute("data-masked")=="true"){JotForm.setQuestionMasking("#input_"+field,"textMasking",$jot('input_'+field).readAttribute("maskValue"));}
if($jot('input_'+field).hasClassName("form-star-rating")&&$jot('input_'+field).setRating){$jot('input_'+field).setRating(0);}}}},checkValueByOperator:function(operator,condValueOrg,fieldValueOrg){try{if(typeof condValueOrg=="string"&&condValueOrg.indexOf("{")>-1&&condValueOrg.indexOf("}")>-1){condValueOrg=condValueOrg.replace(/\{.*?\}/gi,function(match,contents,offset,s){var stripped=match.replace(/[\{\}]/g,"");var elements=document.querySelectorAll('input[name$jot="_'+stripped+'"]');if(elements.length>0){var element=elements.first();if(element&&element.value){return element.value;}}
return match;});}}catch(e){console.log(e);}
var fieldValue=Object.isBoolean(fieldValueOrg)?fieldValueOrg:fieldValueOrg.toString().strip().toLowerCase();var condValue=Object.isBoolean(condValueOrg)?condValueOrg:condValueOrg.toString().strip().toLowerCase();switch(operator){case"equals":case"quantityEquals":case"equalDate":return fieldValue==condValue;case"equalDay":return JotForm.getDayOfWeek(fieldValue)==condValue;case"notEquals":case"notEqualDate":case"quantityNotEquals":return fieldValue!=condValue;case"notEqualDay":return JotForm.getDayOfWeek(fieldValue)!=condValue;case"endsWith":return fieldValue.endsWith(condValue);case"notEndsWith":return!fieldValue.endsWith(condValue);case"startsWith":return fieldValue.startsWith(condValue);case"notStartsWith":return!fieldValue.startsWith(condValue);case"contains":condValues=condValue.split(",");return $jotA(condValues).any(function(cv){return fieldValue.include(cv.replace(/^\s+|\s+$jot/g,''));});case"notContains":condValues=condValue.split(",");return!$jotA(condValues).any(function(cv){return fieldValue.include(cv.replace(/^\s+|\s+$jot/g,''));});case"greaterThan":case"quantityGreater":return(parseFloat(fieldValue,10)||0)>(parseFloat(condValue,10)||0);case"lessThan":case"quantityLess":if(fieldValue.length){return(parseFloat(fieldValue,10)||0)<(parseFloat(condValue,10)||0);}else{return false;}
case"isEmpty":if(Object.isBoolean(fieldValue)){return!fieldValue;}
return fieldValue.empty();case"isFilled":if(Object.isBoolean(fieldValue)){return fieldValue;}
return!fieldValue.empty();case"before":return fieldValueOrg<condValueOrg;case"after":return fieldValueOrg>condValueOrg;default:JotForm.error("Could not find this operator",operator);}
return false;},getDayOfWeek:function(date){date=new Date(date);var days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];return days[date.getDay()];},typeCache:{},getInputType:function(id){if(JotForm.typeCache[id]){return JotForm.typeCache[id];}
var type=false;if($jot('id_'+id)&&$jot('id_'+id).readAttribute('data-type')=="control_text"){type='html';}else if($jot('input_'+id)){type=$jot('input_'+id).nodeName.toLowerCase()=='input'?$jot('input_'+id).readAttribute('type').toLowerCase():$jot('input_'+id).nodeName.toLowerCase();if($jot('input_'+id).hasClassName("form-radio-other-input")){type="radio";}
if($jot('input_'+id).hasClassName("form-checkbox-other-input")){type="checkbox";}
if($jot('input_'+id).hasClassName('form-autocomplete')){type="autocomplete";}
if(document.querySelectorAll('#id_'+id+' .pad').length>0){type='signature';}
if($jot('input_'+id).hasClassName('form-slider')){type='slider';}
if($jot('input_'+id).hasClassName('form-widget')){type='widget';}
if($jot('input_'+id).hasClassName('form-star-rating')){type="rating";}}else if($jot('input_'+id+'_pick')||($jot('id_'+id)&&$jot('id_'+id).readAttribute('data-type')=="control_datetime")){type='datetime';}else if($jot('input_'+id+'_month')){type='birthdate';}else if($jot('input_'+id+'_hourSelect')){type='time';}else if($jot("cid_"+id)&&$jot("cid_"+id).getAttribute("data-type")=="control_collapse"){return'collapse';}else if(document.querySelectorAll('#id_'+id+' .form-product-item').length>0){type=document.querySelectorAll('#id_'+id+' .form-product-item')[0].select('input')[0].readAttribute('type').toLowerCase();}else if(document.querySelectorAll('#id_'+id+' .form-address-table').length>0){type='address';}else if(document.querySelectorAll('input[id^=input_'+id+'_]')[0]&&document.querySelectorAll('input[id^=input_'+id+'_]')[0].hasClassName('form-grading-input')){type='grading';}else{if(document.querySelectorAll('#id_'+id+' input')[0]){type=document.querySelectorAll('#id_'+id+' input')[0].readAttribute('type').toLowerCase();if(type=="text"||type=='tel'||type==='number'){type="combined";}}else if(document.querySelectorAll('#id_'+id+' select')[0]){type="select";}}
JotForm.typeCache[id]=type;return type;},strToDate:function(str){var invalid=new Date(undefined);var match=/(\d{4})\-(\d{2})-(\d{2})T?(\d{2})?\:?(\d{2})?/gim;if(str.empty()){return invalid;}
if(!match.test(str)){return invalid;}
var d=new Date();str.replace(match,function(all,year,month,day,hour,minutes){if(hour){d=new Date(parseInt(year,10),parseInt(month,10)-1,parseInt(day,10),parseInt(hour,10),parseInt(minutes,10));}else{d=new Date(parseInt(year,10),parseInt(month,10)-1,parseInt(day,10));}
return all;});return d;},getBirthDate:function(id){var day=$jot('input_'+id+'_day').getValue()||"%empty%";var month=$jot('input_'+id+'_month').selectedIndex||"%empty%";month=String(month);var year=$jot('input_'+id+'_year').getValue()||"%empty%";var date=year+"-"+(month.length==1?'0'+month:month)+"-"+(day.length==1?'0'+day:day);if(date.include("%empty%"))return"";return date;},get24HourTime:function(id){var hour=$jot('input_'+id+'_hourSelect').getValue();if(hour=="")return"";var minute=$jot('input_'+id+'_minuteSelect').getValue();if(minute.length==0)minute="00";var ampm=($jot('input_'+id+'_ampm'))?$jot('input_'+id+'_ampm').getValue():'';hour=Number(hour);if(ampm=='PM'&&hour!=12){hour+=12;}else if(ampm=='AM'&&hour==12){hour=0;}
hour=(hour<10)?"0"+hour:String(hour);return hour+minute;},getDateValue:function(id){var date="";if($jot('year_'+id)){date+=($jot('year_'+id).value||"%empty%");}
if($jot('month_'+id)){var mm=$jot('month_'+id).value?($jot('month_'+id).value.length>1?$jot('month_'+id).value:"0"+$jot('month_'+id).value):"%empty%";date+="-"+mm;}
if($jot('day_'+id)){var dd=$jot('day_'+id).value?($jot('day_'+id).value.length>1?$jot('day_'+id).value:"0"+$jot('day_'+id).value):"%empty%";date+="-"+dd;}
if(date.include("%empty%")){JotForm.info("Wrong date: "+date);return"";}
var h="";if($jot('ampm_'+id)){if($jot('hour_'+id)){h=$jot('hour_'+id).value;if($jot('ampm_'+id).value=='pm'){h=parseInt(h,10)+12;}
if(h=="24"){h=0;}
date+="T"+((h.length==1?"0"+h:h)||"00");}}else{if($jot('hour_'+id)){h=$jot('hour_'+id).value;date+="T"+((h.length==1?"0"+h:h)||"00");}}
if($jot('min_'+id)){date+=":"+($jot('min_'+id).value||"00");}
if(h===""){date+="T00:00";}
return date;},hidePages:{},checkCondition:function(condition){var any=false,all=true;var filled;$jotA(condition.terms).each(function(term){var value;var anotherField=JotForm.getFieldIdFromFieldRef(term.value);try{var fieldType=JotForm.getInputType(term.field);switch(fieldType){case"combined":if(['isEmpty','isFilled'].include(term.operator)){filled=document.querySelectorAll('#id_'+term.field+' input').collect(function(e){return e.value;}).any();if(JotForm.checkValueByOperator(term.operator,term.value,filled)){any=true;}else{all=false;}
return;}else{value=document.querySelectorAll('#id_'+term.field+' input').collect(function(e){return e.value;});if(JotForm.checkValueByOperator(term.operator,term.value,value)){any=true;}else{all=false;}}
break;case"address":if(['isEmpty','isFilled'].include(term.operator)){filled=document.querySelectorAll('#id_'+term.field+' input').collect(function(e){return e.value;}).any();if(JotForm.checkValueByOperator(term.operator,term.value,filled)){any=true;}else{all=false;}}else{var option;var termValue=term.value;if(anotherField){termValue=$jot('input_'+anotherField+'_country').value;}
$jot('input_'+term.field+'_country').select("option").each(function(opt){if(termValue===opt.value){option=opt;throw $jotbreak;}});if(option){if(term.operator=='equalCountry'){if(option.selected){any=true;}else{all=false;}}else if(term.operator=='notEqualCountry'){if(!option.selected){any=true;}else{all=false;}}}}
break;case"birthdate":case"datetime":value=(fieldType=="datetime")?JotForm.getDateValue(term.field):JotForm.getBirthDate(term.field);if(value===undefined){return;}
if(['isEmpty','isFilled'].include(term.operator)){if(JotForm.checkValueByOperator(term.operator,term.value,value)){any=true;}else{all=false;}}else{var termValue=term.value;termValue=term.value.toLowerCase().replace(/\s/g,"");if(termValue.indexOf('today')>-1){var offset=parseInt(termValue.split('today')[1])||0;var comparativeDate=new Date();comparativeDate.setDate(comparativeDate.getDate()+offset);var year=comparativeDate.getFullYear();var month=comparativeDate.getMonth()+1;month=(month<10)?'0'+month:month;var day=comparativeDate.getDate();day=(day<10)?'0'+day:day;termValue=year+"-"+month+"-"+day;}else if(anotherField){var year=$jot("year_"+anotherField).value;var month=$jot("month_"+anotherField).value;var day=$jot("day_"+anotherField).value;if(term.operator==="equalDay"||term.operator==="notEqualDay"){termValue=JotForm.getDayOfWeek(JotForm.strToDate(year+"-"+month+"-"+day));}else{termValue=year+"-"+month+"-"+day;}}
if(['equalDate','notEqualDate','after'].include(term.operator)){if(JotForm.checkValueByOperator(term.operator,JotForm.strToDate(termValue),JotForm.strToDate(value.split('T')[0]))){any=true;}else{all=false;}}else if(['equalDay','notEqualDay'].include(term.operator)){if(JotForm.checkValueByOperator(term.operator,termValue,JotForm.strToDate(value))){any=true;}else{all=false;}}else{if(JotForm.checkValueByOperator(term.operator,JotForm.strToDate(termValue),JotForm.strToDate(value))){any=true;}else{all=false;}}}
break;case"time":value=JotForm.get24HourTime(term.field);var termValue=(!term.value)?"":term.value.replace(/:/,"");if(anotherField){termValue=JotForm.get24HourTime(anotherField);}
if(termValue.length==3)termValue="0"+termValue;if(term.operator=='before'&&value.empty()){all=false;}else{if(JotForm.checkValueByOperator(term.operator,termValue,value))
any=true;else
all=false;}
break;case"checkbox":case"radio":if(['isEmpty','isFilled'].include(term.operator)){filled=document.querySelectorAll('#id_'+term.field+' input').collect(function(e){return e.checked;}).any();if(JotForm.checkValueByOperator(term.operator,term.value,filled)){any=true;}else{all=false;}
return;}
if(term.value)term.value=term.value.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<');if(['lessThan','greaterThan'].include(term.operator)){var localResult=false;document.querySelectorAll('#id_'+term.field+' input').each(function(input){value=input.checked?input.value:'';if(JotForm.checkValueByOperator(term.operator,term.value,value)){any=true;localResult=true;}});if(!localResult)all=false;return;}
var otherValue=$jot('id_'+term.field).down(".form-"+fieldType+"-other-input")?$jot('id_'+term.field).down(".form-"+fieldType+"-other-input").getAttribute('data-otherhint'):"";document.querySelectorAll('#id_'+term.field+' input').each(function(input){if(input.hasClassName('form-'+fieldType+'-other')&&input.checked){value='-- '+otherValue+' --';}else{value=input.checked?input.value:'';value=value.replace(/_expanded/,'');}
var termValue=term.value.strip();if(JotForm.checkValueByOperator(term.operator,termValue,value)){any=true;}else{if(term.operator=='notEquals'&&termValue==value){any=false;all=false;throw $jotbreak;}
if(input.value==termValue||(input.hasClassName('form-'+fieldType+'-other')&&termValue=='-- '+otherValue+' --')){all=false;}}});break;case"select":if(term.value)term.value=term.value.replace(/&amp;/g,'&');if($jot('input_'+term.field)&&$jot('input_'+term.field).multiple){if(term.operator=='equals'){var option=$jot('input_'+term.field).select('option[value='+term.value+']');if(option.length>0&&option[0].selected){any=true;}else{all=false;}}else if(term.operator=='notEquals'){var option=$jot('input_'+term.field).select('option[value='+term.value+']');if(option.length>0&&!option[0].selected){any=true;}else{all=false;}}else if(['isEmpty','isFilled'].include(term.operator)){var selected=false;var arr=$jot('input_'+term.field).options;for(var i=0;i<arr.length;i++){if(!arr[i].value.empty()&&arr[i].selected==true){selected=true;}}
if(term.operator=='isEmpty'){if(!selected)any=true;else all=false;}
if(term.operator=='isFilled'){if(selected)any=true;else all=false;}}}else if($jot('input_'+term.field)){value=$jot('input_'+term.field).value;if(value===undefined){return;}
if(JotForm.checkValueByOperator(term.operator,term.value,value)){any=true;}else{all=false;}}else{filled=document.querySelectorAll('#id_'+term.field+' select').collect(function(e){return e.value;}).any();if(JotForm.checkValueByOperator(term.operator,term.value,filled)){any=true;}else{all=false;}}
break;case"grading":if(['isEmpty','isFilled'].include(term.operator)){filled=document.querySelectorAll('input[id^=input_'+term.field+'_]').collect(function(e){return e.value;}).any();if(JotForm.checkValueByOperator(term.operator,term.value,filled)){any=true;}else{all=false;}}else{value=$jot('grade_point_'+term.field).innerHTML.stripTags();if(JotForm.checkValueByOperator(term.operator,term.value,value)){any=true;}else{all=false;}}
break;case"file":if($jot('id_'+term.field).select('.qq-uploader').length>0){value=$jot('id_'+term.field).select('.qq-upload-file').length>0;}else{if($jot('input_'+term.field).uploadMarked){value=$jot('input_'+term.field).uploadMarked;}else{value=$jot('input_'+term.field).value;}}
if(value===undefined){return;}
if(JotForm.checkValueByOperator(term.operator,term.value,value,term.field)){any=true;}else{all=false;}
break;case"textarea":value=$jot('input_'+term.field).value;if($jot('input_'+term.field).hinted||$jot('input_'+term.field).hasClassName('form-custom-hint')){value="";}
if(value===undefined){return;}
var rich=$jot('id_'+term.field).down('.nicEdit-main');if(rich){value=value.stripTags().replace(/\s/g,' ').replace(/&nbsp;/g,' ');}
if(JotForm.checkValueByOperator(term.operator,term.value,value,term.field)){any=true;}else{all=false;}
break;case"widget":value=$jot('input_'+term.field).value;if(value===undefined){return;}
if(value.indexOf("widget_metadata")>-1){try{value=JSON.parse(value).widget_metadata.value;var matchingItem=false;for(var i=0;i<value.length;i++){var obj=value[i];for(var item in obj){if(JotForm.checkValueByOperator(term.operator,term.value,obj[item],term.field)){any=true;matchingItem=true;}}}
if(!matchingItem)all=false;}catch(e){console.log(e);}}else{value=(term.operator==="greaterThan"||term.operator==="lessThan")&&typeof value==="string"?value.replace(/,/g,''):value;if(JotForm.checkValueByOperator(term.operator,term.value,value,term.field)){any=true;}else{all=false;}}
break;case"hidden":if($jot('input_'+term.field+"_donation")){value=$jot('input_'+term.field+"_donation").value;}else{value=$jot('input_'+term.field).value;}
if(JotForm.checkValueByOperator(term.operator,term.value,value,term.field)){any=true;}else{all=false;}
break;case"rating":value=$jot('input_'+term.field).value||'';if(JotForm.checkValueByOperator(term.operator,term.value,value,term.field)){any=true;}else{all=false;}
break;default:if(!$jot('input_'+term.field)){return;}
value=$jot('input_'+term.field).value;if($jot('input_'+term.field).hinted){value="";}
if(value===undefined){return;}
if(JotForm.checkValueByOperator(term.operator,term.value,value,term.field)){any=true;}else{all=false;}}}catch(e){JotForm.error(e);}});if(condition.type=='field'){var isConditionValid=(condition.link.toLowerCase()=='any'&&any)||(condition.link.toLowerCase()=='all'&&all);condition.action.each(function(action){var matchingTermAction=condition.terms.any(function(term){return term.field==action.field;});if(isConditionValid){action.currentlyTrue=true;if(action.visibility.toLowerCase()=='show'){JotForm.showField(action.field);}else if(action.visibility.toLowerCase()=='hide'){JotForm.hideField(action.field,false,matchingTermAction);}else if(action.visibility.toLowerCase()=='showmultiple'&&action.fields){action.fields.each(function(field){JotForm.showField(field,true);});}else if(action.visibility.toLowerCase()=='hidemultiple'&&action.fields){action.fields.each(function(field){JotForm.hideField(field,true,matchingTermAction);});}}else{action.currentlyTrue=false;if(action.visibility.toLowerCase()=='show'){JotForm.hideField(action.field,false,matchingTermAction);}else if(action.visibility.toLowerCase()=='hide'){JotForm.showField(action.field);}else if(action.visibility.toLowerCase()=='showmultiple'&&action.fields){action.fields.each(function(field){JotForm.hideField(field,true,matchingTermAction);});}else if(action.visibility.toLowerCase()=='hidemultiple'&&action.fields){action.fields.each(function(field){JotForm.showField(field,true);});}}
if(window.FORM_MODE!=='cardform')JotForm.iframeHeightCaller();if($jot('section_'+action.field)||('fields'in action)){JotForm.runAllCalculations(true);}
if($jot('input_'+action.field)&&$jot('input_'+action.field).triggerEvent){if(!matchingTermAction&&$jot('input_'+action.field).className.indexOf("-other-")<0){$jot('input_'+action.field).triggerEvent('keyup');}}});}else if(condition.type=='require'){var isConditionValid=(condition.link.toLowerCase()=='any'&&any)||(condition.link.toLowerCase()=='all'&&all);condition.action.each(function(action){action.currentlyTrue=isConditionValid;if(action.visibility.toLowerCase()=='require'){JotForm.requireField(action.field,isConditionValid);}else if(action.visibility.toLowerCase()=='unrequire'){JotForm.requireField(action.field,!isConditionValid);}else if(action.visibility.toLowerCase()=='requiremultiple'&&action.fields){action.fields.each(function(field){JotForm.requireField(field,isConditionValid);});}else if(action.visibility.toLowerCase()=='unrequiremultiple'&&action.fields){action.fields.each(function(field){JotForm.requireField(field,!isConditionValid);});}else if(action.visibility.toLowerCase()=='enable'){JotForm.enableDisableField(action.field,isConditionValid);}else if(action.visibility.toLowerCase()=='disable'){JotForm.enableDisableField(action.field,!isConditionValid);}});}else if(condition.type=='mask'){condition.action.each(function(action){if((condition.link.toLowerCase()=='any'&&any)||(condition.link.toLowerCase()=='all'&&all)){condition.conditionTrue=true;JotForm.setQuestionMasking("#input_"+action.field,"textMasking",action.mask);$jot("input_"+action.field).writeAttribute('masked',"true");}else{condition.conditionTrue=false;var removeMask=true;$jotA(JotForm.conditions).each(function(cond){if(cond.disabled==true)return;if(cond.type!=='mask')return;if(!cond.conditionTrue)return;$jotA(cond.action).each(function(act){if(act.field==action.field){removeMask=false;}});});if(removeMask){JotForm.setQuestionMasking("#input_"+action.field,"","",true);$jot("input_"+action.field).writeAttribute('masked',"false");}}});}else if(condition.type=='calculation'){if(!$jot("id_"+condition.action[0].resultField)){return;}
var calcs=JotForm.calculations;var cond=null;for(var i=0;i<calcs.length;i++){if(calcs[i].conditionId===condition.id){calc=calcs[i];}}
if((condition.link.toLowerCase()=='any'&&any)||(condition.link.toLowerCase()=='all'&&all)){calc.conditionTrue=true;if(JotForm.ignoreInsertionCondition)return;JotForm.checkCalculation(calc);}else{calc.conditionTrue=false;if(JotForm.ignoreInsertionCondition)return;setTimeout(function(calc){var matchForThisResult={};var subfield;for(var i=0;i<calcs.length;i++){if((condition.action[0].resultField==calcs[i].resultField&&calcs[i].hasOwnProperty('conditionTrue')&&calcs[i].conditionTrue)&&!(JotForm.getInputType(condition.action[0].resultField)==="html"&&condition.action[0].replaceText!==calcs[i].replaceText)){subfield=calcs[i].resultSubField||"";matchForThisResult[calcs[i].resultField+subfield]=true;}}
subfield="resultSubField"in condition.action[0]?condition.action[0].resultSubField:"";if(!matchForThisResult[condition.action[0].resultField+subfield]){try{var dontTrigger=condition.terms.map(function(term){return term.field===condition.action[0].resultField;}).any();if(!dontTrigger){dontTrigger=condition.action[0].operands&&condition.action[0].operands.split(',').include(condition.action[0].resultField);}
JotForm.clearField(condition.action[0].resultField,subfield,dontTrigger);}catch(e){console.log(e);}}},50,calc);}}else{if($jotA(condition.action).length>0&&condition.action.first().skipHide==='hidePage'){var action=condition.action.first();if((condition.link.toLowerCase()=='any'&&any)||(condition.link.toLowerCase()=='all'&&all)){JotForm.hidePages[parseInt(action.skipTo.replace('page-',''),10)]=true;}else{JotForm.hidePages[parseInt(action.skipTo.replace('page-',''),10)]=false;}
return;}
if(JotForm.nextPage){return;}
if((condition.link.toLowerCase()=='any'&&any)||(condition.link.toLowerCase()=='all'&&all)){var action=condition.action[0];var sections=document.querySelectorAll('.page-section');if(action.skipTo=='end'){JotForm.nextPage=sections[sections.length-1];}else{JotForm.nextPage=sections[parseInt(action.skipTo.replace('page-',''),10)-1];}}else{JotForm.info('Fail: Skip To: page-'+JotForm.currentPage+1);JotForm.nextPage=false;}}
JotForm.enableDisableButtonsInMultiForms();},currentPage:false,nextPage:false,previousPage:false,fieldConditions:{},setFieldConditions:function(field,event,condition){if(!JotForm.fieldConditions[field]){JotForm.fieldConditions[field]={event:event,conditions:[]};}
JotForm.fieldConditions[field].conditions.push(condition);},widgetsAsCalculationOperands:[],requireField:function(qid,req){if(!$jot('id_'+qid))return;if(JotForm.otherConditionTrue(qid,req?'unrequire':'require'))return;document.querySelectorAll('#id_'+qid+' input, #id_'+qid+' textarea, #id_'+qid+' select').each(function(el){if(el.id==='coupon-input'||(el.type==='hidden'&&!el.up('.form-star-rating')&&!el.hasClassName('form-widget'))||el.hasClassName('form-checkbox-other-input')||el.hasClassName('form-radio-other-input')||$jotA(['prefix','middle','suffix','addr_line2']).any(function(name){return el.name.indexOf("["+name+"]")>-1;})){return;}
var validations=[];if(el.className.indexOf('validate[')>-1){validations=el.className.substr(el.className.indexOf('validate[')+9);validations=validations.substr(0,validations.indexOf(']')).split(/\s*,\s*/);}else{validations=[];}
if(JotForm.getInputType(qid)=="file"&&el.getAttribute("multiple")=="multiple"&&el.up('[class*=validate[multipleUpload]]')){var uploadWrapper=el.up('[class*=validate[multipleUpload]]');uploadWrapper.className=uploadWrapper.className.replace(/validate\[required\]/gi,'');if(req){uploadWrapper.addClassName("validate[required]");}else{uploadWrapper.removeClassName("form-validation-error");}}
el.className=el.className.replace(/validate\[.*\]/,'');for(var i=validations.length-1;i>=0;i--){if(validations[i]==='required'){validations.splice(i,1);}}
if(req){validations.push('required');if(el.hasClassName('form-widget')){el.addClassName('widget-required');}}else{el.removeClassName('form-validation-error');el.removeClassName('widget-required');}
if(validations.length>0){el.addClassName('validate['+validations.join(',')+']');}
JotForm.setFieldValidation(el);});if(document.querySelectorAll('div.pad#sig_pad_'+qid)[0]){document.querySelectorAll('div.pad#sig_pad_'+qid)[0].setAttribute('data-required',req);}
if(req){if($jot('label_'+qid)&&!$jot('label_'+qid).down('.form-required')){$jot('label_'+qid).insert('<span class="form-required">*</span>');}}else{if($jot('label_'+qid)&&$jot('label_'+qid).down('.form-required')){$jot('label_'+qid).down('.form-required').remove();}
if($jot("id_"+qid).down('.form-error-message')){$jot("id_"+qid).down('.form-error-message').remove();}
$jot("id_"+qid).removeClassName('form-line-error');if(document.querySelectorAll('.form-line-error').length==0){JotForm.hideButtonMessage();}}},enableDisableField:function(qid,enable){if(!$jot('id_'+qid))return;try{$jot('id_'+qid).select("input, textarea, select, button").each(function(input){if(enable){input.removeClassName("conditionallyDisabled");if(!JotForm.isEditMode()){input.enable();return;}
switch(input.tagName){case'SELECT':document.querySelectorAll('#'+input.id+' > option').each(function(opt){opt.enable();});break;default:input.removeAttribute('readonly');input.enable();break;}
return;}
input.addClassName("conditionallyDisabled");if(!JotForm.isEditMode()){input.disable();return;}
switch(input.tagName){case'SELECT':document.querySelectorAll('#'+input.id+' > option:not(:selected)').each(function(opt){opt.disable();});break;case'INPUT':if((['checkbox','radio'].include(input.type)&&!input.checked)||input.type==='file')
{input.disable();}
default:input.setAttribute('readonly','');break;}});}catch(e){console.log(e);}},triggerWidgetCalculation:function(id){if(JotForm.widgetsAsCalculationOperands.include(id)){if(document.createEvent){var evt=document.createEvent('HTMLEvents');evt.initEvent('change',true,true);$jot('input_'+id).dispatchEvent(evt);}else if($jot('input_'+id).fireEvent){return $jot('input_'+id).fireEvent('onchange');}}},setCalculationResultReadOnly:function(){$jotA(JotForm.calculations).each(function(calc,index){if((calc.readOnly&&calc.readOnly!="0")&&$jot('input_'+calc.resultField)!=null){$jot('input_'+calc.resultField).setAttribute('readOnly','true');}});},setCalculationEvents:function(){var setCalculationListener=function(el,ev,calc){$jot(el).observe(ev,function(){if(ev==="paste"){setTimeout(function(){el.addClassName('calculatedOperand');JotForm.checkCalculation(calc);},10);}else{el.addClassName('calculatedOperand');JotForm.checkCalculation(calc);}});};$jotA(JotForm.calculations).each(function(calc,index){if(!calc.operands)return;var ops=calc.operands.split(',');for(var i=0;i<ops.length;i++){var opField=ops[i];if(!opField||opField.empty()||!$jot('id_'+opField))continue;var type=JotForm.calculationType(opField),ev;switch(type){case"widget":setCalculationListener($jot('id_'+opField),'change',calc);JotForm.widgetsAsCalculationOperands.push(opField);break;case'radio':case'checkbox':setCalculationListener($jot('id_'+opField),'click',calc);if($jot('input_'+opField)){setCalculationListener($jot('id_'+opField),'keyup',calc);}
break;case'select':case'file':if(Protoplus&&Protoplus.getIEVersion&&Protoplus.getIEVersion()==8){setCalculationListener($jot('id_'+opField),'click',calc);}else{setCalculationListener($jot('id_'+opField),'change',calc);}
break;case'datetime':setCalculationListener($jot('id_'+opField),'date:changed',calc);document.querySelectorAll("#id_"+opField+' select').each(function(el){setCalculationListener($jot(el),'change',calc);});break;case'time':case'birthdate':document.querySelectorAll("#id_"+opField+' select').each(function(el){setCalculationListener($jot(el),'change',calc,index);});break;case'address':setCalculationListener($jot('id_'+opField),'change',calc,index);setCalculationListener($jot('id_'+opField),'blur',calc,index);setCalculationListener($jot('id_'+opField),'keyup',calc,index);document.querySelectorAll("#id_"+opField+' select').each(function(el){setCalculationListener($jot(el),'change',calc,index);});break;case'number':setCalculationListener($jot('id_'+opField),'keyup',calc,index);setCalculationListener($jot('id_'+opField),'paste',calc,index);setCalculationListener($jot('id_'+opField),'click',calc,index);break;default:setCalculationListener($jot('id_'+opField),'change',calc,index);setCalculationListener($jot('id_'+opField),'blur',calc,index);setCalculationListener($jot('id_'+opField),'keyup',calc,index);setCalculationListener($jot('id_'+opField),'paste',calc,index);break;}}});},runAllCalculations:function(ignoreEditable,htmlOnly){$jotA(JotForm.calculations).each(function(calc,index){if(htmlOnly&&JotForm.getInputType(calc.resultField)!=="html")return;if(!(ignoreEditable&&(!calc.readOnly||calc.readOnly=="0"))&&!!calc.equation){JotForm.checkCalculation(calc);}});},calculationType:function(id){var paymentTypes=['control_stripe','control_paymill','control_payment','control_paypal','control_paypalexpress','control_paypalpro','control_clickbank','control_2co','control_googleco','control_worldpay','control_onebip','control_authnet','control_dwolla','control_braintree','control_square','control_boxpayment','control_eway','control_bluepay','control_firstdata','control_payjunction','control_chargify','control_cardconnect','control_echeck','control_bluesnap'];if($jot('id_'+id)&&$jot('id_'+id).readAttribute('data-type')&&paymentTypes.include($jot('id_'+id).readAttribute('data-type'))){return $jot('id_'+id).readAttribute('data-type').replace("control_","");}else if($jot('id_'+id)&&$jot('id_'+id).readAttribute('data-type')=='control_matrix'){return'matrix';}else{return JotForm.getInputType(id);}},checkCalculation:function(calc){if(calc.hasOwnProperty('conditionTrue')&&!calc.conditionTrue){return'';}
var result=calc.resultField;var showBeforeInput=(calc.showBeforeInput&&calc.showBeforeInput!="0")?calc.showBeforeInput:false;var ignoreHidden=(calc.ignoreHiddenFields&&calc.ignoreHiddenFields!="0")?calc.ignoreHiddenFields:false;var useCommasForDecimals=(calc.useCommasForDecimals&&calc.useCommasForDecimals!="0")?calc.useCommasForDecimals:false;if(!$jot('id_'+result))return;try{if(!['text','email','textarea','calculation','combined','address','datetime','time','html','authnet','paypalpro','number','radio','checkbox','select','matrix','braintree','stripe','square','eway','bluepay','firstdata','chargify','echeck',].include(JotForm.calculationType(result)))return;}catch(e){console.log(e);}
var combinedObject={};var getValue=function(data,numeric){var subField="";if(data.indexOf("_")>-1){subField=data.substring(data.indexOf("_"));data=data.substring(0,data.indexOf("_"));}
if(!$jot('id_'+data))return'';if(!$jot('id_'+data).hasClassName('calculatedOperand')&&showBeforeInput)return'';if(ignoreHidden&&($jot('id_'+data).hasClassName("form-field-hidden")||($jot('id_'+data).up(".form-section")&&$jot('id_'+data).up(".form-section").hasClassName("form-field-hidden")))){return numeric?0:'';}
var type=JotForm.calculationType(data);var val='';switch(type){case'matrix':if($jot("id_"+data).down('.form-radio')){document.querySelectorAll('input[id^="input_'+data+subField+'_"]').each(function(radio){if(radio.checked){val=radio.readAttribute('data-calcvalue')?radio.readAttribute('data-calcvalue'):radio.value;}});}else{if($jot("input_"+data+subField)){if($jot("input_"+data+subField).type=="checkbox"){if($jot("input_"+data+subField).checked){var chk=$jot("input_"+data+subField);if(chk.readAttribute('data-calcvalue')){val=chk.readAttribute('data-calcvalue');}else{val=chk.value;}}}else{val=$jot("input_"+data+subField).value;}}}
break;case'stripe':case'paymill':case'payment':case'paypal':case'paypalexpress':case'paypalpro':case'clickbank':case'2co':case'googleco':case'worldpay':case'onebip':case'authnet':case'dwolla':case'braintree':case'square':case'eway':case'bluepay':if($jot("id_"+data).down('#payment_total')){val=$jot("id_"+data).down('#payment_total').innerHTML;}else if($jot('input_'+data+'_donation')){val=$jot('input_'+data+'_donation').value;}
if(JotForm.currencyFormat&&JotForm.currencyFormat.dSeparator===","){val=val.replace(/\./g,"").replace(/\,/g,".");}
break;case'radio':document.querySelectorAll("#id_"+data+' input[type="radio"]').each(function(rad,i){if(rad.checked){if(rad.readAttribute('data-calcvalue')){val=rad.readAttribute('data-calcvalue');}else{var otherOption=JotForm.getOptionOtherInput(rad);if(typeof FormTranslation!=='undefined'&&otherOption&&otherOption.innerHTML){val=JotForm.getOptionOtherInput(rad).innerHTML;}else{val=rad.value;}}}});break;case'checkbox':var valArr=[];document.querySelectorAll("#id_"+data+' input[type="checkbox"]').each(function(chk,i){if(chk.checked){if(chk.readAttribute('data-calcvalue')){valArr.push(chk.readAttribute('data-calcvalue'));}else{if(typeof FormTranslation!=='undefined'&&chk.next()&&chk.next().innerHTML){valArr.push(chk.next().innerHTML);}else{valArr.push(chk.value);}}}});if(numeric){val=valArr.inject(0,function(accum,thisVal){return accum+(parseFloat(thisVal.replace(/-?([^0-9])/g,"$jot1").replace(/[^0-9\.-]/g,""))||0);});}else{val=valArr.join();}
break;case'select':var optionValue=function(option){if(option.textContent)return option.textContent.replace(/^\s+|\s+$jot/g,'');return option.innerText.replace(/^\s+|\s+$jot/g,'');};if(numeric)val=0;$jot('input_'+data).select('option').each(function(option,ind){var option=$jot('input_'+data).options[ind];if(option&&option.selected){var current=option.readAttribute('data-calcvalue')&&(!calc.hasOwnProperty('insertAsText')||(calc.hasOwnProperty('insertAsText')&&(calc.insertAsText==false||calc.insertAsText==='0')))?option.readAttribute('data-calcvalue'):optionValue(option);if(numeric){val+=(current==="")?0:parseFloat(current.replace(/[^\-0-9.]/g,""));}else{val+=current;}}});break;case'number':if(document.querySelectorAll("#id_"+data+' input[type="number"]').length>1){var valArr=[];document.querySelectorAll("#id_"+data+' input[type="number"]').each(function(el){valArr.push(el.value);});val=valArr.join(' ');}else{if(!$jot('input_'+data).value.empty()&&!isNaN($jot('input_'+data).value)){val=parseFloat($jot('input_'+data).value);}}
break;case'combined':case'grading':var valArr=[];combinedObject={};document.querySelectorAll("#id_"+data+' input[type="text"]').each(function(el){if(!el.value.empty()){valArr.push(el.value);}
var id=el.id.replace(/_.*/,"");combinedObject[id]=el.value;});document.querySelectorAll("#id_"+data+' input[type="tel"]').each(function(el){if(!el.value.empty()){valArr.push(el.value);}
var id=el.id.replace(/input_[0-9].*_+/,"");combinedObject[id]=el.value;});val=valArr.join(' ');break;case'datetime':var valArr=[];if(numeric){valArr.push($jot("month_"+data).value);valArr.push($jot("day_"+data).value);valArr.push($jot("year_"+data).value);}else{document.querySelectorAll("#id_"+data+' input[type="tel"]').each(function(el){valArr.push(el.value);var id=el.id.replace(/_.*/,"");combinedObject[id]=el.value;});document.querySelectorAll("#id_"+data+' select').each(function(el){var id=el.id.replace(/_.*/,"");combinedObject[id]=el.value;});}
document.querySelectorAll("#id_"+data+' select').each(function(el){valArr.push(el.value);});if(numeric){if(!valArr[0].empty()&&!valArr[1].empty()&&!valArr[2].empty()){var hours=mins=ampm='';if(valArr.length>4&&!valArr[3].empty()&&!valArr[4].empty()){hours=parseInt(valArr[3]);if(valArr.length==6&&!valArr[5].empty()){ampm=valArr[5];if(ampm=='PM'&&hours!=12){hours+=12;}else if(ampm=='AM'&&hours==12){hours=0;}}
mins=valArr[4];}
var millis=Date.UTC(valArr[2],valArr[0]-1,valArr[1],hours,mins);val=millis/60/60/24/1000;}else{val=0;}}else{if(valArr.length>2&&!valArr[0].empty()&&!valArr[1].empty()&&!valArr[0].empty()){var separator="/";var separatorEl=document.querySelectorAll("#id_"+data+" span[class=date-separate]").first();if(separatorEl){separator=separatorEl.innerHTML.replace(/[^\/\-\.]/g,'');}
val=valArr[0]+separator+valArr[1]+separator+valArr[2];}
if(valArr.length>4&&!valArr[3].empty()&&!valArr[4].empty()){val+=' '+valArr[3]+':'+valArr[4];if(valArr.length==6&&!valArr[5].empty())val+=' '+valArr[5];}}
break;case'time':if(subField=="_duration"){if($jot("duration_"+data+"_ampmRange")){if(numeric){var duration=$jot("duration_"+data+"_ampmRange").value;if(duration.indexOf(":")>-1){var time=duration.split(":");var hours=time[0]||0;var mins=time[1]||0;var millis=Date.UTC('1970','0','1',hours,mins);val=millis/60/60/1000;}}else{val=$jot("duration_"+data+"_ampmRange").value;}}
break;}
var valArr=[];combinedObject={};if(numeric){document.querySelectorAll("#id_"+data+' select').each(function(el){valArr.push(el.value);});var hour,mins,ampm='';hours=parseInt(valArr[0])||0;if(valArr.length==3&&!valArr[2].empty()){ampm=valArr[2];if(ampm=='PM'&&hours!=12){hours+=12;}else if(ampm=='AM'&&hours==12){hours=0;}}
mins=valArr[1];var millis=Date.UTC('1970','0','1',hours,mins);val=millis/60/60/1000;}else{if($jot("input_"+data+"_hourSelect")&&!$jot("input_"+data+"_hourSelect").value.empty()&&$jot("input_"+data+"_minuteSelect")&&!$jot("input_"+data+"_minuteSelect").value.empty()){val=$jot("input_"+data+"_hourSelect").value+":"+$jot("input_"+data+"_minuteSelect").value;if($jot("input_"+data+"_ampm")){val+=" "+$jot("input_"+data+"_ampm").value;}}
if($jot("input_"+data+"_hourSelectRange")&&!$jot("input_"+data+"_hourSelectRange").value.empty()&&$jot("input_"+data+"_minuteSelectRange")&&!$jot("input_"+data+"_minuteSelectRange").value.empty()){val+=" - "+$jot("input_"+data+"_hourSelectRange").value+":"+$jot("input_"+data+"_minuteSelectRange").value;if($jot("input_"+data+"_ampmRange")){val+=" "+$jot("input_"+data+"_ampmRange").value;}
if($jot("duration_"+data+"_ampmRange")&&!$jot("duration_"+data+"_ampmRange").value.empty()){val+=" ("+$jot("duration_"+data+"_ampmRange").value+")";}}
document.querySelectorAll("#id_"+data+' select').each(function(el){var id=el.id.replace(/.*_.*_/,"");combinedObject[id]=el.value;});}
break;case'birthdate':var valArr=[];if(numeric){try{var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"]
var months=monthNames.indexOf($jot("input_"+data+"_month").value);var days=$jot("input_"+data+"_day").value;var years=$jot("input_"+data+"_year").value;var millis=new Date(years,months,days).getTime();val=millis/60/60/24/1000;}catch(e){console.log("birthdate error");console.log(e);}}else{document.querySelectorAll("#id_"+data+' select').each(function(el){valArr.push(el.value);});if(!valArr[0].empty()&&!valArr[1].empty()&&!valArr[2].empty()){val=valArr[0]+' '+valArr[1]+' '+valArr[2];}}
break;case'address':var valArr=[];combinedObject={};document.querySelectorAll("#id_"+data+' input[type="text"]').each(function(el){if(!el.value.empty()){valArr.push(el.value);}
var id=el.id.replace(/input_[0-9].*?_+/,"");combinedObject[id]=el.value;});document.querySelectorAll("#id_"+data+' select').each(function(el){if(!el.value.empty()){valArr.push(el.value);}
var id=el.id.replace(/input_[0-9].*_+/,"");combinedObject[id]=el.value;});val=valArr.join(', ');break;case'file':val=$jot('input_'+data).value;val=val.substring(val.lastIndexOf("\\")+1);break;case'textarea':if($jot('input_'+data)&&typeof $jot('input_'+data).value!=='undefined'){val=$jot('input_'+data).value;var rich=$jot('id_'+data).down('.nicEdit-main');if(rich){val=val.stripTags().replace(/\s/g,' ').replace(/&nbsp;/g,' ');}}
break;case'widget':var widgetType=JotForm.getWidgetType(data);switch(widgetType){case"timer":case"fancyTimer":if(numeric){val=$jot('input_'+data).value;}else{var seconds=$jot('input_'+data).value;var minutes=Math.floor(seconds/60);seconds=seconds-(minutes*60);seconds=JotForm.addZeros(seconds,2);val=minutes+":"+seconds;}
break;case"configurableList":case"dynMatrix":var br=JotForm.calculationType(result)==="html"?"<br/>":"\n";var json=$jot('input_'+data).value;try{json=JSON.parse(json);for(var i=0;i<json.length;i++){var valArr=[];for(line in json[i]){if(!json[i].hasOwnProperty(line))continue;if(!json[i][line].empty()){valArr.push(json[i][line]);}}
val+=valArr.join(",")+br;}}catch(e){console.log($jot('input_'+data).value);console.log(calc)}
break;case"giftRegistry":val=$jot('input_'+data).value;if(JotForm.calculationType(result)==="html"){val=val.replace(/\n/g,"<br/>");}
break;case"imagelinks":case"links":var br=JotForm.calculationType(result)==="html"?"<br/>":"\n";var json=JSON.parse($jot('input_'+data).value).widget_metadata.value;for(var i=0;i<json.length;i++){if(json[i].url.replace(/\s/g,"").empty())continue;var showName=json[i].name&&!json[i].name.replace(/\s/g,"").empty();if(JotForm.calculationType(result)==="html"){if(widgetType==="imagelinks"){val+='<a href="'+json[i].url+'"><img src="'+json[i].url+'" /></a>';}else{val+='<a href="'+json[i].url+'">'+(showName?json[i].name:json[i].url)+'</a>';}}else{val+=showName?json[i].name+": ":"";val+=json[i].url+br;}}
break;case"htmltext":var b64=JSON.parse($jot('input_'+data).value).widget_metadata.value;val=window.atob?window.atob(b64):"";if(JotForm.calculationType(result)!=="html"){val=val.strip().replace(/<br>/g,"\n").stripTags().replace(/&nbsp;/g,' ');}
break;case"drivingDistance":val=$jot('input_'+data).value;if(val.indexOf("Distance")>-1){var matches=val.match(/Distance(.*)/);if(matches.length>1){val=matches[1];}}
break;default:val=$jot('input_'+data).value;break;}
break;default:if($jot('input_'+data)&&typeof $jot('input_'+data).value!=='undefined'){val=$jot('input_'+data).value;}
break;}
if(numeric&&typeof val!=='number'){if(useCommasForDecimals){if(/\..*\,/.test(val)){val=val.replace(/\./g,"");}
val=val.replace(",",".");}
val=val.replace(/-?([^0-9])/g,"$jot1").replace(/[^0-9\.-]/g,"");}
if(numeric&&val<0){val='('+val+')';}
if(numeric&&val===''){val=0;}
return val;};var calculate=function(equation,numeric){var out='';var acceptableFunctions={"abs":Math.abs,"acos":Math.acos,"acosh":Math.acosh,"asin":Math.asin,"asinh":Math.asinh,"atan":Math.atan,"atanh":Math.atanh,"atan2":Math.atan2,"cbrt":Math.cbrt,"ceil":Math.ceil,"cos":Math.cos,"cosh":Math.cosh,"exp":Math.exp,"expm1":Math.expm1,"floor":Math.floor,"fround":Math.fround,"hypot":Math.hypot,"imul":Math.imul,"log":Math.log,"log1p":Math.log1p,"log10":Math.log10,"log2":Math.log2,"max":Math.max,"min":Math.min,"pow":Math.pow,"random":Math.random,"round":Math.round,"sign":Math.sign,"sin":Math.sin,"sinh":Math.sinh,"sqrt":Math.sqrt,"tan":Math.tan,"tanh":Math.tanh,"toSource":Math.toSource,"trunc":Math.trunc,"E":Math.E,"LN2":Math.LN2,"LN10":Math.LN10,"LOG2E":Math.LOG2E,"LOG10E":Math.LOG10E,"PI":Math.PI,"SQRT1_2":Math.SQRT1_2,"SQRT2":Math.SQRT2};for(var i=0;i<equation.length;i++){character=equation.charAt(i);if(character==='['&&!numeric){var end=equation.indexOf(']',i);try{var num=calculate(equation.substring(i+1,end),true);if(num){if(num.indexOf(",")==-1){num=new MathProcessor().parse(num);if(JotForm.getInputType(calc.resultField)!=="datetime"){num=num.toFixed(calc.decimalPlaces);if(!calc.showEmptyDecimals||calc.showEmptyDecimals=="0"){num=parseFloat(num);}}
if(!isFinite(num)){num=0;}}
if(useCommasForDecimals){num=num.toString().replace(".",",");}
out+=num;}}catch(e){console.log('exception in '+calc.conditionId+" : "+num+"("+equation+")");}
i=end;}else if(equation.substr(i,3)==='|*|'){try{i+=3;var end=equation.indexOf('|*|',i);if(end===-1)continue;var specOp=equation.substring(i,end);i+=end+2-i;if(equation.charAt(i+1)==='('||(equation.charAt(i+1)==='['&&equation.charAt(i+2)==='(')){i+=(equation.charAt(i+1)==='[')?3:2;var endSpecial=-1;var balance=1;for(var k=i;k<equation.length;k++){if(equation.charAt(k)===')'){balance--;if(balance===0){endSpecial=k;break;}}else if(equation.charAt(k)==='('){balance++;}}
if(endSpecial===-1)continue;var args=equation.substring(i,endSpecial);args=args.split(',');var originalArgs=args.slice(0);for(var j=0;j<args.length;j++){args[j]=calculate(args[j],true);if(args[j]){args[j]=new MathProcessor().parse(args[j]);}}
i+=endSpecial-i;if(specOp==='dateString'){var millis=args[0]*24*60*60*1000+30000;var date=new Date(millis);var getUTCStringDate=function(date){var monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];var day=dayNames[date.getUTCDay()];var month=monthNames[date.getUTCMonth()];var dayOfMonth=JotForm.addZeros(date.getUTCDate(),2);var year=date.getUTCFullYear();return day+" "+month+" "+dayOfMonth+" "+year;};out+=getUTCStringDate(date);if(equation.charAt(i)===']'){i++;}else{equation=equation.substr(0,i+1)+'['+equation.substr(i+1);}}else if(specOp==='date'){if(args.length>2){var millis=Date.UTC(args[0],args[1]-1,args[2]);out+=millis/60/60/24/1000;}}else if(specOp==='nth'){var n=args[0];args=args.splice(1);args=args.sort(function(a,b){if(parseInt(a)>parseInt(b))return 1;if(parseInt(b)>parseInt(a))return-1;return 0;});args=args.reverse();out+=args[parseInt(n)-1];}else if(specOp==='avg'||specOp==='avgNoZero'){var len=sum=0;for(var j=0;j<args.length;j++){if(parseFloat(args[j])>0){len++;sum+=parseFloat(args[j]);}}
out+=specOp==='avg'?sum/args.length:sum/len;}else if(specOp==='count'){var field=originalArgs[0];field=field.replace(/[\{\}]/g,'');var type=JotForm.getInputType(field);var len=document.querySelectorAll("#id_"+field+' input[type="'+type+'"]:checked').length;out+=len;}else if(specOp==='commaSeparate'){if(typeof args[0]=="number"){args[0]=args[0].toFixed(calc.decimalPlaces);var parts=args[0].toString().split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");out+=parts.join(".");}else{out+=args[0];}}else{out+=acceptableFunctions[specOp].apply(undefined,args);}}else if(specOp==='random'){out+=Math.random();}else{out+=acceptableFunctions[specOp];}}catch(e){console.log(e);}}else if(character==='{'){var end=equation.indexOf('}',i);var qid=equation.substring(i+1,end);try{var val=getValue(qid,numeric);}catch(e){console.log("error catching value");console.log(e);}
if(val===''&&numeric)return false;out+=val;i+=end-i;}else{out+=character;}}
return out;};var output=calculate(calc.equation);if(!(typeof output=="string"&&output.length>1)&&parseFloat(output)===0&&$jot('input_'+result)&&($jot('input_'+result).readAttribute('defaultValue')!=null||$jot('input_'+result).readAttribute('data-defaultvalue')!=null)){output=$jot('input_'+result).readAttribute('defaultValue')||$jot('input_'+result).readAttribute('data-defaultvalue');}
var resultFieldType=calc.isLabel?"html":JotForm.calculationType(result);switch(resultFieldType){case"html":try{if(!calc.replaceText)calc.replaceText="";if(calc.replaceText.indexOf(":")>-1){var subfield=calc.replaceText.substr(calc.replaceText.indexOf(":")+1);if(subfield in combinedObject){output=combinedObject[subfield];}}
if(output.empty()&&calc.defaultValue){output=calc.defaultValue;}
var spans=document.querySelectorAll("."+result+"_"+calc.replaceText.replace(":","\\:"));if(spans.length==0){var contents=calc.isLabel?$jot('label_'+result).innerHTML:$jot('text_'+result).innerHTML;var re=new RegExp("\{"+calc.replaceText+"\}","g");var def=calc.defaultValue||"";contents=contents.replace(re,'<span class="replaceTag '+result+"_"+calc.replaceText+'" default="'+def+'">'+output+'</span>');calc.isLabel?$jot('label_'+result).update(contents):$jot('text_'+result).update(contents);}else{spans.each(function(span){span.update(output);});}}catch(e){console.log(e);}
break;case"address":case"authnet":case"paypalpro":case"combined":case"time":case"braintree":case"stripe":for(var inputId in combinedObject){if($jot('id_'+result).select('input[id*='+inputId+'], select[id*='+inputId+']').length>0){$jot('id_'+result).select('input[id*='+inputId+'], select[id*='+inputId+']').first().value=combinedObject[inputId];}}
if($jot('input_'+result+'_full')&&$jot('input_'+result+'_full').readAttribute("masked")=="true"){JotForm.setQuestionMasking('#input_'+result+'_full',"textMasking",$jot('input_'+result+'_full').readAttribute("maskValue"));}
break;case"datetime":if(combinedObject&&"year"in combinedObject){for(var inputId in combinedObject){if($jot('id_'+result).select('input[id*='+inputId+'], select[id*='+inputId+']').length>0){$jot('id_'+result).select('input[id*='+inputId+'], select[id*='+inputId+']').first().value=combinedObject[inputId];}}}else{try{if((typeof output=="number"&&output>0)||(typeof output=="string"&&output.replace(/\s/g,"").length>0&&output!=="0")){var date=new Date(Math.round(output*60*60*24*1000));var year=date.getUTCFullYear();var month=JotForm.addZeros(date.getUTCMonth()+1,2);var day=JotForm.addZeros(date.getUTCDate(),2);if(!isNaN(year))$jot("year_"+result).value=year;if(!isNaN(month))$jot("month_"+result).value=month;if(!isNaN(day))$jot("day_"+result).value=day;}}catch(e){console.log(e);}}
if($jot('lite_mode_'+result)){var date=new Date($jot("year_"+result).value,($jot("month_"+result).value-1),$jot("day_"+result).value);if(date.getTime()){JotForm.formatDate({date:date,dateField:$jot('id_'+result)});}}
break;case"number":output=output.replace(/[^\-0-9\.]/g,"");$jot('input_'+result).value=output;break;case"radio":var radios=document.querySelectorAll("#id_"+result+' input[type="radio"]');$jotA(radios).each(function(rad){rad.checked=false;if(rad.value==output.strip()){rad.checked=true;}});break;case"checkbox":var checks=document.querySelectorAll("#id_"+result+' input[type="checkbox"]');var outputs=output.split(",");outputs=outputs.collect(function(out){return out.strip();});$jotA(checks).each(function(chk){chk.checked=false;if(outputs.include(chk.value)){chk.checked=true;}});break;case"select":$jot('input_'+result).setValue(output.strip());break;case"matrix":if("resultSubField"in calc){if($jot(calc.resultSubField)){$jot(calc.resultSubField).value=output;}}
break;case"textarea":output=output.replace(/<br>|<br\/>/gi,"\r\n");if(output&&output.length>0){$jot('input_'+result).removeClassName('form-custom-hint').removeAttribute('spellcheck');}
var richArea=$jot("id_"+result).down('.nicEdit-main');if(richArea){richArea.innerHTML=output;richArea.setStyle({'color':''});}
$jot('input_'+result).value=output;break;default:if($jot('input_'+result).hinted===true){$jot('input_'+result).clearHint();}
$jot('input_'+result).value=output;if(output&&output.length===0&&$jot('input_'+result).hintClear){$jot('input_'+result).hintClear();}
if($jot('input_'+result).readAttribute("data-masked")=="true"){JotForm.setQuestionMasking("#input_"+result,"textMasking",$jot('input_'+result).readAttribute("maskValue"));}
if(JotForm.donationField&&JotForm.donationField.getAttribute('data-custom-amount-field')==result){$jot('input_'+result).triggerEvent('change');}}
var infiniteLoop=function(){var lastValue;var inputs=document.querySelectorAll("[id^='input_"+result+"_']");if(inputs.length){var valueArr=[];inputs.forEach(function(i){if(i.type=='radio'||i.type=='checkbox'){if(i.checked){valueArr.push(i.value);}}else{valueArr.push(i.value);}});lastValue=JSON.stringify(valueArr);}else{lastValue=output;}
var antiLoopKey='input_'+result;if(!("__antiLoopCache"in window)){window.__antiLoopCache={};}
if(antiLoopKey in window.__antiLoopCache&&window.__antiLoopCache[antiLoopKey]===lastValue){return true;}
window.__antiLoopCache[antiLoopKey]=lastValue;return false;}
if(infiniteLoop()){return;}
if($jot('id_'+result).hasClassName("form-line-error")){$jot('id_'+result).select("select[class*='required'], textarea[class*='required'], input[class*='required']").each(function(el){if(el.validateInput){el.validateInput();}});}
var triggerMe;var eventType;if(resultFieldType=="checkbox"||resultFieldType=="radio"){eventType="click";triggerMe=$jot('id_'+result)}else if(resultFieldType=="select"){eventType="change";if($jot('input_'+result)){triggerMe=$jot('input_'+result);}}else{eventType="keyup";triggerMe=$jot('input_'+result)?$jot('input_'+result):$jot('id_'+result).select('input').first();}
if(!triggerMe)return;if(document.createEvent){var evt=document.createEvent('HTMLEvents');evt.initEvent(eventType,true,true);triggerMe.dispatchEvent(evt);}
if(triggerMe.fireEvent){triggerMe.fireEvent('on'+eventType);}},getWidgetType:function(qid){try{if(!$jot("id_"+qid||$jot("id_"+qid).down("iframe")))return false;if($jot('input_'+qid).value.indexOf("widget_metadata")>1){return JSON.parse($jot('input_'+qid).value).widget_metadata.type;}
var iframe=$jot("id_"+qid).down("iframe");var src=iframe.src;var reg=new RegExp('jotform.io/(.*)/');var widget=reg.exec(src);if(!widget||widget.length<2||!widget[1])return false;return widget[1];}catch(e){console.error("get widget type error");return false;}},widgetsWithConditions:[],triggerWidgetCondition:function(id){if(JotForm.widgetsWithConditions.include(id)){if(document.createEvent){var evt=document.createEvent('HTMLEvents');evt.initEvent('change',true,true);$jot('input_'+id).dispatchEvent(evt);}else if($jot('input_'+id).fireEvent){return $jot('input_'+id).fireEvent('onchange');}}},getFieldIdFromFieldRef:function(ref){try{if(typeof ref==="string"&&ref.indexOf("{")>-1&&ref.indexOf("}")>-1){var stripped=ref.strip().replace(/[\{\}]/g,"");var inputs=document.querySelectorAll('input[name*="_'+stripped+'["\],select[name*="_'+stripped+'\["]')
if(!inputs||inputs.length==0){inputs=document.querySelectorAll('input[name*="_'+stripped+'"],select[name*="_'+stripped+'"]');}
if(inputs.length>0){var field=inputs.first().up(".form-line");if(field){return field.id.replace(/.*id_/,"");}}}}catch(e){console.log(e);}
return false;},setConditionEvents:function(){try{$jotA(JotForm.conditions).each(function(condition){if(condition.disabled==true)return;if(condition.type=='field'||condition.type=='calculation'||condition.type=='require'||condition.type=='mask'||($jotA(condition.action).length>0&&condition.action.first().skipHide==='hidePage')){var fields=[];$jotA(condition.terms).each(function(term){fields.push(term.field);var otherFieldRef=JotForm.getFieldIdFromFieldRef(term.value)
if(otherFieldRef){fields.push(otherFieldRef);}});$jotA(fields).each(function(id){switch(JotForm.getInputType(id)){case"widget":case"signature":JotForm.setFieldConditions('input_'+id,'change',condition);JotForm.widgetsWithConditions.push(id);break;case"combined":case"email":JotForm.setFieldConditions('id_'+id,'autofill',condition);break;case"address":JotForm.setFieldConditions('id_'+id,'autofill',condition);JotForm.setFieldConditions('input_'+id+'_country','change',condition);break;case"datetime":JotForm.setFieldConditions('id_'+id,'date:changed',condition);break;case"birthdate":JotForm.setFieldConditions('input_'+id+'_day','change',condition);JotForm.setFieldConditions('input_'+id+'_month','change',condition);JotForm.setFieldConditions('input_'+id+'_year','change',condition);break;case"time":JotForm.setFieldConditions('input_'+id+'_hourSelect','change',condition);JotForm.setFieldConditions('input_'+id+'_minuteSelect','change',condition);JotForm.setFieldConditions('input_'+id+'_ampm','change',condition);case"select":case"file":if($jot('input_'+id)){JotForm.setFieldConditions('input_'+id,'change',condition);}else{$jot('id_'+id).select('select').each(function(el){JotForm.setFieldConditions(el.id,'change',condition);});}
break;case"checkbox":case"radio":JotForm.setFieldConditions('id_'+id,'click',condition);break;case"number":JotForm.setFieldConditions('input_'+id,'number',condition);break;case"autocomplete":JotForm.setFieldConditions('input_'+id,'autocomplete',condition);break;case"grading":JotForm.setFieldConditions('id_'+id,'keyup',condition);break;case"text":JotForm.setFieldConditions('input_'+id,'autofill',condition);break;case"hidden":if($jot('input_'+id+"_donation")){JotForm.setFieldConditions('input_'+id+"_donation",'keyup',condition);}else{JotForm.setFieldConditions('input_'+id,'keyup',condition);}
break;default:JotForm.setFieldConditions('input_'+id,'keyup',condition);}});}else{if(document.get.mode=="edit"||document.get.mode=="inlineEdit"){var isLaterPage=function(current,testing){var nexts=document.querySelectorAll('.form-pagebreak-next');for(var i=0;i<nexts.length;i++){var btn=nexts[i];if(btn==current)return true;if(btn==testing)return false;}};var highestPage=false;$jotA(condition.terms).each(function(term){var id=term.field.toString();if(id.indexOf("_")!==-1){id=id.split("_")[0];}
var nextButton=JotForm.getSection($jot('id_'+id)).select('.form-pagebreak-next')[0];if(!nextButton){return;}
var pageNumber=parseInt(nextButton.id.substring(nextButton.id.lastIndexOf("_")+1));if(!highestPage||isLaterPage(highestPage,nextButton)){highestPage=nextButton;}});if(highestPage){highestPage.observe('mousedown',function(){JotForm.checkCondition(condition);});}}else{$jotA(condition.terms).each(function(term){var id=term.field.toString();if(id.indexOf("_")!==-1){id=id.split("_")[0];}
if(!$jot('id_'+id)){return;}
var nextButton=JotForm.getSection($jot('id_'+id)).select('.form-pagebreak-next')[0];if(!nextButton){return;}
nextButton.observe('mousedown',function(){JotForm.checkCondition(condition);});});}}});$jotH(JotForm.fieldConditions).each(function(pair){var field=pair.key;var event=pair.value.event;var conds=pair.value.conditions;if(!$jot(field)){return;}
if(event=="autocomplete"){$jot(field).observe('blur',function(){$jotA(conds).each(function(cond){JotForm.checkCondition(cond);});}).run('blur');$jot(field).observe('keyup',function(){$jotA(conds).each(function(cond){JotForm.checkCondition(cond);});}).run('keyup');}else if(event=="number"){$jot(field).observe('change',function(){$jotA(conds).each(function(cond){JotForm.checkCondition(cond);});}).run('change');$jot(field).observe('keyup',function(){$jotA(conds).each(function(cond){JotForm.checkCondition(cond);});}).run('keyup');}else if(event=="autofill"){$jot(field).observe('blur',function(){$jotA(conds).each(function(cond){JotForm.checkCondition(cond);});}).run('blur');$jot(field).observe('keyup',function(){$jotA(conds).each(function(cond){JotForm.checkCondition(cond);});}).run('keyup');if(!(!Prototype.Browser.IE9&&!Prototype.Browser.IE10&&Prototype.Browser.IE)){$jot(field).observe('change',function(){$jotA(conds).each(function(cond){JotForm.checkCondition(cond);});}).run('change');}}else{$jot(field).observe(event,function(){$jotA(conds).each(function(cond){JotForm.checkCondition(cond);});});if(!$jot(field).id.match(/input_[0-9]+_quantity_[0-9]+_[0-9]+/)){$jot(field).run(event);}else{JotForm.runConditionForId(field.replace('input_',''));}}});}catch(e){JotForm.error(e);}},setFieldsToPreserve:function(param){var gateways=["braintree","dwolla","stripe","paypal","paypalpro","paypalexpress","authnet"];var getPaymentFields=document.querySelectorAll('input[name="simple_fpc"]').length>0&&gateways.indexOf(document.querySelectorAll('input[name="simple_fpc"]')[0].getAttribute('data-payment_type'))>-1;var additionalPaymentFields=[{type:"phone",pattern:/Phone|Contact/i},{type:"email",pattern:/email|mail|e-mail/i},{type:"company",pattern:/company|organization/i}];var fields=document.querySelectorAll('.form-line[data-type*="email"], .form-line[data-type*="textbox"], .form-line[data-type*="phone"]');sortedFields=fields.sort(function(a,b){return Number(a.id.replace("id_",""))-Number(b.id.replace("id_",""));});var fieldsToPreserve={};sortedFields.each(function(field){if(Object.keys(fieldsToPreserve).length==3){throw $jotbreak;}
var fieldId=field.id.replace('id_','');var fieldTag=field.down('input').name.replace(/q\d+_/,"");var fieldType=field.getAttribute('data-type').replace('control_','');if(getPaymentFields){additionalPaymentFields.each(function(reg){if(fieldType=='textbox'||fieldType==reg.type){var label=field.down('label').innerHTML.strip();if(reg.pattern.exec(label)&&!fieldsToPreserve[reg.type]){fieldsToPreserve[reg.type]=fieldId;JotForm.fieldsToPreserve.push(fieldId);}}});}
if(param){if(param.indexOf(fieldTag)>-1){JotForm.fieldsToPreserve.push(fieldId);}}});},changePaymentStrings:function(text){if($jot('coupon-header')&&text.couponEnter){$jot('coupon-header').innerHTML=text.couponEnter;}
if($jot('shipping-text')&&text.shippingShipping){$jot('shipping-text').innerHTML=text.shippingShipping;}
if($jot('tax-text')&&text.taxTax){$jot('tax-text').innerHTML=text.taxTax;}
if($jot('subtotal-text')&&text.totalSubtotal){$jot('subtotal-text').innerHTML=text.totalSubtotal;}
if($jot('total-text')&&text.totalTotal){$jot('total-text').innerHTML=text.totalTotal;}},handleSubscriptionPrice:function(){if(navigator.userAgent.toLowerCase().indexOf('safari/')>-1){document.querySelectorAll('.form-product-custom_price').each(function(inp){inp.onclick=function(e){e.preventDefault();};})}
var inputs=document.querySelectorAll('input[data-price-source]');if(inputs.length<1){return;}
var priceSources=[];var events={};inputs.each(function(inp){var sourceId=inp.getAttribute('data-price-source');var source=$jot('input_'+sourceId);if(!source){return;}
if(!events[sourceId]){events[sourceId]=[];}
var getVal=function(){var val=source.value;if(typeof val!=='number'){val=val.replace(/[^0-9\.]/gi,"");}
return!isNaN(val)&&val>0?val:0;}
priceSources.push(source);events[sourceId].push(function(){inp.value=getVal();});});priceSources.each(function(source){var id=source.id.replace('input_','');source.onkeyup=function(){events[id].each(function(evt){evt();});JotForm.countTotal();};});},handleDonationAmount:function(){var donationField=JotForm.donationField=document.querySelectorAll('input[id*="_donation"]')[0];JotForm.paymentTotal=donationField.value||0;donationField.observe('keyup',function(){JotForm.paymentTotal=this.value=this.value.replace(/[^.0-9]+/g,"");});donationField.observe('change',function(){JotForm.paymentTotal=this.value;})
if(document.querySelectorAll('input[id*="_donation"]')[0].getAttribute('data-custom-amount-field')>0){JotForm.donationSourceField=$jot('input_'+donationField.getAttribute('data-custom-amount-field'));if(!JotForm.donationSourceField){document.querySelectorAll('input[id*="_donation"]')[0].removeAttribute('readonly');return;}
setTimeout(function(){JotForm.updateDonationAmount();donationField.triggerEvent('keyup');},1000);JotForm.donationSourceField.observe('change',function(){if(donationField.up('.form-line.form-field-hidden')||donationField.up('ul.form-field-hidden')){return;}
JotForm.updateDonationAmount();});}else if(donationField.hasAttribute('data-min-amount')){var currency=donationField.nextSibling.textContent.strip();var minAmount=parseFloat(donationField.readAttribute('data-min-amount'));donationField.validateMinimum=function(){var val=this.getValue();if(isNaN(val)||val<minAmount){var errorTxt=JotForm.texts.ccDonationMinLimitError.replace('{minAmount}',minAmount).replace('{currency}',currency);return JotForm.errored(donationField,errorTxt);}else{return JotForm.corrected(donationField);}};}},updateDonationAmount:function(amount){if(!JotForm.donationSourceField){return;}
if(typeof amount!=='undefined'){JotForm.donationField.value=JotForm.paymentTotal=amount;return;}
var getVal=function(){var val=JotForm.donationSourceField.value;if(typeof val!=='number'){val=val.replace(/[^0-9\.]/gi,"");}
return!isNaN(val)&&val>0?val:0;}
JotForm.donationField.value=JotForm.paymentTotal=getVal();},isPaymentSelected:function(){var selected=false;var paymentFieldId=document.querySelectorAll('input[name="simple_fpc"]')[0].value;var paymentField=$jot('id_'+paymentFieldId);if(paymentField.hasClassName('form-field-hidden')||paymentField.up('ul.form-section').hasClassName('form-field-hidden'))
{return false;}
if(document.querySelectorAll('input[name="simple_fpc"]').length<1){return false;}
if(paymentField&&(paymentField.getStyle('display')==="none"||!JotForm.isVisible(paymentField)&&JotForm.getSection(paymentField).id)){return false;}
if(window.productID){$jotH(window.productID).each(function(pair){var elem=$jot(pair.value);if(elem.checked){var quantityField=elem.up().select('select[id*="_quantity_"],input[id*="_quantity_"]');selected=quantityField.length===0||(quantityField.length===1&&quantityField[0].getValue()>0);if(quantityField.length>1){selected=quantityField.any(function(qty){return qty.getValue()>0;});}
if(selected){throw $jotbreak;}}});}else if($jot('input_'+paymentFieldId+'_donation')){var elem=$jot('input_'+paymentFieldId+'_donation');if(/^\d+(?:\.\d+)?$jot/.test(elem.getValue())){selected=elem.getValue()>0;}}else{var productField=document.querySelectorAll('input[name*="q'+paymentFieldId+'"][type="hidden"]');if(productField.length<1){return false;}
if(productField[0].readAttribute('selected')==='false'){productField[0].remove();return false;}
return true;}
return selected;},togglePaypalButtons:function(show){var paymentFieldId=document.querySelectorAll('input[name="simple_fpc"]')[0].value;if($jot('input_'+paymentFieldId+'_paymentType_express')&&!$jot('input_'+paymentFieldId+'_paymentType_express').checked){show=false;}
if(document.querySelectorAll('.paypal-button').length<1||!$jot('use_paypal_button')){return;}
document.querySelectorAll('.form-submit-button').each(function(btn){if(show){if(btn.up().down('.paypal-button')){btn.up().down('.paypal-button').show();btn.hide();}}else{if(btn.up().down('.paypal-button')){btn.up().down('.paypal-button').hide();}
btn.show();}});},handlePaypalButtons:function(){var products=window.productID;var requiredPayment=false;var paymentFieldId=document.querySelectorAll('input[name="simple_fpc"]')[0].value;if(products){$jotH(products).each(function(p){if($jot(p.value).getAttribute('class').indexOf('[required]')>-1){requiredPayment=true;throw $jotbreak;}});}else if($jot('input_'+paymentFieldId+'_donation')){requiredPayment=$jot('input_'+paymentFieldId+'_donation').getAttribute('class').indexOf('required')>-1;}
JotForm.togglePaypalButtons(requiredPayment||JotForm.isPaymentSelected());if(!requiredPayment){$jotH(products).each(function(p){$jot(p.value).observe('click',function(){JotForm.togglePaypalButtons(JotForm.isPaymentSelected());});});}},checkEmbed:function(){var form=document.querySelectorAll('.jotform-form')[0];if(window!==window.top){form.insert(new Element('input',{type:'hidden',name:'embedUrl'}).putValue(document.referrer));if(JotForm.debug){console.log(document.referrer);}}},handlePaypalExpress:function(){if(typeof _paypalExpress!=="function"||$jot('express_category').getAttribute('data-digital_goods')==="No"){return;}
var paypalExpress=new _paypalExpress();paypalExpress.init();},handleBraintree:function(){if(["edit","inlineEdit","submissionToPDF"].indexOf(document.get.mode)>-1&&document.get.sid){return;}
if(typeof __braintree!=="function"){alert("Braintree payment script didn't work properly. Form will be reloaded");location.reload();return;}
var JF_braintree=__braintree();JF_braintree.init();},handleSquare:function(){if(JotForm.paidSubmission&&["edit","inlineEdit","submissionToPDF"].indexOf(document.get.mode)>-1&&document.get.sid){return;}
if(window===window.top){if(window.location.protocol!=='https:'){window.location.href=window.location.href.replace('http','https');return;}}
if(typeof __square!=="function"){alert("Square payment script didn't work properly. Form will be reloaded");location.reload();return;}
JotForm.squarePayment=__square();JotForm.squarePayment.init();},handlePaymentSubProducts:function(){var heights=[];var optionValues=[];var sections=document.querySelectorAll('.form-section');var productPage=false;document.querySelectorAll('.form-product-has-subproducts').each(function(sp){var wasHidden=(sp.up(".form-line")&&sp.up(".form-line").hasClassName("form-field-hidden"))?sp.up(".form-line").show():false;if(sections.length>1){productPage=productPage?productPage:sections.filter(function(p){return sp.descendantOf(p)&&sp.up('.form-section')===p;})[0];if(!productPage.isVisible()){productPage.setStyle({'display':'block'});heights[sp.id]=[sp.parentNode.getHeight(),document.querySelectorAll('label[for="'+sp.id+'"]')[0].getHeight()];productPage.setStyle({'display':'none'});}else{heights[sp.id]=[sp.parentNode.getHeight(),document.querySelectorAll('label[for="'+sp.id+'"]')[0].getHeight()];}}else{heights[sp.id]=[sp.parentNode.getHeight(),document.querySelectorAll('label[for="'+sp.id+'"]')[0].getHeight()];}
showSubProducts(sp);sp.observe('click',function(){showSubProducts(this);});if(wasHidden){sp.up(".form-line").hide();}});function showSubProducts(el){var productSpan=el.parentNode;if(!el.checked){productSpan.shift({height:heights[el.id][1],duration:0.3});optionValues[el.id]=[];document.querySelectorAll('#'+el.id+'_subproducts select,'+'#'+el.id+'_subproducts input[type="text"]').each(function(field,i){var fieldValue=field.tagName==="select"?field.getSelected().value:field.value;if(fieldValue){optionValues[el.id].push([field.id,fieldValue]);}
field.stopObserving();if(field.tagName==="SELECT"){field.selectedIndex=0;}else{field.value=0;}});}else{productSpan.shift({height:heights[el.id][0]-10,duration:0.3});if(optionValues[el.id]&&optionValues[el.id].length>0){optionValues[el.id].each(function(vv){$jot(vv[0]).stopObserving();if($jot(vv[0]).tagName==="SELECT"){$jot(vv[0]).selectOption(vv[1]);}else{$jot(vv[0]).value=vv[1];}});}}
setTimeout(function(){JotForm.totalCounter(JotForm.prices)},300);};},setCurrencyFormat:function(curr,useDecimal,decimalMark){var noDecimal=['BIF','CLP','DJF','GNF','JPY','KMF','KRW','MGA','PYG','RWF','VUV','XAF','XOF','XPF'];var decimalPlaces=noDecimal.indexOf(curr)>-1||!useDecimal?0:2;this.currencyFormat={curr:curr,dSeparator:decimalMark=="comma"?",":".",tSeparator:decimalMark=="comma"?".":",",decimal:decimalPlaces};},countTotal:function(prices){var prices=prices||JotForm.prices;var discounted=false;if(Object.keys(JotForm.discounts).length>0){discounted=true;if(JotForm.discounts.total||JotForm.discounts.shipping){var type=JotForm.discounts.type,rate=JotForm.discounts.rate,minimum=JotForm.discounts.minimum,code=JotForm.discounts.code;}else{for(var pid in prices){for(var kkey in JotForm.discounts){if(pid.indexOf(kkey)!==-1){prices[pid].discount=JotForm.discounts[kkey];}}}}}else{$jotH(prices).each(function(p){delete prices[p.key].discount;});}
var total=0;var subTotal=0;var itemSubTotal=[];var shippingTotal=0;var taxTotal=0;var otherTotal=0;var taxRate=0;var decimal=JotForm.currencyFormat.decimal;var dSeparator=JotForm.currencyFormat.dSeparator;var tSeparator=JotForm.currencyFormat.tSeparator;var flatShipping=0;var products=0;$jotH(prices).each(function(pair){if(pair.value.price=="custom"){if($jot(pair.key).checked){subTotal=parseInt($jot(pair.key+'_custom_price').getValue());}
return;}
if(pair.value.quantityField&&!(parseInt($jot(pair.value.quantityField).getValue())>0)){if(!$jot(pair.value.quantityField).hasClassName('form-subproduct-quantity')){return;}}
var isSetupFee=pair.value.recurring?true:false;var isStripe=typeof Stripe==="function";total=parseFloat(total);var productShipping=0;var price=parseFloat(pair.value.price)||0;var taxAmount=0;var subproduct=false;var parentProductKey;var recur=pair.value.recurring;if(pair.key.split('_').length===4){subproduct=true;parentProductKey=pair.key.split('_');parentProductKey.pop();parentProductKey=parentProductKey.join("_");itemSubTotal[parentProductKey]=itemSubTotal[parentProductKey]||0;}else{parentProductKey=pair.key;}
if($jot(pair.value.specialPriceField)){var specialPriceField=$jot(pair.value.specialPriceField);if(pair.value.child&&pair.value.specialPriceField.split("_").length===4){var idx=pair.value.specialPriceField.split("_")[3];price=parseFloat(pair.value.specialPriceList[idx]);}else{if(isNaN($jot(specialPriceField).options[0].value)||$jot(specialPriceField).options[0].value>0||$jot(specialPriceField.options[0].innerHTML.strip()!="")){priceIndex=specialPriceField.getSelected().index;}else{priceIndex=specialPriceField.getSelected().index-1}
if(priceIndex>-1){price=parseFloat(pair.value.specialPriceList[priceIndex]);if($jot(pair.key+'_price')){$jot(pair.key+'_price').siblings('.freeCurr').each(function(el){el.style.display='inline';});}}else{var defaultSpecial=pair.value.specialPriceList[priceIndex+1];price=0;}}}
if(pair.value.discount){var discount=pair.value.discount.split('-');if(!discount[2]){price=price-((discount[1]==='fixed')?discount[0]:price*(discount[0]/100));price=price<0?0:price;}else{if(discount[2]==="all"||discount[2]==="product"){if(isSetupFee){recur=recur-((discount[1]==='fixed')?discount[0]:recur*(discount[0]/100));recur=recur<0?0:recur;}
if(isStripe&&isSetupFee){var setupFee=price-recur;setupFee=setupFee-((discount[1]==='fixed')?discount[0]:setupFee*(discount[0]/100));setupFee=setupFee<0?0:setupFee;price=Number(recur)+Number(setupFee);}else{price=price-((discount[1]==='fixed')?discount[0]:price*(discount[0]/100));price=price<0?0:price;}}else if(discount[2]==="first"){if(isSetupFee){if(isStripe){var setupFee=price-recur;setupFee=setupFee-((discount[1]==='fixed')?discount[0]:setupFee*(discount[0]/100));setupFee=setupFee<0?0:setupFee;price=Number(recur)+Number(setupFee);}else{price=price-((discount[1]==='fixed')?discount[0]:price*(discount[0]/100));price=price<0?0:price;}}}else if(discount[2]==="stripe_native"){if(isSetupFee){var setupFee=price-recur;price=recur-((discount[1]==='fixed')?discount[0]:recur*(discount[0]/100));if(!discount[3]){recur=price;}
price+=Number(setupFee);}else{price=price-((discount[1]==='fixed')?discount[0]:price*(discount[0]/100));price=price<0?0:price;}}}}
if(!pair.value.recurring){var priceText=$jot(pair.key+'_price')?$jot(pair.key+'_price'):$jot(pair.key.replace(pair.key.substring(pair.key.lastIndexOf("_")),"")+'_price')||null;if(priceText){var oldPriceText=priceText.innerHTML;if(price=="0"&&pair.value.specialPriceList&&defaultSpecial){$jot(priceText).update(parseFloat(defaultSpecial||0).formatMoney(decimal,dSeparator,tSeparator));}else if(pair.value.price=="0"&&!pair.value.specialPriceList){$jot(priceText).update(' Free');}else{$jot(priceText).parentNode.show();$jot(priceText).update(parseFloat(price).formatMoney(decimal,dSeparator,tSeparator));}}}else{var setupfeeText=$jot(pair.key+'_setupfee');priceText=$jot(pair.key+'_price');if(priceText){var priceAmount=isSetupFee?recur:price;$jot(priceText).update(parseFloat(priceAmount).formatMoney(decimal,dSeparator,tSeparator));}
if(setupfeeText){$jot(setupfeeText).update(parseFloat(price).formatMoney(decimal,dSeparator,tSeparator));}}
if(pair.value.tax){var tax=pair.value.tax;taxRate=parseFloat(tax.rate)||0;if(document.querySelectorAll('select[id*="input_'+tax.surcharge.field+'"]').length>0&&document.querySelectorAll('select[id*="input_'+tax.surcharge.field+'"]')[0].getSelected().value){var selectedArea=document.querySelectorAll('select[id*="input_'+tax.surcharge.field+'"]')[0].getSelected().value;$jotH(tax.surcharge.rates).each(function(r){if(r[1][1].toLowerCase()===selectedArea.toLowerCase()){taxRate+=Number(r[1][0]);throw $jotbreak;}});}
if(document.querySelectorAll('input[id="input_'+tax.surcharge.field+'"]').length>0&&!document.querySelectorAll('input[id="input_'+tax.surcharge.field+'"]')[0].value.empty()){$jotH(tax.surcharge.rates).each(function(r){if(r[1][1].toLowerCase()===document.querySelectorAll('input[id="input_'+tax.surcharge.field+'"]')[0].value.toLowerCase()){taxRate+=Number(r[1][0]);throw $jotbreak;}});}}
if(pair.value.addons){price+=pair.value.addons;}
if($jot(pair.key).checked){products++;if($jot(pair.value.quantityField)||$jot(pair.value.specialPriceField)){if($jot(pair.value.quantityField)&&(pair.value.specialPriceField!==pair.value.quantityField)){if($jot(pair.value.quantityField).readAttribute('type')=="text"){price=$jot(pair.value.quantityField).value?price*Math.abs(parseInt($jot(pair.value.quantityField).value,10)):0;}
else{price=price*parseInt(($jot(pair.value.quantityField).getSelected().text||0),10);}}
if(subproduct){itemSubTotal[parentProductKey]+=price;}
if($jot(parentProductKey+'_item_subtotal')&&!isNaN(price)){if(!subproduct){$jot(parentProductKey+'_item_subtotal').update(parseFloat(price).formatMoney(decimal,dSeparator,tSeparator));}else{$jot(parentProductKey+'_item_subtotal').update(parseFloat(itemSubTotal[parentProductKey]).formatMoney(decimal,dSeparator,tSeparator));}}}
if(pair.value.tax){taxAmount=price*(taxRate/100);}
if(pair.value.shipping){var shipping=pair.value.shipping;if(shipping.firstItem){var qty=$jot(pair.value.quantityField)?($jot(pair.value.quantityField).readAttribute('type')==="text"?parseInt($jot(pair.value.quantityField).value):parseInt($jot(pair.value.quantityField).getSelected().text||0)):1;if(qty===1){productShipping=parseFloat(shipping.firstItem);}
if(qty>1){productShipping=!parseFloat(shipping.addItem)?parseFloat(shipping.firstItem):parseFloat(shipping.firstItem)+parseFloat(shipping.addItem)*(qty-1);}}else if(flatShipping==0&&shipping.flatRate){shippingTotal=flatShipping=parseFloat(shipping.flatRate);}}
taxTotal+=taxAmount;if(!flatShipping){shippingTotal+=productShipping;}
subTotal+=price;otherTotal+=productShipping+taxAmount;}else{if($jot(pair.key+'_item_subtotal')){$jot(pair.key+'_item_subtotal').update("0.00");}}});if($jot('coupon-button')){var couponInput=$jot($jot('coupon-button').getAttribute('data-qid')+'_coupon');}
if(JotForm.discounts.total){if(subTotal>=minimum){var reduce=type==="fixed"?rate:(rate/100)*parseFloat(subTotal);subTotal=subTotal>reduce?subTotal-reduce:0;couponInput.value=code;}else{reduce=0;couponInput.value='';}
var paymentTotal=document.querySelector('.form-payment-total');if(paymentTotal){paymentTotal.parentNode.insertBefore(JotForm.discounts.container,paymentTotal);$jot('discount_total').update(parseFloat(reduce).formatMoney(decimal,dSeparator,tSeparator));}}
total=subTotal+otherTotal;total=flatShipping>0?total+flatShipping:total;if(total===0||isNaN(total)){total="0.00";}
if(JotForm.discounts.shipping&&shippingTotal>0&&subTotal>=minimum){var reduce=type==="fixed"?rate:(rate/100)*parseFloat(shippingTotal);var oldShippingTotal=shippingTotal;shippingTotal=shippingTotal>reduce?shippingTotal-reduce:0;total=total-(oldShippingTotal-shippingTotal);}
this.paymentTotal=Number(total);if($jot('creditCardTable')){if(products>0&&this.paymentTotal===0&&discounted){JotForm.setCreditCardVisibility(false);}else if(document.querySelectorAll('input[id*="paymentType_credit"]').length>0&&document.querySelectorAll('input[id*="paymentType_credit"]')[0].checked){JotForm.setCreditCardVisibility(true);}}
if($jot("payment_subtotal")){$jot("payment_subtotal").update(parseFloat(subTotal).formatMoney(decimal,dSeparator,tSeparator));}
if($jot("payment_tax")){$jot("payment_tax").update(parseFloat(taxTotal).formatMoney(decimal,dSeparator,tSeparator));}
if($jot("payment_shipping")){$jot("payment_shipping").update(parseFloat(shippingTotal).formatMoney(decimal,dSeparator,tSeparator));}
if($jot("payment_total")){$jot("payment_total").update(parseFloat(total).formatMoney(decimal,dSeparator,tSeparator));if($jot("payment_total").up(".form-line")&&$jot("payment_total").up(".form-line").triggerEvent){$jot("payment_total").up(".form-line").triggerEvent("keyup");}}},prices:{},setCreditCardVisibility:function(show){if(show){$jot('creditCardTable').show();}else{$jot('creditCardTable').hide();}},totalCounter:function(prices){if(!Number.prototype.formatMoney){Number.prototype.formatMoney=function(c,d,t){var temp=(typeof this.toString().split('.')[1]!=='undefined'&&this.toString().split('.')[1].length>c&&this.toString().charAt(this.toString().length-1)==='5')?this.toString()+'1':this.toString();var n=parseFloat(temp),c=isNaN(c=Math.abs(c))?2:c,d=d===undefined?".":d,t=t===undefined?",":t,s=n<0?"-":"",i=parseInt(n=Math.abs(+n||0).toFixed(c))+"",j=(j=i.length)>3?j%3:0;return s+(j?i.substr(0,j)+t:"")+i.substr(j).replace(/(\d{3})(?=\d)/g,"$jot1"+t)+(c?d+Math.abs(n-i).toFixed(c).slice(2):"");};}
JotForm.prices=prices;document.observe('dom:loaded',JotForm.countTotal(prices));$jotH(prices).each(function(pair){$jot(pair.key).observe('click',function(){JotForm.countTotal(prices);});if(pair.value.price=="custom"){$jot(pair.key+'_custom_price').stopObserving('keyup');$jot(pair.key+'_custom_price').observe('keyup',function(){JotForm.countTotal(prices);});}
if(pair.value.tax){var surcharge=pair.value.tax.surcharge;if(document.querySelectorAll('select[id*="input_'+surcharge.field+'"]').length>0){document.querySelectorAll('select[id*="input_'+surcharge.field+'"]')[0].stopObserving('change');document.querySelectorAll('select[id*="input_'+surcharge.field+'"]')[0].observe('change',function(){setTimeout(JotForm.countTotal(),500);});}
if(document.querySelectorAll('input[id="input_'+surcharge.field+'"]').length>0){document.querySelectorAll('input[id="input_'+surcharge.field+'"]')[0].stopObserving('keyup');document.querySelectorAll('input[id="input_'+surcharge.field+'"]')[0].observe('keyup',function(){setTimeout(JotForm.countTotal(),500);});}}
var triggerAssociatedElement=function(el){var prodID=$jot(el).id.match(/input_([0-9]*)_quantity_/)||$jot(el).id.match(/input_([0-9]*)_custom_/);setTimeout(function(){if(prodID&&$jot('id_'+prodID[1])){$jot('id_'+prodID[1]).triggerEvent('click');}
var productItem=el.up(".form-product-item");if(productItem&&productItem.down("input")&&productItem.down("input").validateInput){productItem.down("input").validateInput();}},100);};if($jot(pair.value.quantityField)){function countQuantityTotal(){if(JotForm.isVisible($jot(pair.value.quantityField))){if($jot(pair.value.quantityField).tagName!=='SELECT'||$jot(pair.value.quantityField).getSelected().index>0||$jot(pair.value.quantityField).getValue()==="0")
{var productWithSubProducts=$jot(pair.value.quantityField).up('.form-product-item').down('.form-product-has-subproducts');if(productWithSubProducts){productWithSubProducts.checked=false;$jotH(prices).each(function(pr){if(pr.key.indexOf(productWithSubProducts.id)!==-1&&!($jot(pr.value.quantityField).getValue()<=0)){productWithSubProducts.checked=true;}})}else{$jot(pair.key).checked=!($jot(pair.value.quantityField).getValue()<=0)?true:false;}}
JotForm.countTotal(prices);}}
$jot(pair.value.quantityField).observe('change',function(){setTimeout(countQuantityTotal,50);triggerAssociatedElement(this);});$jot(pair.value.quantityField).observe('keyup',function(){setTimeout(countQuantityTotal,50);triggerAssociatedElement(this);});}
if($jot(pair.value.specialPriceField)){function countSpecialTotal(){if(JotForm.isVisible($jot(pair.value.specialPriceField))){if($jot(pair.value.specialPriceField).tagName!=='SELECT'||$jot(pair.value.specialPriceField).getSelected().index>0){$jot(pair.key).checked=true;}
JotForm.countTotal(prices);}}
$jot(pair.value.specialPriceField).observe('change',function(){setTimeout(countSpecialTotal,50);triggerAssociatedElement(this);});$jot(pair.value.specialPriceField).observe('keyup',function(){setTimeout(countSpecialTotal,50);});}});},discounts:{},handleCoupon:function(){var $jotthis=this;JotForm.countTotal(JotForm.prices);if($jot('coupon-button')){var cb=$jot('coupon-button'),cl=$jot('coupon-loader'),cm=$jot('coupon-message'),ci=$jot('coupon-input');cb.innerHTML=this.paymentTexts.couponApply;var formID=document.querySelectorAll('input[name="formID"]')[0].value;ci.observe('keypress',function(e){if(e.keyCode===13){e.preventDefault();cb.click();ci.blur();}});ci.enable();document.querySelectorAll('input[name="coupon"]')[0].value="";cb.observe('click',function(){if(ci.value){cb.hide();cl.show();ci.value=ci.value.replace(/\s/g,"");cb.disable();var isStripe=((ci.hasAttribute('stripe')||ci.hasAttribute('data-stripe'))&&window.paymentType==='subscription');var a=new Ajax.Jsonp(JotForm.server,{parameters:{action:'checkCoupon',coupon:ci.value,formID:formID,stripe:isStripe,editMode:JotForm.isEditMode(),paymentID:document.querySelectorAll('input[name="simple_fpc"]')[0].value},evalJSON:'force',onComplete:function(t){t=t.responseJSON||t;if(t.success){if(t.message.indexOf('{')===-1){if(t.message==="expired"){cm.innerHTML=$jotthis.paymentTexts.couponExpired;}else{cm.innerHTML=$jotthis.paymentTexts.couponInvalid;}
ci.select();cl.hide();cb.show();cb.enable();}else{cl.hide();cb.show();cm.innerHTML=$jotthis.paymentTexts.couponValid;JotForm.applyCoupon(t.message);}}}});}else{$jot('coupon-message').innerHTML=$jotthis.paymentTexts.couponBlank;}}.bind(this));}},applyCoupon:function(discount){var $jotthis=this;discount=JSON.parse(discount);JotForm.discounts={};var cb=$jot('coupon-button'),cl=$jot('coupon-loader'),cm=$jot('coupon-message'),ci=$jot('coupon-input'),cf=$jot(cb.getAttribute('data-qid')+'_coupon');cb.stopObserving('click');if(cf){cf.value=discount.code;}
cb.enable();ci.disable();cb.innerHTML=this.paymentTexts.couponChange||'Change';cb.observe('click',function(){if(JotForm.isEditMode()){return;}
cf.value='';$jotH(oldPrices).each(function(pair){pair[1].remove();});if(JotForm.discounts.container){JotForm.discounts.container.remove();}
document.querySelectorAll('span[id*="_price"]').each(function(field,id){$jot(field).removeClassName('underlined');});document.querySelectorAll('span[id*="_setupfee"]').each(function(field,id){$jot(field).removeClassName('underlined');});JotForm.discounts={};cb.stopObserving('click');cm.innerHTML="";cb.innerHTML=$jotthis.paymentTexts.couponApply;ci.enable();ci.select();JotForm.handleCoupon();});var pair=[],oldPrices={};var displayOldPrice=function(container,id){oldPrices[id]=new Element('span');var span=new Element('span',{style:'text-decoration:line-through'});span.insert(container.innerHTML.replace("price","price_old"));oldPrices[id].insert({top:'&nbsp'});oldPrices[id].insert(span);oldPrices[id].insert({bottom:'&nbsp'});container.insert({top:oldPrices[id]});}
if(discount.products&&discount.products.length>0){if(discount.products.include('all')){discount.products=[];for(var key in productID){discount.products.push(productID[key].slice(-4));}}}
if(!discount.paymentType||(discount.paymentType&&discount.paymentType==="product")){if(discount.apply==="product"){$jotA(discount.products).each(function(pid){JotForm.discounts[pid]=discount.rate+'-'+discount.type;document.querySelectorAll('span[id*="_price"]').each(function(field,id){if(field.id.indexOf(pid)>-1){$jot(field).addClassName('underlined');}});if(document.querySelectorAll('label[for*="'+pid+'"] span.form-product-details b')[0]){displayOldPrice(document.querySelectorAll('label[for*="'+pid+'"] span.form-product-details b')[0],pid);}
if(document.querySelectorAll('[id*='+pid+'_subproducts]').length>0&&document.querySelectorAll('[id*='+pid+'_subproducts]')[0].down('.form-product-child-price')){document.querySelectorAll('#'+document.querySelectorAll('[id*='+pid+'_subproducts]')[0].id+' .form-product-child-price').each(function(field,id){displayOldPrice(field,pid+'_'+id);});}});}else if(discount.apply==="total"){JotForm.discounts={total:true,code:discount.code,minimum:discount.minimum,type:discount.type,rate:discount.rate,};var totalContainer=document.querySelector('.form-payment-total');if(totalContainer){var discountHTML=totalContainer.innerHTML.replace('Total:','Discount:').replace('payment_total','discount_total').replace('<span>','<span> - ');JotForm.discounts.container=new Element('span',{class:'form-payment-discount'}).insert(discountHTML);}}else{JotForm.discounts={shipping:true,code:discount.code,minimum:discount.minimum,type:discount.type,rate:discount.rate};}}else{$jotA(discount.products).each(function(pid){JotForm.discounts[pid]=discount.rate+'-'+discount.type;if(discount.apply){JotForm.discounts[pid]+="-"+discount.apply;}
if(discount.duration&&discount.duration===1){JotForm.discounts[pid]+="-once";}
document.querySelectorAll('span[id*="_price"]').each(function(field,id){if(field.id.indexOf(pid)>-1&&document.querySelectorAll('span[id*="'+pid+'_setupfee"]').length>0&&discount.apply==="all"){$jot(field).addClassName('underlined');throw $jotbreak;}});document.querySelectorAll('span[id*="_setupfee"]').each(function(field,id){if(field.id.indexOf(pid)>-1){$jot(field).addClassName('underlined');throw $jotbreak;}});});}
JotForm.countTotal(JotForm.prices);},setStripeSettings:function(pubkey,add_qid){if((["edit","inlineEdit","submissionToPDF"].indexOf(document.get.mode)>-1&&document.get.sid)||location.href.indexOf('edit')>-1){return;}
if((pubkey||add_qid)&&typeof Stripe==='function'&&typeof Stripe.setPublishableKey==='function'&&typeof _StripeValidation==='function'){var clean_pubkey=pubkey.replace(/\s+/g,'');if(clean_pubkey==''){console.log('Stripe publishable key is empty. You need to connect your form using Stripe connect.');return;}
Stripe.setPublishableKey(clean_pubkey);var stripeV=new _StripeValidation();stripeV.setAddress_qid(add_qid);stripeV.init();}},setFilePickerIOUpload:function(options){if(options&&typeof filepicker==="object"&&typeof _JF_filepickerIO==="function"){var fp=new _JF_filepickerIO(options);fp.init();}else{console.error("filepicker OR _JF_filepickerIO object library are missing");}},initCaptcha:function(id){setTimeout(function(){var UA=navigator.userAgent.toLowerCase(),IE=(UA.indexOf('msie')!=-1)?parseInt(UA.split('msie')[1],10):false;if(IE&&IE<9){if(UA.indexOf('windows nt 5.1')!=-1||UA.indexOf('windows xp')!=-1||UA.indexOf('windows nt 5.2')!=-1){JotForm.server="https://www.jotform.com/server.php";}}
var a=new Ajax.Jsonp(JotForm.server,{parameters:{action:'getCaptchaId'},evalJSON:'force',onComplete:function(t){t=t.responseJSON||t;if(t.success){$jot(id+'_captcha').src='https://www.jotform.com/server.php?action=getCaptchaImg&code='+t.num;$jot(id+'_captcha_id').value=t.num;}}});},150);},reloadCaptcha:function(id){$jot(id+'_captcha').src=JotForm.url+'images/blank.gif';JotForm.initCaptcha(id);},addZeros:function(n,totalDigits){n=n.toString();var pd='';if(totalDigits>n.length){for(i=0;i<(totalDigits-n.length);i++){pd+='0';}}
return pd+n.toString();},formatDate:function(d){var date=d.date;var month=JotForm.addZeros(date.getMonth()+1,2);var day=JotForm.addZeros(date.getDate(),2);var year=date.getYear()<1000?date.getYear()+1900:date.getYear();var id=d.dateField.id.replace(/\w+\_/gim,'');$jot('month_'+id).value=month;$jot('day_'+id).value=day;$jot('year_'+id).value=year;if($jot('lite_mode_'+id)){var lite_mode=$jot('lite_mode_'+id);var seperator=lite_mode.readAttribute('seperator')||lite_mode.readAttribute('data-seperator');var format=lite_mode.readAttribute('format')||lite_mode.readAttribute('data-format');var newValue=month+seperator+day+seperator+year;if(format=='ddmmyyyy'){newValue=day+seperator+month+seperator+year;}else if(format=='yyyymmdd'){newValue=year+seperator+month+seperator+day;}
lite_mode.value=newValue;}
$jot('id_'+id).fire('date:changed');},highLightLines:function(){document.querySelectorAll('.form-line').each(function(l,i){l.select('input, select, textarea, div, table div, button').each(function(i){i.observe('focus',function(){if(JotForm.isCollapsed(l)){JotForm.getCollapseBar(l).run('click');}
if(!JotForm.highlightInputs){return;}
l.addClassName('form-line-active');if(l.__classAdded){l.__classAdded=false;}}).observe('blur',function(){if(!JotForm.highlightInputs){return;}
l.removeClassName('form-line-active');});});});},getForm:function(element){element=$jot(element);if(!element.parentNode){return false;}
if(element&&element.tagName=="BODY"){return false;}
if(element.tagName=="FORM"){return $jot(element);}
return JotForm.getForm(element.parentNode);},getContainer:function(element){element=$jot(element);if(!element.parentNode){return false;}
if(element&&element.tagName=="BODY"){return false;}
if(element.hasClassName("form-line")){return $jot(element);}
return JotForm.getContainer(element.parentNode);},getSection:function(element){element=$jot(element);if(!element.parentNode){return false;}
if(element&&element.tagName=="BODY"){return false;}
if((element.hasClassName("form-section-closed")||element.hasClassName("form-section"))&&!element.id.match(/^section_/)){return element;}
return JotForm.getSection(element.parentNode);},getCollapseBar:function(element){element=$jot(element);if(!element.parentNode){return false;}
if(element&&element.tagName=="BODY"){return false;}
if(element.hasClassName("form-section-closed")||element.hasClassName("form-section")){return element.select('.form-collapse-table')[0];}
return JotForm.getCollapseBar(element.parentNode);},isCollapsed:function(element){element=$jot(element);if(!element.parentNode){return false;}
if(element&&element.tagName=="BODY"){return false;}
if(element.className=="form-section-closed"){return true;}
return JotForm.isCollapsed(element.parentNode);},isVisible:function(element){element=$jot(element);if(!element.parentNode){return false;}
if(element.hasClassName('always-hidden')){return false;}
if(element&&element.tagName=="BODY"){return true;}
if(element.hasClassName("form-textarea")&&element.up('div').down('.nicEdit-main')&&(element.up('.form-line')&&JotForm.isVisible(element.up('.form-line')))){return true;}
if(element.style.display=="none"||element.style.visibility=="hidden"){return false;}
return JotForm.isVisible(element.parentNode);},sectionHasVisibleiFrameWidgets:function(section){var elements=section.select('.custom-field-frame');var hasVisible=false;elements.each(function(el){if(JotForm.isVisible(el)){hasVisible=true;throw $jotbreak;}});return hasVisible;},enableDisableButtonsInMultiForms:function(){var allButtons=document.querySelectorAll('.form-submit-button');allButtons.each(function(b){if(b.up('ul.form-section')){if(b.up('ul.form-section').style.display=="none"){b.disable();}else{if(b.className.indexOf("disabled")==-1&&!b.hasClassName("conditionallyDisabled")){b.enable();}}}});},enableButtons:function(){setTimeout(function(){document.querySelectorAll('.form-submit-button').each(function(b){if(!b.hasClassName("conditionallyDisabled")){b.enable();}
b.innerHTML=b.oldText||'Submit';});},60);},disableButtons:function(){setTimeout(function(){document.querySelectorAll('.form-submit-button').each(function(b){if(b.innerHTML.indexOf('<img')===-1){b.innerHTML=JotForm.texts.pleaseWait;}
b.addClassName('lastDisabled');b.disable();});},60);},setButtonActions:function(){document.querySelectorAll('.form-submit-button').each(function(b){b.oldText=b.innerHTML;b.enable();if(getQuerystring('qp')===""){b.observe('click',function(){setTimeout(function(){if(!document.querySelectorAll('.form-error-message')[0]&&!document.querySelectorAll('.form-textarea-limit-indicator-error')[0]){var allButtons=document.querySelectorAll('.form-submit-button');allButtons.each(function(bu){if(true){if(bu.innerHTML.indexOf('<img')===-1){bu.innerHTML=JotForm.texts.pleaseWait;}
bu.addClassName('lastDisabled');bu.disable();}});}},50);});}});document.querySelectorAll('.form-submit-reset').each(function(b){b.onclick=function(){if(!confirm(JotForm.texts.confirmClearForm)){return false;}else{if(JotForm.payment&&document.querySelectorAll('span[id*="_item_subtotal"]').length>0){var zeroValue='0';if(!!JotForm.currencyFormat.decimal){zeroValue='0'+JotForm.currencyFormat.dSeparator+'00';}
document.querySelectorAll('span[id*="_item_subtotal"]').each(function(el){el.update(zeroValue);});}
if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())&&$jot('coupon-button')){setTimeout(function(){if($jot('payment_total')){JotForm.totalCounter(JotForm.prices);}},40);return true;}}
document.querySelectorAll(".form-line-error").each(function(tmp){tmp.removeClassName("form-line-error");});document.querySelectorAll(".form-error-message",".form-button-error").each(function(tmp){tmp.remove();});document.querySelectorAll(".form-textarea-limit-indicator > span").each(function(tmp){var raw=tmp.innerHTML;tmp.innerHTML=raw.replace(raw.substring(0,raw.indexOf("/")),"0");});document.querySelectorAll("span[id^=grade_point_]").each(function(tmp){tmp.innerHTML=0;});document.querySelectorAll(".form-grading-error").each(function(tmp){tmp.innerHTML="";});var autofill=document.querySelectorAll('form')[0].readAttribute('data-autofill');if(autofill){setTimeout(function(){for(var inputId in JotForm.defaultValues){var input=$jot(inputId);if(input&&(input.type=="radio"||input.type=="checkbox")){input.checked=true;}}
var formID=document.querySelectorAll('form').first().readAttribute('id')+document.querySelectorAll('form').first().readAttribute('name');var autoFillInstance=AutoFill.getInstance(formID);if(autoFillInstance){autoFillInstance.saveAllData()}},40);}
setTimeout(function(){document.querySelectorAll('.custom-hint-group').each(function(element){element.hasContent=(element.value&&element.value.replace(/\n/gim,"<br>")!=element.readAttribute('data-customhint'))?true:false;element.showCustomPlaceHolder();});},30);setTimeout(function(){document.querySelectorAll('.nicEdit-main').each(function(richArea){var txtarea=richArea.up('.form-line').down('textarea');if(txtarea){if(txtarea.hasClassName('custom-hint-group')&&!txtarea.hasContent){richArea.setStyle({'color':'#babbc0'});}else{richArea.setStyle({'color':''});}
richArea.innerHTML=txtarea.value;}});},40);setTimeout(function(){if($jot('coupon-button')&&$jot('coupon-button').triggerEvent){$jot('coupon-button').triggerEvent("click");}
if($jot('payment_total')){JotForm.totalCounter(JotForm.prices);}},40);setTimeout(function(){document.querySelectorAll('input.form-widget').each(function(node){node.value='';node.fire('widget:clear',{qid:parseInt(node.id.split('_')[1])});});},40);setTimeout(function(){document.querySelectorAll('.currentDate').each(function(el){var id=el.id.replace(/day_/,"");JotForm.formatDate({date:(new Date()),dateField:$jot('id_'+id)});});document.querySelectorAll('.currentTime').each(function(el){if(el.up(".form-line")){var id=el.up(".form-line").id.replace("id_","");if($jot("hour_"+id)){JotForm.displayLocalTime("hour_"+id,"min_"+id,"ampm_"+id);}else{JotForm.displayLocalTime("input_"+id+"_hourSelect","input_"+id+"_minuteSelect","input_"+id+"_ampm")}}});},40);setTimeout(function(){JotForm.runAllConditions();},50);};});document.querySelectorAll('.form-submit-print').each(function(print_button){print_button.observe("click",function(){$jot(print_button.parentNode).hide();var hidden_nicedits_arr=[];var nicedit_textarea_to_hide=[];document.querySelectorAll('.form-textarea, .form-textbox').each(function(el){if(!el.type){el.value=el.value||'0';}
var dateSeparate;if(dateSeparate=el.next('.date-separate')){dateSeparate.hide();}
var elWidth="";if(el.value.length<el.size){elWidth="width:"+el.size*9+"px;";}
if(el.id.indexOf("_area")!=-1||el.id.indexOf("_phone")!=-1||(el.id.indexOf("_country")!=-1&&el.readAttribute('type')=='tel')){elWidth+=" display:inline-block;"}
if(el.hasClassName("form-textarea")&&"nicEditors"in window){document.querySelectorAll("#cid_"+el.id.split("_")[1]+" > div:nth-child(1)").each(function(tmpel){if(tmpel.readAttribute("unselectable")=="on"){document.querySelectorAll("#cid_"+el.id.split("_")[1]+" > div")[0].hide();document.querySelectorAll("#cid_"+el.id.split("_")[1]+" > div")[1].setStyle({borderTopStyle:'solid',borderWidth:'1px',borderTopColor:'rgb(204, 204, 204)',});hidden_nicedits_arr.push(document.querySelectorAll("#cid_"+el.id.split("_")[1]+" > div")[0]);nicedit_textarea_to_hide.push(el);}});}});window.print();for(var i=0;i<hidden_nicedits_arr.length;i++){hidden_nicedits_arr[i].show();}
for(var i=0;i<nicedit_textarea_to_hide.length;i++){nicedit_textarea_to_hide[i].hide();}
$jot(print_button.parentNode).show();});});},hasHiddenValidationConflicts:function(input){var hiddenOBJ=input.up('li.form-line');return hiddenOBJ&&(hiddenOBJ.hasClassName('form-field-hidden')||hiddenOBJ.up('ul.form-section').hasClassName('form-field-hidden'));},initGradingInputs:function(){var _this=this;document.querySelectorAll('.form-grading-input').each(function(item){item.observe('blur',function(){item.validateGradingInputs();});item.observe('keyup',function(){item.validateGradingInputs();});item.validateGradingInputs=function(){var item=this,id=item.id.replace(/input_(\d+)_\d+/,"$jot1"),total=0,_parentNode=$jot(item.parentNode.parentNode),numeric=/^(\d+[\.]?)+$jot/,isNotNumeric=false;item.errored=false;_parentNode.select(".form-grading-input").each(function(sibling){if(sibling.value&&!numeric.test(sibling.value)){isNotNumeric=true;throw $jotbreak;}
total+=parseFloat(sibling.value)||0;});if(_this.hasHiddenValidationConflicts(item))return JotForm.corrected(item);if(isNotNumeric){return JotForm.errored(item,JotForm.texts.numeric);}
if($jot("grade_total_"+id)){$jot("grade_error_"+id).innerHTML="";var allowed_total=parseFloat($jot("grade_total_"+id).innerHTML);$jot("grade_point_"+id).innerHTML=total;if(total>allowed_total){$jot("grade_error_"+id).innerHTML=' '+JotForm.texts.lessThan+' <b>'+allowed_total+'</b>.';return JotForm.errored(item,JotForm.texts.gradingScoreError+" "+allowed_total);}
else{return JotForm.corrected(item);}}else{return JotForm.corrected(item);}}});},initSpinnerInputs:function(){var _this=this;document.querySelectorAll('.form-spinner-input').each(function(item){item.observe('blur',function(){item.validateSpinnerInputs();}).observe('change',function(){item.validateSpinnerInputs();});var c_parent=item.up('table.form-spinner'),c_up=c_parent.select('td.form-spinner-up')[0],c_down=c_parent.select('td.form-spinner-down')[0];c_up.observe('click',function(e){item.validateSpinnerInputs();});c_down.observe('click',function(e){item.validateSpinnerInputs();});item.validateSpinnerInputs=function(){var item=this,id=item.id.replace(/input_(\d+)_\d+/,"$jot1"),numeric=/^(-?\d+[\.]?)+$jot/,numericDotStart=/^([\.]\d+)+$jot/,userInput=item.value||0;item.errored=false;if(!JotForm.isVisible(item))return JotForm.corrected(item);if(userInput&&!numeric.test(userInput)&&!numericDotStart.test(userInput)){return JotForm.errored(item,JotForm.texts.numeric);}
if(item.hasClassName("disallowDecimals")&&userInput%1!=0){return JotForm.errored(item,JotForm.texts.disallowDecimals);}
var min_val=parseInt(item.readAttribute('data-spinnermin'))||false,max_val=parseInt(item.readAttribute('data-spinnermax'))||false;if(min_val&&userInput<min_val){return JotForm.errored(item,JotForm.texts.inputCarretErrorA+" "+min_val);}
else if(max_val&&userInput>max_val){return JotForm.errored(item,JotForm.texts.inputCarretErrorB+" "+max_val);}
else{return JotForm.corrected(item);}}});},initNumberInputs:function(){var _this=this;document.querySelectorAll('.form-number-input').each(function(item){item.observe('blur',function(){item.validateNumberInputs();}).observe('change',function(){item.validateNumberInputs();}).observe('keyup',function(){item.validateNumberInputs();}).observe('keypress',function(event){if(event.metaKey||event.ctrlKey){return;}
var controlKeys=[8,9,13,35,36,37,39];var isControlKey=controlKeys.join(",").match(new RegExp(event.which));if(!event.which||(48<=event.which&&event.which<=57)||(46==event.which)||(45==event.which)||(43==event.which)||isControlKey){if(event.which!=8&&event.which!=0&&event.which!=13&&(parseInt(this.value.length)>=parseInt(item.readAttribute('maxlength'))||(event.which<45||event.which>57))){event.preventDefault();}else{return;}}else{event.preventDefault();}});item.validateNumberInputs=function(){var item=this,id=item.id.replace(/input_(\d+)_\d+/,"$jot1"),numeric=/^(-?\d+[\.]?)+$jot/,numericDotStart=/^([\.]\d+)+$jot/;item.errored=false;if(!JotForm.isVisible(item))return JotForm.corrected(item);if(item.value&&!numeric.test(item.value)&&!numericDotStart.test(item.value)&&item.hinted!==true){return JotForm.errored(item,JotForm.texts.numeric);}
var min_val=parseInt(item.readAttribute('data-numbermin')),max_val=parseInt(item.readAttribute('data-numbermax')),max_len=parseInt(item.readAttribute('maxlength'));if(max_len&&item.value&&item.value.length>max_len){return JotForm.errored(item,JotForm.texts.maxDigitsError+" "+max_len);}
else if((min_val||min_val==0)&&parseInt(item.value)<min_val){return JotForm.errored(item,JotForm.texts.inputCarretErrorA+" "+min_val);}
else if((max_val||max_val==0)&&parseInt(item.value)>max_val){return JotForm.errored(item,JotForm.texts.inputCarretErrorB+" "+max_val);}
else{var error=false
if(item.up('.form-matrix-table')){item.up('.form-matrix-table').select('input').each(function(el){if((el!==item)&&el.hasClassName('form-validation-error')){error=true;}});}
if(!error){return JotForm.corrected(item);}}}});},backStack:[],currentSection:false,autoNext:function(id){if(!$jot("cid_"+id))return;var prev=$jot("cid_"+id).previous();if(!prev)return;var type=prev.readAttribute('data-type');if(type!=='control_radio'&&type!=='control_dropdown')return;prev.observe("change",function(e){if(!JotForm.isVisible(prev)||e.target.value===''){return;}
var nextButton=$jot("cid_"+id).down('.form-pagebreak-next')
if(nextButton&&nextButton.triggerEvent){nextButton.focus();nextButton.setStyle({'fontWeight':'bold'});setTimeout(function(){nextButton.setStyle({'fontWeight':'inherit'})
nextButton.triggerEvent('mousedown');nextButton.triggerEvent('click');},800);}});},handlePages:function(){var $jotthis=this;var pages=[];var last;if(document.querySelectorAll('.form-label-left').length>0){var labelWidth=parseInt(document.querySelectorAll('.form-label-left')[0].getStyle('width')),formWidth=parseInt(document.querySelectorAll('.form-all')[0].getStyle('width')),backButtonWidth=labelWidth>formWidth/2?formWidth/2:labelWidth;document.querySelectorAll('.form-pagebreak-back-container').each(function(back){if(back.style.width===''){back.style.width=(backButtonWidth-14)+'px';}});}
document.querySelectorAll('.form-pagebreak').each(function(page,i){var section=$jot(page.parentNode.parentNode);if(i>=1){section.hide();}else{JotForm.currentSection=section;}
pages.push(section);section.pagesIndex=i+1;function stopEnterKey(evt){var evt=(evt)?evt:((event)?event:null);var node=(evt.target)?evt.target:((evt.srcElement)?evt.srcElement:null);if(evt.keyCode==13&&["text","radio","checkbox","select-one","select-multiple"].include(node.type)){return false;}
if((evt.keyCode==13||evt.which==32)&&evt.target.hasClassName('form-pagebreak-next')&&evt.target.triggerEvent){evt.target.triggerEvent('mousedown');}}
document.onkeypress=stopEnterKey;var checkLanguageDropdownPage=function(){if(typeof FormTranslation!=='undefined'&&FormTranslation.properties&&FormTranslation.properties.firstPageOnly==='1'){var dd=document.querySelectorAll(".language-dd").length>0?document.querySelectorAll(".language-dd").first():false;if(!dd)return;JotForm.currentSection===pages.first()?dd.show():dd.hide();}}
section.select('.form-pagebreak-next').invoke('observe','click',function(){if(JotForm.saving||JotForm.loadingPendingSubmission){return;}
if(JotForm.validateAll(JotForm.getForm(section),section)||getQuerystring('qp')!==""){if(window.parent&&window.parent!=window){window.parent.postMessage('scrollIntoView','*');}
if(!JotForm.nextPage){var sections=document.querySelectorAll('.page-section');for(var i=sections.indexOf(section);i<sections.length;i++){if(JotForm.hidePages[parseInt(i,10)+2]===true){continue;}
JotForm.nextPage=sections[parseInt(i,10)+1];break;}}
if(JotForm.nextPage){JotForm.backStack.push(section.hide());JotForm.currentSection=JotForm.nextPage.show();if(!$jotthis.noJump){JotForm.currentSection.scrollIntoView(true);}
JotForm.enableDisableButtonsInMultiForms();}else if(section.next()){JotForm.backStack.push(section.hide());JotForm.currentSection=section.next().show();if(!$jotthis.noJump&&window.parent==window){JotForm.currentSection.scrollIntoView(true);}
JotForm.enableDisableButtonsInMultiForms();}
JotForm.nextPage=false;if(JotForm.saveForm){JotForm.hiddenSubmit(JotForm.getForm(section));}
JotForm.iframeHeightCaller();JotForm.runAllCalculations(true);checkLanguageDropdownPage();if(JotForm.currentSection){JotForm.currentSection.select(".form-html").each(function(textEl){if(textEl.innerHTML.match(/google.*maps/gi)){textEl.innerHTML=textEl.innerHTML;}});}}else{try{document.querySelectorAll('.form-button-error').invoke('remove');document.querySelectorAll('.form-pagebreak-next').each(function(nextButton){var errorBox=new Element('div',{className:'form-button-error'});errorBox.insert(JotForm.texts.generalPageError);$jot(nextButton.parentNode.parentNode).insert(errorBox);});}catch(e){}}});section.select('.form-pagebreak-back').invoke('observe','click',function(){if(window.parent&&window.parent!=window){window.parent.postMessage('scrollIntoView','*');}
if(JotForm.saving||JotForm.loadingPendingSubmission){return;}
section.hide();var sections=document.querySelectorAll('.page-section');var prevPage=JotForm.backStack.pop();while(JotForm.backStack.length>0){var pageNumber=sections.indexOf(prevPage)+1;if(JotForm.hidePages[pageNumber]===true){prevPage=JotForm.backStack.pop();continue;}
break;}
JotForm.currentSection=prevPage.show();if(!$jotthis.noJump&&window.parent==window){JotForm.currentSection.scrollIntoView(true);}
JotForm.nextPage=false;JotForm.enableDisableButtonsInMultiForms();if(JotForm.saveForm){JotForm.hiddenSubmit(JotForm.getForm(section));}
document.querySelectorAll('.form-button-error').invoke('remove');JotForm.iframeHeightCaller();checkLanguageDropdownPage();setTimeout(function(){JotForm.runAllCalculations(true);},10);});});if(pages.length>0){var allSections=document.querySelectorAll('.form-section:not([id^=section_])');if(allSections.length>0){last=allSections[allSections.length-1];}
if(last){last.pagesIndex=allSections.length;pages.push(last);last.hide();var li=new Element('li',{className:'form-input-wide'});var cont=new Element('div',{className:'form-pagebreak'});var backCont=new Element('div',{className:'form-pagebreak-back-container'});var back=document.querySelectorAll('.form-pagebreak-back-container')[0].select('button')[0];back.observe('click',function(){if(JotForm.saving){return;}
last.hide();JotForm.nextPage=false;});backCont.insert(back);cont.insert(backCont);li.insert(cont);last.insert(li);}}},jumpToPage:function(){var page=document.get.jumpToPage;var sections=document.querySelectorAll('.form-section:not([id^=section_])');if(!(page&&page>1)||page>sections.length)return;sections[0].hide();sections[page-1].show();if(page>2)JotForm.backStack=sections.splice(0,page-1);JotForm.runAllCalculations(true);},handleFormCollapse:function(){var $jotthis=this;var openBar=false;var openCount=0;document.querySelectorAll('.form-collapse-table').each(function(bar){var section=$jot(bar.parentNode.parentNode);if(section.className=="form-section-closed"){section.closed=true;}else{if(section.select('.form-collapse-hidden').length<0){openBar=section;openCount++;}}
bar.observe('click',function(){if(section.closed){section.setStyle('overflow:visible; height:auto');var h=section.getHeight();if(openBar&&openBar!=section&&openCount<=1){openBar.className="form-section-closed";openBar.shift({height:60,duration:0.5});openBar.select('.form-collapse-right-show').each(function(e){e.addClassName('form-collapse-right-hide').removeClassName('form-collapse-right-show');});openBar.closed=true;}
openBar=section;section.setStyle('overflow:hidden; height:60px');setTimeout(function(){section.scrollTop=0;section.className="form-section";},1);section.shift({height:h,duration:0.5,onStart:function(){section.select('.form-line[data-type=control_widget]').each(function(e){var field=e.id.split('_').last();JotForm.showWidget(field);});},onEnd:function(e){e.scrollTop=0;e.setStyle("height:auto;");if(!$jotthis.noJump){e.scrollIntoView();}},onStep:function(e){if(window.parent&&window.parent!=window){window.parent.postMessage('setHeight:'+document.querySelectorAll('body')[0].getHeight(),'*');}}});section.select('.form-collapse-right-hide').each(function(e){e.addClassName('form-collapse-right-show').removeClassName('form-collapse-right-hide');});section.closed=false;if(bar.errored){bar.select(".form-collapse-mid")[0].setStyle({color:''}).select('img')[0].remove();bar.errored=false;}}else{section.scrollTop=0;section.shift({height:60,duration:0.5,onEnd:function(e){e.className="form-section-closed";},onStep:function(e){if(window.parent&&window.parent!=window){window.parent.postMessage('setHeight:'+document.querySelectorAll('body')[0].getHeight(),'*');}}});if(openBar){openBar.select('.form-collapse-right-show').each(function(e){e.addClassName('form-collapse-right-hide').removeClassName('form-collapse-right-show');});}
section.closed=true;}
setTimeout(function(){$jotthis.handleIFrameHeight();},510);});});},handleAuthNet:function(){var thisForm=document.querySelectorAll('.jotform-form')[0];var paymentFieldId=document.querySelectorAll('input[name="simple_fpc"]')[0].value;Event.observe(thisForm,'submit',function(event){JotForm.corrected(document.querySelectorAll('.cc_firstName')[0]);if(JotForm.isEditMode()){return true;}
if(JotForm.isPaymentSelected()&&JotForm.paymentTotal>0){var errors;document.querySelectorAll('#id_'+paymentFieldId+' [class*="cc"]').each(function(cc){if(!cc.getValue()){errors=JotForm.texts.ccMissingDetails;throw $jotbreak;}});if(errors){Event.stop(event);setTimeout(function(){JotForm.errored(document.querySelectorAll('.cc_firstName')[0],errors);var cc_number=document.querySelectorAll('.cc_number')[0];if(!cc_number.isVisible()&&!cc_number.up('li').hasClassName('form-field-hidden')&&!cc_number.up('ul').hasClassName('form-field-hidden')&&document.querySelectorAll('ul.form-section.page-section').length>1)
{var visibleButtons=[];document.querySelectorAll('.form-submit-button').each(function(btn){if(btn.isVisible()){visibleButtons.push(btn);}});if(visibleButtons.length<1){return;}
var lastButton=visibleButtons[visibleButtons.length-1];document.querySelectorAll('.form-authnet-error').invoke('remove');var errorBox=new Element('div',{className:'form-button-error form-authnet-error'});errorBox.insert('<p>'+errors+'</p>');$jot(lastButton.parentNode.parentNode).insert(errorBox);}
JotForm.enableButtons();},500);}else{JotForm.corrected(document.querySelectorAll('.cc_firstName')[0]);}}});},handlePaypalPro:function(){if($jot('creditCardTable')){var thisForm=document.querySelectorAll('.jotform-form')[0];var paymentFieldId=document.querySelectorAll('input[name="simple_fpc"]')[0].value;Event.observe(thisForm,'submit',function(event){if(JotForm.isEditMode()){return true;}
if(JotForm.isPaymentSelected()&&JotForm.paymentTotal>0){var errors="";JotForm.corrected(document.querySelectorAll('.paymentTypeRadios')[0]);if(!document.querySelectorAll('.paymentTypeRadios')[0].checked&&!document.querySelectorAll('.paymentTypeRadios')[1].checked){errors="You must select a payment method";}
if($jot('input_'+paymentFieldId+'_paymentType_credit').checked){document.querySelectorAll('#id_'+paymentFieldId+' [class*="cc"]').each(function(cc){if(!cc.getValue()){errors="All fields are required";throw $jotbreak;}});}
if(errors){JotForm.errored(document.querySelectorAll('.paymentTypeRadios')[0],errors);Event.stop(event);}else{JotForm.corrected(document.querySelectorAll('.paymentTypeRadios')[0]);}}});document.querySelectorAll('.paymentTypeRadios').each(function(radio){radio.observe('click',function(){if(radio.checked&&radio.value==="express"){JotForm.setCreditCardVisibility(false);}
if(radio.checked&&radio.value==="credit"&&(JotForm.paymentTotal>0||Object.keys(JotForm.discounts).length===0)){JotForm.setCreditCardVisibility(true);}
JotForm.corrected(document.querySelectorAll('.paymentTypeRadios')[0]);JotForm.togglePaypalButtons(radio.checked&&radio.value==="express");});});}},description:function(input,message){if(message=="20"){return;}
var lineDescription=false;if(!$jot(input)){var id=input.replace(/[^\d]/gim,'');if($jot("id_"+id)){input=$jot("id_"+id);lineDescription=true;}else if($jot('section_'+id)){input=$jot('section_'+id);lineDescription=true;}else{return;}}
if($jot(input).setSliderValue){input=$jot($jot(input).parentNode);}
var cont=JotForm.getContainer(input);if(!cont){return;}
var right=false;var bubble=new Element('div',{className:'form-description'});var arrow=new Element('div',{className:'form-description-arrow'});var arrowsmall=new Element('div',{className:'form-description-arrow-small'});var content=new Element('div',{className:'form-description-content'});var indicator;if("desc"in document.get&&document.get.desc=='v2'){right=true;cont.insert(indicator=new Element('div',{className:'form-description-indicator'}));bubble.addClassName('right');}
content.insert(message);bubble.insert(arrow).insert(arrowsmall).insert(content).hide();cont.insert(bubble);if((cont.getWidth()/2)<bubble.getWidth()){bubble.setStyle('right: -'+(cont.getWidth()-(right?100:20))+'px');}
if(right){var h=indicator.measure('height');arrow.setStyle('top:'+((h/2)-20)+'px');arrowsmall.setStyle('top:'+((h/2)-17)+'px');$jot(cont).mouseEnter(function(){cont.setStyle('z-index:10000');if(!cont.hasClassName('form-line-active')){cont.addClassName('form-line-active');cont.__classAdded=true;}
bubble.show();},function(){if(cont.__classAdded){cont.removeClassName('form-line-active');cont.__classAdded=false;}
cont.setStyle('z-index:0');bubble.hide();});$jot(input).observe('keydown',function(){cont.setStyle('z-index:0');bubble.hide();});}else{if(lineDescription){$jot(input).mouseEnter(function(){cont.setStyle('z-index:10000');bubble.show();},function(){cont.setStyle('z-index:0');bubble.hide();});}else{$jot(cont).mouseEnter(function(){cont.setStyle('z-index:10000');bubble.show();},function(){cont.setStyle('z-index:0');bubble.hide();});$jot(input).observe('keyup',function(){cont.setStyle('z-index:0');bubble.hide();});$jot(input).observe('focus',function(){cont.setStyle('z-index:10000');bubble.show();});$jot(input).observe('blur',function(){cont.setStyle('z-index:0');bubble.hide();});}}},validateAll:function(form,scopeSelector){var _log=function(){if(window.location.href.indexOf('stripeDebug')!==-1){console.log.apply(console,arguments);}}
if(getQuerystring('qp')!==""){return true;}
var ret=true;if(scopeSelector==undefined){scopeSelector=document.querySelectorAll('body')[0];}
scopeSelector.select('.form-textarea-limit-indicator-error').each(function(limitErr){if(JotForm.isVisible(limitErr)){_log('set to false because .form-textarea-limit-indicator-error');ret=false;}});if(scopeSelector.select('.form-datetime-validation-error').first()){_log('set to false because .form-datetime-validation-error');ret=false;}
var spinnerNumberInputs=scopeSelector.select('.form-spinner-input, .form-number-input, .form-grading-input');if(spinnerNumberInputs.length>0){spinnerNumberInputs.each(function(input){var qid=input.id.split('_')[1];var type=input.readAttribute('data-type');switch(type){case'input-number':ret=(!input.validateNumberInputs())?false:ret;break;case'input-spinner':ret=(!input.validateSpinnerInputs())?false:ret;break;case'input-grading':ret=(!input.validateGradingInputs())?false:ret;break;}});}
if(window.signatureForm){_log('signature form');var pads=jQuery(".pad");for(var i=0;i<pads.length;i++){var pad=pads[i];if(jQuery(pad).attr("data-required")==="true"){if(jQuery(pad).parent().parent().parent().is(":visible")){var w=jQuery(pad).parent().parent()
if(jQuery(pad).jSignature('getData','base30')[1].length==0&&!jQuery(pad).hasClass('edit-signature')){ret=false;if(w.find(".form-line-error").length==0){var preLink=(JotForm.url.search("https")==-1)?"http://cdn.jotfor.ms/":"https://cdn.jotfor.ms/";w.append('<div class="form-line-error" style="float:left;margin-top:5px;">'+'<div class="form-error-message">'+'<img src="'+preLink+'images/exclamation-octagon.png" align="left" style="margin-right:5px;">'+'<div class="form-error-arrow">'+'<div class="form-error-arrow-inner"></div>'+'</div>'+
JotForm.texts.required+'</div></div>');}}else{w.find(".form-line-error").remove();}}}}}
if(window.JCFServerCommon!==undefined){_log('widgets detected');var widgetInputs=document.querySelectorAll('.widget-required, .widget-errored');widgetInputs.each(function(el){if(JotForm.isVisible(el)){var isReplacedWidget=el.hasClassName('widget-replaced');if(isReplacedWidget&&el.errored){JotForm.corrected(el);}
if(el.up('.form-section').visible()){if(el.getValue().length===0){ret=(isReplacedWidget)?JotForm.errored(el,JotForm.texts.required):false;}}}});}
var c="";if(form&&form.id){c="#"+form.id+" ";}
document.querySelectorAll(c+'*[class*="validate"]').each(function(input){if(JotForm.payment&&input.up('.form-line')){var dataType=input.up('.form-line').getAttribute('data-type');if(dataType=="control_"+JotForm.payment){var container=JotForm.getContainer(input);var isFirstProduct=container.select('input[class*="validate"],select[class*="validate"]').first()==input;if(!input.name.match('cc_')&&!isFirstProduct){return;}}}
_log('looping inputs with validation :');_log(input);if(input.validateInput===undefined){_log('no required continuing');return;}
if(!(!!input.validateInput&&input.validateInput())){ret=JotForm.hasHiddenValidationConflicts(input);if(scopeSelector.tagName!=='BODY'&&input.id&&scopeSelector.select('#'+input.id).length===0){ret=true;}
_log('ret setted '+ret);}});_log('final ret value '+ret);return ret;},errored:function(input,message){input=$jot(input);if(input.errored){return false;}
if(input.runHint){input.runHint();}
if(this.url.search("https")==-1){var preLink="http://cdn.jotfor.ms/";}else{var preLink="https://cdn.jotfor.ms/";}
if(JotForm.isCollapsed(input)){var collapse=JotForm.getCollapseBar(input);if(!collapse.errored){collapse.select(".form-collapse-mid")[0].insert({top:'<img src="'+preLink+'images/exclamation-octagon.png" align="bottom" style="margin-right:5px;"> '}).setStyle({color:'red'});collapse.errored=true;}}
var container=JotForm.getContainer(input);input.errored=true;input.addClassName('form-validation-error');container.addClassName('form-line-error');var insertEl=container;insertEl=container.select('.form-input')[0];if(!insertEl){insertEl=container.select('.form-input-wide')[0];}
if(!insertEl){insertEl=container;}
insertEl.select('.form-error-message').invoke('remove');insertEl.insert(new Element('div',{className:'form-error-message'}).insert('<img src="'+preLink+'images/exclamation-octagon.png" align="left" style="margin-right:5px;"> '+message).insert(new Element('div',{className:'form-error-arrow'}).insert(new Element('div',{className:'form-error-arrow-inner'}))));JotForm.iframeHeightCaller();return false;},corrected:function(input){input=$jot(input);input.errored=false;var container=JotForm.getContainer(input);if(!container){return true;}
container.select(".form-validation-error").invoke('removeClassName','form-validation-error');container.removeClassName('form-line-error');container.select('.form-error-message').invoke('remove');if(JotForm.isCollapsed(input)){var collapse=JotForm.getCollapseBar(input);if(collapse.errored&&(collapse.up('.form-section-closed')&&collapse.up('.form-section-closed').select('.form-validation-error').length==0)){collapse.select(".form-collapse-mid")[0].setStyle({color:''}).select('img')[0].remove();collapse.errored=false;}}
setTimeout(function(){if(document.querySelectorAll('.form-error-message').length==0){JotForm.hideButtonMessage();}},100);JotForm.iframeHeightCaller();return true;},hideButtonMessage:function(){document.querySelectorAll('.form-button-error').invoke('remove');},showButtonMessage:function(){this.hideButtonMessage();document.querySelectorAll('.form-submit-button').each(function(button){var errorBox=new Element('div',{className:'form-button-error'});errorBox.insert('<p>'+JotForm.texts.generalError+'</p>');$jot(button.parentNode.parentNode).insert(errorBox);});},disableGoButton:function(){if(navigator.appVersion.indexOf("iPhone")!=-1||navigator.appVersion.indexOf("iPad")!=-1||navigator.appVersion.indexOf("Android")!=-1){document.querySelectorAll('input').each(function(input){input.observe('keypress',function(e){var code=(e.keyCode?e.keyCode:e.which);if(code===13){e.preventDefault();}});});}},validator:function(){if(this.debugOptions&&this.debugOptions.stopValidations){this.info('Validations stopped by debug parameter');return true;}
var $jotthis=this;$jotA(JotForm.forms).each(function(form){if(form.validationSet){return;}
form.validationSet=true;form.observe('submit',function(e){try{if($jot('payment_total_checksum')){$jot('payment_total_checksum').value=JotForm.paymentTotal;}
if(document.querySelectorAll('.form-submit-button')&&document.querySelectorAll('.form-submit-button').length>0){var aSubmitIsVisible=false;document.querySelectorAll('.form-submit-button').each(function(el){if(JotForm.isVisible(el.parentNode)){aSubmitIsVisible=true;return;}});if(!aSubmitIsVisible){JotForm.enableButtons();e.stop();}}
if(!JotForm.validateAll(form)){JotForm.enableButtons();JotForm.showButtonMessage();if(JotForm.submitError){if(JotForm.submitError=="jumpToSubmit"){var visSubmit=[];document.querySelectorAll('.form-submit-button').each(function(but){if(JotForm.isVisible(but)){visSubmit.push(but);}});if(visSubmit.length>0){if(visSubmit[visSubmit.length-1].up('.form-line')){visSubmit[visSubmit.length-1].up('.form-line').scrollIntoView(false);}else{visSubmit[visSubmit.length-1].scrollIntoView(false);}}}else if(JotForm.submitError=="jumpToFirstError"){setTimeout(function(){var firstError=document.querySelectorAll('.form-error-message').first();if(firstError){if(JotForm.isCollapsed(firstError)){JotForm.getCollapseBar(firstError).run('click');}
firstError.up('.form-line').scrollIntoView();var firstInput=firstError.up('.form-line').down('input,select,textarea');if(firstInput){firstInput.focus();}}},100);}}
document.querySelectorAll('.custom-hint-group').each(function(elem){elem.showCustomPlaceHolder();});e.stop();return;}
document.querySelectorAll('.form-radio-other,.form-checkbox-other').each(function(el){if(!el.checked&&JotForm.getOptionOtherInput(el)){JotForm.getOptionOtherInput(el).disable();}});JotForm.runAllCalculations(true);document.querySelectorAll('textarea.form-textarea:first-child').each(function(el){if(el.value){function escapeHtml(text){return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}
el.value=escapeHtml(el.value);textEl=el.clone();textEl.writeAttribute("disabled","true");textEl.innerHTML=el.value;el.up().appendChild(textEl);el.hide();}});if(document.querySelectorAll('input, select, textarea').length>900){document.querySelectorAll('.form-matrix-table').each(function(matrixTable){var matrixObject={};matrixTable.select("input, select").each(function(input){var ids=input.id.split("_");var x=ids[2];var y=ids[3];if(input.type=="radio"){if(input.checked){matrixObject[x]=input.value;}else if(!(x in matrixObject)){matrixObject[x]=false;}}else{if(!(x in matrixObject)){matrixObject[x]={};}
if(input.type=="checkbox"){matrixObject[x][y]=input.checked?input.value:false;}else{matrixObject[x][y]=input.value;}}
input.writeAttribute("disabled","true");});try{var name=matrixTable.down('input, select').readAttribute("name").split("[")[0];var matrixArea=new Element("textarea").setStyle({display:'none'});matrixTable.insert({after:matrixArea});matrixArea.value=JSON.stringify(matrixObject);matrixArea.writeAttribute("name",name);}catch(e){console.log(e);}});}
if(JotForm.autoFillDeployed&&!JotForm.payment){if(typeof window.localStorage!=='undefined'){var formID=document.querySelectorAll('form').first().readAttribute('id')+document.querySelectorAll('form').first().readAttribute('name');AutoFill.getInstance(formID).stopSavingData();window.localStorage.clear();}}}catch(err){JotForm.error(err);e.stop();return;}
document.querySelectorAll('.time-dropdown').each(function(el){el.enable();});document.querySelectorAll('.form-checkbox, .form-radio').each(function(el){if(el.up('.form-product-item')&&el.disabled&&el.checked){el.observe('click',function(e){e.preventDefault();setTimeout(JotForm.countTotal,20);});}
el.enable();});document.querySelectorAll('.conditionallyDisabled').each(function(el){el.enable();});if(JotForm.clearFieldOnHide!=="dontClear"){document.querySelectorAll('.form-field-hidden input','.form-field-hidden select','.form-field-hidden textarea').each(function(input){if(input.name=="simple_fpc"){return;}
if(input.tagName=='INPUT'&&['checkbox','radio'].include(input.type)){input.checked=false;}else{input.clear();}});}
if(JotForm.compact&&JotForm.imageSaved==false){e.stop();window.parent.saveAsImage();$jot(document).observe('image:loaded',function(){var block;$jot(document.body).insert(block=new Element('div').setStyle('position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);'));block.insert('<table height="100%" width="100%"><tr><td align="center" valign="middle" style="font-family:Verdana;color:#fff;font-size:16px;">Please Wait...</td></tr></table>');setTimeout(function(){form.submit();},1000);});return;}
if(JotForm.isEncrypted){JotForm.encryptAll(e,function(submitForm){if(submitForm){form.submit();}});}});document.querySelectorAll('#'+form.id+' *[class*="validate"]').each(function(input){JotForm.setFieldValidation(input);});document.querySelectorAll('.form-upload').each(function(upload){try{var required=!!upload.validateInput;var exVal=upload.validateInput||Prototype.K;upload.validateInput=function(){upload.errored=false;if(exVal()!==false){if(!upload.files){return true;}
var acceptString=upload.readAttribute('accept')||upload.readAttribute('data-file-accept')||upload.readAttribute('file-accept')||"";var maxsizeString=upload.readAttribute('maxsize')||upload.readAttribute('data-file-maxsize')||upload.readAttribute('file-maxsize')||"";var minsizeString=upload.readAttribute('minsize')||upload.readAttribute('data-file-minsize')||upload.readAttribute('file-minsize')||"";var accept=acceptString.strip().toLowerCase().split(/\s*\,\s*/gim);for(var key in accept){if(typeof accept[key]==='string'){accept[key]=accept[key].slice(0,1)==='.'?accept[key].slice(1):accept[key];}}
var maxsize=parseInt(maxsizeString,10)*1024;var minsize=parseInt(minsizeString,10)*1024;var file=upload.files[0];if(!file){return true;}
if(!file.fileName){file.fileName=file.name;}
var ext="";if(JotForm.getFileExtension(file.fileName)){ext=JotForm.getFileExtension(file.fileName);}
if(acceptString!="*"&&!accept.include(ext)&&!accept.include(ext.toLowerCase())){return JotForm.errored(upload,JotForm.texts.uploadExtensions+'<br/>'+acceptString);}
var validateImage=upload.readAttribute('data-imagevalidate')||false;var validatedImageExt="jpeg, jpg, png, gif, bmp";if((accept.include(ext)||accept.include(ext.toLowerCase()))&&validateImage&&(validateImage==='yes'||validateImage==='true')&&(validatedImageExt.include(ext)||validatedImageExt.include(ext.toLowerCase()))&&typeof window.FileReader!='undefined'){var binary_reader=new FileReader();binary_reader.onloadend=function(e){function ab2str(buf){var binaryString='',bytes=new Uint8Array(buf),length=bytes.length;for(var i=0;i<length;i++){binaryString+=String.fromCharCode(bytes[i]);}
return binaryString;}
var args={filename:file.name,size:file.size,binary:ab2str(e.target.result)};ImageInfo.loadInfo(args,function(){var info=ImageInfo.getAllFields(file.name);if(info.format==='UNKNOWN'){return JotForm.errored(upload,"You have uploaded an invalid image file type.");}});}
binary_reader.readAsArrayBuffer(file);}
if(!file.fileSize){file.fileSize=file.size;}
if(file.fileSize>maxsize&&maxsize!==0){return JotForm.errored(upload,JotForm.texts.uploadFilesize+' '+maxsizeString+'Kb');}
if(file.fileSize<minsize){return JotForm.errored(upload,JotForm.texts.uploadFilesizemin+' '+minsizeString+'Kb');}
return JotForm.corrected(upload);}};if(!required){upload.addClassName('validate[upload]');upload.observe('blur',upload.validateInput);}}catch(e){JotForm.error(e);}});});},dateFromField:function(field){var offset="";if(field.indexOf("-")>-1||field.indexOf("+")>-1){offset=field.split(/[\+\-]/)[1];offset=field.indexOf("-")>-1?"-"+offset:""+offset;field=field.split(/[\+\-]/)[0];}
field=field.replace(/[{}]/g,'');if(!$jot('year_'+field)||!$jot('year_'+field).value)return false;var year=$jot('year_'+field).value;;var month=$jot('month_'+field).value;var day=$jot('day_'+field).value;var date=new Date(year,month-1,day);if(offset.length){date.setDate(date.getDate()+parseInt(offset,10));}
return date;},setFieldValidation:function(input){var $jotthis=this;var reg={email:/^\S[a-z0-9\/.!#$jot%&'*+\/=?\^_`{|}~\-]*(?:\.[a-z0-9!#$jot%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])$jot/i,alphanumeric:/^[\u00C0-\u1FFF\u2C00-\uD7FFa-zA-Z0-9\s]+$jot/,numeric:/^(-?\d+[\.\,]?)+$jot/,numericDotStart:/^([\.]\d+)+$jot/,currency:/^-?[\$jot\Â£\â‚¬]?\d*,?\d*,?\d*(\.\d\d)?Â¥?$jot/,alphabetic:/^[\u00C0-\u1FFF\u2C00-\uD7FFa-zA-Z\s]+$jot/,cyrillic:/^[Ð°Ð±Ð²Ð³Ð´ÐµÑ‘Ð¶Ð·Ð¸Ð¹ÐºÐ»Ð¼Ð½Ð¾Ð¿Ñ€ÑÑ‚ÑƒÑ„Ñ…Ñ†Ñ‡ÑˆÑ‰ÑŒÑ‹ÑŠÑÑŽÑÐÐ‘Ð’Ð“Ð”Ð•ÐÐ–Ð—Ð˜Ð™ÐšÐ›ÐœÐÐžÐŸÐ Ð¡Ð¢Ð£Ð¤Ð¥Ð¦Ð§Ð¨Ð©Ð¬Ð«ÐªÐ­Ð®Ð¯\s]*$jot/,url:/(http|ftp|https){0,1}:{0,1}[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/};var validations=input.className.replace(/.*validate\[(.*)\].*/,'$jot1').split(/\s*,\s*/);input.validateInput=function(deep,dontShowMessage){if(document.get.ignoreValidation&&document.get.ignoreValidation==="true"){return true;}
if(!JotForm.isVisible(input)&&!input.hasClassName('g-recaptcha-response')){return true;}
if(JotForm.getContainer(input).getAttribute('data-type')==="control_datetime"&&!JotForm.getContainer(input).down('input[id*="month_"]').dateTimeCheck(false)){return false;}
if(!$jot(input.parentNode).hasClassName('form-matrix-values')&&!input.hasClassName('form-subproduct-option')&&!(input.id.match(/_quantity_/)||input.id.match(/_custom_/)))
{JotForm.corrected(input);}
var vals=validations;if(input.hinted===true){input.clearHint();setTimeout(function(){input.hintClear();},150);}
if(input.hasClassName('isNewEmail')&&typeof input.validateEmailField==='function'){return input.validateEmailField();}
if(input.readAttribute('data-type')==='input-spinner'&&input.value){return input.validateSpinnerInputs();}
else if(input.readAttribute('data-type')==='input-grading'&&input.value){return input.validateGradingInputs();}
else if(input.readAttribute('data-type')==='input-number'&&input.value){return input.validateNumberInputs();}
else if(input.readAttribute('data-min-amount')){return input.validateMinimum();}
if(input.up('.form-line').down('.form-textarea-limit-indicator-error')){input.triggerEvent('change');return;}
if(vals.include('disallowFree')){var freeEmails=['gmail','aim','outlook','hotmail','yahoo','mail','inbox'];for(var i=0;i<freeEmails.length;i++){if(input.value.toLowerCase().indexOf("@"+freeEmails[i]+".")>-1){return JotForm.errored(input,JotForm.texts.freeEmailError,dontShowMessage);}}}
if(vals.include('minSelection')||vals.include('minselection')){var minSelection=parseInt(input.readAttribute('data-minselection'));var numberChecked=0;input.up('.form-line').select('input[type=checkbox]').each(function(check){if(check.checked)numberChecked++;});if(numberChecked>0&&numberChecked<minSelection){return JotForm.errored(input,(JotForm.texts.minSelectionsError.replace(/\s*$jot/,"")+" ")+minSelection+'.',dontShowMessage);}}
if(vals.include('maxselection')){var maxSelection=parseInt(input.readAttribute('data-maxselection'));var numberChecked=0;input.up('.form-line').select('input[type=checkbox]').each(function(check){if(check.checked)numberChecked++;});if(numberChecked>maxSelection){return JotForm.errored(input,(JotForm.texts.maxSelectionsError.replace(/\s*$jot/,"")+" ")+maxSelection+'.',dontShowMessage);}}
if(vals.include('disallowPast')){var id=input.id.split('_').last();var inputtedDate=JotForm.getDateValue(id).split('T')[0];var dat=new Date();var month=(dat.getMonth()+1<10)?'0'+(dat.getMonth()+1):dat.getMonth()+1;var day=(dat.getDate()<10)?'0'+dat.getDate():dat.getDate();var currentDate=dat.getFullYear()+"-"+month+"-"+day;if(JotForm.checkValueByOperator('before',JotForm.strToDate(currentDate),JotForm.strToDate(inputtedDate))){return JotForm.errored(input,JotForm.texts.pastDatesDisallowed,dontShowMessage);}}
if(vals.include('limitDate')){try{var id=input.id.split('_').last();var lim=JotForm.dateLimits[id];if(lim!==false&&!($jot("year_"+id).value==""||$jot("month_"+id).value==""||$jot("day_"+id).value=="")){if("custom"in lim&&lim.custom!==false&&Array.isArray(lim.custom)){for(var j=0;j<lim.custom.length;j++){if(!lim.custom[j])continue;var year=$jot("year_"+id).value;var month=JotForm.addZeros($jot("month_"+id).value,2);var day=JotForm.addZeros($jot("day_"+id).value,2);if(lim.custom[j].indexOf("{")>-1){var custom=JotForm.dateFromField(lim.custom[j]);custom=JotForm.addZeros(custom.getFullYear(),2)+"-"+JotForm.addZeros(custom.getMonth()+1,2)+"-"+JotForm.addZeros(custom.getDate(),2);if(custom===year+"-"+month+"-"+day)return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);return;}
if((lim.custom[j]===year+"-"+month+"-"+day)||(typeof lim.custom[j]=="string"&&lim.custom[j].length===5&&lim.custom[j]===(month+"-"+day))||(typeof lim.custom[j]=="string"&&lim.custom[j].length===2&&lim.custom[j]==day)){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}}}
var date=new Date($jot("year_"+id).value,($jot("month_"+id).value-1),$jot("day_"+id).value);if("ranges"in lim&&lim.ranges!==false&&Array.isArray(lim.ranges)){for(var j=0;j<lim.ranges.length;j++){if(!lim.ranges[j]||lim.ranges[j].indexOf(">")===-1)continue;var range=lim.ranges[j].split(">");var startDate;if(range[0].indexOf("{")>-1){startDate=JotForm.dateFromField(range[0]);}else{var start=range[0].split("-");startDate=new Date(start[0],parseInt(start[1])-1,start[2]);}
var endDate;if(range[1].indexOf("{")>-1){endDate=JotForm.dateFromField(range[1]);}else{var end=range[1].split("-");endDate=new Date(end[0],parseInt(end[1])-1,end[2]);}
if(endDate){endDate.setDate(endDate.getDate()+1);if(date.getTime()>=startDate.getTime()&&date.getTime()<endDate.getTime()){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}}}}
var dayOfWeek=JotForm.getDayOfWeek(date);if("days"in lim,dayOfWeek in lim.days&&lim.days[dayOfWeek]==false){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}
if("future"in lim&&lim.future===false){var now=new Date();if(date>now){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}}
if("past"in lim&&lim.past===false){var now=new Date();var yesterday=new Date();yesterday.setDate(now.getDate()-1);if(date<yesterday){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}}
if("start"in lim&&lim.start!=false&&lim.start!=""){var start=lim.start.split("-");if(start.length==3){var startDate=new Date(start[0],start[1]-1,start[2]);if(date<startDate){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}}else if(lim.start.indexOf('{')>-1){var startDate=JotForm.dateFromField(lim.start);if(date<startDate){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}}}
if("end"in lim&&lim.end!=false&&lim.end!=""){var end=lim.end.split("-");if(end.length==3){var endDate=new Date(end[0],end[1]-1,end[2]);if(date>endDate){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}}else if(lim.end.indexOf('{')>-1){var endDate=JotForm.dateFromField(lim.end);if(date>endDate){return JotForm.errored(input,JotForm.texts.dateLimited,dontShowMessage);}}}}}catch(e){console.log(e);}}
if(vals.include('validateLiteDate')){if(input.hasClassName("invalidDate")){var format=input.readAttribute("placeholder")
return JotForm.errored(input,JotForm.texts.dateInvalid.replace("{format}",format),dontShowMessage);}}
if(vals.include("Email_Confirm")){var idEmail=input.id.replace(/.*_(\d+)(?:_confirm)?/gim,'$jot1');if(($jot('input_'+idEmail).value!=$jot('input_'+idEmail+'_confirm').value)){return JotForm.errored(input,JotForm.texts.confirmEmail,dontShowMessage);}else if(($jot('input_'+idEmail+'_confirm').value)&&(!reg.email.test($jot('input_'+idEmail+'_confirm').value))){return JotForm.errored(input,JotForm.texts.email,dontShowMessage);}}
if(vals.include("required")){if(input.tagName=='INPUT'&&input.readAttribute('type')=="file"){var formInput=input.up('.form-input')||input.up('.form-input-wide');var isMultiple=input.readAttribute('multiple')==='multiple';if(!isMultiple){if(input.value.empty()&&!(input.uploadMarked||(formInput&&formInput.uploadMarked))){return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}else{return JotForm.corrected(input);}}else{return input.up('div[class*=validate[multipleUpload]]').validateInput();}}else if(input.tagName=="INPUT"&&(input.readAttribute('type')=="radio"||input.readAttribute('type')=="checkbox")){if($jot(input.parentNode).hasClassName('form-matrix-values')){var ty=input.readAttribute('type');var matrixRows={};var oneChecked=false;var oneEmpty=false;var upperElement=input.up('table')?input.up('table'):input.up('.jfMatrix');upperElement.select('input').each(function(e){if(!(e.name in matrixRows)){matrixRows[e.name]=false;}
if(matrixRows[e.name]!==true){matrixRows[e.name]=e.checked;}
if(matrixRows[e.name]===true){oneChecked=true;}
if('value'in e&&e.value.strip(" ").empty()){oneEmpty=true;}});if(vals.include("requireOneAnswer")){if(!oneChecked)
return JotForm.errored(input,JotForm.texts.requireOne,dontShowMessage);}else if(vals.include('requireEveryCell')&&oneEmpty){return JotForm.errored(input,JotForm.texts.requireEveryCell,dontShowMessage);}else if(!$jotH(matrixRows).values().all()){return JotForm.errored(input,JotForm.texts.requireEveryRow,dontShowMessage);}else{return JotForm.corrected(input);}}else{var otherInput=input.up(".form-"+input.type+"-item")?input.up(".form-"+input.type+"-item").down(".form-"+input.type+"-other-input"):null;if(otherInput){if(input.checked&&otherInput.value==""){return JotForm.errored(input,JotForm.texts.required);}}
var baseInputName=input.name.substr(0,input.name.indexOf('['));var otherInputName=baseInputName+'[other]';var checkboxArray=[];if(document.getElementsByName(otherInputName)[0]){checkboxArray=$jotA(document.getElementsByName(baseInputName+'[]'));checkboxArray[checkboxArray.length]=document.getElementsByName(otherInputName)[0];if(!checkboxArray.map(function(e){return e.checked;}).any()){return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}}else{var cont=JotForm.getContainer(input);if(JotForm.payment&&cont.getAttribute('data-type').match(JotForm.payment)){if(!$jotA(document.getElementsByName(input.name)).map(function(e){if(JotForm.isVisible(e)){if(e.readAttribute('type')==="checkbox"&&e.value.indexOf('_expanded')>-1){if(!e.checked){return false;}else{return $jotA(document.querySelectorAll('#'+e.id+'_subproducts .form-subproduct-quantity')).map(function(cb){return cb.getSelected().value>0||cb.value>0;}).any();}}else if($jot(e.id+'_custom_price')){return e.checked&&$jot(e.id+'_custom_price').getValue()>0;}else{var qty=e.up('.form-product-item')?e.up('.form-product-item').down('select[id*="quantity"], input[id*="quantity"]'):false;if(qty){return e.checked&&qty.getValue()>0;}
return e.checked;}}}).any())
{if(input.hasClassName('paymentTypeRadios')){return JotForm.errored(input,"Please select payment method.",dontShowMessage);}
return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}}else{if(cont.select("input:checked").length===0){return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}}}}}else if((input.tagName=="INPUT"||input.tagName=="SELECT")&&($jot(input).up().hasClassName('form-matrix-values')||$jot(input).up(1).hasClassName('form-matrix-values'))){var matrixRows={};var oneEntry=false;var oneEmpty=false;var upperElement=input.up('table')?input.up('table'):input.up('.jfMatrix');upperElement.select(input.tagName).each(function(e){if(!(e.name in matrixRows)){matrixRows[e.name]=false;}
if(matrixRows[e.name]!==true){matrixRows[e.name]=(e.value&&!e.value.strip(" ").empty());}
if(matrixRows[e.name]===true){oneEntry=true;}
if('value'in e&&e.value.strip(" ").empty()){oneEmpty=true;}});if(vals.include("requireEveryRow")&&!$jotH(matrixRows).values().all()){return JotForm.errored(input,JotForm.texts.requireEveryRow,dontShowMessage);}else if(vals.include("requireOneAnswer")&&!oneEntry){return JotForm.errored(input,JotForm.texts.requireOne,dontShowMessage);}else if(vals.include('requireEveryCell')&&oneEmpty){return JotForm.errored(input,JotForm.texts.requireEveryCell,dontShowMessage);}else{return JotForm.corrected(input);}}else if((input.tagName==="INPUT"||input.tagName==="SELECT")&&input.hasClassName('form-subproduct-option')){if(input.hasClassName('form-subproduct-quantity')){var qID=input.id.replace(/_[0-9]*_[0-9]*$jot/,'');if($jot(qID.replace(/_quantity/,'')).checked){if($jotA(document.querySelectorAll('[id*="'+qID+'"]')).map(function(vl){return(vl.getSelected().value>0||vl.value>0);}).any()){return JotForm.corrected(input);}else{return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}}}}else if(input.name&&input.name.include("[")){try{var cont=$jotthis.getContainer(input);if(input.hasClassName('form-address-search')&&cont.select('.jfQuestion-clean').length>0){inputs=[input];}else{inputs=cont.select('input,select[name*='+input.name.replace(/\[.*$jot/,'')+']');}
var checkValues=inputs.map(function(e){if(e.hasClassName('form-address-state')){var country=cont.select('.form-address-country')[0].value;if(country!='United States'&&country!='Canada'&&country!=""){e.removeClassName('form-validation-error');e.__skipField=true;return false;}}else{if(e.__skipField){e.__skipField=false;}}
if(e.id.match(/_donation/)){return e.getValue()==0;}
if(window.FORM_MODE!=='cardform'){if(e.name&&e.name.match(/cc_/)){return JotForm.paymentTotal==0;}}
if(e.id.match(/input_[0-9]+_quantity_[0-9]+_[0-9]+/)){var cb=$jot(((e.id.replace('_quantity','')).match(/input_[0-9]+_[0-9]+/))[0]);var allProducts=document.querySelectorAll('[id*="'+e.id.match(/input_[0-9]*/)[0]+'"][type="'+cb.getAttribute('type')+'"]');if(e.id.split("_").length===6){var subProductQty=document.querySelectorAll('[id*="'+e.id.replace(/_[0-9]*_[0-9]*$jot/,"")+'"]');}
if((cb.checked&&!subProductQty&&(isNaN(e.value)||e.value==0||e.value.empty()))||(!allProducts.map(function(c){return c.checked}).any())||(cb.checked&&subProductQty&&!subProductQty.map(function(q){return q.value>0}).any())){e.addClassName('form-validation-error');return true;}}
var innerVals=e.className.replace(/.*validate\[(.*)\].*/,'$jot1').split(/\s*,\s*/);if(innerVals.include('required')&&JotForm.isVisible(e)){if(e.value.empty()||e.value.strip()=='Please Select'){if(!dontShowMessage){e.addClassName('form-validation-error');}
return true;}else{if(JotForm.getContainer(e).hasClassName("form-datetime-validation-error")){return JotForm.errored(input,'Enter a valid date',dontShowMessage);}}}
e.removeClassName('form-validation-error');return false;});if(JotForm.payment&&cont.getAttribute('data-type').match(JotForm.payment)&&["edit","inlineEdit","submissionToPDF"].indexOf(document.get.mode)>-1&&document.get.sid){return JotForm.corrected(input);}
if(checkValues.any()){if(JotForm.payment&&cont.getAttribute('data-type').match(JotForm.payment)){if(JotForm.isPaymentSelected()&&JotForm.paymentTotal==0){return JotForm.corrected(input);}}
if(input.hasClassName('form-address-search')&&cont.select('.jfQuestion-clean').length<1){return JotForm.corrected(input);}
return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}}catch(e){JotForm.error(e);return JotForm.corrected(input);}}
if(input.__skipField){return JotForm.corrected(input);}
if(input.tagName.toLowerCase()==='textarea'&&input.hasClassName('form-custom-hint')&&!input.up('div').down('.nicEdit-main')){return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}
if(input.hasClassName("form-textarea")&&input.up('div').down('.nicEdit-main')){var val=input.up('div').down('.nicEdit-main').innerHTML.stripTags().replace(/\s/g,'').replace(/&nbsp;/g,'');if(val.empty()||(input.readAttribute("data-customhint")&&input.readAttribute("data-customhint")==input.up('div').down('.nicEdit-main').innerHTML)){return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}}else if(JotForm.getContainer(input).getAttribute('data-type')==="control_datetime"){if(!input.value||input.value.strip(" ").empty()){return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}
if(input.id&&input.id.indexOf("lite_mode_")>-1){var seperator=input.readAttribute('seperator')||input.readAttribute('data-seperator');var format=(input.readAttribute('format')||input.readAttribute('data-format')).toLowerCase();if(input.value.length!==((seperator.length*2)+format.length)){return JotForm.errored(input,JotForm.texts.dateInvalid.replace("{format}",format),dontShowMessage);}}
if(JotForm.getContainer(input).hasClassName("form-datetime-validation-error")){return JotForm.errored(input,'Enter a valid date',dontShowMessage);}}else if((!input.value||input.value.strip(" ").empty()||input.value.replace('<br>','').empty()||input.value=='Please Select')&&!(input.readAttribute('type')=="radio"||input.readAttribute('type')=="checkbox")&&!$jot(input.parentNode).hasClassName('form-matrix-values')){return JotForm.errored(input,JotForm.texts.required,dontShowMessage);}
vals=vals.without("required");}else if(input.value.empty()){return true;}
if(!vals[0]){return true;}
switch(vals[0]){case"Email":input.value=input.value.replace(/^\s+|\s+$jot/g,'');if(!reg.email.test(input.value)){return JotForm.errored(input,JotForm.texts.email,dontShowMessage);}
break;case"Alphabetic":if(!reg.alphabetic.test(input.value)){return JotForm.errored(input,JotForm.texts.alphabetic,dontShowMessage);}
break;case"Numeric":if(!reg.numeric.test(input.value)&&!reg.numericDotStart.test(input.value)){return JotForm.errored(input,JotForm.texts.numeric,dontShowMessage);}
break;case"AlphaNumeric":if(!reg.alphanumeric.test(input.value)){return JotForm.errored(input,JotForm.texts.alphanumeric,dontShowMessage);}
break;case"Cyrillic":if(!reg.cyrillic.test(input.value)){return JotForm.errored(input,JotForm.texts.cyrillic,dontShowMessage);}
break;case"Url":if(!reg.url.test(input.value)){return JotForm.errored(input,JotForm.texts.url,dontShowMessage);}
break;case"Currency":if(input.up(".form-matrix-table")){if(input.up(".form-matrix-table").select("input").collect(function(inp){return!reg.currency.test(inp.value)}).any()){return JotForm.errored(input,JotForm.texts.currency,dontShowMessage);}}else{if(!reg.currency.test(input.value)){return JotForm.errored(input,JotForm.texts.currency,dontShowMessage);}}
break;case"Fill Mask":if(input.readAttribute("data-masked")=="true"&&!jQuery(input).inputmask("isComplete")){return JotForm.errored(input,JotForm.texts.fillMask,dontShowMessage);}
break;default:}
return JotForm.corrected(input);};var validatorEvent=function(e){setTimeout(function(){if($jotthis.lastFocus&&($jotthis.lastFocus==input||$jotthis.getContainer($jotthis.lastFocus)!=$jotthis.getContainer(input))){input.validateInput();}else if(input.type=="hidden"||input.type=='file'){input.validateInput();}},10);};if(input.type=='hidden'||input.type=='file'){input.observe('change',validatorEvent);}else{input.observe('blur',validatorEvent);}
if(input.type=='checkbox'||input.type=='radio'){input.observe('change',function(){input.validateInput();});if(JotForm.getOptionOtherInput(input)){var otherInput=JotForm.getOptionOtherInput(input);otherInput.observe('keyup',function(){input.validateInput();});}}
if(input.hasClassName("form-textarea")&&input.up('div').down('.nicEdit-main')){input.up('div').down('.nicEdit-main').observe('blur',validatorEvent);}
if(input.up('.form-spinner')){var spinnerEvent=function(){input.validateInput();};input.up('.form-spinner').down('.form-spinner-up').observe('click',spinnerEvent);input.up('.form-spinner').down('.form-spinner-down').observe('click',spinnerEvent);}},FBInit:function(){JotForm.FBNoSubmit=true;FB.getLoginStatus(function(response){if(response.authResponse){JotForm.FBCollectInformation(response.authResponse.userID);}else{FB.Event.subscribe('auth.login',function(response){JotForm.FBCollectInformation(response.authResponse.userID);});}});},FBCollectInformation:function(id){JotForm.FBNoSubmit=false;var fls=document.querySelectorAll('.form-helper').collect(function(el){var f="";var d=el.readAttribute('data-info').replace("user_","");switch(d){case"can_be_anyvalue":f="place correct one here";break;case"sex":f="gender";break;case"about_me":f="bio";break;default:f=d;}
return[f,el.id];});var fields={};var getPhoto=false;$jotA(fls).each(function(p){if(p[0]=="pic_with_logo"){getPhoto={fieldID:p[1]};}
if(p[0]!=="username"){fields[p[0]]=p[1];}});var params=$jotH(fields).keys().without("pic_with_logo");var callback=function(input,user_id){JotForm.bringOldFBSubmissionBack(id);var hidden=new Element('input',{type:'hidden',name:'fb_user_id'}).setValue(id);var form=JotForm.getForm(input);form.insert({top:hidden});};try{FB.api('/'+id,{fields:params},function(res){var input;$jotH(res).each(function(pair){if($jot(fields[pair.key])){input=$jot(fields[pair.key]);switch(pair.key){case"location":input.value=pair.value.name;break;case"website":input.value=pair.value.split(/\s+/).join(", ");break;default:input.value=pair.value;}}});if(getPhoto){FB.api('/'+id+'/picture',function(res){if(res.data.url&&$jot(getPhoto.fieldID)){$jot(getPhoto.fieldID).value=res.data.url;}
callback(input,id);});}else{callback(input,id);}});}catch(e){console.error(e);}
document.querySelectorAll('.fb-login-buttons').invoke('show');document.querySelectorAll('.fb-login-label').invoke('hide');},bringOldFBSubmissionBack:function(id){var formIDField=document.querySelectorAll('input[name="formID"]')[0];var a=new Ajax.Jsonp(JotForm.url+'server.php',{parameters:{action:'bringOldFBSubmissionBack',formID:formIDField.value,fbid:id},evalJSON:'force',onComplete:function(t){var res=t.responseJSON;if(res.success){JotForm.editMode(res,true,['control_helper','control_fileupload']);}}});},setCustomHint:function(elem,value){var element=$jot(elem)||null,new_value=value.replace(/<br>/gim,"\n")||"";element.addClassName('custom-hint-group').writeAttribute('data-customhint',value).writeAttribute('customhinted',"true");element.hasContent=(element.value&&element.value.replace(/\n/gim,"<br>")!=value)?true:false;element.showCustomPlaceHolder=function(){if(!this.hasContent){this.value=new_value;this.writeAttribute("spellcheck","false").addClassName('form-custom-hint');}};element.hideCustomPlaceHolder=function(){if(!this.hasContent){this.value="";this.removeClassName('form-custom-hint').removeAttribute('spellcheck');}};element.observe('focus',function(e){this.hideCustomPlaceHolder();}).observe('blur',function(e){this.showCustomPlaceHolder();}).observe('keyup',function(e){this.hasContent=(this.value.length>0&&this.value!==new_value)?true:false;}).observe('paste',function(e){$jotthis=this;setTimeout(function(){$jotthis.hasContent=($jotthis.value.length>0&&$jotthis.value!==new_value)?true:false;},2);});if(element&&element.type==="textarea"&&element.hasAttribute('data-richtext')){setTimeout(function(){var editor=document.querySelectorAll('#id_'+element.id.replace('input_','')+' .nicEdit-main')[0]||null;var editorInstance=nicEditors.findEditor(element.id);if(editor){if(!element.hasContent){editor.setStyle({'color':'#babbc0'});}
editor.observe('blur',function(){if(!editorInstance.getContent()||editorInstance.getContent()==="<br>"){editor.setStyle({'color':'#babbc0'});editorInstance.setContent(new_value);element.writeAttribute("spellcheck","false").addClassName('form-custom-hint');}});editor.observe('focus',function(){editor.setStyle({'color':''});element.removeClassName('form-custom-hint').removeAttribute('spellcheck');if(editorInstance.getContent()===new_value){editorInstance.setContent('');};});}},1000);}
element.up('form.jotform-form').observe('submit',function(){this.select('.custom-hint-group').each(function(elem){elem.hideCustomPlaceHolder();});});element.showCustomPlaceHolder();},fieldHasContent:function(id){if($jot('id_'+id).hasClassName('form-line-error'))return false;if($jot('id_'+id).select('.form-custom-hint').length>0)return false;var type=JotForm.getInputType(id);switch(type){case"address":case"combined":return document.querySelectorAll('#id_'+id+' input').collect(function(e){return e.value;}).any();case"number":return document.querySelectorAll('#id_'+id+' input').collect(function(e){return e.value.length>0;}).any();case"birthdate":return JotForm.getBirthDate(id);case"datetime":var date=JotForm.getDateValue(id);return!(date=="T00:00"||date=='');case"time":return JotForm.get24HourTime(id);case"checkbox":case"radio":return document.querySelectorAll('#id_'+id+' input').collect(function(e){return e.checked;}).any();case"select":return document.querySelectorAll('#id_'+id+' select').collect(function(e){return e.value;}).any();case"grading":return document.querySelectorAll('input[id^=input_'+id+'_]').collect(function(e){return e.value;}).any();case"signature":return jQuery("#id_"+id).find(".pad").jSignature('getData','base30')[1].length>0;case"slider":return $jot('input_'+id).value>0;case"file":if(document.querySelectorAll('#id_'+id+' input')[0].readAttribute('multiple')==='multiple'||document.querySelectorAll('#id_'+id+' input')[0].readAttribute('multiple')===''){var fileList=$jot('id_'+id).select('.qq-upload-list li');if(fileList.length>0){var status=true;fileList.each(function(elem){if(elem.getAttribute('class').indexOf('fail')>0){status=false;}});return status;}
return true;}else{return $jot('input_'+id).value;}
break;default:if($jot('input_'+id)&&$jot('input_'+id).value){return $jot('input_'+id).value;}else{return false;}}},setupProgressBar:function(){JotForm.progressBar=new ProgressBar("progressBar",{'height':'20px','width':'95%'});var countFields=['select','radio','checkbox','file','combined','email','address','combined','datetime','time','birthdate','number','radio','number','radio','autocomplete','radio','text','textarea','signature','div','slider'];var totalFields=0;var completedFields=0;var updateProgress=function(){completedFields=0;document.querySelectorAll('.form-line').each(function(el){var id=el.id.split("_")[1];var type=JotForm.getInputType(id);if($jotA(countFields).include(type)){if(JotForm.fieldHasContent(id)){completedFields++;}}});var percentage=parseInt(100/totalFields*completedFields);if(isNaN(percentage))percentage=0;JotForm.progressBar.setPercent(percentage);$jot('progressPercentage').update(percentage+'% ');$jot('progressCompleted').update(completedFields);if(percentage==100){$jot('progressSubmissionReminder').show();}else{$jot('progressSubmissionReminder').hide();}};var setListener=function(el,ev){$jot(el).observe(ev,function(){updateProgress();});};document.querySelectorAll('.form-line').each(function(el){var id=el.id.split("_")[1];var type=JotForm.getInputType(id);if(!countFields.include(type)){return;}
totalFields++;switch(type){case'radio':case'checkbox':setListener($jot('id_'+id),'click');break;case'select':case'file':setListener($jot('id_'+id),'change');break;case'datetime':setListener($jot('id_'+id),'date:changed');document.querySelectorAll("#id_"+id+' select').each(function(el){setListener($jot(el),'change');});break;case'time':case'birthdate':document.querySelectorAll("#id_"+id+' select').each(function(el){setListener($jot(el),'change');});break;case'address':setListener($jot('id_'+id),'keyup');break;case'number':setListener($jot('id_'+id),'keyup');setListener($jot('id_'+id),'click');break;case'signature':setListener($jot('id_'+id),'click');break;default:setListener($jot('id_'+id),'keyup');break;}});$jot('progressTotal').update(totalFields);updateProgress();},setupRichArea:function(qid){if(!(!Prototype.Browser.IE9&&!Prototype.Browser.IE10&&Prototype.Browser.IE)){if(!JotForm.isVisible(qid)){$jot('id_'+qid).up('.form-section')&&$jot('id_'+qid).up('.form-section').show();JotForm.showField(qid);}
new nicEditor({iconsPath:location.protocol+'//www.jotform.com/images/nicEditorIcons.gif?v2'}).panelInstance('input_'+qid);JotForm.updateAreaFromRich(qid);}},updateAreaFromRich:function(id){try{var rich=$jot('id_'+id).down('.nicEdit-main');var txtarea=$jot('id_'+id).down('textarea');if(rich&&txtarea){rich.observe('keyup',function(){txtarea.value=rich.innerHTML;if(txtarea.triggerEvent)txtarea.triggerEvent('keyup');});}}catch(e){console.error(e);}},autoFillInitialize:function(params){if(this.isEditMode()){return;}
var formID=document.querySelectorAll('input[name="formID"]')[0].value;params.name='form_'+formID;var _form='form#'+formID;var form=document.querySelectorAll(_form)[0];var excludeFields=["formID","simple_spc","temp_upload_folder"];form.writeAttribute('data-autofill','true');var _conflicts={_handleCustomHint:function(data){var pfields=data.protectedfields;var pfieldsdata=data.protectedfieldsdata;var inc=0;$jotH(pfieldsdata).each(function(_fielddata){var _field=pfields[inc];var field=$jot(_field);var fieldata=_fielddata[1];var value=(fieldata.newinputvalue)?fieldata.newinputvalue.replace(/\n/gim,"<br>"):false;if(field.hasAttribute('data-customhint')||field.hasAttribute('customhinted')){var hint=field.readAttribute('data-customhint');if(hint&&value&&hint!=value){field.removeClassName('form-custom-hint');field.hasContent=true;}}
else if(field.hasAttribute('hinted')||field.hinted)
{var hint=(fieldata.oldinputvalue)?fieldata.oldinputvalue.replace(/\n/gim,"<br>"):false;if(hint&&value&&hint!=value){field.setStyle({color:"#000"});}}
inc++;});},_handleGradingTotal:function(data){if(document.querySelectorAll('.form-grading-input').length>0&&$jot("grade_total_"+id)){var total=0,id=null;document.querySelectorAll('.form-grading-input').each(function(input){id=input.id.replace(/input_(\d+)_\d+/,"$jot1"),total+=parseFloat(input.value)||0;});$jot("grade_point_"+id).innerHTML=total;}},_handleRichText:function(data){document.querySelectorAll('.nicEdit-main').each(function(richArea){var txtarea=richArea.up('.form-line').down('textarea');if(txtarea){richArea.innerHTML=txtarea.value;}});},_handleStarRating:function(data){document.querySelectorAll(".form-star-rating").each(function(rating){if(rating.setRating==='function')rating.setRating(rating.down("input").value);});},_handlePaymentTotal:function(){if($jot('payment_total')){JotForm.totalCounter(JotForm.prices);}}};if(JotForm.payment&&document.querySelectorAll('.form-product-item > input.form-product-has-subproducts').length>0){document.querySelectorAll('.form-line[data-type="control_authnet"] select, .form-line[data-type="control_authnet"] input').each(function(input){if(input.id){excludeFields.push(input.id);}});}
jQuery(_form).autoFill({timeout:(Number(params.timeout)>0)?params.timeout:4,sessionID:JotForm.sessionID,excludeFields:excludeFields,ttl:params.ttl,allowBindOnChange:(params.bindChange&&params.bindChange=='on')?true:false,onBeforeSave:function(){},onSave:function(){},onRelease:function(){},onBeforeRestore:function(){},onRestore:function(data){var restoredDatas=this.restoredData[0];if(restoredDatas){_conflicts._handleCustomHint(restoredDatas);_conflicts._handleGradingTotal(restoredDatas);_conflicts._handleRichText(restoredDatas);_conflicts._handleStarRating(restoredDatas);_conflicts._handlePaymentTotal(restoredDatas);}}});this.runAllConditions();this.autoFillDeployed=true;},runAllConditions:function(){$jotH(JotForm.fieldConditions).each(function(pair){var field=pair.key;var event=pair.value.event;if(!$jot(field)){return;}
if(["autofill","number","autocomplete"].include(event))event="keyup";$jot(field).run(event);});if(JotForm.isEditMode()){JotForm.ignoreInsertionCondition=null;}},hasQuestion:function(questions,questionType){var questions_by_name=[];function transpose(a){return a[0].map(function(val,c){return a.map(function(r){return r[c];});});}
var field=false;if(questions.length>0){questions.some(function(question){if(question){if(question.type===questionType){return field=question;}}});}
return field;},paymentExtrasOnTheFly:function(questions){var $jotthis=this;var questions_by_name=[];function transpose(a){return a[0].map(function(val,c){return a.map(function(r){return r[c];});});}
if(questions.length>0){questions.forEach(function(question){if(question){switch(question.type){case'control_chargify':var email=$jotthis.hasQuestion(questions,'control_email');if(email!==false){var emails=document.querySelectorAll('input[type="email"]');emails[0].observe('blur',function(e){if(e.target.value){document.querySelectorAll('.cc_email')[0].value=e.target.value;};});}
break;case'control_wepay':var email=$jotthis.hasQuestion(questions,'control_email');if(email!==false){var emails=document.querySelectorAll('input[type="email"]');emails[0].observe('blur',function(e){if(e.target.value){document.querySelectorAll('.cc_email')[0].value=e.target.value;};});}
var address=$jotthis.hasQuestion(questions,'control_address');if(address!==false){var address=document.querySelectorAll('.form-address-postal');address[0].observe('blur',function(e){if(e.target.value){document.querySelectorAll('.cc_zipcode')[0].value=e.target.value;};});}
break;default:}}});}},setQuestionMasking:function(toSelector,type,maskValue,unmask){if(!maskValue)return;maskValue=maskValue.replace(/&#39;/g,"'");var unmask=(unmask)?unmask:false;var placeholder=maskValue.replace(/#/g,'_');jQuery.mask.definitions={"#":"[0-9]"}
if(type==="textMasking"){jQuery.mask.definitions["@"]="[A-Za-z\u0410-\u044F\u0401\u0451\u4E00-\u9FFF]";jQuery.mask.definitions["*"]="[0-9A-Za-z\u0410-\u044F\u0401\u0451\u4E00-\u9FFF]";placeholder=placeholder.replace(/\*|@/g,'_');}
var jqObject=jQuery(toSelector);if(unmask){jqObject.mask("unmask").off('blur');}
else{jqObject.mask(maskValue,{placeholder:"_",autoclear:false}).on('blur',function(e){e.target.dispatchEvent(new Event('change'));}).attr('maskValue',maskValue).attr('placeholder',placeholder);var caretPos=jqObject.val().indexOf('_');jqObject.caret(caretPos);}},setInputTextMasking:function(elem,maskValue,unmask){setTimeout(function(){JotForm.setQuestionMasking("#"+elem,'textMasking',maskValue,unmask);},10);},setPhoneMaskingValidator:function(elem,maskValue,unmask){setTimeout(function(){JotForm.setQuestionMasking("#"+elem,'phoneMasking',maskValue,unmask);},10);},loadScript:function(){var toLoad=arguments.length;var callback;var hasCallback=arguments[toLoad-1]instanceof Function;var script;function onloaded(){toLoad--;if(!toLoad){callback();}}
if(hasCallback){toLoad--;callback=arguments[arguments.length-1];}else{callback=function(){};}
for(var i=0;i<toLoad;i++){script=document.createElement('script');script.src=arguments[i];if(typeof(script.addEventListener)!='undefined'){script.addEventListener('load',callback,false);}else{var handleScriptStateChangeIE8=function(){if(script.readyState=='loaded'){callback();}}
script.attachEvent('onreadystatechange',handleScriptStateChangeIE8);}
(document.head||document.getElementsByTagName('head')[0]).appendChild(script);}},loadStyleSheet:function(url,onLoad){var link=document.createElement('link');link.setAttribute('type','text/css');link.setAttribute('rel','stylesheet');link.setAttribute('href',url);(document.head||document.getElementsByTagName('head')[0]).appendChild(link);if(link.readyState){link.onreadystatechange=function(){if(link.readyState=="loaded"||link.readyState=="complete"){link.onreadystatechange=null;onLoad&&onLoad();}};}else{if(navigator.userAgent.match(/safari/i)&&!navigator.userAgent.match(/chrome/i)){onLoad&&onLoad();}else{link.onload=function(){onLoad&&onLoad();};}}},isStyleSheetLoaded:function(stlesheetName){var found=false;var styleSheets=document.styleSheets;for(var s in styleSheets){var styleSheet=styleSheets[s];if(styleSheet.href&&!!~styleSheet.href.indexOf(stlesheetName)){found=true;break;}}
return found;},track:function(w,d){var self=this;if(document.querySelectorAll('#event_tracking_image').length>0){return;}
var _form=document.querySelectorAll('.jotform-form')[0];var _formID=_form.getAttribute('id');var _referer;var _location;try{_referer=encodeURIComponent(document.referrer);}catch(e){_referer='undefined'}
try{_location=encodeURIComponent(window.top.location.href);}catch(e){_location='undefined'}
var _screenHeight=window.screen.height;var _screenWidth=window.screen.width;if(!_formID){return false;}
if(_form){if(location&&location.href&&location.href.indexOf('&nofs')==-1){var uuid=generateUUID();insertAfter(createImageEl(uuid),_form);createEventID(uuid);}}
function insertAfter(newNode,referenceNode){referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);}
function createImageEl(uuid){var base='//events.jotform.com/';if(self.jsForm){base=base+'jsform/';}else{base=base+'form/';}
var src=base+_formID+'/';var resolutionStr;if(_screenHeight&&_screenWidth){resolutionStr=_screenWidth+'x'+_screenHeight;}
src=src+'?ref='+encodeURIComponent(_referer);if(resolutionStr){src=src+'&res='+encodeURIComponent(resolutionStr);}
if(uuid){src=src+'&eventID='+encodeURIComponent(uuid);}
src=src+'&loc='+encodeURIComponent(_location);var img=new Image();img.id="event_tracking_image";img.src=src;img.alt="jftr";img.style.display='none';return img;}
function createEventID(uuid){var inputEl=document.createElement('input');inputEl.setAttribute('type','hidden');inputEl.setAttribute('name','event_id');inputEl.value=uuid;_form.appendChild(inputEl);}
function generateUUID(){return 1*new Date()+'_'+_formID+'_'+randomString(7);}
function randomString(len){charSet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';var randomString='';for(var i=0;i<len;i++){var randomPoz=Math.floor(Math.random()*charSet.length);randomString+=charSet.substring(randomPoz,randomPoz+1);}
return randomString;}},additionalActionsFormEmbedded:function(){var self=this;var integration=getQuerystring('embeddedvia');if(integration){if(integration==='weebly'){if(!self.isStyleSheetLoaded('mobile.responsive.min.css')){var styleSheetUrl='https://widgets.jotform.io/mobileResponsive/mobile.responsive.min.css';self.loadStyleSheet(styleSheetUrl,function(){self.handleIFrameHeight();});}}}},changeSubmitURL:function(submitURL){if(submitURL.length>0){for(var i=this.forms.length-1;i>=0;i--){var form=this.forms[i];form.action=form.action.replace(/\/\/submit\..*?\//,'//'+submitURL+'/');};}},handleChinaCensorship:function(){this.getClientCountry(function(location){var country=location.country;if((country.length>0&&country.toLowerCase()==='cn')){this.changeSubmitURL('china.jotfor.ms');}}.bind(this));},handlePreview:function(filled){document.querySelectorAll('body')[0].setStyle({overflowX:'hidden'});$jotA(JotForm.forms).each(function(form){var previewInput=document.createElement('input');previewInput.setAttribute('type','hidden');previewInput.setAttribute('name','preview');previewInput.value='true';form.appendChild(previewInput);if(filled===true){var script=document.createElement('script');script.setAttribute('type','text/javascript');script.setAttribute('src','//cdn.jotfor.ms/js/form-tester.js?rev='+new Date().getTime());form.appendChild(script);}});},getClientCountry:function(callback){new Ajax.Request('//china.jotfor.ms/opt/geo.ip.php',{evalJSON:'force',onComplete:function(res){if(res.status===200){callback(res.responseJSON);}else{callback({country:''});}}});},updateMatrixInputs:function(id,target){var matrix=document.getElementById("matrix_"+id);var dataType=matrix.getAttribute('data-type');var desktopWrapper=$jot(matrix).select('.forDesktop')[0];var mobileWrapper=$jot(matrix).select('.forMobile')[0];if(target==='mobile'){var hiddenMatrix=mobileWrapper;var visibleMatrix=desktopWrapper;}else{var hiddenMatrix=desktopWrapper;var visibleMatrix=mobileWrapper}
var hiddenWrappers=$jot(hiddenMatrix).select('.form-matrix-values');hiddenWrappers.each(function(i){$jot(i).removeClassName('form-matrix-values');$jot(i).addClassName('form-matrix-values-disabled');});var hiddenInputs=$jot(hiddenMatrix).select('input');if(dataType!=='Yes No'){hiddenInputs.each(function(i){if(i.id.indexOf('disabled')<0){i.id+='_disabled';i.setAttribute('data-name',i.getAttribute('name'));i.removeAttribute('name');}});}
var visibleWrapper=$jot(visibleMatrix).select('.form-matrix-values');visibleWrapper.each(function(i){$jot(i).removeClassName('form-matrix-values-disabled');$jot(i).addClassName('form-matrix-values');});var visibleInputs=$jot(visibleMatrix).select('input');visibleInputs.each(function(i){i.id=i.id.replace('_disabled','');if(i.getAttribute('data-name')){i.setAttribute('name',i.getAttribute('data-name'));i.removeAttribute('data-name');}});$jot(hiddenMatrix).addClassName('hidden-matrix');$jot(visibleMatrix).removeClassName('hidden-matrix');},setMatrixLayout:function(id,passive,mobileActiveQuestionOrder){var matrix=document.getElementById("matrix_"+id);var desktopVersion=$jot(matrix).select('.forDesktop')[0];var mobileVersion=$jot(matrix).select('.forMobile')[0];var dataType=matrix.getAttribute('data-type');if(!passive){if((desktopVersion&&desktopVersion.getStyle('display')!=='none')&&mobileVersion){this.updateMatrixInputs(id,'mobile');}else if((mobileVersion&&mobileVersion.getStyle('display')!=='none')&&desktopVersion){this.updateMatrixInputs(id,'desktop');}}
if(['Slider','Emoji Slider','Yes No'].indexOf(dataType)>-1){if(desktopVersion){var matrixLabelListItems=desktopVersion.getElementsByClassName('jfMatrixLabelList-item');var matrixInputListItems=desktopVersion.getElementsByClassName('jfMatrixInputList-item');if(Array.prototype.forEach){Array.prototype.forEach.call(matrixLabelListItems,function(matrixLabel,index){var matrixInput=matrixInputListItems[index];if(matrixInput&&matrixLabel){matrixInput.style.height=matrixLabel.offsetHeight+'px';}});}}}
if(['Slider','Emoji Slider'].indexOf(dataType)===-1){if($jot(matrix).select('.forDesktop').length>0){var headerItems=matrix.getElementsByClassName('jfMatrixHeader-item');var tableCells=matrix.getElementsByClassName('jfMatrixTable-cell');for(var i=1;i<headerItems.length;i++){var cell=tableCells[i].down();if(headerItems[i].getElementsByTagName('div')[0].getLayout().get('width')<5){var cellWidth=80;}else{var cellWidth=headerItems[i].getElementsByTagName('div')[0].getLayout().get('padding-box-width');}
cell.style.width=cellWidth+'px';}
if(headerItems&&headerItems.length){headerItems[0].getElementsByTagName('div')[0].style.width=tableCells[0].getElementsByTagName('div')[0].getLayout().get('padding-box-width')+'px';var matrixTable=matrix.getElementsByClassName('jfMatrixTable')[0];var matrixHeader=matrix.getElementsByClassName('jfMatrixHeader')[0];matrixTable.addEventListener('scroll',function(){matrixHeader.scrollLeft=matrixTable.scrollLeft;});}}
if($jot(matrix).select('.forMobile').length>0){var setActiveQuestion=function(activeQuestionOrder){var questions=$jot(matrix).select('.jfMatrix-question');var bullets=$jot(matrix).select('.jfMobileMatrix-columnDot');var isNextEnabled=isBackEnabled=true;questions.each(function(q){q.removeClassName('isActive');if(q.readAttribute('data-order')==activeQuestionOrder){$jot(q).addClassName('isActive');}});if(bullets){bullets.each(function(q){q.removeClassName('isActive');if(q.readAttribute('data-order')==activeQuestionOrder){$jot(q).addClassName('isActive');}});}
var choices=$jot(matrix).select('.jfMatrix-choiceWrapper');choices.each(function(c){c.removeClassName('isActive');if(c.readAttribute('data-order')==activeQuestionOrder){$jot(c).addClassName('isActive');}});if(parseInt(activeQuestionOrder,10)===questions.length-1){isNextEnabled=false;}else if(parseInt(activeQuestionOrder,10)===0){isBackEnabled=false;}
if($jot(matrix).select('.forMatrixPrev').length>0){$jot(matrix).select('.forMatrixPrev')[0].disabled=!isBackEnabled;}
if($jot(matrix).select('.forMatrixNext').length>0){$jot(matrix).select('.forMatrixNext')[0].disabled=!isNextEnabled;}
$jot(matrix).select('.jfMatrixProgress-text span')[0].innerHTML=activeQuestionOrder+1;}
if(mobileActiveQuestionOrder){setActiveQuestion(mobileActiveQuestionOrder);}
var handleNextButtonClick=function(){$jot(this).stopObserving('click');var questions=$jot(matrix).select('.jfMatrix-question');var activeQuestionOrder=parseInt($jot(matrix).select('.jfMatrix-question.isActive')[0].readAttribute('data-order'));activeQuestionOrder=parseInt(activeQuestionOrder,10)+1;setActiveQuestion(activeQuestionOrder);$jot(this).observe('click',handleNextButtonClick);};var handlePrevButtonClick=function(){$jot(this).stopObserving('click');var questions=$jot(matrix).select('.jfMatrix-question');var activeQuestionOrder=parseInt($jot(matrix).select('.jfMatrix-question.isActive')[0].readAttribute('data-order'));activeQuestionOrder=parseInt(activeQuestionOrder,10)-1;setActiveQuestion(activeQuestionOrder);$jot(this).observe('click',handlePrevButtonClick);};$jot(matrix).select('.forMatrixNext').length>0&&$jot(matrix).select('.forMatrixNext')[0].observe("click",handleNextButtonClick);$jot(matrix).select('.forMatrixPrev').length>0&&$jot(matrix).select('.forMatrixPrev')[0].observe("click",handlePrevButtonClick);var findAncestor=function(el,cls){while((el=el.parentElement)&&!el.classList.contains(cls));return el;}
if(!passive&&!mobileVersion.hasClassName('hidden-matrix')){$jot(matrix).select('input').each(function(input){if(input.type=='radio'){var showNextQuestion=function(){$jot(this).stopObserving('click');if(mobileVersion.hasClassName('hidden-matrix')){return;}
var activeTable=findAncestor(this,'jfMatrixChoice-table');if($jot(activeTable).select('.jfMatrixChoice-row.isSelected').length>0){var selectedRow=$jot(activeTable).select('.jfMatrixChoice-row.isSelected')[0];selectedRow.removeClassName('isSelected');}
var activeRow=findAncestor(this,'jfMatrixChoice-row');activeRow.addClassName('isSelected');setTimeout(function(){var nextButton=$jot(matrix).select('.jfMatrixProgress-button.forMatrixNext')[0];if($jot(nextButton).readAttribute('disabled')==null){$jot(nextButton).triggerEvent('click');}},500);$jot(this).observe('click',showNextQuestion);};input.observe('click',showNextQuestion);}});}}}},setMatrix2Layout:function(id,passive,mobileActiveQuestionOrder){var matrix=document.getElementById("matrix_"+id);var dataType=matrix.getAttribute('data-type');var desktopVersion=$jot(matrix).select('.forDesktop')[0];var mobileVersion=$jot(matrix).select('.forMobile')[0];if(!passive){if((desktopVersion&&desktopVersion.getStyle('display')!=='none')&&mobileVersion){this.updateMatrixInputs(id,'mobile');}else if((mobileVersion&&mobileVersion.getStyle('display')!=='none')&&desktopVersion){this.updateMatrixInputs(id,'desktop');}}
if(['Slider','Smiley Slider'].indexOf(dataType)===-1){if($jot(matrix).select('.forDesktop').length>0){var rows=$jot(matrix).select('.forDesktop .jfMatrixTable .jfMatrixTable-row');var labels=$jot(matrix).select('.forDesktop .jfMatrixTable-labelRow')
rows.each(function(row,rowIndex){row.style.height=labels[rowIndex].offsetHeight+'px';});}
if($jot(matrix).select('.forMobile').length>0){var setActiveQuestion=function(activeQuestionOrder){var questions=$jot(matrix).select('.jfMatrix-question');var bullets=$jot(matrix).select('.jfMobileMatrix-columnDot');var isNextEnabled=isBackEnabled=true;questions.each(function(q){q.removeClassName('isActive');if(q.readAttribute('data-order')==activeQuestionOrder){$jot(q).addClassName('isActive');}});if(bullets){bullets.each(function(q){q.removeClassName('isActive');if(q.readAttribute('data-order')==activeQuestionOrder){$jot(q).addClassName('isActive');}});}
var choices=$jot(matrix).select('.jfMatrix-choiceWrapper');choices.each(function(c){c.removeClassName('isActive');if(c.readAttribute('data-order')==activeQuestionOrder){$jot(c).addClassName('isActive');}});if(parseInt(activeQuestionOrder,10)===questions.length-1){isNextEnabled=false;}else if(parseInt(activeQuestionOrder,10)===0){isBackEnabled=false;}
$jot(matrix).select('.forMatrixPrev')[0].disabled=!isBackEnabled;$jot(matrix).select('.forMatrixNext')[0].disabled=!isNextEnabled;$jot(matrix).select('.jfMatrixProgress-text span')[0].innerHTML=activeQuestionOrder+1;}
if(mobileActiveQuestionOrder){setActiveQuestion(mobileActiveQuestionOrder);}
var handleNextButtonClick=function(){$jot(this).stopObserving('click');var questions=$jot(matrix).select('.jfMatrix-question');var activeQuestionOrder=parseInt($jot(matrix).select('.jfMatrix-question.isActive')[0].readAttribute('data-order'));activeQuestionOrder=parseInt(activeQuestionOrder,10)+1;setActiveQuestion(activeQuestionOrder);$jot(this).observe('click',handleNextButtonClick);};var handlePrevButtonClick=function(){$jot(this).stopObserving('click');var questions=$jot(matrix).select('.jfMatrix-question');var activeQuestionOrder=parseInt($jot(matrix).select('.jfMatrix-question.isActive')[0].readAttribute('data-order'));activeQuestionOrder=parseInt(activeQuestionOrder,10)-1;setActiveQuestion(activeQuestionOrder);$jot(this).observe('click',handlePrevButtonClick);};$jot(matrix).select('.forMatrixNext').length>0&&$jot(matrix).select('.forMatrixNext')[0].observe("click",handleNextButtonClick);$jot(matrix).select('.forMatrixPrev').length>0&&$jot(matrix).select('.forMatrixPrev')[0].observe("click",handlePrevButtonClick);var findAncestor=function(el,cls){while((el=el.parentElement)&&!el.classList.contains(cls));return el;}
if(!passive&&!mobileVersion.hasClassName('hidden-matrix')){$jot(matrix).select('input').each(function(input){if(input.type=='radio'){var showNextQuestion=function(){$jot(this).stopObserving('click');if(mobileVersion.hasClassName('hidden-matrix')){return;}
var activeTable=findAncestor(this,'jfMatrixChoice-table');if($jot(activeTable).select('.jfMatrixChoice-row.isSelected').length>0){var selectedRow=$jot(activeTable).select('.jfMatrixChoice-row.isSelected')[0];selectedRow.removeClassName('isSelected');}
var activeRow=findAncestor(this,'jfMatrixChoice-row');activeRow.addClassName('isSelected');setTimeout(function(){var nextButton=$jot(matrix).select('.forMatrixNext')[0];if($jot(nextButton).readAttribute('disabled')==null){$jot(nextButton).triggerEvent('click');}},500);$jot(this).observe('click',showNextQuestion);};input.observe('click',showNextQuestion);}});}}}},setRatingLayout:function(id){if(document.getElementById('stage')){return null;}
if(typeof CardForm==="object"&&CardForm.layoutParams&&CardForm.layoutParams.hasTouch===false){JotForm.setRatingClickTransfer(id);}
var rating=document.getElementById('rating_'+id);var ratingHiddenInput=$jot(rating).select('.jfRating-shortcut-input')[0];var ratingItems=$jot(rating).select('.jfRating-items')[0];var ratingInputs=$jot(rating).select('.jfRating-input');var ratingBefore=null;if(!JotForm['ratingFnQueues']){JotForm['ratingFnQueues']=[];}
JotForm['ratingFnQueues']['fnQueue_'+id]=[];ratingItems.addEventListener('click',function(evt){if(typeof CardForm==="object"&&CardForm.layoutParams&&CardForm.layoutParams.hasTouch===false){ratingHiddenInput&&ratingHiddenInput.focus();}});ratingHiddenInput.addEventListener('keyup',function(evt){var value=this.value;if(value){if($jot(rating).select('.jfRating-input:checked').length){var ratingBefore=$jot(rating).select('.jfRating-input:checked')[0].value;}
if(value==="-"){value=parseInt(ratingBefore)-1;}
if(value==="+"){value=parseInt(ratingBefore)+1;}
value=value.toString();var ratingTargetInput=$jot(rating).select('.jfRating-input[value='+value+']')[0];if(ratingTargetInput){ratingTargetInput.checked='checked';JotForm.setRatingItemsChecked(id,value,ratingBefore);}}
this.value='';});ratingInputs.each(function(ratingInput){ratingInput.addEventListener('mouseenter',function(){$jot(this).up('.jfRating-item').addClassName('indicate');var ratingItemEach=$jot(rating).select('.jfRating-items .jfRating-item.jfRating-selection');ratingItemEach.each(function(ratingItem){if($jot(ratingItem).hasClassName('indicate')){throw $jotbreak;}else{$jot(ratingItem).addClassName('indicate');}});});ratingInput.addEventListener('mouseleave',function(){ratingInputs.each(function(ratingInput){ratingInput.up('.jfRating-item').removeClassName('indicate');});});ratingInput.addEventListener('change',function(){JotForm.setRatingItemsChecked(id,this.value);});})},setRatingItemsChecked:function(id,value,ratingBefore){if(!JotForm['ratingFnQueues']){JotForm['ratingFnQueues']=[];}
if(!JotForm['ratingFnQueues']['fnQueue_'+id]){JotForm['ratingFnQueues']['fnQueue_'+id]=[];}
var rating=document.getElementById('rating_'+id);var ratingSelection=$jot(rating).select('.jfRating-selection');var selectedValue=!isNaN(value)&&parseInt(value);var ratingBefore=!isNaN(ratingBefore)&&parseInt(ratingBefore)||null;var ratingInputs=$jot(rating).select('.jfRating-input');var stack=JotForm['ratingFnQueues']['fnQueue_'+id];var timer=null;var queueProcessInterval=33;if(!ratingBefore&&rating.dataset.oldValue){ratingBefore=rating.dataset.oldValue;}
rating.dataset.oldValue=value;var queueProcessor={enqueue:function(fnCall){stack.push(fnCall);if(timer===null){timer=setInterval(function(){queueProcessor.processQueue();},queueProcessInterval);}},processQueue:function(){typeof stack[0]==='function'&&stack[0]();stack.shift();if(stack.length===0){clearInterval(timer);timer=null;}}}
ratingInputs.each(function(ratingInput){ratingInput.up('.jfRating-item').removeClassName('indicate');});if(ratingBefore<value||ratingBefore===null){ratingSelection.each(function(ratingItem,key){if(ratingItem.dataset){var itemValue=ratingItem.dataset.value;if(itemValue){queueProcessor.enqueue(function(){ratingItem.classList.add('checked');});if(itemValue===this.value){throw $jotbreak;}}}},{value:value});}
if(ratingBefore&&ratingBefore>value){ratingSelection.reverse();ratingSelection.each(function(ratingItem,key){if(ratingItem.dataset){var itemValue=ratingItem.dataset.value;if(itemValue){if(itemValue===this.value){throw $jotbreak;}
queueProcessor.enqueue(function(){ratingItem.classList.remove('checked');});}}},{value:value});}
$jot('input_'+id).value=value;var hiddenInput=rating.select('.form-textbox')[0];hiddenInput.value=parseInt(value,10);JotForm.runConditionForId(id.toString());},setRatingClickTransfer:function(id){document.body.addEventListener('click',function(){var eventTarget=document.querySelector('.jfCard-wrapper.isVisible #rating_'+id+' input');eventTarget&&eventTarget.focus();});},toggleImageOverlay:function(id,src){var imgWrapper=document.getElementById("id_"+id);var btn=imgWrapper.select('.js-openNewTab')[0];var closeBtn=document.querySelector('.jfOverlay-close');var overlayWrapper=document.querySelectorAll('.js-overlayWrapper')[0];var toggleOverlay=function(isVisible){var overlayImg=overlayWrapper.select('.js-overlayImage')[0];overlayImg.src=!isVisible?src:'';if(!isVisible){overlayWrapper.addClassName('isVisible');}else{overlayWrapper.removeClassName('isVisible');}}
$jot(btn).observe('click',function(e){e.stop();toggleOverlay(false);});$jot(closeBtn).observe('click',function(e){toggleOverlay(true);});$jot(overlayWrapper).observe('click',function(e){e.stop();if(!$jot(e.target).hasClassName('js-overlayImage')){toggleOverlay(true);}})},getScrollbarWidth:function(matrix){var outer=document.createElement("div");outer.style.visibility="hidden";outer.style.width="100px";outer.style.msOverflowStyle="scrollbar";matrix.appendChild(outer);var widthNoScroll=outer.offsetWidth;outer.style.overflow="scroll";var inner=document.createElement("div");inner.style.width="100%";outer.appendChild(inner);var widthWithScroll=inner.offsetWidth;outer.parentNode.removeChild(outer);return widthNoScroll-widthWithScroll;},getOptionOtherInput:function(option){if(option){var parentWrapper=option.up('.form-'+option.type+'-item');if(parentWrapper){var otherSelector='.form-'+option.type+'-other-input';return parentWrapper.down(otherSelector);}}
return null;},setFullNameAutoFocus:function(id){var prefixDropdown=document.querySelectorAll('#prefix_'+id)[0];prefixDropdown.observe('change',function(){setTimeout(function(){var firstNameInput=document.querySelectorAll('#first_'+id)[0];firstNameInput.focus();},500);});},initPaymentNew:function(id,formProducts,currency){JotForm.paymentNewVars={};var qLine=document.querySelectorAll('#id_'+id)[0];var productWrapper=qLine.select('.js-product-wrapper')[0];var productModuleWrapper=qLine.select('.js-productModuleWrapper')[0];var products=qLine.select('.paymentCard-list li:not(.zeroOption)');var detailsWrapper=qLine.select('.details-page')[0];products.each(function(p,i){p.observe('click',function(item){productModuleWrapper.addClassName('animate');var productsOnPage=qLine.select('.paymentCard-list [data-page="'+p.getAttribute('data-page')+'"]');var pIndex=0;productsOnPage.each(function(prod,i){if(prod.getAttribute('data-pid')===p.getAttribute('data-pid'))pIndex=i;});var productHeight=p.getBoundingClientRect().height;var transform=(productHeight+16)*pIndex;p.addClassName('no-transfom');p.style.transform='translate(0, -'+transform+'px)';qLine.select('.jfQuestion-label')[0].style.opacity=0;var qDesc=qLine.select('.jfQuestion-description')[0];var qDescHeight=qDesc?qDesc.getBoundingClientRect().height:0;qDesc.hide();productWrapper.style['min-height']=productWrapper.getBoundingClientRect().height+qDescHeight;detailsWrapper.style.opacity=1;var detailsPages=detailsWrapper.select('.js-product-detail');detailsPages.each(function(page){if(page.getAttribute('data-product')!==p.getAttribute('data-pid')){page.style.opacity="0";page.style.zIndex="-1";page.removeClassName('js-activeDetail');}else{page.style.opacity="1";page.style.zIndex="1";page.addClassName('js-activeDetail');var productOptions=page.select('select, input');productOptions.each(function(opt){if(opt.getAttribute('id')!=='input_'+id+'_'+p.getAttribute('data-pid')){opt.observe('change',function(){var prodInput=page.select('#input_'+id+'_'+p.getAttribute('data-pid'))[0];var addButton=page.select('.js-add-to-bag')[0];if((prodInput&&prodInput.checked)&&!JotForm.isVisible(addButton)){addButton.hide();var removeButton=page.select('.js-remove-from-bag')[0];removeButton.hide();var updateButton=page.select('.js-update-bag')[0];updateButton.show();}});}});}});});});setTimeout(function(){var productList=qLine.select('.paymentCard-list')[0];var productListHeight=productList.getBoundingClientRect().height;productList.style['min-height']=productListHeight<188?'188px':productListHeight+'px';var questionCard=qLine.select('.jfCard-question')[0];questionCard.style['min-height']=questionCard.getBoundingClientRect().height+'px';var qDesc=qLine.select('.jfQuestion-description')[0];var qDescHeight=qDesc?qDesc.getBoundingClientRect().height:0;var scrolls=qLine.select('.js-scroll');scrolls.each(function(s){s.style['height']=(productList.getBoundingClientRect().height+16-90+qDescHeight)+'px';});var qLabel=qLine.select('.jfQuestion-label')[0];var qLabelHeigth=qLabel.getBoundingClientRect().height;var detailsHeader=qLine.select('.js-header-wrapper')[0];if(detailsHeader)detailsHeader.style.height=qLabelHeigth+'px';productModuleWrapper.style.minHeight=getComputedStyle(productModuleWrapper).height;},0);var backToProduct=function(fromCart){qLine.select('.jfQuestion-label')[0].style.opacity=1;productModuleWrapper.removeClassName('animate');qLine.select('.details-page')[0].style.opacity=0;if(fromCart)productWrapper.show();var productRows=qLine.select('.paymentCard-list li:not(.zeroOption)');productRows.each(function(p){p.style.transform=null;p.removeClassName('no-transfom');});var qDesc=qLine.select('.jfQuestion-description')[0];var qDescHeight=qDesc?qDesc.getBoundingClientRect().height:0;qDesc.show();productWrapper.style['min-height']=null;}
var productIDs=function(){return Object.keys(JotForm.prices).map(function(p){var splittedKey=p.split('_');if(splittedKey.length===3){return p;}else if(splittedKey.length===4){splittedKey.pop();return splittedKey.join('_');}}).reduce(function(acc,curr){if(acc.indexOf(curr)===-1)acc.push(curr);return acc;},[]);}
var updateCartItems=function(){var totalItems=0;var products=productIDs();products.forEach(function(p){var inpt=$jot(p);if(inpt.checked)totalItems++;});var shoppingBagButton=qLine.select('.paymentCard-shoppingButton')[0];if(shoppingBagButton){if(totalItems>0){shoppingBagButton.removeClassName('disabled');}else{shoppingBagButton.addClassName('disabled');}
shoppingBagButton.innerText=totalItems+' items in your bag';var summaryPageHeadr=qLine.select('.paymentCardSummary-subheader-itemCount')[0];summaryPageHeadr.innerText=totalItems+' items in your bag';}}
var inputSelectors=function(){return productIDs().reduce(function(acc,curr){if(acc!=='')acc+=', ';acc+='[id="'+curr+'"]';return acc;},"");}
var backButton=qLine.select('.js-back-to-product')[0];backButton.observe('click',function(){var activeDetailPage=document.querySelectorAll('.js-activeDetail')[0];updateCartItems();backToProduct();});var detailPages=document.querySelectorAll('.js-product-detail');detailPages.each(function(detailPage){var addToBagButton=detailPage.select('.js-add-to-bag')[0];addToBagButton.observe('click',function(){var activeDetailPage=qLine.select('.js-activeDetail')[0];var input=activeDetailPage.querySelector(inputSelectors());input.checked=true;input.triggerEvent('click');var activeProductID=activeDetailPage.getAttribute('data-product');var productRow=qLine.select('.paymentCard-listItem[data-pid="'+activeProductID+'"]')[0];productRow.addClassName('selected');productRow.addClassName('with-edit-option');var viewButton=productRow.select('.cta')[0];viewButton.innerText='Edit';this.hide();var removeButton=activeDetailPage.select('.js-remove-from-bag')[0];removeButton.show();updateCartItems();backToProduct();});var removeFromBagButton=detailPage.select('.js-remove-from-bag')[0];removeFromBagButton.observe('click',function(){var activeDetailPage=qLine.select('.js-activeDetail')[0];var input=activeDetailPage.querySelector(inputSelectors());input.checked=false;input.triggerEvent('click');var activeProductID=activeDetailPage.getAttribute('data-product');var productRow=qLine.select('.paymentCard-listItem[data-pid="'+activeProductID+'"]')[0];productRow.removeClassName('selected');productRow.removeClassName('with-edit-option');var viewButton=productRow.select('.cta')[0];viewButton.innerText='View';this.hide();var addButton=activeDetailPage.select('.js-add-to-bag')[0];addButton.show();updateCartItems();backToProduct();});var updateButton=detailPage.select('.js-update-bag')[0];updateButton.observe('click',function(){var activeDetailPage=qLine.select('.js-activeDetail')[0];var input=activeDetailPage.querySelector(inputSelectors());input.checked=true;input.triggerEvent('click');var activeProductID=activeDetailPage.getAttribute('data-product');var productRow=qLine.select('.paymentCard-listItem[data-pid="'+activeProductID+'"]')[0];productRow.addClassName('selected');this.hide();var removeButton=activeDetailPage.select('.js-remove-from-bag')[0];removeButton.show();updateCartItems();backToProduct();});});var cartButton=qLine.select('.paymentCard-shoppingButton')[0];if(cartButton){cartButton.observe('click',function(){if(!cartButton.hasClassName('disabled')){qLine.select('.jfQuestion-label')[0].style.opacity=0;qLine.select('.jfQuestion-description')[0].hide();productWrapper.hide();document.querySelectorAll('.paymentCardDetail-header-wrapper')[0].hide();arrangeSummaryPage();qLine.select('.summary-page')[0].style.opacity=1;qLine.select('.summary-page')[0].style.top=0;}});}
var backToProductFromSummaryClick=function(){qLine.select('.jfQuestion-label')[0].style.opacity=1;qLine.select('.summary-page')[0].style.opacity=0;qLine.select('.summary-page')[0].style.top='20%';document.querySelectorAll('.paymentCardDetail-header-wrapper')[0].show();backToProduct(true);}
var backToProductFromSummary=qLine.select('.paymentCardSummary-header')[0];backToProductFromSummary.observe('click',backToProductFromSummaryClick);this.initPaymentNewPagination(qLine);this.initAddButtonsFromList(productWrapper,updateCartItems);arrangeSummaryPage=function(){var summaryPage=document.querySelector('.summary-page');var summaryPageList=summaryPage.querySelector('.js-paymentCardSummary-list');summaryPageList.innerHTML='';var curr=function(){var curr_display='';switch(currency){case'TRY':curr_display='TL';break;case'USD':curr_display='$jot';break;default:curr_display='$jot';break;}
return curr_display;}
products=productIDs();products.forEach(function(p){var inpt=$jot(p);if(inpt.checked){var pid=p.split('_');pid=pid[2];var pName="";formProducts.each(function(prod){if(prod.pid===pid){pName=prod.name;}});var price=JotForm.prices[p]?JotForm.prices[p].price:0;var hasQuantityField=JotForm.prices[p]&&JotForm.prices[p].quantityField;var quantityValue=hasQuantityField?document.querySelector('#'+JotForm.prices[p].quantityField).value:1;var listItem=document.createElement('li');listItem.setAttribute('class','paymentCardSummary-listItem cf');var productName=document.createElement('div');productName.setAttribute('class','itemName');productName.innerHTML=quantityValue+' x '+pName;var productPrice=document.createElement('div');productPrice.setAttribute('class','itemPrice');productPrice.innerHTML=curr()+' '+price*quantityValue;if(JotForm.prices[p]&&Object.keys(JotForm.prices[p]).length>1){var editButton=document.createElement('button');editButton.setAttribute('type','button');editButton.setAttribute('class','itemCta');editButton.innerHTML='EDIT';editButton.setAttribute('data-id',p);var editButtonClick=function(){var inputId=this.getAttribute('data-id');backToProductFromSummaryClick();var productsListItems=document.querySelectorAll('.paymentCard-listItem');var productIndex=0;productsListItems.forEach(function(p,i){var pInputId=p.getAttribute('data-input');if(pInputId===inputId)productIndex=i;});var pageIndex=Math.ceil((productIndex+1)/JotForm.paymentNewVars.productsPerPage);document.querySelector('.paymentCard-paginationListItem[data-page="'+pageIndex+'"]').click();setTimeout(function(){document.querySelector('.paymentCard-listItem[data-input="'+inputId+'"]').click()},0);}
editButton.addEventListener('click',editButtonClick);}
var removeButton=document.createElement('button');removeButton.setAttribute('type','button');removeButton.setAttribute('class','itemCta');removeButton.innerHTML='REMOVE';removeButton.setAttribute('data-id',p);removeButton.addEventListener('click',function(){var i=document.querySelectorAll('.js-productModuleWrapper')[0].select('#'+p)[0];i.checked=false;i.triggerEvent('click');if(i.up('.paymentCard-listItem')){i.up('.paymentCard-listItem').removeClassName('selected');var tt=i.up('.paymentCard-listItem').down('.js-addProductFromList');tt.removeClassName('js-remove');tt.textContent=tt.getAttribute('data-text');}
setTimeout(function(){updateCartItems();this.up('.paymentCardSummary-list').removeChild(this.up('.paymentCardSummary-listItem'));var totalSpan=document.querySelector('.form-payment-total.form-payment-label').cloneNode(true);var changedTotalSpan=document.querySelector('.js-paymentCardSummary-footer');summaryPage.insertBefore(totalSpan,changedTotalSpan);summaryPage.removeChild(changedTotalSpan);totalSpan.setAttribute('class','paymentCardSummary-footer js-paymentCardSummary-footer');}.bind(this),0)});listItem.appendChild(productName);if(editButton)listItem.appendChild(editButton);listItem.appendChild(removeButton);listItem.appendChild(productPrice);summaryPageList.appendChild(listItem);}});var totalSpan=document.querySelector('.form-payment-total.form-payment-label').cloneNode(true);var changedTotalSpan=document.querySelector('.js-paymentCardSummary-footer');summaryPage.insertBefore(totalSpan,changedTotalSpan);summaryPage.removeChild(changedTotalSpan);totalSpan.setAttribute('class','paymentCardSummary-footer js-paymentCardSummary-footer');};},initAddButtonsFromList:function(wrapper,updateCartItems){var addButtons=wrapper.querySelectorAll('.js-addProductFromList');addButtons.forEach(function(button){var buttonWrapper=button.up('.paymentCard-listItemDiv');buttonWrapper.addEventListener('click',function(e){e.stopPropagation();var product=button.up('.paymentCard-listItem');var input=product.down('[name="'+button.getAttribute('data-name')+'"]')
if(input.checked){input.checked=false;button.textContent=button.getAttribute('data-text');button.setAttribute('class','cta js-addProductFromList');product.removeClassName('selected');}else{input.checked=true;if(input.type==='radio'){var allProducts=document.querySelectorAll('.paymentCard-listItem');allProducts.forEach(function(pro){pro.removeClassName('selected');pro.down('.js-addProductFromList').textContent=button.getAttribute('data-text');pro.down('.js-addProductFromList').setAttribute('class','cta js-addProductFromList');});}
button.textContent="Remove";button.setAttribute('class','cta js-addProductFromList js-remove');product.addClassName('selected');}
var footer=wrapper.select('.paymentCard-footer-wrapper')[0];footer.addClassName('prrrrr');setTimeout(function(){footer.removeClassName('prrrrr');},350);input.triggerEvent('click');updateCartItems();});})},initPaymentNewPagination:function(qLine){var productWrapper=qLine.select('.js-productModuleWrapper')[0];var productWrapperHeight=productWrapper.getBoundingClientRect().height;var paginationWrapper=qLine.select('.paymentCard-pagination')[0];var productRow=qLine.select('.paymentCard-listItem')[0];var productHeight=Math.floor(productRow.getBoundingClientRect().height);var paginationHeight=paginationWrapper.getBoundingClientRect().height;var footerHeight=73;var availableSpace=productWrapperHeight-(paginationHeight+footerHeight)-32-16-1;JotForm.paymentNewVars.productsPerPage=parseInt(availableSpace/productHeight,10)||1;JotForm.paymentNewVars.productsPerPage=JotForm.paymentNewVars.productsPerPage>4?4:JotForm.paymentNewVars.productsPerPage;var products=qLine.select('.paymentCard-listItem');if(JotForm.paymentNewVars.productsPerPage>=products.length){paginationWrapper.style.opacity=0;products.each(function(p,i){p.setAttribute('data-page',Math.ceil((i+1)/JotForm.paymentNewVars.productsPerPage));});}else{products.each(function(p,i){p.setAttribute('data-page',Math.ceil((i+1)/JotForm.paymentNewVars.productsPerPage));if(i+1>JotForm.paymentNewVars.productsPerPage)
p.hide();});var pageWrapper=qLine.select('.paymentCard-paginationList')[0];var totalPage=Math.ceil(products.length/JotForm.paymentNewVars.productsPerPage);var updateProductList=function(activePage){for(var i=0;i<products.length;i++){if(i<(activePage-1)*JotForm.paymentNewVars.productsPerPage||(i+1)>(activePage*JotForm.paymentNewVars.productsPerPage)){products[i].hide();}else{products[i].show();}}};var previousPageButton=qLine.select('.paymentCard-paginationLeft')[0];var nextPageButton=qLine.select('.paymentCard-paginationRight')[0];for(var i=0;i<totalPage;i++){var pageItem=document.createElement('li');pageItem.className=i===0?'paymentCard-paginationListItem active':'paymentCard-paginationListItem';pageItem.setAttribute('data-page',i+1);var pageButton=document.createElement('button');pageButton.setAttribute('type','button');pageButton.innerText=i+1;pageItem.observe('click',function(){var pages=pageWrapper.select('.paymentCard-paginationListItem');pages.each(function(p){p.removeClassName('active');});this.addClassName('active');var activePage=parseInt(this.getAttribute('data-page'),10);if(activePage===1){previousPageButton.addClassName('disabled');previousPageButton.setAttribute('disabled','disabled');nextPageButton.removeClassName('disabled');nextPageButton.removeAttribute('disabled');}else if(activePage===totalPage){previousPageButton.removeClassName('disabled');previousPageButton.removeAttribute('disabled');nextPageButton.addClassName('disabled');nextPageButton.setAttribute('disabled','disabled');}else{previousPageButton.removeClassName('disabled');previousPageButton.removeAttribute('disabled');nextPageButton.removeClassName('disabled');nextPageButton.removeAttribute('disabled');}
updateProductList(this.getAttribute('data-page'));});pageItem.appendChild(pageButton);pageWrapper.appendChild(pageItem);}
previousPageButton.observe('click',function(){var activePageButton=pageWrapper.select('.paymentCard-paginationListItem.active')[0];var activePage=parseInt(activePageButton.getAttribute('data-page'),10);var targetButton=document.querySelectorAll('.paymentCard-paginationListItem[data-page='+(activePage-1)+']')[0];if(targetButton)targetButton.addClassName('active');activePageButton.removeClassName('active');nextPageButton.removeClassName('disabled');nextPageButton.removeAttribute('disabled');updateProductList(activePage-1);if(activePage-1<=1){previousPageButton.addClassName('disabled');previousPageButton.setAttribute('disabled','disabled');}});nextPageButton.observe('click',function(){var activePageButton=pageWrapper.select('.paymentCard-paginationListItem.active')[0];var activePage=parseInt(activePageButton.getAttribute('data-page'),10);var targetButton=qLine.select('.paymentCard-paginationListItem[data-page="'+(activePage+1)+'"]')[0];if(targetButton)targetButton.addClassName('active');activePageButton.removeClassName('active');previousPageButton.removeClassName('disabled');previousPageButton.removeAttribute('disabled');updateProductList(activePage+1);if(activePage+1>=totalPage){nextPageButton.addClassName('disabled');nextPageButton.setAttribute('disabled','disabled');}});}}};function getQuerystring(key,default_){if(default_==null)default_="";key=key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regex=new RegExp("[\\?&]"+key+"=([^&#]*)");var qs=regex.exec(window.location.href);if(qs==null)
return default_;else
return qs[1];}
function onProductImageClicked(index){if(!document.getElementById('payment_enable_lightbox'))return;var imageUrls;if(window.getAllProperties&&window.getAllProperties().form_products){imageUrls=window.getAllProperties().form_products.map(function(p){return p.icon}).filter(function(p){return p});}else if(document.querySelectorAll){imageUrls=Array.prototype.map.call(document.querySelectorAll('.form-product-item img'),function(p){return p.src});}
if(!imageUrls||!imageUrls.length)return;var divOverlay=document.createElement('div');var divOverlayContent=document.createElement('div');var divImgWrapper=document.createElement('div');divOverlay.id='productImageOverlay';divOverlay.className='overlay';divOverlay.tabIndex=-1;divOverlayContent.className='overlay-content';divImgWrapper.className='img-wrapper';divOverlay.appendChild(divOverlayContent);divOverlayContent.appendChild(divImgWrapper);var prevButton=document.createElement('span');var nextButton=document.createElement('span');var closeButton=document.createElement('span');prevButton.innerText='prev';nextButton.innerText='next';closeButton.innerText='( X )';prevButton.className='lb-prev-button';nextButton.className='lb-next-button';closeButton.className='lb-close-button';divOverlayContent.appendChild(prevButton);divOverlayContent.appendChild(nextButton);divOverlayContent.appendChild(closeButton);var images=imageUrls.map(function(url){var img=document.createElement('img');img.style.display='none';img.src=url;return img;});images[index].style.display='block';images.forEach(function(p){divImgWrapper.appendChild(p);});var visibleIndex=index;var imgLength=images.length;var displayPrevious=function(){images[visibleIndex].style.display='none';visibleIndex-=1;if(visibleIndex==-1)visibleIndex=imgLength-1;images[visibleIndex].style.display='block';arrangeImageSize();}
prevButton.onclick=displayPrevious;var displayNext=function(){images[visibleIndex].style.display='none';visibleIndex+=1;if(visibleIndex==imgLength)visibleIndex=0;images[visibleIndex].style.display='block';arrangeImageSize();}
nextButton.onclick=displayNext;divOverlayContent.onclick=function(e){e.stopPropagation();}
var close=function(){window.onresize=null;divOverlay.remove();}
closeButton.onclick=close;divOverlay.onclick=close;var arrangeImageSize=function(){var width=window.innerWidth;var height=window.innerHeight;var maxSize=(Math.min(width,height)*0.75)+'px';var size=width<height?{maxWidth:maxSize,height:'auto',width:'auto',maxHeight:'none'}:{width:'auto',maxHeight:maxSize,height:'auto',maxWidth:'none'};divOverlayContent.style.maxWidth=size.maxWidth;divOverlayContent.style.maxHeight=size.maxHeight;divOverlayContent.style.width=size.width;divOverlayContent.style.height=size.height;images[visibleIndex].style.maxHeight=size.maxHeight;images[visibleIndex].style.maxWidth=size.maxWidth;images[visibleIndex].style.width=size.width;images[visibleIndex].style.height=size.height;}
var resizeCallback=function(e){arrangeImageSize();}
window.onresize=resizeCallback;divOverlay.onkeydown=function(e){e.stopPropagation();e.preventDefault();if(e.keyCode==37||e.keyCode==38){displayPrevious();}else if(e.keyCode==39||e.keyCode==40){displayNext();}else if(e.keyCode==27){divOverlay.remove();}}
document.body.appendChild(divOverlay);divOverlay.focus();arrangeImageSize();}
window.fbAsyncInit=JotForm.FBInit.bind(JotForm);;var Calendar=Class.create();Calendar.VERSION='1.2';Calendar.DAY_NAMES=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];Calendar.SHORT_DAY_NAMES=['S','M','T','W','T','F','S','S'];Calendar.MONTH_NAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];Calendar.TODAY="Today";Calendar.SHORT_MONTH_NAMES=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];Calendar.NAV_PREVIOUS_YEAR=-2;Calendar.NAV_PREVIOUS_MONTH=-1;Calendar.NAV_TODAY=0;Calendar.NAV_NEXT_MONTH=1;Calendar.NAV_NEXT_YEAR=2;Calendar._checkCalendar=function(event){if(!window._popupCalendar){return false;}
if(Element.descendantOf(Event.element(event),window._popupCalendar.container)){return;}
window._popupCalendar.callCloseHandler();return Event.stop(event);};Calendar.handleMouseDownEvent=function(event)
{Event.observe(document,'mouseup',Calendar.handleMouseUpEvent);Event.stop(event);};Calendar.handleMouseUpEvent=function(event)
{var el=Event.element(event);var calendar=el.calendar;var isNewDate=false;if(!calendar){return false;}
calendar.shouldClose=false;if(el.hasClassName("unselectable")){return false;}
if(typeof el.navAction=='undefined')
{if(calendar.currentDateElement){Element.removeClassName(calendar.currentDateElement,'selected');Element.addClassName(el,'selected');calendar.shouldClose=(calendar.currentDateElement==el);if(!calendar.shouldClose){calendar.currentDateElement=el;}}
calendar.date.setDateOnly(el.date);isNewDate=true;calendar.shouldClose=!el.hasClassName('otherDay');var isOtherMonth=!calendar.shouldClose;if(isOtherMonth){calendar.update(calendar.date);}}
else
{var date=new Date(calendar.date);if(el.navAction==Calendar.NAV_TODAY){date.setDateOnly(new Date());}
var year=date.getFullYear();var mon=date.getMonth();function setMonth(m){var day=date.getDate();var max=date.getMonthDays(m);if(day>max){date.setDate(max);}
date.setMonth(m);}
switch(el.navAction){case Calendar.NAV_PREVIOUS_YEAR:if(year>calendar.minYear){date.setFullYear(year-1);}
break;case Calendar.NAV_PREVIOUS_MONTH:if(mon>0){setMonth(mon-1);}
else if(year-->calendar.minYear){date.setFullYear(year);setMonth(11);}
break;case Calendar.NAV_TODAY:break;case Calendar.NAV_NEXT_MONTH:if(mon<11){setMonth(mon+1);}
else if(year<calendar.maxYear){date.setFullYear(year+1);setMonth(0);}
break;case Calendar.NAV_NEXT_YEAR:if(year<calendar.maxYear){date.setFullYear(year+1);}
break;}
if(!date.equalsTo(calendar.date)){calendar.setDate(date);isNewDate=true;}else if(el.navAction===0){isNewDate=(calendar.shouldClose=true);}
calendar.checkPastAndFuture();}
if(isNewDate){event&&calendar.callSelectHandler();}
if(calendar.shouldClose){event&&calendar.callCloseHandler();}
Event.stopObserving(document,'mouseup',Calendar.handleMouseUpEvent);return Event.stop(event);};Calendar.defaultSelectHandler=function(calendar)
{if(!calendar.dateField){return false;}
if(calendar.dateField.tagName=='DIV'){Element.update(calendar.dateField,calendar.date.print(calendar.dateFormat));}else if(calendar.dateField.tagName=='INPUT'){calendar.dateField.value=calendar.date.print(calendar.dateFormat);}
if(typeof calendar.dateField.onchange=='function'){calendar.dateField.onchange();}
if(calendar.shouldClose){calendar.callCloseHandler();}};Calendar.defaultCloseHandler=function(calendar)
{calendar.hide();};Calendar.setup=function(params)
{function param_default(name,def){if(!params[name]){params[name]=def;}}
param_default('dateField',null);param_default('triggerElement',null);param_default('parentElement',null);param_default('selectHandler',null);param_default('closeHandler',null);if(params.parentElement)
{var calendar=new Calendar(params.parentElement);calendar.setSelectHandler(params.selectHandler||Calendar.defaultSelectHandler);if(params.dateFormat){calendar.setDateFormat(params.dateFormat);}
if(params.dateField){calendar.setDateField(params.dateField);calendar.parseDate(calendar.dateField.innerHTML||calendar.dateField.value);}
calendar.limits=params.limits;if(calendar.limits){calendar.fixCustomLimits();calendar.setDynamicLimits();calendar.update(calendar.date);calendar.checkPastAndFuture();}
calendar.show();return calendar;}
else
{var triggerElement=$jot(params.triggerElement||params.dateField);var calendar=new Calendar();calendar.limits=params.limits;if(calendar.limits){calendar.fixCustomLimits();calendar.setDynamicLimits();}
calendar.setSelectHandler(params.selectHandler||Calendar.defaultSelectHandler);calendar.setCloseHandler(params.closeHandler||Calendar.defaultCloseHandler);calendar.startOnMonday=params.startOnMonday;if(params.dateFormat){calendar.setDateFormat(params.dateFormat);}
if(params.dateField){calendar.setDateField(params.dateField);calendar.parseDate(calendar.dateField.innerHTML||calendar.dateField.value);}
if(params.dateField){Date.parseDate(calendar.dateField.value||calendar.dateField.innerHTML,calendar.dateFormat);}
triggerElement.onclick=function(){if(calendar.dateField&&calendar.dateField.disabled){return false;}
calendar.showAtElement(triggerElement);return calendar;};try{var getDateFromField=function(){if(calendar.dateField.id){var id=calendar.dateField.id.replace("year_","");if(!$jot('month_'+id))return new Date();if(id){calendar.id=id;}
var month=$jot('month_'+id)?parseInt($jot('month_'+id).value)-1:-1;var day=$jot('day_'+id).value;var year=$jot('year_'+id).value;if(month>-1&&day&&day!==""&&year&&year!==""){var dat=new Date(year,month,day,0,0,0);if(!calendar.date.equalsTo(dat)){calendar.date=dat;calendar.update(calendar.date);}}}}
getDateFromField();calendar.dateField.up("li").observe("date:changed",function(){getDateFromField();});}catch(e){console.log(e);}
if(calendar.limits){calendar.update(calendar.date);calendar.checkPastAndFuture();}
if(calendar.startOnMonday){calendar.update(calendar.date);calendar.create();}
return calendar;}};Calendar.prototype={container:null,selectHandler:null,closeHandler:null,id:null,minYear:1900,maxYear:2100,dateFormat:'%Y-%m-%d',date:new Date(),currentDateElement:null,shouldClose:false,isPopup:true,dateField:null,startOnMonday:false,initialize:function(parent)
{if(parent){this.create($jot(parent));}
else{this.create();}},fixCustomLimits:function(){var fixDate=function(date){if(date.indexOf('today')>-1){return date;}
var arr=date.toString().split("-");date="";if(arr.length>2){date+=(arr[0].length===2?"20"+arr[0]:arr[0])+"-";}
if(arr.length>1){date+=JotForm.addZeros(arr[arr.length-2],2)+"-";}
date+=JotForm.addZeros(arr[arr.length-1],2);return date;}
var lim=this.limits;if("custom"in lim&&lim.custom!==false&&lim.custom instanceof Array){for(var i=0;i<lim.custom.length;i++){if(!lim.custom[i])continue;lim.custom[i]=fixDate(lim.custom[i]);}}
if("ranges"in lim&&lim.ranges!==false&&lim.ranges instanceof Array){for(var i=0;i<lim.ranges.length;i++){if(!lim.ranges[i]||lim.ranges[i].indexOf(">")===-1)continue;var range=lim.ranges[i].split(">");var start=fixDate(range[0]);var end=fixDate(range[1]);lim.ranges[i]=start+">"+end;}}},setDynamicLimits:function(){var getComparativeDate=function(dat){if(dat.indexOf('today')>-1){var comp=new Date();var offset=parseInt(dat.replace(/\s/g,"").split('today')[1])||0;comp.setDate(comp.getDate()+offset);return comp.getFullYear()+"-"+JotForm.addZeros(comp.getMonth()+1,2)+"-"+JotForm.addZeros(comp.getDate(),2);}else{return dat;}}
var lim=this.limits
lim.start=getComparativeDate(lim.start);lim.end=getComparativeDate(lim.end);if("custom"in lim&&lim.custom!==false&&lim.custom instanceof Array){for(var i=0;i<lim.custom.length;i++){if(!lim.custom[i])continue;lim.custom[i]=getComparativeDate(lim.custom[i]);}}
if("ranges"in lim&&lim.ranges!==false&&lim.ranges instanceof Array){for(var i=0;i<lim.ranges.length;i++){if(!lim.ranges[i]||lim.ranges[i].indexOf(">")===-1)continue;var range=lim.ranges[i].split(">");start=getComparativeDate(range[0]);end=getComparativeDate(range[1]);lim.ranges[i]=start+">"+end;}}},update:function(date)
{var calendar=this;var today=new Date();var thisYear=today.getFullYear();var thisMonth=today.getMonth();var thisDay=today.getDate();var month=date.getMonth();var dayOfMonth=date.getDate();if(date.getFullYear()<this.minYear){date.setFullYear(this.minYear);}
else if(date.getFullYear()>this.maxYear){date.setFullYear(this.maxYear);}
this.date=new Date(date);date.setDate(1);if(calendar.startOnMonday){date.setDate(-(date.getDay())-5);}else{date.setDate(-(date.getDay())+1);}
if(this.id){this.container.setAttribute('id','calendar_'+this.id);}
Element.getElementsBySelector(this.container,'tbody tr').each(function(row,i){var rowHasDays=false;row.immediateDescendants().each(function(cell,j){var day=date.getDate();var dayOfWeek=date.getDay();var isCurrentMonth=(date.getMonth()==month);cell.className='';cell.date=new Date(date);cell.update(day);if(!isCurrentMonth){cell.addClassName('otherDay');}
else{rowHasDays=true;}
if(isCurrentMonth&&day==dayOfMonth){cell.addClassName('selected');calendar.currentDateElement=cell;}
var allDays=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];var makeUnselectable=function(){if(date.getFullYear()==thisYear&&date.getMonth()==thisMonth&&day==thisDay&&document.querySelectorAll('.todayButton').length>0){document.querySelectorAll('.todayButton').first().setStyle({color:"white"});document.querySelectorAll('.todayButton').first().addClassName("unselectable");}
cell.setOpacity(0.5);cell.addClassName("unselectable");};var makeSelectable=function(){cell.setOpacity(1);cell.removeClassName("unselectable");};if(calendar.limits){var lim=calendar.limits;makeSelectable();if(allDays[i]in lim.days&&lim.days[allDays[dayOfWeek]]==false){makeUnselectable();}
if("future"in lim&&lim.future===false){var now=new Date();if(date>now){makeUnselectable();}}
if("past"in lim&&lim.past===false){var now=new Date();var yesterday=new Date();yesterday.setDate(now.getDate()-1);if(date<yesterday){makeUnselectable();}}
if("start"in lim&&lim.start!=false&&lim.start!=""){var startDate=false
if(lim.start.indexOf("{")>-1){startDate=JotForm.dateFromField(lim.start);}else{var start=lim.start.split("-");if(start.length==3){startDate=new Date(start[0],start[1]-1,start[2]);}}
if(date<startDate)makeUnselectable();}
if("end"in lim&&lim.end!=false&&lim.end!=""){var endDate;if(lim.end.indexOf("{")>-1){endDate=JotForm.dateFromField(lim.end);}else{var end=lim.end.split("-");if(end.length==3){var endDate=new Date(end[0],end[1]-1,end[2]);}}
if(endDate){var nextDay=new Date(endDate);nextDay.setDate(endDate.getDate()+1);if(date>=nextDay){makeUnselectable();}}}
if("custom"in lim&&lim.custom!==false&&lim.custom instanceof Array){for(var j=0;j<lim.custom.length;j++){if(!lim.custom[j])continue;var m=date.getMonth()+1;m=m<10?"0"+m:m;var d=day<10?"0"+day:day;if(lim.custom[j].indexOf("{")>-1){var custom=JotForm.dateFromField(lim.custom[j]);custom=JotForm.addZeros(custom.getFullYear(),2)+"-"+JotForm.addZeros(custom.getMonth()+1,2)+"-"+JotForm.addZeros(custom.getDate(),2);if(custom===date.getFullYear()+"-"+m+"-"+d)makeUnselectable();}
if((lim.custom[j]===date.getFullYear()+"-"+m+"-"+d)||(typeof lim.custom[j]=="string"&&lim.custom[j].length===5&&lim.custom[j]===(m+"-"+d))||(typeof lim.custom[j]=="string"&&lim.custom[j].length===2&&lim.custom[j]==d)){makeUnselectable();}}}
if("ranges"in lim&&lim.ranges!==false&&lim.ranges instanceof Array){for(var j=0;j<lim.ranges.length;j++){if(!lim.ranges[j]||lim.ranges[j].indexOf(">")===-1)continue;var range=lim.ranges[j].split(">");var start=range[0];var end=range[1];var startDate;if(start.indexOf("{")>-1){startDate=JotForm.dateFromField(start);}else{startDate=start.split("-");startDate=new Date(startDate[0],startDate[1]-1,startDate[2],0,0,0);}
var endDate;if(end.indexOf("{")>-1){endDate=JotForm.dateFromField(end);}else{endDate=end.split("-");endDate=new Date(endDate[0],endDate[1]-1,endDate[2],0,0,0);}
if(endDate){endDate.setDate(endDate.getDate()+1);if(date>=startDate&&date<endDate){makeUnselectable();}}}}}
if(date.getFullYear()==thisYear&&date.getMonth()==thisMonth&&day==thisDay){cell.addClassName('today');}
if([0,6].indexOf(dayOfWeek)!=-1){cell.addClassName('weekend');}
date.setDate(day+1);});rowHasDays?row.show():row.hide();});this.container.getElementsBySelector('td.title')[0].update(Calendar.MONTH_NAMES[month]+' '+this.date.getFullYear());},checkPastAndFuture:function(){var now=new Date();var thisYear=now.getFullYear();var thisMonth=now.getMonth();var selectedYear=this.date.getFullYear();var selectedMonth=this.date.getMonth();var unselectable=function(el){el.setStyle({color:"white"});el.addClassName("unselectable");}
var selectable=function(el){el.setStyle({color:"#f9621a"});el.removeClassName("unselectable");}
if(this.limits){if("future"in this.limits&&this.limits.future===false){if(selectedYear>=thisYear){unselectable(this.container.down(".nextYear"));}else{selectable(this.container.down(".nextYear"));}
if(selectedYear>=thisYear&&selectedMonth>=thisMonth){unselectable(this.container.down(".nextMonth"));}else{selectable(this.container.down(".nextMonth"));}}
if("past"in this.limits&&this.limits.past===false){if(selectedYear<=thisYear){unselectable(this.container.down(".previousYear"));}else{selectable(this.container.down(".previousYear"));}
if(selectedYear<=thisYear&&selectedMonth<=thisMonth){unselectable(this.container.down(".previousMonth"));}else{selectable(this.container.down(".previousMonth"));}}}},setNames:function(){Calendar.MONTH_NAMES=JotForm.calendarMonthsTranslated||JotForm.calendarMonths||Calendar.MONTH_NAMES;Calendar.DAY_NAMES=JotForm.calendarDaysTranslated||JotForm.calendarDays||Calendar.DAY_NAMES;for(var i=0;i<=7;i++){Calendar.SHORT_DAY_NAMES[i]=Calendar.DAY_NAMES[i].substring(0,1).toUpperCase();}
if(JotForm.calendarTodayTranslated){Calendar.TODAY=JotForm.calendarTodayTranslated;}else if(JotForm.calendarOther&&JotForm.calendarOther.today){Calendar.TODAY=JotForm.calendarOther.today;}},create:function(parent)
{this.setNames();if(!parent){parent=document.getElementsByTagName('body')[0];this.isPopup=true;}else{this.isPopup=false;}
var table=this.table?this.table.update(""):new Element('table');this.table=table;var thead=new Element('thead');table.appendChild(thead);var row=new Element('tr');var cell=new Element('td',{colSpan:7});cell.addClassName('title');row.appendChild(cell);thead.appendChild(row);row=new Element('tr');this._drawButtonCell(row,'&#x00ab;',1,Calendar.NAV_PREVIOUS_YEAR,"previousYear");this._drawButtonCell(row,'&#x2039;',1,Calendar.NAV_PREVIOUS_MONTH,"previousMonth");this._drawButtonCell(row,Calendar.TODAY,3,Calendar.NAV_TODAY,"todayButton");this._drawButtonCell(row,'&#x203a;',1,Calendar.NAV_NEXT_MONTH,"nextMonth");this._drawButtonCell(row,'&#x00bb;',1,Calendar.NAV_NEXT_YEAR,"nextYear");thead.appendChild(row);row=new Element('tr');var startDay=(this.startOnMonday)?1:0;var endDay=(this.startOnMonday)?7:6;for(var i=startDay;i<=endDay;++i){cell=new Element('th').update(Calendar.SHORT_DAY_NAMES[i]);if(i===0||i==6){cell.addClassName('weekend');}
row.appendChild(cell);}
thead.appendChild(row);var tbody=table.appendChild(new Element('tbody'));for(i=7;i>0;--i){row=tbody.appendChild(new Element('tr'));row.addClassName('days');for(var j=7;j>0;--j){cell=row.appendChild(new Element('td'));cell.calendar=this;}}
this.container=new Element('div');this.container.addClassName('calendar');if(this.isPopup){this.container.setStyle({position:'absolute',display:'none'});this.container.addClassName('popup');}
this.container.appendChild(table);this.update(this.date);Event.observe(this.container,'mousedown',Calendar.handleMouseDownEvent);parent.appendChild(this.container);},_drawButtonCell:function(parent,text,colSpan,navAction,extraClass)
{var cell=new Element('td');if(colSpan>1){cell.colSpan=colSpan;}
cell.className='button'+(extraClass?" "+extraClass:"");cell.calendar=this;cell.navAction=navAction;cell.innerHTML=text;cell.unselectable='on';parent.appendChild(cell);return cell;},callSelectHandler:function()
{if(this.selectHandler){this.selectHandler(this,this.date.print(this.dateFormat));}},callCloseHandler:function()
{if(this.closeHandler){this.closeHandler(this);}},show:function()
{this.container.show();if(this.isPopup){window._popupCalendar=this;Event.observe(document,'mousedown',Calendar._checkCalendar);}},showAt:function(x,y)
{this.show();this.container.setStyle({left:x+'px',top:y+'px'});},showAtElement:function(element)
{var firstElement=element.up('div').down('input');if(firstElement.up('div').visible()===false){firstElement=element;}
var firstPos=Position.cumulativeOffset(firstElement);var x=firstPos[0]+40;var y=firstPos[1]+100+firstElement.getHeight();if(element.id.match(/_pick$jot/)){var elPos=Position.cumulativeOffset(element);var elX=elPos[0]-140;if(elX>x)x=elX;y=elPos[1]+100+element.getHeight();}
this.showAt(x,y);},hide:function()
{if(this.isPopup){Event.stopObserving(document,'mousedown',Calendar._checkCalendar);}
this.container.hide();},parseDate:function(str,format)
{if(!format){format=this.dateFormat;}
this.setDate(Date.parseDate(str,format));},setSelectHandler:function(selectHandler)
{this.selectHandler=selectHandler;},setCloseHandler:function(closeHandler)
{this.closeHandler=closeHandler;},setDate:function(date)
{if(!date.equalsTo(this.date)){this.update(date);}},setDateFormat:function(format)
{this.dateFormat=format;},setDateField:function(field)
{this.dateField=$jot(field);},setRange:function(minYear,maxYear)
{this.minYear=minYear;this.maxYear=maxYear;}};window._popupCalendar=null;Date.DAYS_IN_MONTH=[31,28,31,30,31,30,31,31,30,31,30,31];Date.SECOND=1000;Date.MINUTE=60*Date.SECOND;Date.HOUR=60*Date.MINUTE;Date.DAY=24*Date.HOUR;Date.WEEK=7*Date.DAY;Date.parseDate=function(str,fmt){var today=new Date();var y=0;var m=-1;var d=0;var a=str.split(/\W+/);var b=fmt.match(/%./g);var i=0,j=0;var hr=0;var min=0;for(i=0;i<a.length;++i){if(!a[i]){continue;}
switch(b[i]){case"%d":case"%e":d=parseInt(a[i],10);break;case"%m":m=parseInt(a[i],10)-1;break;case"%Y":case"%y":y=parseInt(a[i],10);(y<100)&&(y+=(y>29)?1900:2000);break;case"%b":case"%B":for(j=0;j<12;++j){if(Calendar.MONTH_NAMES[j].substr(0,a[i].length).toLowerCase()==a[i].toLowerCase()){m=j;break;}}
break;case"%H":case"%I":case"%k":case"%l":hr=parseInt(a[i],10);break;case"%P":case"%p":if(/pm/i.test(a[i])&&hr<12){hr+=12;}
else if(/am/i.test(a[i])&&hr>=12){hr-=12;}
break;case"%M":min=parseInt(a[i],10);break;}}
if(isNaN(y)){y=today.getFullYear();}
if(isNaN(m)){m=today.getMonth();}
if(isNaN(d)){d=today.getDate();}
if(isNaN(hr)){hr=today.getHours();}
if(isNaN(min)){min=today.getMinutes();}
if(y!=0&&m!=-1&&d!=0){return new Date(y,m,d,hr,min,0);}
y=0;m=-1;d=0;for(i=0;i<a.length;++i){if(a[i].search(/[a-zA-Z]+/)!=-1){var t=-1;for(j=0;j<12;++j){if(Calendar.MONTH_NAMES[j].substr(0,a[i].length).toLowerCase()==a[i].toLowerCase()){t=j;break;}}
if(t!=-1){if(m!=-1){d=m+1;}
m=t;}}else if(parseInt(a[i],10)<=12&&m==-1){m=a[i]-1;}else if(parseInt(a[i],10)>31&&y==0){y=parseInt(a[i],10);(y<100)&&(y+=(y>29)?1900:2000);}else if(d==0){d=a[i];}}
if(y==0){y=today.getFullYear();}
if(m!=-1&&d!=0){return new Date(y,m,d,hr,min,0);}
return today;};Date.prototype.getMonthDays=function(month){var year=this.getFullYear();if(typeof month=="undefined"){month=this.getMonth();}
if(((0==(year%4))&&((0!=(year%100))||(0==(year%400))))&&month==1){return 29;}
else{return Date.DAYS_IN_MONTH[month];}};Date.prototype.getDayOfYear=function(){var now=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);var then=new Date(this.getFullYear(),0,0,0,0,0);var time=now-then;return Math.floor(time/Date.DAY);};Date.prototype.getWeekNumber=function(){var d=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);var DoW=d.getDay();d.setDate(d.getDate()-(DoW+6)%7+3);var ms=d.valueOf();d.setMonth(0);d.setDate(4);return Math.round((ms-d.valueOf())/(7*864e5))+1;};Date.prototype.equalsTo=function(date){return((this.getFullYear()==date.getFullYear())&&(this.getMonth()==date.getMonth())&&(this.getDate()==date.getDate())&&(this.getHours()==date.getHours())&&(this.getMinutes()==date.getMinutes()));};Date.prototype.setDateOnly=function(date){var tmp=new Date(date);this.setDate(1);this.setFullYear(tmp.getFullYear());this.setMonth(tmp.getMonth());this.setDate(tmp.getDate());};Date.prototype.print=function(str){var m=this.getMonth();var d=this.getDate();var y=this.getFullYear();var wn=this.getWeekNumber();var w=this.getDay();var s={};var hr=this.getHours();var pm=(hr>=12);var ir=(pm)?(hr-12):hr;var dy=this.getDayOfYear();if(ir==0){ir=12;}
var min=this.getMinutes();var sec=this.getSeconds();s["%a"]=Calendar.SHORT_DAY_NAMES[w];s["%A"]=Calendar.DAY_NAMES[w];s["%b"]=Calendar.SHORT_MONTH_NAMES[m];s["%B"]=Calendar.MONTH_NAMES[m];s["%C"]=1+Math.floor(y/100);s["%d"]=(d<10)?("0"+d):d;s["%e"]=d;s["%H"]=(hr<10)?("0"+hr):hr;s["%I"]=(ir<10)?("0"+ir):ir;s["%j"]=(dy<100)?((dy<10)?("00"+dy):("0"+dy)):dy;s["%k"]=hr;s["%l"]=ir;s["%m"]=(m<9)?("0"+(1+m)):(1+m);s["%M"]=(min<10)?("0"+min):min;s["%n"]="\n";s["%p"]=pm?"PM":"AM";s["%P"]=pm?"pm":"am";s["%s"]=Math.floor(this.getTime()/1000);s["%S"]=(sec<10)?("0"+sec):sec;s["%t"]="\t";s["%U"]=s["%W"]=s["%V"]=(wn<10)?("0"+wn):wn;s["%u"]=w+1;s["%w"]=w;s["%y"]=(''+y).substr(2,2);s["%Y"]=y;s["%%"]="%";return str.gsub(/%./,function(match){return s[match]||match;});};Date.prototype.__msh_oldSetFullYear=Date.prototype.setFullYear;Date.prototype.setFullYear=function(y){var d=new Date(this);d.__msh_oldSetFullYear(y);if(d.getMonth()!=this.getMonth()){this.setDate(28);}
this.__msh_oldSetFullYear(y);};
JotForm.init(function(){ JotForm.alterTexts({"alphabetic":"This field can only contain letters","alphanumeric":"This field can only contain letters and numbers.","ccDonationMinLimitError":"Minimum amount is {minAmount} {currency}","ccInvalidCVC":"CVC number is invalid.","ccInvalidExpireDate":"Expire date is invalid.","ccInvalidNumber":"Credit Card Number is invalid.","ccMissingDetails":"Please fill up the Credit Card details.","ccMissingDonation":"Please enter numeric values for donation amount.","ccMissingProduct":"Please select at least one product.","characterLimitError":"Too many Characters. The limit is","characterMinLimitError":"Too few characters. The minimum is","confirmClearForm":"Are you sure you want to clear the form?","confirmEmail":"E-mail does not match","currency":"This field can only contain currency values.","cyrillic":"This field can only contain cyrillic characters","dateInvalid":"This date is not valid. The date format is {format}","dateInvalidSeparate":"This date is not valid. Enter a valid {element}.","dateLimited":"This date is unavailable.","disallowDecimals":"Please enter a whole number.","email":"Enter a valid e-mail address","fillMask":"Field value must fill mask.","freeEmailError":"Free email accounts are not allowed","generalError":"There are errors on the form. Please fix them before continuing.","generalPageError":"There are errors on this page. Please fix them before continuing.","gradingScoreError":"Score total should only be less than or equal to","incompleteFields":"There are incomplete required fields. Please complete them.","inputCarretErrorA":"Input should not be less than the minimum value:","inputCarretErrorB":"Input should not be greater than the maximum value:","lessThan":"Your score should be less than or equal to","maxDigitsError":"The maximum digits allowed is","maxSelectionsError":"The maximum number of selections allowed is","minSelectionsError":"The minimum required number of selections is","multipleFileUploads_emptyError":"{file} is empty, please select files again without it.","multipleFileUploads_fileLimitError":"Only {fileLimit} file uploads allowed.","multipleFileUploads_minSizeError":"{file} is too small, minimum file size is {minSizeLimit}.","multipleFileUploads_onLeave":"The files are being uploaded, if you leave now the upload will be cancelled.","multipleFileUploads_sizeError":"{file} is too large, maximum file size is {sizeLimit}.","multipleFileUploads_typeError":"{file} has invalid extension. Only {extensions} are allowed.","nextButtonText":"Next","numeric":"This field can only contain numeric values","pastDatesDisallowed":"Date must not be in the past.","pleaseWait":"Please wait...","prevButtonText":"Previous","progressMiddleText":"of","required":"This field is required.","requireEveryCell":"Every cell is required.","requireEveryRow":"Every row is required.","requireOne":"At least one field required.","reviewBackText":"Back to Form","reviewSubmitText":"Review and Submit","seeAllText":"See All","submissionLimit":"Sorry! Only one entry is allowed. Multiple submissions are disabled for this form.","submitButtonText":"Submit","uploadExtensions":"You can only upload following files:","uploadFilesize":"File size cannot be bigger than:","uploadFilesizemin":"File size cannot be smaller than:","url":"This field can only contain a valid URL","wordLimitError":"Too many words. The limit is","wordMinLimitError":"Too few words. The minimum is"}); JotForm.clearFieldOnHide="disable"; setTimeout(function() { JotForm.initMultipleUploads(); }, 2); JotForm.submitError="jumpToFirstError"; /*INIT-END*/
}); JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Heading","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"name":"photo1","qid":"3","text":"Photo 1","type":"control_fileupload"},{"name":"photo2","qid":"4","text":"Photo 2","type":"control_fileupload"},{"name":"photo3","qid":"5","text":"Photo 3","type":"control_fileupload"},{"name":"fullName","qid":"6","text":"Full Name","type":"control_textbox"},{"name":"email","qid":"7","text":"Email","type":"control_email"},{"name":"city","qid":"8","text":"City","type":"control_textbox"},{"name":"state","qid":"9","text":"State","type":"control_textbox"},{"name":"yourStory","qid":"10","text":"Your Story","type":"control_textarea"}]); setTimeout(function() {
JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Heading","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"name":"photo1","qid":"3","text":"Photo 1","type":"control_fileupload"},{"name":"photo2","qid":"4","text":"Photo 2","type":"control_fileupload"},{"name":"photo3","qid":"5","text":"Photo 3","type":"control_fileupload"},{"name":"fullName","qid":"6","text":"Full Name","type":"control_textbox"},{"name":"email","qid":"7","text":"Email","type":"control_email"},{"name":"city","qid":"8","text":"City","type":"control_textbox"},{"name":"state","qid":"9","text":"State","type":"control_textbox"},{"name":"yourStory","qid":"10","text":"Your Story","type":"control_textarea"}]);}, 20);