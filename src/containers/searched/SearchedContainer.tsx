import React, { Suspense } from 'react'
import {Loading} from '../../components/loading/Loading'

const Searched = React.lazy(() => import('../../components/searched/Searched'))

export const SearchedContainer = () => {
  return (
      <Suspense fallback={<Loading />}>
          <Searched />
    </Suspense>
  )
}
