import { ref, reactive, computed, toRef } from 'vue';


const _setItems = (items, state, stateName) => {
    state[stateName].items = items;
    if(items.length === 0){
        state[stateName].itemsIds = {};
        return true;
    }
    let i = 0;
    for (const item of items) {
        if(!item.id) break;
        state[stateName].itemsIds[item.id] = i;
        i++;
    }
    return true;
};

const _setCount = (count, state, stateName) => {
    state[stateName].count = count;
};

export default class MultiStateManager {
    _stateName = 'default';
    _requestData = {};
    _state = reactive({});
    constructor( name = 'default') {
        this._stateName = name;
        this._state[name] = { count: 0, itemsIds: {}, items:[] };
    }
    //mutations
    setItems(items){
        if(!items)  items = [];
        _setItems(items,this._state, this._stateName );
        return this;
    };

    setCount(count){
        _setCount(count, this._state, this._stateName);
        return this;
    };


    //getters
    getItems(){        return toRef(this._state[this._stateName], 'items'); };
    count() {
        return toRef(this._state[this._stateName], 'count');
        }
}
