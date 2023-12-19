import React from 'react';
import classes from './ErrorPage.module.css'
import WebsiteWrapper from './WebsiteWrapper';

const ErrorPage = () => {
    return (
      <WebsiteWrapper>
        <div className={classes["main-error-page"]}>
          <h1 className={classes["error-title"]}>
            Woops! <br />
            Something went wrong :(
          </h1>
          <h2 className={classes["error-subtitle"]}>
            Coming soon
          </h2>
        </div>
      </WebsiteWrapper>
    );
}

export default ErrorPage