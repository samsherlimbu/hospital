'use client'
import React from 'react'
import { useSelector } from 'react-redux'

const Box = () => {
    const {backgroundcolor,height,width} = useSelector(state=>state.box)
  return (
    <div>
      <div style={{backgroundColor: backgroundcolor, height: height, width:width }}>
        hjhk
        </div>
    </div>
  )
}

export default Box
