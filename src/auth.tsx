import {Component} from 'react'
import { validateTokenService } from '../src/services/serviceApi'

interface State {
    authenticated: boolean,
};

const isAuthenticated =() => {
        // validateTokenService()
        // .then(res => res.json())
        // .then(res => {
        //     if(res.error){
        //         console.log(res.statusText)
        //     }
        //     else{
        //         this.setState({authenticated: true})
        //     }
        // })
        return true
    };

export default isAuthenticated



// alterar voo do guarilha de quarta para quinta-feira