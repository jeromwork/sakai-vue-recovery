
import reviewsState from '../../state/ReviewsState.js'
import reviewsApi from '../../api/ReviewsApi'


export default (() =>({
    state: reviewsState,
    requestData:{},


    //actions
    //todo set definition requestAdapter type
    async fetchServerData(requestData){
        //handle data from request adapters
        requestData = (requestData) ? requestData : {};

        if( reviewsState.requestData() )  requestData = { ...requestData, ...reviewsState.requestData() };

        const res = await reviewsApi.getReviews(requestData);
        if(Object.keys(res).length > 0 && res.items){
            //if simply refresh data from server run refreshItems()
            if(requestData?.id || requestData?.ids){
                reviewsState.refreshItems(res.items);
            }else{
                reviewsState.setItems(res.items);
                reviewsState.setCount(res.count);
            }

        }



        //todo handle error
        return true;
    },


    async saveReview( data ){
        return  await reviewsApi.saveReview(data);
    },

    async deleteReview( id ){
        return  await reviewsApi.deleteReview(id);
    },

    //getters
    reviews(condition){
        if( !condition ) return this.state.getItems();
    },

    //actions
    async saveContent( files, requestData ){
        return  await reviewsApi.fileUpload( files, requestData );
    },

    count(){   return this.state.count();  },

}))();
