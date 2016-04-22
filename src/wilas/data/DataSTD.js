export class DataSTD{
	constructor(name){
		this.setName(name);
	}
	setName(name){
		this.name = name;
	}
	setData(data){
		this.data = data;
	}
	setLabel(label){
		this.label = label;
	}
	getName(){
		return this.name;
	}
	getData(){
		return this.Data;
	}
	getLabel(){
		return this.label;
	}
}