import { ref, reactive, computed, toRef } from 'vue';

const _setCashItems = ( store, items ) => {
    if(!items || items.length === 0) return store;
    let cashItems = {};
    for (const item of items) cashItems[item.id] = item;
    return store._state._cash = { ...store._state._cash, ...cashItems};
}

const _setItemsIds = (store, items) => {
    let itemsIds = [];
    for (const item of items) itemsIds.push(item.id);
    return store._state.itemsIds = itemsIds;
}
const _refreshItems = (store,items) => {
    if(!items || items.length === 0) return ;
    let itemsNew = {};
    let existItems = [];
    for (const item of items) itemsNew[item.id] = item;
    if(store._state?.items?.length === 0 ){
        store._state.items = Object.values(itemsNew);
    }else{
        for (const item of store._state.items) {
            existItems.push((itemsNew[item.id]) ? itemsNew[item.id] : item);
        }
        store._state.items = existItems;
    }
}
export default  (() => ({
        _state : reactive({ count : 0, _cash: {}, itemsIds:{}, items:[] }),

        //mutations
        setItems: function(items){
            if(!items)   return this;
            _setCashItems(this, items);
            _setItemsIds(this, items);
            return this;
        },

        setCount(count){
            this._state.count = count;
            return this;
        },

        setGlobalWithName(name){
            if(name) window[name] = this._state;
            return this;
        },
        refreshItems(items){
            if(!items)   return this;
            _setCashItems(this, items)
            _refreshItems(this, items);
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

        item(id){
            return this._state._cash[id];
        },

        count() {
            return this._state.count;
        }
    }
))();
