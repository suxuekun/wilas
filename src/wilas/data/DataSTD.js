export class DataSTD{
	constructor(name){
		this.setName(name);
	}
	setName(name){
		this.name = name;
		return this;
	}
	setData(data){
		this.data = data;
		return this;
	}
	setLabel(label){
		this.label = label;
		return this;
	}
	getName(){
		return this.name;
	}
	getData(){
		return this.data;
	}
	getLabel(){
		return this.label;
	}
}