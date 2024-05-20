import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 


const Home = () => {
  return (
    <div className='h-[20%]'>
    <h2>Image Slider</h2> 
              <Carousel> 
                  <div> 
                      <img src="/image/img1.png" alt="image1"/> 
                      <p className="legend">Image 1</p> 
  
                  </div> 
                  <div> 
                      <img src="/image/img2.png" alt="image2" /> 
                      <p className="legend">Image 2</p> 
  
                  </div> 
                  <div> 
                      <img src="/image/img3.png" alt="image3"/> 
                      <p className="legend">Image 3</p> 
  
                  </div> 
                  <div> 
                      <img src="/image/img4.png" alt="image4"/> 
                      <p className="legend">Image 4</p> 
  
                  </div>  
              </Carousel> 
            </div> 
  )
}

export default Home