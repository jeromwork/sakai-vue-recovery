
import doctorsApi from '../../api/Doctors/DoctorsApi'
import StateManager from "../util/StateManager";
/*
Сервисов может быть множество
стейтов может быть множество
Несколько сервисов могут работать с одним стейтом
DoctorsListService и DoctorsListService будут работать с одним стейтом DoctorsState
DoctorsState должен быть синглтоном
DoctorsState должен иметь public методы, для обращения к данным и приватные методы для внутреннего устройства данных
сам объект стейт const state = reactive() должен быть встроен в DoctorsState, и всем выдаваться один и тот же объект

сервис обращается к стейту и выдает лишь необходимые поля

для тестирования можно делать глобальный объект стейта, для отслеживания свойств

Оба сервиса работая с одним мульти стейтом, работают с разными вложенными объектами

Будем считать что вложенные объекты это субстейты

для разных сервисов возможно будут нужны разные наборы данных,
будет так называемый минимальный набор данных, нужный стейту

 */

const DoctorsState = StateManager.setGlobalWithName('DoctorsListState');

export default (() => ({
    state: DoctorsState,
    //actions
    //todo set definition requestAdapter type
    async fetchServerData(requestAdapter){
        //handle data from request adapters
        const res = await (new DoctorsApi()).withUrl('/api/doctors-list').get(( requestAdapter ) ? requestAdapter.toArray() : null);
        if( res?.items) this.state.setItems(res.items)
        if( res?.count) this.state.setCount(res.count)

        //todo handle error
        return this;
    },


    //getters
    items(condition){
        return this.state.getItems();
        const items = this.state.getItems();
        const preparedItems = [];
        items.map(item => (preparedItems.push({name:item.fullname, code: item.id})))
        if( !condition ) return preparedItems;
    },
    count(){
        return this.state.count();
    },

}))();
