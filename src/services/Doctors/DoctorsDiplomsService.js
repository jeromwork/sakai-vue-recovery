
// import doctorsState from '@/state/DoctorsState.js'
import diplomsApi from '@/api/Doctors/DiplomsApi'
import StateManager from "@/services/util/StateManager";
//
const DoctorsState = StateManager.setGlobalWithName('DoctorInfoState');
//
 export default {
     state: DoctorsState,




    //getters
    items(condition){
        if( !condition ) return this.state.getItems();
    },

    count(){   return this.state.count();  },

    async save( data ){
        return  await diplomsApi.saveItem(data);
    },

    async delete( id ){
        return  await diplomsApi.deleteDiplom(id);
    },


 }
