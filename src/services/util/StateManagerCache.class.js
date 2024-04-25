import {computed, reactive} from 'vue';



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
        this._state = reactive({ count: 0, _cash: {}, itemsIds: {} });
    }
    // Mutations
    setItems(items) {
        if (!items) return this;
        setCashItems( items, this._state );
        setItemsIds( items, this._state );
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

    refreshItems(items) {
        if (!items) return this;
        setCashItems(items, this._state);
        refreshItems(items, this._state);
        return this;
    }

    // Getters
    getItems() {
        const items = [];
        for (const n in this._state.itemsIds) {
            const id = this._state.itemsIds[n];
            if (this._state._cash[id]) items.push(this._state._cash[id]);
        }
        return items;
    }

    item(id) {
        return this._state._cash[id];
    }

    getCount() {
        return this._state.count;
    }
}

export default StateManager;
