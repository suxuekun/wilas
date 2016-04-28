const _data = Symble('_data');
const _api = Symble('_api');
export class DataSource{
	constructor(){
		this[_api]

	}
	setData(value){
		this[_data] = value;
		return this;
	}
	getData(){
		return this[_data];
	}
	done(func){


	}
}