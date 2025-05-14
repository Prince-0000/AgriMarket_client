/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'

interface Props {
  user: any
}

export default function ClientDashboard({ user }: Props) {
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <div className='flex '>
        <div>
        
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}
