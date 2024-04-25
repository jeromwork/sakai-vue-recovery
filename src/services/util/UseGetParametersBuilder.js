const buildSearchParams = (params, prefix = '') => {
        let queryString = '';
        for (const [key, value] of Object.entries(params)) {
                const newPrefix = prefix ? `${prefix}[${key}]` : key;
                if (value instanceof Object) {
                        queryString += buildSearchParams(value, newPrefix);
                } else if (Array.isArray(value)) {
                        for (const item of value) {
                                queryString += `${newPrefix}[]=${item}&`;
                        }
                } else {
                        queryString += `${newPrefix}=${value}&`;
                }
        }
        return (queryString.endsWith('&')) ? queryString.slice(0, -1) : queryString;
};
 const buildGetURL = (baseURL, params) => {
                const searchParams = (params &&  Object.keys(params).length > 0 ) ? buildSearchParams(params) : '';
                const url = new URL(baseURL);
                url.search = searchParams;
                return url.toString();
        };

export default buildGetURL;


