import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCom = ({ height, src, alt, className= "", fun = () => { } }) => {
    const [isImgLoading, setIsImgLoading] = useState(true);

    return (
        <>
            {isImgLoading && <Skeleton height={height} />}
            <img  style={{ display: !isImgLoading ? 'block' : 'none' }} onLoad={() => setIsImgLoading(false)} className={className} onClick={fun} src={src} alt={alt} />
        </>
    )
}

export default SkeletonCom