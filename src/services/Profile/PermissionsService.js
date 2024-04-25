
class PermissionsService {
    isAuth(){
        return (localStorage.getItem('jwtToken'));
    }
    beforeEach(to, from, next){
        //todo get permissions object from server
        if (!this.isAuth() && to.name !== 'login') return next({ name: 'login' })
        else return next()
    }
}

export default new PermissionsService();
