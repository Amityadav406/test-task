import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createBrowserHistory } from "history";
import { materialTheme } from './configs/theme';
import { toast, ToastContainer } from "react-toastify";
//Protected Route
import ProtectedRoute from "./ProtectedRoute";
// - Context
import AuthContext from "./context/AuthContext";
// components
import { Login, App, Dashboard } from './views'
// - Hooks
import { useSave, useGet } from "./hooks";


const AppRoute = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    isUserLoggedIn: false,
    isCheckingLogin: true,
    token: "",
    user: {},
  });

  const [{ sendDataToAPI: sendLoginData }] = useSave({
    url: "signin",
  });

  useEffect(() => {
    const token = localStorage.getItem("user-data");
    if (token) {
      setAuthenticatedUser({
        ...authenticatedUser,
        isUserLoggedIn: true,
        token,
      });
    } else {
      setAuthenticatedUser({
        ...authenticatedUser,
        isCheckingLogin: false,
      });
    }
  }, []);

  const logOutUser = () => {
    setAuthenticatedUser({
      token: null,
      user: {},
      isUserLoggedIn: false,
    });
    localStorage.removeItem("user-data");
    toast.success(`You're successfully logged out.`);
  };

  const login = async (form) => {
    try {
      const { response, status } = await sendLoginData(form, {

        headers: {
          Accept: "application/json",
          ...(authenticatedUser.token && {
            Authorization: `Bearer ${authenticatedUser.token}`,
          }),
        },
      });
      const { data } = response
      if (data && data.status === 1) {
        if (data.data && data.data.token) {
          localStorage.setItem("user-data", data.data.token);

          setAuthenticatedUser({
            ...authenticatedUser,
            token: data.data.token,
            isUserLoggedIn: true,
            isCheckingLogin: false,
          });

          return 200;
        }
      } else {
        if (response && response.message) throw response.message;
        else throw "Something went wrong. Please try again...";
      }
    } catch (err) {
      console.log("login error", { err });
      return 400;
    }
  };
  return (
    <MuiThemeProvider theme={materialTheme}>
      <AuthContext.Provider
        value={{
          ...authenticatedUser,
          login,
          logOutUser,
        }}
      >
        <Router history={createBrowserHistory}>
          <React.Fragment>
            <App>
              <Route path="/login" exact component={Login} />
              <ProtectedRoute path="/dashboard" exact component={Dashboard} />
              <Redirect from="/*" to="/login" />
              <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                limit={3}
              />
            </App>
          </React.Fragment>
        </Router>
      </AuthContext.Provider>
    </MuiThemeProvider>
  )
}

export default AppRoute