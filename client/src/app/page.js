'use client'
import React from 'react'
import Slider from './components/imageSlider/page'
import Department from './pages/department/page'
import Message from './pages/message/page'
import Book from './components/book/page'



const page = () => {
  return (
    <div>
        <Slider/>
        <Department/>
       
        <Message />
        <Book/>
    </div>
  )
}

export default page