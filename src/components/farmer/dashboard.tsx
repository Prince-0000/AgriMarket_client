/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'

interface Props {
  user: any
}

export default function ClientDashboard({ user }: Props) {
  return (
    <div>
      <h1>Farmer Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
