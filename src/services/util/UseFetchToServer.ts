
import buildGetURL from './UseGetParametersBuilder';

function addJwtTokenToRequest(options?: RequestInit){
    if(localStorage.getItem('jwtToken')){
        const headers = options?.headers ? new Headers(options.headers) : new Headers();
        headers.set('Authorization','Bearer ' + localStorage.getItem('jwtToken'));
        options.headers = headers;
    }
    return options;
}

function saveJWTToken(data){
    //todo fill right jwt token string from server response format
    if(data?.jwtToken){
        localStorage.setItem('jwtToken', data.jwtToken);
    }
}

export async function postToServer<T>(url: string, requestData: Object, options?: RequestInit) {
    if(!options) options = {};
    options.method = 'POST';
    options.headers = {   'Content-Type': 'application/json', };
    options.body = JSON.stringify(requestData)
    return fetchToServer(url, options);
}

export async function putToServer<T>(url: string, requestData: Object, options?: RequestInit) {
    if(!options) options = {};
    options.method = 'put';
    options.headers = {   'Content-Type': 'application/json', };
    options.body = JSON.stringify(requestData)
    return fetchToServer(url, options);
}


export async function getToServer<T>(url: string, requestData: Object, options?: RequestInit) {
    if(!options) options = {};
    options.method = 'GET';
    if(requestData &&  Object.keys(requestData).length > 0 ){
        // Create the URL with the parameters
        url = buildGetURL(url, requestData)
    }
    return fetchToServer(url, options);
}


export async function fetchToServer<T>(url: string, options?: RequestInit) {
    try {
        options = addJwtTokenToRequest(options);

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        saveJWTToken(data);
        return data as T;
    } catch (error) {
        throw new Error(`Fetch error: ${error.message}`);
    }
}



