import { ref, reactive, computed, toRef } from 'vue';

export default (() => ({
    _stateName:'default',
    _requestData:{},
    //mutations
    setItems(items){
        if(!items)   return this;
        return this._setCashItems(items)._setItemsIds(items)._setItems(items);
    },

    refreshItems(items){
        if(!items)   return this;
        return this._setCashItems(items)._refreshItems(items);
    },

    _setCashItems(items){
        let cashItems = {};
        for (const item of items) cashItems[item.id] = item;
        this._state[this._stateName]._cash = { ...this._state[this._stateName]._cash, ...cashItems};
        return this;
    },

    _setItemsIds(items){
        let itemsIds = [];
        for (const item of items) itemsIds.push(item.id);
        this._state[this._stateName].itemsIds = itemsIds;
        return this;
    },
    _setItems(items){
        this._state[this._stateName].items = items;

        return this;
    },
    _refreshItems(items){
        if(!items || items.length === 0) return this;
        let itemsNew = {};
        let existItems = [];
        for (const item of items) itemsNew[item.id] = item;
        if(this._state[this._stateName].items.length === 0 ){
            this._state[this._stateName].items = Object.values(itemsNew);
        }else{
            for (const item of this._state[this._stateName].items) {
                existItems.push((itemsNew[item.id]) ? itemsNew[item.id] : item);
            }
            this._state[this._stateName].items = existItems;
        }
        return this;
    },
    setCount(count){
        this._state[this._stateName].count = count;
        return this;
    },
    state(name){
        name = (name) ? name : 'default';
        this._stateName = name;
        if(!this._state[this._stateName]) this._state[this._stateName] = { count : 0, items : [], _cash: {}, itemsIds:{} }
        window.state1 = this._state[this._stateName];
        return this;
    },


    //getters
    getItems(){        return toRef(this._state[this._stateName], 'items'); },

    requestData(){      return this._requestData;    },

    count() {
        return toRef(this._state[this._stateName], 'count');
        }
}))();
