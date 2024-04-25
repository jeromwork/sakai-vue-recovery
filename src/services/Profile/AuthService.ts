import {postToServer} from "@/services/util/UseFetchToServer";
import {API_URL, BASE_URL} from "@/api/config.js";

class AuthService {
    async login(authData:{ email: string, password: string}) {
        return  postToServer(BASE_URL + API_URL+ '/auth/login', authData);
    }

    async sendSmsByPhone(phone:string){
        return  postToServer(BASE_URL + API_URL+ '/auth/login/phone/send-sms', {phone});
    }

    async loginByPhone(authData:{ phone: string, code: string}) {
        return  postToServer(BASE_URL + API_URL+ '/auth/login/phone', authData);
    }
    logout() {
        localStorage.removeItem('jwtToken');
    }

    async register(user:object) {
        return await postToServer(BASE_URL + API_URL+ '/auth/register', user);
    }
    isAuth(){
        return (localStorage.getItem('jwtToken'));
    }
}

export default new AuthService();
