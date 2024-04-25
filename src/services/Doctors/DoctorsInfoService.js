
// import doctorsState from '../../state/DoctorsState.js'
import doctorsApi from '@/api/Doctors/DoctorsApi'
import StateManager from "@/services/util/StateManager";
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

const DoctorsState = StateManager.setGlobalWithName('DoctorInfoState');

export default {
     state: DoctorsState,

    async refreshItem(id){
        const res = await doctorsApi.get({id});
        if(Object.keys(res).length > 0 && res.items){
            this.state.refreshItems(res.items);
        }
    },

    //actions
    //todo set definition requestAdapter type
    async fetchServerData(requestAdapter){
        //handle data from request adapters
        if( requestAdapter )    doctorsApi.withRequestData(requestAdapter.toArray());

        const res = await doctorsApi.get();
        if(Object.keys(res).length > 0 && res.items){
            this.state.setItems(res.items);
            this.state.setCount(res.count);
        }
        // if(requestData?.id || requestData?.ids){
        //     reviewsState.refreshItems(res.items);
        // }else{
        //     reviewsState.setItems(res.items);
        //     reviewsState.setCount(res.count);
        // }
        //todo handle error
        return this;
    },


    //getters
    items(condition){
        if( !condition ) return this.state.getItems();
    },

    item(id){
        return this.state.item(id);
    },

    count(){   return this.state.count();  },

    async save( data ){
        return  await doctorsApi.saveItem(data);
    },

    async delete( id ){
        return  await doctorsApi.deleteDoctor(id);
    },


}
