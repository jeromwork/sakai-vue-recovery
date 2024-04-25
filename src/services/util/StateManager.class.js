import {computed, reactive} from 'vue';

const isObject = (value) => {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}

const isArray = (value) => (Array.isArray(value))

const setCashItems = (items, state) => {
    if (!items || items.length === 0) return;
    let cashItems = {};
    for (const item of items) cashItems[item.id] = item;
    state._cash = { ...state._cash, ...cashItems };
}

const setItemsIds = (items, state) => {
    let itemsIds = [];
    for (const item of items) itemsIds.push(item.id);
    state.itemsIds = itemsIds;
}

const refreshItems = (items, state) => {
    if (!items || items.length === 0) return;
    let itemsNew = {};
    let existItems = [];
    for (const item of items) itemsNew[item.id] = item;
    if (state.items.length === 0) {
        state.items = Object.values(itemsNew);
    } else {
        for (const item of state.items) {
            existItems.push(itemsNew[item.id] ? itemsNew[item.id] : item);
        }
        state.items = existItems;
    }
}

class StateManager {
    constructor() {
        this._state = reactive({ count: 0, _cash: {}, itemsIds: {}, items:null });
    }

    computed( key, target, clone = false ){
        if(this._state[key]) return this._state[key];
        return computed({
            get: () => {
                if(!target)  throw new Error('not set target');
                if(clone) this._state[key] = JSON.parse(JSON.stringify(target));
                else this._state[key] = target
                return this._state[key];
            },
            set: (val) => {
                this._state[key] = val
            }
        });
    }
    // Mutations
    setItems(items) {
        if (!items) return this;
        // if(isArray(items)) {
        //     this.setItems([...JSON.parse(JSON.stringify(items))])
        // }else if (isObject(items)){
        //     this._state.items = {...JSON.parse(JSON.stringify(items))};
        // }
        this._state.items = JSON.parse(JSON.stringify(items));
        return this;
    }

    setCount(count) {
        this._state.count = count;
        return this;
    }

    setGlobalWithName(name) {
        if (name) window[name] = this._state;
        return this;
    }

    // Getters
    getItems() {
        return this._state.items;
    }

    item(id) {
        return this._state._cash[id];
    }

    getCount() {
        return this._state.count;
    }

    withName(name){

    }
}

export default StateManager;
