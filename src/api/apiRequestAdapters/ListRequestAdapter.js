
export default (() => ({
    _requestData : {},
    page(page){
        this._requestData['page'] = ( page ) ? page : 1;
        return this;
    },
    perPage(perPage){
        this._requestData['per_page'] = ( perPage ) ? perPage : 10;
        return this;
    },

    data(){ return {...this._requestData} },
    clear(){
        this._requestData = {};
        return this;
    },
    all(){
        this._requestData['all'] = true;
        return this;
    },
    requestData() {return {...this._requestData}},
    toArray(){
        return {...this._requestData}
    },
    with(field, value){
        if( !field ) return this;
        this._requestData[field] = value;
        return this;
    },
    //
}))();
