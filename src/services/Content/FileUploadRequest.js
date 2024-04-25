let onUploadProgressCallback = () =>{};
let onSuccessCallback = () =>{};
let onErrorCallback = () =>{};
let file = null;


class FileUploadRequest
{
    _requestData = {};

    //setters

    forFile(filesBinary){
        this._requestData['files[]'] = filesBinary;
        file = filesBinary;
        return this;
    }

    withUploadProgressCallback(callback){
        onUploadProgressCallback = callback;
        return this;
    }

    withSuccessCallback(callback){
        onSuccessCallback = callback;
        return this;
    }
    withErrorCallback(callback){
        onErrorCallback = callback;
        return this;
    }

    with(field, value){
        if( !field ) return this;
        this._requestData[field] = value;
        return this;
    }



    //getters

    getRequestData() { return this._requestData; }

    getFile = ()=> file
    existsUrl = ()=> this._requestData['videoLink']

    getUploadProgressCallback(){
        return onUploadProgressCallback;
    }
}

export default FileUploadRequest
//
// export default (() => ({
//     _requestData : {},
//
//     //setters
//
//     forFile(filesBinary){
//         this._requestData['files[]'] = filesBinary;
//         file = filesBinary;
//         return this;
//     },
//
//     withUploadProgressCallback(callback){
//         onUploadProgressCallback = callback;
//         return this;
//     },
//
//     withSuccessCallback(callback){
//         onSuccessCallback = callback;
//         return this;
//     },
//     withErrorCallback(callback){
//         onErrorCallback = callback;
//         return this;
//     },
//
//     with(field, value){
//         if( !field ) return this;
//         this._requestData[field] = value;
//         return this;
//     },
//
//
//
//     //getters
//
//     getRequestData() { return this._requestData; } ,
//
//     getFile : ()=> file,
//
//     getUploadProgressCallback(){
//         return onUploadProgressCallback;
//     }
//
//     //
// }))();
