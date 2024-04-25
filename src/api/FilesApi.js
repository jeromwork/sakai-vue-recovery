import {BASE_URL, API_URL} from '@/api/config.js';
import axios from "axios";
const url = BASE_URL + API_URL + '/content'
import {getToServer, putToServer} from '@/services/util/UseFetchToServer';


export default (() => ({

    async fileUpload( fileUploadRequest ){

        const formData = new FormData();
        const requestData = fileUploadRequest.getRequestData();
        Object.keys(requestData).forEach((field)=>{
            formData.append(field, requestData[field]);
        });

        let data = {};
        try {
             await axios.request({
                method: 'POST',
                url: url,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: fileUploadRequest.getUploadProgressCallback()
            }).then(response => {
                if(response?.data?.items?.[0]) data.data = response.data.items[0];
                //return response.data;
            })
                .catch(error => {
                    if(error?.response?.data?.errors){
                        data.errors = error.response.data.errors;
                    }
                });

             return data;

        } catch (error) {
            // code to handle the error
            console.log("An error occurred:", error.message);
        }

    return {};


},

    async save(contentData, requestData ){
        if(!contentData.id) throw new Error('not have id');
        return await  putToServer(url+'/'+contentData.id, contentData, requestData);
    },

    async fileDelete( file, requestData ){
        if(!file.id) return {};
        const res =  await fetch(url+'/'+file.id, {
            method:'DELETE'
        });
        if(!res) return {};
        return  await res.json()
    },

    async getContent(requestData){
        return await getToServer(url, {...requestData, ...this._requestData});
    },


    }))();
