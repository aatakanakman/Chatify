import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import firebase from "./firebase";
import store from "./store/store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import SignUp from "./component/auth/SignUp";
import Login from "./component/auth/Login";
import PrivateRoute from './component/auth/PrivateRoute'

const rrfConfig = {
  userProfile: "users",
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

const Root = () => {

  const history = useHistory();
  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        //!!Login olmuş.

        history.push('/')



      }else {
        //!!Login olmamış.

        history.push('/login')

      }
    })

  },[])

  return (
    <Switch>
      <PrivateRoute exact path="/">
        <App></App>
      </PrivateRoute>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/login" component={Login}></Route>
    </Switch>
  )
}



ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Root></Root>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
