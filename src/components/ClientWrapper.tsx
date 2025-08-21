'use client'

import React from 'react'
import Preloader from './Preloader'
import TopNavigation from './TopNavigation'

export default function ClientWrapper() {
  return (
    <>
      <Preloader />
      <TopNavigation />
    </>
  )
}
