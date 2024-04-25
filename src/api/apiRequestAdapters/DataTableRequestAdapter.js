
const _filter = (event, adapter) => adapter._requestData['filter'] = ( event.filters ) ? event.filters : 10;
const _page = (event, adapter) =>     adapter._requestData['page'] = ( event.page ) ? event.page + 1 : 1;
const _perPage = (event, adapter) =>    adapter._requestData['per_page'] = ( event.rows ) ? event.rows : 10;
const _multiSort = (event, adapter) => {
    //todo not work multisort(, only 1 column in sort
    if(!event || !event.multiSortMeta || !event.multiSortMeta[0]) {
        delete adapter._requestData.sort;
    }
    const { field, order } = event.multiSortMeta[0];
        adapter._requestData['sort'] = {};
        adapter._requestData['sort'][field] = order;
}

export default class DataTableRequestAdapter
{
    _requestData = {};
    page(page){
        this._requestData['page'] = ( page ) ? page : 1;
        return this;
    }
    perPage(perPage){
        this._requestData['per_page'] = ( perPage ) ? perPage : 10;
        return this;
    }

    dtEvent(event){
        _multiSort(event, this)
        _page(event, this);
        _perPage(event, this);
        _filter(event, this);
        return this;
    }

    withFiltration(filters){
        this._requestData['filters'] = JSON.parse(JSON.stringify(filters));
        return this;
    }


    data(){ return {...this._requestData} }
    toArray(){ return {...this._requestData} }
    clear(){
        this._requestData = {};
        return this;
    }
    requestData() {return {...this._requestData}}
    //
}