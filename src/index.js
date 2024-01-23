import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GoogleApiWrapper } from "google-maps-react";
import { Toaster } from "react-hot-toast";

const AppWithGoogleApi = GoogleApiWrapper({
  apiKey: "AIzaSyB_ZhYrt0hw7zB74UYGhh4Wt_IkltFzo-I",
})(App);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithGoogleApi />
      <Toaster />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
