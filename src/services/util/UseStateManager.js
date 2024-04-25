import { ref, reactive, computed, toRef } from 'vue';


const _setCashItems = ( store, items ) => {
    if(!items || items.length === 0) return store;
    let cashItems = {};
    for (const item of items) cashItems[item.id] = item;
    return store._state._cash = { ...cashItems };
}

const _setItemsIds = (store, items) => {
    let itemsIds = [];
    for (const item of items) itemsIds.push(item.id);
    return store._state.itemsIds = itemsIds;
}
export default  (() => ({
        _state : reactive({ count : 0, _cash:{}, itemsIds:[], totalPages:0, perPage:0, page:0 }),

        //mutations
        setItems: function(items){
            if(!items)   return this;
            _setCashItems(this, items);
            _setItemsIds(this, items);
            return this;
        },
        addItem(){

        },
        //mutations
        setGlobalWithName(name){
            if(name) window[name] = this._state;
            return this;
        },

        setFromResponse(response){
            if( response?.items ) this.setItems( response.items );
            if( response?.count ) this._state.count = response.count;
            if( response?.total_pages ) this._state.totalPages = response.total_pages;
            if( response?.per_page ) this._state.totalPages = response.per_page;
            if( response?.page ) this._state.page = response.page;
            return this;
        },



        //getters
        getItems(){
            const items = [];
            for(const n in this._state.itemsIds){
                const id = this._state.itemsIds[n];
                if(this._state._cash[id]) items.push(this._state._cash[id])
            }
            return items;
        },

        getCount() {
            return this._state.count;
        },

        getTotalPages() {
            return this._state.totalPages;
        },
        getItem( id ){
            return (this._state._cash[id]) ? this._state._cash[id] : null;
        }
    }
))();
