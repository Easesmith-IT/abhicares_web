import { GoogleApiWrapper } from "google-maps-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from './App';
import './index.css';
import { store } from "./store/store";

const AppWithGoogleApi = GoogleApiWrapper({
  apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
})(App);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AppWithGoogleApi /> */}
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
