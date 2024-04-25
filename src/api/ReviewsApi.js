import {BASE_URL, API_URL} from '@/api/config.js';
import UseRequestAdapters from '@/services/util/UseRequestAdapters.js';

export default (() => ({
        ...UseRequestAdapters,
        _requestData : {},
        async getReviews(requestData){
            let request = {method:'GET'}
            let requestUrl = BASE_URL + API_URL + '/reviews';
            if(requestData.id){
                requestUrl += '/'+requestData.id;
            }
            else {
                if( Object.keys(requestData).length > 0 ){

                    // Create the URL with the parameters
                    //const queryParams = this._buildSearchParams(requestData);
                    requestUrl = this._buildURL(requestUrl, requestData)
                    //requestUrl += '?'+queryParams;
                }
            }
            const res = await fetch(requestUrl, request);
            if(!res) return {};
            const data = await res.json()
            if(!data || !data.items) return {};
            return data;
        },
    async saveReview( saveData ){
            if(!saveData || Object.keys(saveData).length === 0) return {}

        let request = {
            body: JSON.stringify(saveData),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let url = BASE_URL + API_URL + '/reviews';
        if(saveData.id ) {
            request['method'] = 'PUT';
            url += '/' + saveData.id;
        }else {
            //if not have id - its create new review
            request['method'] = 'POST';
        }
        try {
            const res = await fetch(url, request);
            //todo handle server error (500, 502 ...)
            if(!res) return {};
            return await res.json()
        } catch (error) {
            // code to handle the error
            console.log("An error occurred:", error.message);
        }
        return {};


    },

    async deleteReview(id){
        let url = BASE_URL + API_URL + '/reviews/'+id;
        const request = {
            headers: {
                'Content-Type': 'application/json'
            },
            method : 'DELETE'
        };
        try {
            const res = await fetch(url, request);
            //todo handle server error (500, 502 ...)
            if(!res) return {};
            return await res.json()
        } catch (error) {
            // code to handle the error
            console.log("An error occurred:", error.message);
        }
        return {};
    },

    _buildSearchParams(params, prefix = '') {
        let queryString = '';
        for (const [key, value] of Object.entries(params)) {
            const newPrefix = prefix ? `${prefix}[${key}]` : key;
            if (value instanceof Object) {
                queryString += this._buildSearchParams(value, newPrefix);
            } else if (Array.isArray(value)) {
                for (const item of value) {
                    queryString += `${newPrefix}[]=${item}&`;
                }
            } else {
                queryString += `${newPrefix}=${value}&`;
            }
        }
        return (queryString.endsWith('&')) ? queryString.slice(0, -1) : queryString;
    },

    _buildURL(baseURL, params) {
        const searchParams = this._buildSearchParams(params);
        const url = new URL(baseURL);
        url.search = searchParams;
        return url.toString();
    },

    contentUrl(){
            return BASE_URL + API_URL +  '/reviews/content';
    },



    }))();
