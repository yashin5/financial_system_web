import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isAuthenticated from './auth'
import { RouteComponentProps, NavigateFn, WindowLocation } from '@reach/router';

interface State{
    authenticationStatus: string
};

interface Props extends RouteComponentProps{
    component: any;
    path?: string;
    default?: boolean;
    location?: WindowLocation;
    navigate?: NavigateFn;
    uri?: string;
};

class PrivateRoute extends React.Component<Props, State> {
    // define um estado para checar se o usuário está autenticado
    constructor(props: Props){
        super(props);
        this.state = {
            authenticationStatus: 'AUTHENTICATING'
        }
    }
    
  
    componentDidMount() {
      // assim que o componente monta, checamos se o usuário
      // está autenticado e atualizamos o state.authenticationStatus
      // de acordo.
      isAuthenticated()
        .then((isAuthenticated) => {
          if (isAuthenticated) {
            this.setState({ authenticationStatus: 'AUTHORIZED' })
          } else {
            this.setState({ authenticationStatus: 'NOT_AUTHORIZED' })
          }
        })
    }
  
    render () {
      const { component: Component, ...rest } = this.props
  
    //   mantemos a rota com um componente vazio enquanto estamos autenticando
      if (this.state.authenticationStatus === 'AUTHENTICATING') {
        return (
          <Route
            {...rest}
            render={() => <div />}
          />
        )
      }
  
      // se não estiver autenticado, redirecionamos para a tela de login
      if (this.state.authenticationStatus === 'NOT_AUTHORIZED') {
        return (
          <Redirect to={{pathname: '/login', state: { from: this.props.location }}} />
        )
      }
  
      return (
        <Route
          {...rest}
          render={(props) => <Component { ...props} />}
        />
      );
    };
  };
  

export default PrivateRoute