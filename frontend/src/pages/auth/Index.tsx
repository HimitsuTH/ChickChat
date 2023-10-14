import React from 'react'

import { Outlet } from 'react-router-dom'


export const Index = () => {
  return (
    <div className='grid h-screen place-items-center bg-gradient-to-r from-indigo-300 to-purple-400'>
        <Outlet/>
    </div>
  )
}

 