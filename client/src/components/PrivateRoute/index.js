import React, {memo} from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            auth
            ? <Component {...props} />
            : <Redirect to={redirectTo} />
            )}
    />
);

export default memo(PrivateRoute);
