import React from 'react';
import { Route, RouteProps,Redirect } from "react-router-dom";

type PrivateRouteProps = {
    path: RouteProps['path'];
    component: React.ElementType;
    validToken:boolean;
}  & Partial<RouteProps>;
 
export const SecuredRoute=({  component: Component,validToken,...routeProps}: PrivateRouteProps)=> {
    return (
    <React.Fragment>
        <Route 
            {...routeProps}
            render={(props) =>
                validToken === true ? (
                <Component {...props} />
              ) : ( 
                <Redirect to={'/login'} exact/>
              )
            }
        />
        
    </React.Fragment>
  );
}

  export default SecuredRoute;