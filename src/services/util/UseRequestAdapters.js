export default (() => ({
        _requestData : {},
        withRequestData(data){
                if(typeof data === 'object' && data !== null)
                this._requestData = { ...this._requestData, ...data}
                return this;
        },
    }))();
