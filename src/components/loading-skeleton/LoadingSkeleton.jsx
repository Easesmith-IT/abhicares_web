import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./LoadingSkeleton.css"

const LoadingSkeleton = () => {
  return (
    <div className='loading-skeleton'>
      <div>
        <Skeleton height={200} />
        <Skeleton height={30} />
        <Skeleton height={30} />
      </div>
      <div>
        <Skeleton height={200} />
        <Skeleton height={30} />
        <Skeleton height={30} />
      </div>
      <div>
        <Skeleton height={200} />
        <Skeleton height={30} />
        <Skeleton height={30} />
      </div>
      <div>
        <Skeleton height={200} />
        <Skeleton height={30} />
        <Skeleton height={30} />
      </div>
    </div>
  )
}

export default LoadingSkeleton