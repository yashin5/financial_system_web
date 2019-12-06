import { validateTokenService } from '../src/services/serviceApi'

interface State {
    authenticated: boolean,
};

const isAuthenticated =() => {
        return validateTokenService()
        .then(res => res.json())
        .then(res => {
            if(res.error){
                console.log(res.statusText)
                return false
            }
            else{
                return true
            }
        })
    };

export default isAuthenticated