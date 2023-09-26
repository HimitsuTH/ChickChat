import React from 'react'

import { Outlet } from 'react-router-dom'

export const index = () => {
  return (
    <div className='grid h-screen place-items-center'>
        <Outlet/>
    </div>
  )
}

 