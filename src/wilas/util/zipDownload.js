import * as FileSaver from 'browser-filesaver';
import JSZip from 'jsZip';
export function zipDownload(zipname,list,ziptype){
		if (!zipname) return;
	if (!list || list.length ==0 ) return;
	if (!ziptype) ziptype = "blob";
	var zip = new JSZip();
	for (var key in list){
		var item = list[key];
		var name = item.name;
		var content = item.content;
		var option = item.option;
		zip.file(name,content,option);
	}  
    var zipContent = zip.generate({type:ziptype});
    FileSaver.saveAs(zipContent, zipname);
}