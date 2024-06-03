'use client'
import React from 'react'
import Slider from './components/imageSlider/page'
import Department from './pages/department/page'
import Message from './pages/message/page'
import Book from './components/book/page'
import Navbar from './components/Navbar/page'
import Footer from './components/footer/page'



const page = () => {
  return (
    <div>
      <Navbar />
        <Slider/>
        <Department/>
        <Message />
        <Book/>
        <Footer/>
    </div>
  )
}

export default page