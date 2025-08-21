'use client'

import { useCustomCursor } from '@/hooks/useCustomCursor'

export default function CustomCursor() {
  const { cursorDot, cursorRing } = useCustomCursor()

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={cursorDot}
        className="cursor-dot"
        style={{
          opacity: 0,
          scale: 0,
        }}
      />

      {/* Cursor Ring */}
      <div
        ref={cursorRing}
        className="cursor-ring"
        style={{
          opacity: 0,
          scale: 0,
        }}
      />
    </>
  )
}
