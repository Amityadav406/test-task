import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "./context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserLoggedIn) {
          return <Component {...props} />;
        }

        return (
          <Redirect
            {...props}
            lastPath={props.location}
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
