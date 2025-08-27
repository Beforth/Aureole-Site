'use client'

import React from 'react'
import TopNavigation from './TopNavigation'
import Preloader from './Preloader'

export default function ClientWrapper() {
  return (
    <>
      <Preloader />
      <TopNavigation />
    </>
  )
}
