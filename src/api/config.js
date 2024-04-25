
const isDeploy = process.env.NODE_ENV === 'production'; // Using Node.js environment variable to check if it's in production mode


const baseUrl = isDeploy ? 'https://eastclinic.ru' : 'http://127.0.0.1:8000';
const BASE_URL = isDeploy ? 'https://eastclinic.ru' : 'http://127.0.0.1:8000';
// const BASE_URL = 'https://eastclinic.ru';
// const API_URL = '/system/api/v1';
const API_URL = isDeploy ? '/system/api/v1' : '/api/v1';

export {baseUrl, API_URL, BASE_URL}
