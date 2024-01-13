import React from 'react'
import LazyLoad from 'react-lazyload';

const LazyImage = ({ children, style }) => {
    return (
        <LazyLoad style={{ width: "100%" }} offset={100}>
            {/* <img loading="lazy" src={src} alt={alt} /> */}
            {children}
        </LazyLoad>
    );
}

export default LazyImage